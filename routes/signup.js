const express = require("express");
const { User } = require("../model/users");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user)
        return res
            .status(400)
            .send({ code: 400, message: "User already exists!" });

    user = new User(_.pick(req.body, ["fullName", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try {
        await user.save();
        const token = jwt.sign(
            { _id: user._id, email: req.body.email },
            process.env.JWT_PRIVATE_KEY,
            {
                algorithm: "HS256",
            }
        );
        res.header("x-auth-token", token).send(_.pick(user, ["_id", "email"]));
    } catch (ex) {
        for (i in ex.errors)
            console.log("User Post Error: ", ex.errors[i].message);

        res.status(500).send("Oops! Something went wrong!", ex.errors);
    }
});

module.exports = router;
