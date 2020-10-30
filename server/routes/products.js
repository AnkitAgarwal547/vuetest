const { Product, validate } = require("../models/Product");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

router.get("/", async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

router.post("/", upload.array("imageFiles", 12), async (req, res) => {
    if (!req.files.length) return res.status(400).send("Images are required.");
    req.body.images = [];
    req.files.forEach((file, i) => {
        req.body.images[i] = file.path;
    });

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let product = new Product(req.body);
    product = await product.save();

    res.send(product);
});

router.put("/:id", upload.single("collectionImage"), async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product)
        return res
            .status(404)
            .send("The product with the given ID was not found");

    if (req.file) {
        req.body.image = req.file.path;

        fs.unlink(product.image, async (err, data) => {
            if (err) {
                res.send(err.message);
            } else {
                const { error } = validate(req.body);
                if (error)
                    return res.status(400).send(error.details[0].message);

                collection = await Collection.findByIdAndUpdate(
                    collection._id,
                    req.body,
                    { new: true }
                );
                res.send(collection);
            }
        });
    } else {
        req.body.image = collection.image;
        collection = await Collection.findByIdAndUpdate(
            collection._id,
            req.body,
            { new: true }
        );
        res.send(collection);
    }
});

router.delete("/:id", async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product)
        return res
            .status(404)
            .send("The product with the given ID was not found");

    fs.unlink(product.image, async (err, data) => {
        if (err) {
            res.send(err.message);
        } else {
            product = await Product.findByIdAndDelete(req.params.id);
            res.send(product);
        }
    });
});

module.exports = router;
