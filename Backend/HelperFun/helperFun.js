import JWT from "jsonwebtoken"

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
        FOODS: db.collection(process.env.FOOD_C || "Food"),
        ORDERS: db.collection(process.env.ORDERS_C || "Orders"),
    };
};