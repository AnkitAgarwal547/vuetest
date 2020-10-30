const { string } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
    itemid: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    
    },
    images:{
        type:Array,
        require:false
    },
    imageFiles:{
        type:Array,
        required:false
    },
    rating:{
        type:Number,
        required:false
    }
   
});

const Item = mongoose.model("Items", itemSchema);

function validate(Item) {

    const schema = Joi.object({
        itemid:   Joi.string().required(),
        name: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        images: Joi.array(),
        imageFiles: Joi.array(),
        rating:Joi.number()
    });

    return schema.validate(Item);
}

module.exports = { Item, validate };
