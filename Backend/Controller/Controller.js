import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient(process.env.DB_URL);
const db = client.db("DSCH");
import argon2 from "argon2";
const schoolColl = db.collection(process.env.S_C);
const foodColl = db.collection(process.env.FOOD_C);
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

// Getting all Food Card data
export const GettingFoodCrdDta = async (req, res) => {
    try {
        const services = await foodColl.find(
            { Status: true },
            {
                projection: {
                    ServiceName: 1,
                    Type: 1,
                    aboutImage: 1,
                    ratingData: 1,
                    about: 1,
                    cuisine: 1,
                    priceRange: 1,
                    deliveryAvailable: 1
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
            img: service.aboutImage || "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
            InstName: service.ServiceName,
            serviceType: service.Type,
            Desc: service.about,
            rating: service.ratingData ? (service.ratingData.reduce((a, b) => a + b, 0) / service.ratingData.length).toFixed(1) : "4.5",
            id: service._id,
            cuisine: service.cuisine || "Multi-cuisine",
            priceRange: service.priceRange || "$$",
            deliveryAvailable: service.deliveryAvailable || true
        }));

        res.json({
            success: true,
            serviceCards,
            message: "Alhumdulilah, Food Data Fetched ......"
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

export const GettingFoodWholeData = async (req, res) => {
    try {
        const { FoodId } = req.body;
        if (!FoodId || FoodId.length !== 24) {
            return res.json({ success: false, message: "Invalid Food ID provided." });
        }

        const adminVerified = await AdmnColl.findOne(
            { "Services.ServiceId": new ObjectId(FoodId) },
            { projection: { Verified: 1, Role: 1 } }
        );

        if (adminVerified?.Role === "ADMIN" && adminVerified?.Verified) {
            let [serviceData] = await foodColl
                .find({ _id: new ObjectId(FoodId), Status: true })
                .toArray();

            if (serviceData) {
                res.json({
                    success: true,
                    serviceData: {
                        id: serviceData._id,
                        bannerUrl: serviceData.bannerUrl || serviceData.aboutImage,
                        type: serviceData.Type,
                        name: serviceData.ServiceName || serviceData.name,
                        tagline: serviceData.tagline || "Fresh & Delicious",
                        about: serviceData.about,
                        aboutImage: serviceData.aboutImage,
                        menu: serviceData.menu || [],
                        categorizedMenu: serviceData.categorizedMenu || [],
                        quickInfo: {
                            basicProfile: {
                                name: serviceData.ServiceName || serviceData.name,
                                location: serviceData.quickInfo?.basicProfile?.location || serviceData.location || "Kohat, KPK",
                                type: serviceData.Type || "Restaurant"
                            },
                            timings: serviceData.timings || serviceData.quickInfo?.timings || { opening: "10:00 AM - 11:00 PM" },
                            facilities: serviceData.quickInfo?.facilities || serviceData.facilities || ["Dine-in", "Takeaway", "Delivery"]
                        },
                        contact: serviceData.contact || { phone: "N/A", email: "N/A" },
                        deliveryAvailability: serviceData.deliveryAvailability || "Available",
                        ratingData: serviceData.ratingData || [],
                        detailedReviews: serviceData.detailedReviews || [],
                        promotions: serviceData.promotions || [],
                        reportCount: serviceData.reportCount || 0,
                        reportStatus: serviceData.reportStatus || "Active",
                        reports: serviceData.reports || [],
                    },
                    message: "Alhumdulilah Food Data Fetched ......"
                });
            } else {
                res.json({
                    success: false,
                    serviceData: null,
                    message: "Food service data not found"
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

export const ReportServiceLanding = async (req, res) => {
    try {
        const { id, reason, details, reporterName } = req.body;
        const ip = (req.socket?.remoteAddress || req.ip).replace("::ffff:", "");

        const report = {
            id: new ObjectId(),
            reporterName: reporterName || "Anonymous",
            reason,
            details,
            ip,
            timestamp: new Date(),
            status: "Pending"
        };

        let food = await foodColl.findOne({ _id: new ObjectId(id) });
        if (food) {
            await foodColl.updateOne(
                { _id: new ObjectId(id) },
                {
                    $push: { reports: report },
                    $inc: { reportCount: 1 }
                }
            );
            return res.json({ success: true, message: "Report submitted successfully. We will investigate." });
        }
        return res.json({ success: false, message: "Service not found." });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Changing the Service Rating and adding Reviews
export const ChangeRatingData = async (req, res) => {
    try {
        let { ratingData, id } = req.body;
        const ip = (req.socket?.remoteAddress || req.ip).replace("::ffff:", "");

        // Original School Flow: If it's a school, use $set
        let school = await schoolColl.findOne({ _id: new ObjectId(id) });
        if (school) {
            let OldRatedIPsArr = school.RatedIPs || [];
            if (OldRatedIPsArr.includes(ip)) {
                return res.json({ success: false, message: "Your rating is added already" });
            }
            OldRatedIPsArr.push(ip);
            await schoolColl.updateOne(
                { _id: new ObjectId(id) },
                { $set: { RatedIPs: OldRatedIPsArr, ratingData } }
            );
            return res.json({ success: true, message: "Rating submitted successfully!" });
        }

        // New Food Flow: If it's food, use $push for multi-reviews
        let food = await foodColl.findOne({ _id: new ObjectId(id) });
        if (food) {
            let OldRatedIPsArr = food.RatedIPs || [];
            if (OldRatedIPsArr.includes(ip)) {
                return res.json({ success: false, message: "Your review is added already." });
            }
            OldRatedIPsArr.push(ip);

            const updateQuery = {
                $set: { RatedIPs: OldRatedIPsArr },
                $push: { ratingData: ratingData }
            };

            // If rating is bad (1 or 2), increment report count
            if (ratingData.rating <= 2) {
                updateQuery.$inc = { reportCount: 1 };
            }

            await foodColl.updateOne(
                { _id: new ObjectId(id) },
                updateQuery
            );
            return res.json({ success: true, message: "Review submitted successfully!" });
        }

        return res.json({ success: false, message: "Service not found." });
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
            return res.json({ success: false, message: "Request already exists." });
        }

        if (!RequestExsist) {
            let hashpassword = await argon2.hash(req.body.password);
            req.body.password = hashpassword;
            req.body.Status = true;
            req.body.catagory = req.body.catagory || "Education";
            req.body.type = req.body.type || "SCHOOL";
            await NRs.insertOne(req.body);
            return res.json({ success: true });
        }

        // If request exists but password doesn't match
        return res.json({ success: false, message: "A request with these details already exists." });

    } catch (error) {
        console.error("NewEduCataServiceRequest error:", error);
        return res.json({ success: false, message: "Something went wrong." })
    }
}