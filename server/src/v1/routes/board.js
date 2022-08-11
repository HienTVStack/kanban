const express = require("express");
const { param } = require("express-validator");
const validation = require("../handlers/validation");
const tokenHandler = require("../handlers/tokenHandler");

const BoardController = require("../controllers/BoardController");

const router = express.Router();

router.get("/", tokenHandler.verifyToken, BoardController.getAll);
router.get(
    "/:boardId",
    param("boardId").custom((value) => {
        if (!validation.jsObjectId(value)) {
            return Promise.reject("invalid id");
        } else {
            return Promise.resolve();
        }
    }),
    tokenHandler.verifyToken,
    BoardController.getOne
);
router.post("/", tokenHandler.verifyToken, BoardController.create);
router.put("/", tokenHandler.verifyToken, BoardController.updatePosition);

module.exports = router;
