import React, { useState } from "react";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import Layout from "./Layout/index";
import TitleComponent from "./Header";
import axios from "axios";

const HireForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    hiringEnquiry: "",
    message: "",
    designation: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate the form field
    validateField(name, value);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      hiringEnquiry: "",
      message: "",
      designation: "",
    });

    setErrors({});
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
        companyName: "",
        hiringEnquiry: "",
        message: "",
        designation: "",
      });

      try {
        const response = await axios.post(
          "https://smartcliff-app.onrender.com/hire",
          {
            h_name: formData.name,
            h_email: formData.email,
            h_phoneNumber: formData.phoneNumber,
            h_companyName: formData.companyName,
            h_hiringEnquiry: formData.hiringEnquiry,
            h_message: formData.message,
            h_designation: formData.designation,
          }
        );

        console.log("Response:", response.data);

        if (response.status !== 404) {
          setFormSubmitted(true);
          setTitle("");
          setDescription("");
          console.log("Data Added");
        }
      } catch (error) {
        console.error("Error submitting form data:", error);
        // Log specific error details
        console.error("Error response:", error.response);
        console.error("Error message:", error.message);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Name should not contain numbers";
      isValid = false;
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (formData.phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    }

    if (formData.companyName.trim() === "") {
      newErrors.companyName = "Company Name is required";
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
        } else if (/\d/.test(value)) {
          newErrors.name = "Name should not contain numbers";
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
          newErrors.email = "Invalid email format";
        } else {
          delete newErrors.email;
        }
        break;
      case "phoneNumber":
        if (value.trim() === "") {
          newErrors.phoneNumber = "Phone number is required";
        } else if (!/^[6-9]\d{9}$/.test(value)) {
          newErrors.phoneNumber = "Invalid phone number format";
        } else {
          delete newErrors.phoneNumber;
        }
        break;
      case "companyName":
        if (value.trim() === "") {
          newErrors.companyName = "Company Name is required";
        } else {
          delete newErrors.companyName;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  return (
    <Layout>
      <section id="HireUS">
        <div
          className="circles"
          style={{ mt: 1, display: { xs: "none", sm: "block" } }}>
          <img src={"/assets/images/circles.png"} alt="" className="w-100" />
        </div>
        <Container
          maxWidth="md"
          style={{
            mt: 4,
            color: "#000",
            padding: "2rem",
            borderRadius: "8px",
          }}>
          <TitleComponent
            title={
              <span style={{ color: "#000" }}>
                Hire From <span>Us</span>
              </span>
            }
          />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  error={!!errors.companyName}
                  helperText={errors.companyName}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12}>
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Hiring Enquiry"
                  name="hiringEnquiry"
                  value={formData.hiringEnquiry}
                  onChange={handleChange}
                  color="primary"
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
                <TextField
                  fullWidth
                  label="Designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={handleReset}
                  style={{ marginLeft: "1rem" }}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
        <div className="dots1" style={{ zIndex: "-1", opacity: "0.4" }}>
          <img src={"/assets/images/dots1.png"} alt="" />
        </div>
      </section>
    </Layout>
  );
};

export default HireForm;
