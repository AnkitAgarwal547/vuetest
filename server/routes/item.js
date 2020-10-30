const { Item, validate } = require("../models/Item.js");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
 
router.get("/", async (req, res) => {
    console.log('server item get');
    const item = await Item.find();
    console.log(item);
    res.send(item);
});

router.get("/:itemid", async (req, res) => {
    var query={itemid:req.params.itemid};
    console.log('hello get itemid', req.params.itemid, query);
     const item = await Item.findOne(query);
    console.log('hello get item', item);
     res.send(item);
 });
router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error){
    return res.status(400).send("invalid record"); }

    let item = new Item(req.body);
    try{
        item2 = await item.save();
        res.send(item2);
    }
   catch(err){
       console.log('error', err);
   
   }
});

router.put("/:itemid",  async (req, res) => {
    const id=req.params.itemid;
    let item = await Item.findOne({itemid:id});
    if (!item)
        return res
            .status(404)
            .send("The item with the given ID was not found");

     const { error } = validate(req.body);

     if (error) {
         console.log("error occured: ", error)
         return res.status(400).send("invalid record");
     }

    collection = await Item.findOneAndUpdate(
       {itemid:id},
        req.body,
        { new: true }
        );
        console.log('hi8', collection);
     res.send(collection);  
});

router.delete("/:itemid", async (req, res) => {

    const id=req.params.itemid;
            item = await Item.findOneAndDelete({itemid:id});
            res.send(item);
});

module.exports = router;


