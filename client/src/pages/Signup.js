import { Box, Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import authApi from "../api/authApi";

function Signup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [usernameErr, setUsernameErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [confirmPasswordErr, setConfirmPasswordErr] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUsernameErr("");
        setPasswordErr("");
        setConfirmPasswordErr("");

        const data = new FormData(e.target);
        const username = data.get("username").trim();
        const password = data.get("password").trim();
        const confirmPassword = data.get("confirmPassword").trim();

        let err = false;

        if (username === "") {
            err = true;
            setUsernameErr("Please fill this filed");
        }
        if (password === "") {
            err = true;
            setPasswordErr("Please fill this filed");
        }
        if (confirmPassword === "") {
            err = true;
            setPasswordErr("Please fill this filed");
        }
        if (confirmPassword !== password) {
            err = true;
            setConfirmPasswordErr("Confirm password no match");
        }

        if (err) return;

        setLoading(true);

        try {
            const res = await authApi.signup({
                username,
                password,
                confirmPassword,
            });
            setLoading(false);
            localStorage.setItem("token", res.token);
            navigate("/login");
        } catch (error) {
            const errors = error.data.errors;
            errors.forEach((e) => {
                if (e.param === "username") {
                    setUsernameErr(e.message);
                }
                if (e.param === "password") {
                    setPasswordErr(e.message);
                }
                if (e.param === "confirmPassword") {
                    setConfirmPasswordErr(e.message);
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="confirmPassword"
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    disabled={loading}
                    error={confirmPasswordErr !== ""}
                    helperText={confirmPasswordErr}
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
                    Signup
                </LoadingButton>
            </Box>
            <Button
                component={Link}
                to="/login"
                sx={{
                    textTransform: "none",
                }}
            >
                Already have an account? Login ?
            </Button>
        </>
    );
}

export default Signup;
