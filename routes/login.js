const express = require("express");
const router = express.Router();
const { User } = require("../model/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send({ code: 400, message: "User not found!" });

    bcrypt.compare(req.body.password, user.password, (err, _res) => {
        if (!_res || err) {
            res.status(400).send({
                code: 400,
                message: "email or Password do not match!",
            });
        } else {
            const accessToken = jwt.sign(
                {
                    _id: user._id,
                    isAuthValid: true,
                    email: user.email,
                    fullName: user.fullName,
                },
                process.env.JWT_PRIVATE_KEY
            );
            res.header("x-auth-token", accessToken).send({
                _id: user._id,
                isAuthValid: true,
                email: user.email,
                fullName: user.fullName,
            });
        }
    });
});

module.exports = router;
