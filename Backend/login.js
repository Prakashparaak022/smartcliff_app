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

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const storage = typeof window !== "undefined" ? window.sessionStorage : null;
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const usersResponse = await axios.get("http://localhost:5000/users");
        const users = usersResponse.data;

        const matchingUser = users.find(
          (user) =>
            user.u_username === formData.username &&
            user.u_password === formData.password
        );

        if (matchingUser) {
          storage.setItem("authenticated", "true");
          setAuthenticated(true)
          console.log("Login successful");
          router.push("/dashboard");
        } else {
          console.log("Invalid Admin Credentials");
          storage.setItem("authenticated", "false");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    const storedUsername = storage.getItem("formData.username");
    const storedPassword = storage.getItem("formData.password");
    const isAuthenticated = storage.getItem("authenticated");


    if (storedUsername) {
      setFormData((prevData) => ({
        ...prevData,
        username: storedUsername,
      }));
    }
    if (storedPassword) {
      setFormData((prevData) => ({
        ...prevData,
        password: storedPassword,
      }));
    }
  }, []);

  useEffect(() => {
    storage.setItem("formData.username", formData.username);
    storage.setItem("formData.password", formData.password);
  }, [formData.username, formData.password]);

  const handleLogout = () => {
    if (storage) {
      storage.removeItem("formData.username");
      storage.removeItem("formData.password");
      setFormData({
        username: "",
        password: "",
      });
      storage.setItem("authenticated", "false");
    }
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
      <ThemeProvider theme={theme}>
        <Grid
          container
          component="main"
          sx={{ height: "80vh", marginTop: "4rem" }}
        >
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
            }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
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
                sx={{ mt: 3 }}
              >
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
                  <Grid item xs={2}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Layout>
  );
};

export default Login;
