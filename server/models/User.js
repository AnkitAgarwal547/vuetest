const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 10,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, isAdmin: this.isAdmin },
        config.get("jwtPrivateKey")
    );
    return token; 
};

const User = mongoose.model("User", userSchema);

function validate(user) {
    const schema = Joi.object({
        id: Joi.string().min(1).max(10).required(),
        username: Joi.string().min(3).max(10).required(),
        password: Joi.string().min(5).max(1024).required(),
        isAdmin: Joi.boolean(),
    });

    return schema.validate(user);
}

module.exports = { User, validate };
