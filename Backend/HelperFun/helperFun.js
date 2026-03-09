import JWT from "jsonwebtoken"
// import { Service } from "../Models/Schemeas.js";

// Function that help to decode the JWT token:
export const DecodeTheToken = (token) => {
    try {
        const decoded = JWT.verify(token, process.env.JWT_KEY);
        return decoded;
    } catch (error) {
        return undefined;
    }
}

// Getting the specfic url of cloudinary image:
export function getPublicIdFromUrl(imageUrl) {
    if (!imageUrl) return null;

    if (!imageUrl.includes("res.cloudinary.com")) {
        return null;
    }

    const urlWithoutQuery = imageUrl.split("?")[0];
    const splitOnUpload = urlWithoutQuery.split("/upload/");

    if (splitOnUpload.length < 2) return null;

    let pathWithExt = splitOnUpload[1];

    pathWithExt = pathWithExt.replace(/^v\d+\//, "");

    return pathWithExt.replace(/\.[^/.]+$/, "");
}

export const getCollections = (req) => {
    const db = req.app.locals.db;

    return {
        ADMINS: db.collection(process.env.A_C),
        NRs: db.collection(process.env.NSPR_C),
        SCHOOLS: db.collection(process.env.S_C),
<<<<<<< HEAD
        COLLEGE: db.collection(process.env.C_C),
        USER: db.collection(process.env.U_C)
    };
};

export const selectCollection = (req, usuallNameOfColl) => {
    const db = req.app.locals.db;
    let coll;
    switch (usuallNameOfColl) {
        case "SCHOOL":
            coll = db.collection(process.env.S_C);
            break;
        case "COLLEGE":
            coll = db.collection(process.env.C_C);
            break;
        case "New Service Request":
            coll = db.collection(process.env.NSPR_C);
            break;
        case "Admins":
            coll = db.collection(process.env.A_C);
            break;
        case "Users":
            coll = db.collection(process.env.U_C);
            break;
        case "NewAdmission":
            coll = db.collection(process.env.NAdmsns_C);
            break;
        case "AdmissionsRecord":
            coll = db.collection(process.env.AdmissionRecrd);
            break;
        case "UserOtpVerifications":
            coll = db.collection(process.env.UOV);
            break
    }
    return coll;
}



// import { Service } from "../models/service.model.js";

export const getServiceDoc = async (req) => {
    console.log("Req token = ", req.token.ServiceId);
    const { ServiceId } = req.token;
    const service = await Service.findById(ServiceId);
    if (!service) throw new Error("Service not found");
    return service;
};
=======
        FOODS: db.collection(process.env.FOOD_C || "Food"),
        ORDERS: db.collection(process.env.ORDERS_C || "Orders"),
        BUSINESSES: db.collection(process.env.BUSINESS_C || "businesses"),
        BUSINESS_PROFILES: db.collection(process.env.BUSINESS_CAT_C || "businessprofiles"),
        BUSINESS_REQS: db.collection(process.env.BUSINESS_REQ_C || "NewServiceProviderRequests"),
    };
};
>>>>>>> c7b38e2d4bb20aec1c47e941ded260bb08412089
