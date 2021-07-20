const express = require("express");
const router = express.Router();
const { Tasks } = require("../model/tasks");

router.get("/", async (req, res) => {
    const taskList = await Tasks.find().select("-__v");
    if (!taskList)
        return res.status(400).send({ code: 400, message: "No Task Found!" });

    res.status(200).send(taskList);
});

router.post("/", async (req, res) => {
    const task = new Tasks({
        taskName: req.body.taskName,
    });

    await task.save();
    res.status(200).send({ status: 1, message: "Task Saved!" });
});

router.put("/:id", async (req, res) => {
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
    res.status(200).send(1);
});

module.exports = router;
