import { Box, Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [usernameErr, setUsernameErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUsernameErr("");
        setPasswordErr("");

        const data = new FormData(e.target);
        const username = data.get("username").trim();
        const password = data.get("password").trim();

        let err = false;

        if (username === "") {
            err = true;
            setUsernameErr("Please fill this filed");
        }
        if (password === "") {
            err = true;
            setPasswordErr("Please fill this filed");
        }

        if (err) return;

        setLoading(true);

        try {
            const res = await authApi.login({
                username,
                password,
            });
            setLoading(false);
            localStorage.setItem("token", res.token);
            navigate("/");
        } catch (error) {
            const errors = error.data.errors;
            errors.forEach((e) => {
                if (e.param === "username") {
                    setUsernameErr(e.message);
                }
                if (e.param === "password") {
                    setPasswordErr(e.message);
                }
            });
        }
    };

    return (
        <>
            <Box
                component="form"
                sx={{
                    mt: 1,
                }}
                onSubmit={handleSubmit}
                noValidate
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    disabled={loading}
                    error={usernameErr !== ""}
                    helperText={usernameErr}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    disabled={loading}
                    error={passwordErr !== ""}
                    helperText={passwordErr}
                />
                <LoadingButton
                    sx={{
                        mt: 3,
                        mb: 2,
                    }}
                    variant="outlined"
                    fullWidth
                    color="success"
                    type="submit"
                    loading={loading}
                >
                    Login
                </LoadingButton>
            </Box>
            <Button
                component={Link}
                to="/signup"
                sx={{
                    textTransform: "none",
                }}
            >
                Don't have account? Signup ?
            </Button>
        </>
    );
}

export default Login;
