const Joi = require("joi");
const mongoose = require("mongoose");

const boxTypeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20,
        trim: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20,
    },

    freeshippinglimit:{
        type:Number,
        required:true,
        min:50,
        max:200,

    },
    predefineditems:
    {
        type:Array,
        required:false,
        minlength:0,
        
    },
    totalprice:{
        type:Number,
        default:0,
        required:false
    }
});

const BoxType = mongoose.model("BoxType", boxTypeSchema);

function validate(boxType) {

    console.log(' validate boxtype', boxType);
    const schema = Joi.object({
        type: Joi.string().min(1).max(20).required(),
        name: Joi.string().min(1).max(20).required(),
        freeshippinglimit: Joi.number().required(),
        predefineditems: Joi.array(),
        totalprice: Joi.number()

    });

    return schema.validate(boxType);
}

module.exports = { BoxType, validate };
