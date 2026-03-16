import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.DB_URL);
const db = client.db();
const EHomDtaC = db.collection(process.env.E_HOME_COLL);
const Schools = db.collection(process.env.S_C); // School Collection:
const Collegs = db.collection(process.env.C_C); // College Collection:
const Unis = db.collection(process.env.U_C); // Uni Collection:
const OnlineCourses = db.collection(process.env.OC_C); // Online Courses Collection:
const OnlineTrnings = db.collection(process.env.OT_C); // Online Tranings Collection:
const Tutors = db.collection(process.env.Ts_C); // Tutors Collection:


export const AddingEduHomeDta = async (req, res) => {
    await Tutors.insertMany(req.body);
    res.json({ status: true, message: "Alhumdulilah" })
}

// Getting Education Home Page Catagories Data:
export const GettingEduHomeDta = async (req, res) => {
    let EduHomeCata = await EHomDtaC.find().toArray();
    res.json({ status: true, DtaArr: EduHomeCata });
}

// Getting Schools Data:
export const GettingSchoolDta = async (req, res) => {
    let Schools_Details = await Schools.find().toArray();
    res.json({ status: true, DtaArr: Schools_Details });
}

// Getting Colleges Data:
export const GettingClgDta = async (req, res) => {
    let Colleges_Details = await Collegs.find().toArray();
    res.json({ status: true, DtaArr: Colleges_Details });
}

// Getting Universities Data:
export const GettingUniDta = async (req, res) => {
    let Uni_Details = await Unis.find().toArray();
    res.json({ status: true, DtaArr: Uni_Details });
}

// Getting OnlineCourses Data:
export const GettingOCsDta = async (req, res) => {
    let OCs_Details = await OnlineCourses.find().toArray();
    res.json({ status: true, DtaArr: OCs_Details });
}

// Getting OnlineTrainings Data:
export const GettingOTsDta = async (req, res) => {
    let OTs_Details = await OnlineTrnings.find().toArray();
    res.json({ status: true, DtaArr: OTs_Details });
}

// Getting OnlineTutors Data:
export const GettingTutrsDta = async (req, res) => {
    let Tutrs_Details = await Tutors.find().toArray();
    res.json({ status: true, DtaArr: Tutrs_Details });
}