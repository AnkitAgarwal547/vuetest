const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,
        trim: true,
        unique: true,
    },

    parent: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },

    children: [],
});

const Category = mongoose.model("Category", categorySchema);

function validate(category) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(20).required(),
        parent: Joi.objectId(),
        children: Joi.array(),
    });

    return schema.validate(category);
}

module.exports = { Category, validate };
