import mongoose from "mongoose";

const NewServiceRequestSchema = new mongoose.Schema({

    fullname: String,
    email: String,
    whatsappnumber: String,
    AdminPassword: String,
    location: String,
    IDCard: String,
    type: String,
    language: String,
    phonenumber: String,
    catagory: String,
    specialization: String,
    qualification: String,
    licenseNumber: String,
    yearsOfExperience: Number,
    hospitalAffiliation: String,
    status: {
        type: String,
        default: "PENDING"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

}, {
    collection: "NewServiceRequest"
});

export const NewServiceRequest =
    mongoose.model("NewServiceRequest", NewServiceRequestSchema);
