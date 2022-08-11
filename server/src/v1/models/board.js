const mongoose = require("mongoose");
const modalOption = require("./modelOption");

const BoardSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        icon: { type: String, default: "📃" },
        title: { type: String, default: "Untitled" },
        description: {
            type: String,
            default:
                "Add description here /n You can add multiline description /n Let start...",
        },
        position: { type: Number },
        favorite: { type: Boolean, default: false },
        favoritePosition: { type: Number, default: 0 },
    },
    modalOption
);

module.exports = mongoose.model("Board", BoardSchema);
