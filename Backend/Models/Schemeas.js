import mongoose from "mongoose";

// Schema for dynamic roles
const DynamicRoleSchema = new mongoose.Schema({
    key: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string" && v.trim().length > 0,
            message: "Dynamic role key must be a non-empty string"
        }
    },
    label: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string" && v.trim().length > 0,
            message: "Dynamic role label must be a non-empty string"
        }
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
        default: "",
        validate: {
            validator: v => typeof v === "string",
            message: "Dynamic role value must be a string"
        }
    }
}, { _id: true });

// Basic info Schema
export const BasicInfoSchema = new mongoose.Schema({
    tagline: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string",
            message: "Invalid data is entered for tagline."
        }
    },
    about: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string",
            message: "Invalid data is entered for about us section."
        }
    },
    bannerUrl: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string",
            message: "Invalid banner Image uploaded."
        }
    },
    aboutImgUrl: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string",
            message: "Invalid About Us Image uploaded."
        }
    }
}, { id: true });

// Administration schema
export const AdministrationSchema = new mongoose.Schema({
    principal: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string" && v.trim().length > 0,
            message: "Principal must be a non-empty string"
        }
    },
    vice_principal: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string" && v.trim().length > 0,
            message: "Vice Principal must be a non-empty string"
        }
    },
    managing_director: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string" && v.trim().length > 0,
            message: "Managing Director must be a non-empty string"
        }
    },
    others: {
        type: [DynamicRoleSchema],
        default: []
    }
}, { _id: false });

// Timing Schema
export const TimingSchema = new mongoose.Schema({
    opening: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string",
            message: "Opening time must be a string"
        }
    },
    closing: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string",
            message: "Closing time must be a string"
        }
    },
    break: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string",
            message: "Break time must be a string"
        }
    },
    office: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string",
            message: "Office time must be a string"
        }
    }
}, { _id: false });

// Facilities Schema
export const FacilitiesSchema = new mongoose.Schema({
    facilities: {
        type: [mongoose.Schema.Types.Mixed],
        required: true,
        validate: {
            validator: arr =>
                Array.isArray(arr) &&
                arr.length > 0 &&
                arr.every(v => typeof v === "string"),
            message: "Facilities must be a non-empty array of strings"
        }
    }
}, { _id: false });

// Schema for staff object:
const StaffObjSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string",
            message: "Invalid Staff Name."
        }
    },
    description: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string",
            message: "Invalid description for staff."
        }
    },
    image: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string",
            message: "Invalid image."
        }
    }
}, { _id: true });

// Staff Schema:
export const StaffSchema = new mongoose.Schema({
    finalStaff: {
        type: [StaffObjSchema],
        default: []
    }
}, { _id: false });

// Staff and Student data Schema:
export const StaffAndStudentSchema = new mongoose.Schema({
    Total_Students: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string" && v.trim().length > 0,
            message: "Total_Students must be a non-empty string"
        }
    },
    Total_Teachers: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string" && v.trim().length > 0,
            message: "Total_Teachers must be a non-empty string"
        }
    },
    Qualification: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string" && v.trim().length > 0,
            message: "Qualification must be a non-empty string"
        }
    },
    Ratio: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string" && v.trim().length > 0,
            message: "Ratio must be a non-empty string"
        }
    },
    Medium: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string" && v.trim().length > 0,
            message: "Medium must be a non-empty string"
        }
    },
    others: {
        type: [DynamicRoleSchema],
        default: []
    }
}, { _id: false });

// Extra Activitiees
export const ExtraActivitiesSchema = new mongoose.Schema({
    extraActivities: {
        type: [mongoose.Schema.Types.Mixed],
        required: true,
        validate: {
            validator: arr =>
                Array.isArray(arr) &&
                arr.length > 0 &&
                arr.every(v => typeof v === "string"),
            message: "Select atleast three extra activities"
        }
    }
}, { id: false });

// Result and Performance:
export const ResultAndPerformanceSchema = new mongoose.Schema({
    Pass_Precentage: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string" && v.trim().length > 0,
            message: "Pass_Precentage must be a non-empty string"
        }
    },
    Top_Achievers: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string" && v.trim().length > 0,
            message: "Top_Achievers must be a non-empty string"
        }
    },
    Board_Result: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string" && v.trim().length > 0,
            message: "Board_Result must be a non-empty string"
        }
    },
    MDCAT_Performance: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string" && v.trim().length > 0,
            message: "MDCAT_Performance must be a non-empty string"
        }
    },
    others: {
        type: [DynamicRoleSchema],
        default: []
    }
}, { _id: false });


// NEW Event data
export const NewEventDataSchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string" && v.trim().length > 0,
            message: "Title must be a non-empty string"
        }
    },
    catagory: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string" && v.trim().length > 0,
            message: "Catagory must be a non-empty string"
        }
    },
    location: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string" && v.trim().length > 0,
            message: "Location must be a non-empty string"
        }
    },
    time: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: v => typeof v === "string" && v.trim().length > 0,
            message: "Time must be a non-empty string"
        }
    }
}, { _id: false });

// FEE TAB DATA
export const FeeItemSchema = new mongoose.Schema({
    Class: {
        type: Number,
        required: true
    },
    MonthlyFee: {
        type: Number,
        required: true
    },
    AnnualFee: {
        type: Number,
        required: true
    },
    AdmissionFee: {
        type: Number,
        required: true
    }
});

export const FeesSchema = new mongoose.Schema({
    feeData: {
        type: [FeeItemSchema], // array of fee items
        required: true,
        validate: {
            validator: function (v) {
                return Array.isArray(v) && v.length > 0;
            },
            message: "feeData must be a non-empty array"
        }
    }
});

// Review Schema
export const ReviewSchema = new mongoose.Schema({
    Reviews: {
        type: [mongoose.Schema.Types.Mixed],
        required: true,
        validate: {
            validator: arr =>
                Array.isArray(arr) &&
                arr.length > 0 &&
                arr.every(v => typeof v === "string"),
            message: "Invalid Data"
        }
    }
}, { _id: false });

// Gallery Schema
export const GallerySchema = new mongoose.Schema({
    finalGalleryImages: {
        type: [String],
        default: [],
        validate: {
            validator: arr =>
                Array.isArray(arr) &&
                arr.every(v => typeof v === "string"),
            message: "Invalid Data"
        }
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
