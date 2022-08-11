const mongoose = require("mongoose");
const modalOption = require("./modelOption");

const taskSchema = new mongoose.Schema(
    {
        section: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
            require: true,
        },
        title: { type: String, default: "" },
        content: { type: String, default: "" },
        position: { type: Number },
    },
    modalOption
);

module.exports = mongoose.model("Task", taskSchema);
