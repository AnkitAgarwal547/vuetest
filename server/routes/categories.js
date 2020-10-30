const { Category, validate } = require("../models/BoxType");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const categories = await Category.find({ parent: null }).sort("title");
    res.send(categories);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let category, parent;

    if (req.body.parent) {
        parent = await Category.findById(req.body.parent);
        if (!parent)
            return res
                .status(404)
                .send("The parent category with the given ID was not found.");

        category = new Category(req.body);
        category = await category.save();

        parent.children.push(category);
        await parent.save();

        while (parent.parent) {
            let category = parent;
            parent = await Category.findById(category.parent);
            let index = parent.children.findIndex(c => c._id === category._id);
            parent.children.splice(index, 1, category);
            await parent.save();
        }
    } else {
        category = new Category(req.body);
        category = await category.save();
    }

    res.send(category);
});

router.put("/:id", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let category, parent;

    if (req.body.parent) {
        parent = await Category.findById(req.body.parent);
        if (!parent)
            return res
                .status(404)
                .send("The parent category with the given ID was not found.");

        category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!category)
            return res
                .status(404)
                .send("The category with the given ID was not found.");

        let index = parent.children.findIndex(c => c._id === category._id);
        parent.children.splice(index, 1, category);
        await parent.save();

        while (parent.parent) {
            let category = parent;
            parent = await Category.findById(category.parent);
            let index = parent.children.findIndex(c => c._id === category._id);
            parent.children.splice(index, 1, category);
            await parent.save();
        }
    } else {
        category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!category)
            return res
                .status(400)
                .send("The category with the given ID was not found.");
    }

    res.send(category);
});

router.delete("/:id", async (req, res) => {
    let category = await Category.findById(req.params.id);
    if (!category)
        return res
            .status(400)
            .send("The category with the given ID was not found.");

    if (category.children.length)
        return res.status(400).send("Delete child categories first.");

    category = await Category.findByIdAndDelete(req.params.id);

    if (category.parent) {
        let parent = await Category.findById(category.parent);
        const index = parent.children.findIndex(c => c._id === category._id);
        parent.children.splice(index, 1);
        await parent.save();

        while (parent.parent) {
            let category = parent;
            parent = await Category.findById(category.parent);
            let index = parent.children.findIndex(c => c._id === category._id);
            parent.children.splice(index, 1, category);
            await parent.save();
        }
    }

    res.send(category);
});

module.exports = router;
