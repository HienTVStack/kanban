import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import boardApi from "../api/boardApi";
import { setBoards } from "../redux/features/boardSlice";

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const createBoard = async () => {
        setLoading(true);
        try {
            const res = await boardApi.create();
            console.log(res);
            dispatch(setBoards([res]));
            navigate(`/boards/${res._id}`);
        } catch (err) {
            alert(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <LoadingButton
                variant="outlined"
                color="success"
                onClick={createBoard}
                loading={loading}
            >
                Click here to create your first board
            </LoadingButton>
        </Box>
    );
}

export default Home;
