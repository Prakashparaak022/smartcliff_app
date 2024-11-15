import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "./Layout/index";
import TitleComponent from "./Header";
import axios from "axios";

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

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
      // Perform form submission or other actions here
      console.log(formData);
      // Reset the form
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    }

    try {
      const response = await axios.post(
        "https://smartcliff-app.onrender.com/contacts",
        {
          contact_name: formData.name,
          contact_email: formData.email,
          contact_phoneNumber: formData.phoneNumber,
          contact_message: formData.message,
        }
      );

      console.log("Response:", response.data);

      if (response.status !== 404) {
        console.log("Data Added");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      // Log specific error details
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name should only contain letters and spaces";
      isValid = false;
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/\b^[A-Za-z0-9_]+@[A-Za-z]{3,}\.[A-Za-z\.]{2,}$\b/.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (formData.phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "name":
        if (value.trim() === "") {
          newErrors.name = "Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          newErrors.name = "Name should only contain letters and spaces";
        } else {
          delete newErrors.name;
        }
        break;
      case "email":
        if (value.trim() === "") {
          newErrors.email = "Email is required";
        } else if (
          !/\b^[A-Za-z0-9_]+@[A-Za-z]{3,}\.[A-Za-z\.]{2,}$\b/.test(value)
        ) {
          newErrors.email = "Invalid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "phoneNumber":
        if (value.trim() === "") {
          newErrors.phoneNumber = "Phone number is required";
        } else if (!/^[6-9]\d{9}$/.test(value)) {
          newErrors.phoneNumber = "Invalid phone number";
        } else {
          delete newErrors.phoneNumber;
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
          sx={{ height: "100vh", marginTop: "4rem" }}>
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
                <AccountCircleIcon />
              </Avatar>
              <TitleComponent
                title={
                  <span style={{ color: "#000" }}>
                    Contact<span> Us</span>
                  </span>
                }
              />
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      color="primary"
                      inputProps={{
                        pattern: "^[a-zA-Zs]+$",
                        title: "Name should only contain letters and spaces",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      color="primary"
                      inputProps={{
                        pattern: "\\S+@\\S+\\.\\S+",
                        title: "Invalid email address",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber}
                      color="primary"
                      inputProps={{
                        pattern: "^[0-9]+$",
                        title: "Invalid phone number",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      color="primary"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
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

export default ContactUsForm;
