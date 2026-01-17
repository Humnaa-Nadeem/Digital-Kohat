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
    // Remove query string
    const urlWithoutQuery = imageUrl.split("?")[0];

    // Extract path after "/upload/"
    let pathWithExt = urlWithoutQuery.split("/upload/")[1];
    if (!pathWithExt) throw new Error("Invalid Cloudinary URL");

    // Remove version prefix if exists (v123456/)
    pathWithExt = pathWithExt.replace(/^v\d+\//, "");

    // Remove file extension
    const public_id = pathWithExt.replace(/\.[^/.]+$/, "");

    return public_id;
}
