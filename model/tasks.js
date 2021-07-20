const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 200,
    },
});

const Tasks = new mongoose.model("tasks", tasksSchema, "tasks");

module.exports.Tasks = Tasks;
