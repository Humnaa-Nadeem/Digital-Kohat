import mongoose from "mongoose";

/* =========================================================
   🔹 Reusable Small Schemas
========================================================= */

const KeyValueSchema = new mongoose.Schema({
    key: { type: String, trim: true },
    value: { type: String, trim: true },
    label: { type: String, trim: true }
}, { _id: false });

/* =========================================================
   🔹 Basic Info
========================================================= */

const BasicInfoSchema = new mongoose.Schema({

    tagline: {
        type: String,
        trim: true,
        default: ""
    },

    about: {
        type: String,
        trim: true,
        default: ""
    },

    bannerUrl: {
        type: String,
        trim: true,
        default: ""
    },

    aboutImgUrl: {
        type: String,
        trim: true,
        default: ""
    }

}, { _id: false });

/* =========================================================
   🔹 Administration
========================================================= */

const AdministrationSchema = new mongoose.Schema({
    principal: { type: String, trim: true },
    vice_principal: { type: String, trim: true },
    managing_director: { type: String, trim: true },
    others: { type: [KeyValueSchema], default: [] }
}, { _id: false });

/* =========================================================
   🔹 Timings
========================================================= */

const TimingsSchema = new mongoose.Schema({
    opening: String,
    closing: String,
    break: String,
    office: String
}, { _id: false });

/* =========================================================
   🔹 Staff
========================================================= */

const StaffSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        default: ""
    },

    description: {
        type: String,
        default: ""
    },

    image: {
        type: String,
        default: ""
    }

}, { _id: true });

/* =========================================================
   🔹 Staff & Student
========================================================= */

const StaffAndStudentSchema = new mongoose.Schema({
    Total_Students: String,
    Total_Teachers: String,
    Qualification: String,
    Ratio: String,
    Medium: String,
    others: { type: [KeyValueSchema], default: [] }
}, { _id: false });

/* =========================================================
   🔹 Result & Performance
========================================================= */

const ResultAndPerformanceSchema = new mongoose.Schema({
    Pass_Precentage: String,
    Top_Achievers: String,
    Board_Result: String,
    MDCAT_Performance: String,
    others: { type: [KeyValueSchema], default: [] }
}, { _id: false });

/* =========================================================
   🔹 Events
========================================================= */

const EventSchema = new mongoose.Schema({
    title: String,
    catagory: String,
    location: String,
    time: String,
    Audience: String
}, { _id: true });

/* =========================================================
   🔹 Fee Structure
========================================================= */

const FeeSchema = new mongoose.Schema({
    Class: Number,
    MonthlyFee: Number,
    AnnualFee: Number,
    AdmissionFee: Number
}, { _id: true });

/* =========================================================
   🔹 Rating System
========================================================= */

const RatingSchema = new mongoose.Schema({

    totalStars: {
        type: Number,
        default: 0
    },

    totalReviews: {
        type: Number,
        default: 0
    },

    average: {
        type: Number,
        default: 0
    },

    // userId → rating mapping
    userRatings: {
        type: Map,
        of: Number,
        default: {}
    }

}, { _id: false });

/* =========================================================
   🔹 Payment Gateway
========================================================= */

const PaymentGatewaySchema = new mongoose.Schema({
    easypaisa: {
        accountTitle: String,
        accountNumber: String
    },
    jazzcash: {
        accountTitle: String,
        accountNumber: String
    },
    bank: {
        bankName: String,
        accountTitle: String,
        accountNumber: String,
        iban: String
    }
}, { _id: false });

// Super Admin Schema
export const SuperAdminSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v =>
                typeof v === "string" && v.trim().length > 0,
            message: "SuperAdmin name must be a non-empty string"
        }
    },

    email: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        unique: true,
        validate: {
            validator: v =>
                typeof v === "string" &&
                /^\S+@\S+\.\S+$/.test(v),
            message: "Invalid email address"
        }
    },

    passwordHash: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v =>
                typeof v === "string" && v.length > 20,
            message: "Invalid password hash"
        }
    },

    role: {
        type: mongoose.Schema.Types.Mixed,
        default: "SUPER_ADMIN",
        validate: {
            validator: v => v === "SUPER_ADMIN",
            message: "Role must be SUPER_ADMIN"
        }
    },

    status: {
        type: mongoose.Schema.Types.Mixed,
        default: "Active",
        validate: {
            validator: v =>
                ["Active", "Blocked"].includes(v),
            message: "Invalid SuperAdmin status"
        }
    },

    lastLogin: {
        type: Date,
        default: null
    },

    passwordChangedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false
});
