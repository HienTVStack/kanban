import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";

import authUtil from "../../utils/authUtil";
import Sidebar from "../common/Sidebar";
import Loading from "../common/Loading";
import { setUser } from "../../redux/features/userSlice";
function AppLayout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtil.isAuthenticated();
            if (!user) {
                navigate("/login");
            } else {
                dispatch(setUser(user));
                setLoading(false);
            }
        };
        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);
    return loading ? (
        <Loading fullHeight />
    ) : (
        <Box
            sx={{
                display: "flex",
            }}
        >
            <Sidebar />
            <Box
                sx={{
                    flexGrow: 1,
                    p: 1,
                    width: "max-content",
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}

export default AppLayout;
