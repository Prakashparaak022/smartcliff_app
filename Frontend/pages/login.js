import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "./Layout/index";
import TitleComponent from "./Header";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    newPassword: "",
    C_id: "",
  });

  const [errors, setErrors] = useState({});

  const storage = typeof window !== "undefined" ? window.sessionStorage : null;
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [forgotPassword, setForgotPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [users, setUsers] = useState([]);

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  const changePassword = async () => {
    try {
      if (!formData.newPassword || !formData.C_id) {
        console.log("New password and Customer ID are required");
        return;
      }

      const userToUpdate = users.find(
        (user) =>
          user.u_username === formData.username &&
          user.u_id === parseInt(formData.C_id)
      );

      if (userToUpdate) {
        const updatedUser = {
          new_password: formData.newPassword, // Assuming this is the correct field name
        };

        await axios.patch(
          `https://smartcliff-app.onrender.com/users/${userToUpdate.u_id}/password`,
          updatedUser
        );
        console.log("Password updated successfully");
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const onClose = () => {
    setShowForgotPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const usersResponse = await axios.get(
          "https://smartcliff-app.onrender.com/users"
        );
        const fetchedUsers = usersResponse.data;

        const matchingUser = fetchedUsers.find(
          (user) =>
            user.u_username === formData.username &&
            user.u_password === formData.password
        );

        if (matchingUser) {
          sessionStorage.setItem("formData.username", formData.username);
          sessionStorage.setItem("authenticated", "true");
          router.push("/dashboard");
          setShowWelcomeModal(true);
        } else {
          console.log("Invalid Credentials");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://smartcliff-app.onrender.com/users"
        );
        const fetchedUsers = response.data;
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const storedUsername = storage.getItem("formData.username");
    if (storedUsername) {
      setFormData((prevData) => ({
        ...prevData,
        username: storedUsername,
      }));
    }
  }, []);

  useEffect(() => {
    storage.setItem("formData.username", formData.username);
  }, [formData.username]);

  const handleLogout = () => {
    setFormData({
      username: "",
      password: "",
    });
    sessionStorage.clear();
    router.push("/");
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (formData.username.trim() === "") {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "username":
        if (value.trim() === "") {
          newErrors.username = "Username is required";
        } else {
          delete newErrors.username;
        }
        console.log("Invalid Admin Credentials");
        break;
      case "password":
        if (value.trim() === "") {
          newErrors.password = "Password is required";
        } else {
          delete newErrors.password;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const theme = createTheme();

  return (
    <Layout>
      <Dialog
        open={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}>
        <DialogTitle color="primary">Welcome, Admin!</DialogTitle>
        <DialogContent>
          <Typography>You have successfully logged in as an admin.</Typography>
        </DialogContent>
      </Dialog>
      <ThemeProvider theme={theme}>
        <Grid
          container
          component="main"
          sx={{ height: "80vh", marginTop: "4rem" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${"/assets/images/Our_beleif.jpg"})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <Avatar sx={{ m: 1, bgcolor: "#ed4d01" }}>
                <LockOutlinedIcon />
              </Avatar>
              <TitleComponent
                title={<span style={{ color: "#000" }}>Login</span>}
              />
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      error={!!errors.username}
                      helperText={errors.username}
                      color="primary"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      error={!!errors.password}
                      helperText={errors.password}
                      color="primary"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button type="submit" variant="contained" color="primary">
                      Login
                    </Button>
                  </Grid>
                  {/* <Grid item xs={2}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </Grid> */}
                </Grid>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={toggleForgotPassword}
                color={"primary"}>
                Forgot password?
              </Typography>

              {showForgotPassword && (
                <Dialog
                  open={showForgotPassword}
                  onClose={toggleForgotPassword}>
                  <DialogTitle></DialogTitle>

                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "0.5rem",
                      right: "0.5rem",
                    }}
                    onClick={onClose}>
                    <CloseIcon />
                  </IconButton>

                  <TitleComponent
                    title={
                      <span style={{ color: "#000" }}>
                        Forgot<span> Password</span>
                      </span>
                    }
                  />
                  <DialogContent>
                    <TextField
                      fullWidth
                      label="User ID"
                      name="C_id"
                      value={formData.C_id}
                      onChange={handleChange}
                      error={!!errors.C_id}
                      helperText={errors.C_id}
                      color="primary"
                      style={{ marginBottom: "20px" }}
                    />
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      error={!!errors.username}
                      helperText={errors.username}
                      color="primary"
                      style={{ marginBottom: "20px" }}
                    />
                    <TextField
                      fullWidth
                      label="New Password"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      error={!!errors.newPassword}
                      helperText={errors.newPassword}
                      color="primary"
                      style={{ marginBottom: "20px" }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={changePassword}
                      disabled={!formData.newPassword || !formData.C_id}>
                      Change Password
                    </Button>
                  </DialogContent>
                </Dialog>
              )}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Layout>
  );
};

export default Login;
