import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    ServiceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    ServiceName: {
        type: String,
        required: true
    },

    ServiceType: {
        type: String,
        required: true
    },

    ServiceStatus: {
        type: Boolean,
        required: true
    },

    // PaymentPlan: {
    //     type: String,
    //     required: true
    // },

    // trialStartDate: Date,
    // trialEndDate: Date,
    // isActive: Boolean,
    // SubscriptionStatus: String,
    // PlanStartDate: Date,
    // PlanExpiry: Date
});

const AdminSchema = new mongoose.Schema({

    AdminName: {
        type: String,
        required: true
    },

    AdminEmail: {
        type: String,
        required: true,
        unique: true
    },

    IDCard: String,

    location: String,

    whatsappnumber: String,
    phonenumber: String,

    AdminPassword: {
        type: String,
        required: true
    },

    Role: {
        type: String,
        default: "ADMIN"
    },

    Verified: {
        type: Boolean,
        default: false
    },

    Status: Boolean,

    PaymentPlan: {
        type: String,
        enum: ["FREE", "BASIC", "PREMIUM", "ENTERPRISE"],
        default: "FREE"
    },

    trialStartDate: { type: Date, default: null },
    trialEndDate: { type: Date, default: null },

    PlanStartDate: { type: Date, default: Date.now },
    PlanExpiry: { type: Date, default: null },

    SubscriptionStatus: {
        type: String,
        enum: ["Active", "Expired", "Suspended", "Trial"],
        default: "Active"
    },

    Services: [ServiceSchema],

    Managers: [Object],

    createdAt: {
        type: Date,
        default: Date.now
    }

}, {
    collection: "Admins"
});

export const Admins = mongoose.model("Admins", AdminSchema);