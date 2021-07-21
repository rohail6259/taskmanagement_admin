const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const { Tasks } = require("../model/tasks");

router.get("/", auth, async (req, res) => {
    const taskList = await Tasks.find().select("-__v");
    if (!taskList)
        return res.status(400).send({ code: 400, message: "No Task Found!" });

    res.status(200).send(taskList);
});

router.post("/", auth, async (req, res) => {
    const task = new Tasks({
        taskName: req.body.taskName,
    });

    await task.save();
    res.status(200).send({ status: 1, message: "Task Saved!" });
});

router.put("/:id", auth, async (req, res) => {
    const tasks = await Tasks.findByIdAndUpdate(
        { _id: req.params.id },
        {
            taskName: req.body.taskName,
        },
        { upsert: true }
    );
    if (!tasks)
        return res
            .status(400)
            .send({ code: 400, message: "Task not updated!" });
    res.status(200).send({ status: 1, message: "Task updated!" });
});

router.delete("/:id", auth, async (req, res) => {
    const task = await Tasks.deleteOne({ _id: req.params.id });
    if (!task) return res.status(400).send("Task ID not found!");

    res.status(200).send({ status: 1, message: "Task deleted!" });
});

module.exports = router;
