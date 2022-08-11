const mongoose = require("mongoose");
const modelOption = require("./modelOption");

const sectionSchema = new mongoose.Schema(
    {
        board: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board",
            require: true,
        },
        title: { type: String, default: "" },
    },
    modelOption
);

module.exports = mongoose.model("Section", sectionSchema);
