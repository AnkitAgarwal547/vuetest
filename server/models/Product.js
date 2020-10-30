const Joi = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    images: {
        type: [String],
        required: true,
    },
});

const Product = mongoose.model("Product", productSchema);

function validate(product) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(20).required(),
        category: Joi.objectId().required(),
        price: Joi.number().min(0).required(),
        rating: Joi.number().min(0).max(5).required(),
        images: Joi.array().required(),
    });

    return schema.validate(product);
}

module.exports = { Product, validate };
