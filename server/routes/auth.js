const { User } = require("../models/User");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(req);
}

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if (!validPassword)
        return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();

    res.header("x-auth-token", token).send(
        _.pick(user, ["_id", "username", "email", "isAdmin"])
    );
});

module.exports = router;
