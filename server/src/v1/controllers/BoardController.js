const Board = require("../models/board");
const Section = require("../models/section");
const Task = require("../models/task");

exports.create = async (req, res) => {
    try {
        const boardsCount = await Board.find().count();
        const board = await Board.create({
            user: req.user._id,
            position: boardsCount > 0 ? boardsCount : 0,
        });
        console.log(`create success`);
        res.status(200).json(board);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getAll = async (req, res) => {
    try {
        const boards = await Board.find({ user: req.user._id }).sort(
            "-position"
        );
        res.status(200).json(boards);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.updatePosition = async (req, res) => {
    const { boards } = req.body;
    try {
        for (let key in boards.reverse()) {
            const board = boards[key];
            await Board.findByIdAndUpdate(board._id, {
                $set: { position: key },
            });
        }
        res.status(200).json("updated");
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getOne = async (req, res) => {
    const { boardId } = req.params;
    try {
        const board = await Board.findOne({ user: req.user._id, _id: boardId });
        if (!board) return res.status(404).json({ message: "Board not fount" });
        const sections = await Section.find({ board: boardId });
        for (const section of sections) {
            const tasks = await Task.find({ section: section.id })
                .populate("section")
                .sort("-position");
            section._doc.tasks = tasks;
        }
        board._doc.sections = sections;
        res.status(200).json(board);
    } catch (error) {
        res.status(500).json(error);
    }
};
