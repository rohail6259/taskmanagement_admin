const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const { User } = require("../model/users");

router.get("/", auth, async (req, res) => {
    const user = await User.find({ _id: req.user._id });
    if (!user)
        return res
            .status(400)
            .send({ code: 400, message: "User ID not found!" });
    res.send(user[0]);
});

module.exports = router;
