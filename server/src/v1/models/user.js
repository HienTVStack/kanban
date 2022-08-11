const mongoose = require("mongoose");
const { schemaOption } = require("./modelOption");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, uniquer: true },
        password: { type: String, required: true, select: false },
    },
    schemaOption
);

module.exports = mongoose.model("user", userSchema);
