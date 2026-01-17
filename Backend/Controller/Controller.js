import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient(process.env.DB_URL);
const db = client.db("DSCH");
const schoolColl = db.collection(process.env.S_C);
const AdmnColl = db.collection(process.env.A_C);

// Getting School Crds Data
export const GettingSchlCrdDta = async (req, res) => {
    try {
        let [SchoolDta] = await schoolColl.find({ InstType: "School" }, { projection: { InstName: 1, bannerUrl: 1, ratingData: 1, about: 1 } }).toArray();
        res.json({
            success: true,
            SchlCrdData: { img: SchoolDta.bannerUrl, InstName: SchoolDta.InstName, Desc: SchoolDta.about, ratingData: SchoolDta.ratingData, id: SchoolDta._id },
            message: "Alhumdulilah Data Fetched ......"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Getting School Whole data
export const GettingSchlWholeDta = async (req, res) => {
    try {
        let [SchoolDta] = await schoolColl.find({ _id: new ObjectId(req.body.SchoolId) }).toArray();
        res.json({
            success: true,
            SchlData: { id: SchoolDta._id, bannerUrl: SchoolDta.bannerUrl, type: SchoolDta.InstType, name: SchoolDta.InstName, tagline: SchoolDta.tagline, about: SchoolDta.about, aboutImage: SchoolDta.aboutImgUrl, staff: SchoolDta.staff, events: SchoolDta.eventData, quickInfo: { basicProfile: { name: SchoolDta.InstName, location: "Kohat", type: "private" }, administration: SchoolDta.administration, studentsStaff: SchoolDta.StaffAndStudent, facilities: SchoolDta.facilities, resultsPerformance: SchoolDta.ResultAndPerformance, timings: SchoolDta.timings, extraActivities: SchoolDta.extraActivities, parentReviews: SchoolDta.Reviews }, fee: SchoolDta.feeData, gallery: SchoolDta.gallery, ratingData: SchoolDta.ratingData },
            message: "Alhumdulilah Data Fetched ......"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

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
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
