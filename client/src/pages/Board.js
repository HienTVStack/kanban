import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Button,
    Divider,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { EmojiPicker } from "emoji-mart";

import boardApi from "../api/boardApi";

function Board() {
    const { boardId } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [sections, setSections] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [icon, setIcon] = useState("");

    useEffect(() => {
        const getBoard = async () => {
            try {
                const res = await boardApi.getOne(boardId);
                setTitle(res.title);
                setDescription(res.description);
                setSections(res.sections);
                setIsFavorite(res.favorite);
                setIcon(res.icon);
            } catch (error) {
                alert(error);
            }
        };
        getBoard();
    }, [boardId]);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <IconButton variant="outlined">
                    {isFavorite ? (
                        <StarOutlineOutlinedIcon color="warning" />
                    ) : (
                        <StarBorderOutlinedIcon />
                    )}
                </IconButton>
                <IconButton variant="outlined" color="error">
                    <DeleteOutlinedIcon />
                </IconButton>
            </Box>
            <Box sx={{ padding: "10px 15px" }}>
                <Box>{/* <EmojiPicker /> */}</Box>
                <TextField
                    value={title}
                    variant="outlined"
                    placeholder="Untitled"
                    fullWidth
                    sx={{
                        "& .MuiOutlinedInput-input": { padding: 0 },
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "unset ",
                        },
                        "& .MuiOutlinedInput-root": {
                            fontSize: "2rem",
                            fontWeight: "700",
                        },
                    }}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    value={description}
                    variant="outlined"
                    placeholder="Add a description"
                    fullWidth
                    sx={{
                        "& .MuiOutlinedInput-input": { padding: 0 },
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "unset ",
                        },
                        "& .MuiOutlinedInput-root": {
                            fontSize: "0.8rem",
                            fontWeight: "700",
                        },
                    }}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Box>
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Button>Add section</Button>
                    <Typography variant="body2" fontWeight="700">
                        {sections.length} Sections
                    </Typography>
                </Box>
                <Divider sx={{ margin: "10px 0" }}></Divider>
            </Box>
        </>
    );
}

export default Board;
