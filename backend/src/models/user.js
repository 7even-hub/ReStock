const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 50,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        passwordHash: {
            type: String,
            required: true,
            select: false,
        },

        shopName: {
            type: String,
            trim: true,
            default: "",
        },

        phoneNumber: {
            type: String,
            trim: true,
            default: "",
        },

        businessType: {
            type: String,
            trim: true,
            default: "",
        },

        location: {
            type: String,
            trim: true,
            default: "",
        },

        preferredUnit: {
            type: String,
            enum: ["kg", "litres", "pieces", "mixed", ""],
            default: "",
        },

        onboardingComplete: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);