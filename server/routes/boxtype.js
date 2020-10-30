const { BoxType, validate } = require("../models/BoxType");
const express = require("express");
const router = express.Router();
const multer=require('multer');
const upload=multer({dest:"uploads/"});
const fs=require('fs');

router.get("/", async (req, res) => {
    console.log('hello get');
    const boxtypes = await BoxType.find();
    console.log('boxes', boxtypes);
    res.send(boxtypes);
});

router.get("/:type", async (req, res) => {
    var query={type:req.params.type };
    const boxtype = await BoxType.findOne(query);
    console.log('get method with type', req.params.type,  boxtype);
    res.send(boxtype);
});

//this method is uaed to send new items into the specific box type
// router.put("/:type", async (req, res) => {//param to be sent in the url and item in the as another parameter
//     var query={type:req.params.type };

//     const boxtype = await BoxType.find(query);//to check with /without await
//     if(!boxtype)
//         throw err;
//     console.log(boxtype);
// //check for existing item with this id//if same item, it comes out
//     BoxType.update(//to check whether update from this is working
//           { "type": req.params.type },
//           {
//               $push: {
//                   predefineditems: req.body.item //req.body.item to be coded in front end
//               }
//           }
//       );  
// });





//increase quantity
// router.put("/:type", async (req, res) => {
//     var query={type:req.params.type };

//     const boxtype = await BoxType.find(query);//to check with /without await
//     if(!boxtype)
//         throw err;
//     console.log(boxtype);
// //check for existing item with this id//if same item, it comes out
//     BoxType.updateOne(
//           { "type": req.params.type,  },
//           {"predefineditems.id":req.body.id},//to check with _id
//           {
//               $inc: {
//                   'predefineditems.$[].quantity': req.body.quantity//req.body.item to be coded in front end
//               }
//           }
//       );  
// });







router.post("/", async (req, res) => {//param to be sent in the url and item in the as another parameter
    console.log('hellopost', req.body);
   const { error } = validate(req.body);
   console.log(' validate called boxtype', req.body);
   if (error){ 
       console.log('error', error); 
   return res.status(400).send("invalid record"); }
   let boxtype = new BoxType(req.body);
   try{
     boxtype2 = await boxtype.save();
       res.send(boxtype2);
   }
  catch(err){
      console.log('error', err);
  }  
});

router.put("/:type", async (req, res) => {
    var query={type:req.params.type };
    console.log('server put boxtype', query, req.params.type, req.body);
    const boxtype= await BoxType.findOne(query);//to check with /without await
    //console.log('save boxcart', boxcart);
    //check for existing item with this id//if same item, it comes out
    if (!boxtype)
        return res
            .status(404)
            .send("The boxtype with the given type was not found");

     const { error } = validate(req.body);
        
     if (error)
     {
        console.log('err:', error)
        return res.status(400).send("invalid record");
     } 

    collection = await BoxType.updateOne(
        query,// {userid:userid},
        req.body,
        { new: true }
        );
        console.log('hi8', collection);
        res.send(collection);  
      }
    );  

    /*
router.delete("/", async (req, res) => {
    type=req.params.type;
    console.log('in remove with type only' , type);
    var query={type:type };

    const boxtype = await BoxType.find(query);//to check with /without await
    if(!boxtype)
        throw err;
    console.log(boxtype);

    BoxType.update(
          { "type": type },
          {
              $pull: {
                  predefineditems: req.body.items //req.body.item to be coded in front end
              }
          }
      );  
        });
 router.delete("/:type/:itemid", async (req, res) => {
        type=req.params.type;
        itemid=req.params.itemid;
        console.log('in remove with item', type, itemid);
        
        var query={type:type };
    
        const boxtype = await BoxType.findOne(query);//to check with /without await
        if(!boxtype)
            throw err;
        console.log(boxtype);
    
        BoxType.update(
              { "type": type },
              {
                  $pull: {
                      predefineditems: itemid //req.body.item to be coded in front end
                  }
              }
          );  
})*/


module.exports = router
