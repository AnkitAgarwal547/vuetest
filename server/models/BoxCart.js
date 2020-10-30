const Joi = require("joi");
const mongoose = require("mongoose");

const boxCartSchema = new mongoose.Schema({

    userid:{
        type: String,
        required:true,
        minlength:1,
        maxlength:10,
    },
   
    type: {
        type: String,
        minlength: 1,
        maxlength: 20,
        required: true
    },
    name: {
        type: String,
        minlength: 1,
        maxlength: 20,
        required: true
    },

    freeshippinglimit:{
        type:Number,
        min:40,
        max:200,

    },
    totalprice: {
        type: Number,
        min: 0,
    },
    items:{
        type:Array,
        required:false,
        minlength:0,
    }
});

const BoxCart = mongoose.model("BoxCart", boxCartSchema);

function validate(boxCart) {
    const schema = Joi.object({
        userid: Joi.string().min(1).max(20).required(),
        type:Joi.string().min(1).max(20).required(),
        name:Joi.string().min(1).max(20).required(),
        freeshippinglimit: Joi.number().min(1).max(500),
        totalprice:Joi.number().min(0).max(500),
        items: Joi.array()
    });

    return schema.validate(boxCart);
}

module.exports = { BoxCart, validate };