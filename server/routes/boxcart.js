const { BoxCart, validate } = require("../models/BoxCart");
const express = require("express");
//const { Collection } = require("mongoose");
const router = express.Router();

const multer=require('multer');
const upload=multer({dest:"uploads/"});
const fs=require('fs');

router.get("/:userid", async (req, res) => {
    console.log(' hello get boxcart', req.params.userid);
    var query={userid:req.params.userid };   
   try
   {
        const boxcart = await BoxCart.findOne(query);
        console.log('boxcart', boxcart);
        res.send(boxcart);
   }
   catch(err)
   {
      console.log(err); 
   }
});

router.post("/", async (req, res) => {
    var query={userid:req.body.userid, type:req.body.type };
    console.log('server boxcart post method',query, req.body);
    const boxcart = await BoxCart.findOne(query);
    if(boxcart)
         {
             console.log("cart for this user already exists" );
             return res.status(400).send("Cart already exists");
         }
    else
        {
            const { error } = validate(req.body);
            if (error) {
                console.log('post error server', error);
                return res.status(400).send("invalid record");
            }
            let boxcart1 = new BoxCart(req.body);
            console.log('boxcart after validate', boxcart1);
            boxcart2 = await boxcart1.save();
            res.send(boxcart2);
        }
});
/*
//this method is used fro adding a new item in the users box cart
router.put("/:userid", async (req, res) => {
    var query={category:req.params.category };

    const boxcart = await BoxCart.find(query);//to check with /without await
    if(!boxcart)
        throw err;
    console.log(boxcart);
//check for existing item with this id//if same item, it comes out
    [db_name].BoxCart.update(
          { "userid": req.params.userid },
          {"items.id":req.body.item.id},//to check with _id
          {
            $push: {
                items: req.body.item //req.body.item to be coded in front end
            }
          }
      );  
});
*/

router.put("/:userid", async (req, res) => {
    var query={userid:req.params.userid };
    console.log('server put boxcart', query, req.params.userid, req.body);
    const boxcart = await BoxCart.findOne(query);
    if (!boxcart)
        return res
            .status(404)
            .send("The boxcart with the given userid was not found");

     const { error } = validate(req.body);
        
     if (error)
     {
        console.log('err:', error)
        return res.status(400).send("invalid record");
     } 

    collection = await BoxCart.updateOne(
        query,
        req.body,
        { new: true }
        );
        console.log('hi8', collection);
        res.send(collection);  
      }
    );  

router.delete("/:userid", async (req, res) => {
    var query={userid:req.params.userid };
    const boxcart = await BoxCart.findOne(query);
    console.log(boxcart);
    if (!boxcart)
        return res
            .status(404)
            .send("The boxcart with the given userid was not found");

        boxcart = await BoxCart.findOneAndDelete({userid:userid});
        res.send(boxcart );
         // );  
    });


/*

router.delete("/:userid", async (req, res) => {
    var query={userid:req.params.userid };

    var itemid=req.params.id;//to send the id of the object to be accessed using req.params, sent as params
    const boxcart = await BoxCart.find(query);//to check with /without await
    if(!boxcart)
        throw err;
    console.log(boxcart);

    /*db.yourCollectionName.update( {'_id':ObjectId("5c6ea036a0c51185aefbd14f")},
{$pull:{"yourArrayName":{"yourArrayFieldName":yourValue}}},
false,true);

  //  BoxDB.BoxCart.updateOne(
  boxcart.updateOne( 
  { "userid": query.userid },
          {
              $pull: {
                "items":{id:itemid}// req.body.item //req.body.item to be coded in front end
              }
          }, false, true
      );  
});*/

module.exports=router;