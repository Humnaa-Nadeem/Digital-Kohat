import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient(process.env.DB_URL);
const db = client.db("DSCH");
import argon2 from "argon2";
const schoolColl = db.collection(process.env.S_C);
const AdmnColl = db.collection(process.env.A_C);
const NRs = db.collection(process.env.NSPR_C); //NR => New Requests

// Getting all School Card data that are verfied and active.
export const GettingSchoolCrdDta = async (req, res) => {
    try {
        const services = await schoolColl.find(
            { Status: true },
            {
                projection: {
                    ServiceName: 1,
                    Type: 1,
                    bannerUrl: 1,
                    ratingData: 1,
                    about: 1
                }
            }
        ).toArray();
        const approvedServices = [];

        for (const service of services) {
            const approvedAdmin = await AdmnColl.findOne(
                {
                    Verified: true,
                    "Services.ServiceId": new ObjectId(service._id)
                },
                {
                    projection: { _id: 1 }
                }
            );

            if (approvedAdmin) {
                approvedServices.push(service);
            }
        }

        const serviceCards = approvedServices.map(service => ({
            img: service.bannerUrl,
            serviceName: service.ServiceName,
            serviceType: service.Type,
            Desc: service.about,
            ratingData: service.ratingData || [],
            id: service._id
        }));

        res.json({
            success: true,
            serviceCards,
            message: "Alhumdulilah, Data Fetched ......"
        });

    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

// Getting School Whole data
export const GettingServiceWholeData = async (req, res) => {
    try {
        const adminVerified = await AdmnColl.findOne(
            { "Services.ServiceId": new ObjectId(req.body.SchoolId) },
            { projection: { Verified: 1, Role: 1 } }
        );

        if (adminVerified?.Role === "ADMIN" && adminVerified?.Verified) {
            let [serviceData] = await schoolColl
                .find({ _id: new ObjectId(req.body.SchoolId), Status: true })
                .toArray();

            if (serviceData) {
                res.json({
                    success: true,
                    serviceData: {
                        id: serviceData._id,
                        bannerUrl: serviceData.bannerUrl,
                        type: serviceData.ServiceType,
                        name: serviceData.ServiceName,
                        tagline: serviceData.tagline,
                        about: serviceData.about,
                        aboutImage: serviceData.aboutImgUrl,
                        staff: serviceData.staff,
                        events: [serviceData.eventData],
                        quickInfo: {
                            basicProfile: {
                                name: serviceData.ServiceName,
                                location: serviceData.location || "Unknown",
                                type: serviceData.Type || "Private"
                            },
                            administration: serviceData.administration,
                            studentsStaff: serviceData.StaffAndStudent,
                            facilities: serviceData.facilities,
                            resultsPerformance: serviceData.ResultAndPerformance,
                            timings: serviceData.timings,
                            extraActivities: serviceData.extraActivities,
                            parentReviews: serviceData.Reviews
                        },
                        fee: serviceData.feeData,
                        gallery: serviceData.gallery,
                        ratingData: serviceData.ratingData
                    },
                    message: "Alhumdulilah Data Fetched ......"
                });
            } else {
                res.json({
                    success: false,
                    serviceData: null,
                    message: "Service data not found"
                });
            }
        } else {
            res.json({
                success: false,
                serviceData: null,
                message: "Service is under process"
            });
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

// Changing the School Rating 
export const ChangeRatingData = async (req, res) => {
    try {
        let { ratingData, id } = req.body;
        const ip = (req.socket?.remoteAddress || req.ip).replace("::ffff:", "");
        let SchoolDta = await schoolColl.findOne({ _id: new ObjectId(id) });
        let OldRatedIPsArr = SchoolDta.RatedIPs || [];
        if (OldRatedIPsArr.includes(ip)) {
            return res.json({
                success: false,
                message: "Your rating is added already"
            });
        }
        OldRatedIPsArr.push(ip);
        await schoolColl.updateOne(
            { _id: new ObjectId(id) },
            { $set: { RatedIPs: OldRatedIPsArr, ratingData } }
        );
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Adding new request of education catagory services:
export const NewEduCataServiceRequest = async (req, res) => {
    try {
        let RequestExsist = await NRs.findOne({ email: req.body.email, fullname: req.body.fullname, phonenumber: req.body.phonenumber, IDCard: req.body.IDCard }, { projection: { password: 1 } });
        let sameSP = false;
        if (RequestExsist) {
            sameSP = await argon2.verify(RequestExsist.password, req.body.password);
        }
        if (sameSP) {
            res.json({ success: false, message: "Request already exsist." });
        }

        if (!RequestExsist) {
            let hashpassword = await argon2.hash(req.body.password);
            req.body.password = hashpassword;
            req.body.Status = true;
            req.body.catagory = "Education";
            req.body.type = "SCHOOL";
            await NRs.insertOne(req.body);
            res.json({ success: true });
        }

    } catch (error) {
        res.json({ success: false, message: "something went wrong." })
    }
}