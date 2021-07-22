const mongoose = require("mongoose");
require("dotenv").config();

module.exports = function () {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    };

    mongoose.set("useCreateIndex", true);

    mongoose
        .connect(process.env.CONNECTION_STRING, options)
        .then(() => console.log("Connected to db..."));
};
