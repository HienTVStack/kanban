import { configureStore } from "@reduxjs/toolkit";
import userRedux from "./features/userSlice";
import boardRedux from "./features/boardSlice";

export const store = configureStore({
    reducer: {
        user: userRedux,
        board: boardRedux,
    },
});
