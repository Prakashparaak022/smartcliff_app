import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Layout from "../Layout";
import TitleComponent from "../Header";

function TrainingCard({ title, description, image, buttonText, onApplyNow }) {
  return (
    <Grid item lg={6} md={12} sm={12} className="course-grid">
      <div className="htd-training" style={{ padding: "1rem" }}>
        <div className="description">
          <Typography
            variant="body1"
            style={{
              fontSize: "17px",
              textAlign: "justify",
            }}>
            {description}
          </Typography>
        </div>
        <div style={{ display: "flex", flexGrow: "1", marginTop: "15px" }}>
          <Button variant="contained" color="primary" onClick={onApplyNow}>
            {buttonText}
          </Button>
        </div>
      </div>
    </Grid>
  );
}

function MCA() {
  const [openServicesForm, setOpenServicesForm] = useState(false);

  const handleOpenServicesForm = () => {
    setOpenServicesForm(true);
  };

  const handleCloseServicesForm = () => {
    setOpenServicesForm(false);
  };

  const handleSubmitServicesForm = (formData) => {
    // Handle form submission here
    console.log(formData);
    // Close the form dialog
    handleCloseServicesForm();
  };

  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  // const [service, SetService] = useState("Student Training");
  const [requirement, SetRequirement] = useState("");
  const [phonenumber, SetPhonenumber] = useState("");
  const [FormSubmitted, setFormSubmitted] = useState(false);

  const [errors, setErrors] = useState({});
  const [service, setService] = useState("MCA");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "companyName":
        SetName(value);
        break;
      case "email":
        SetEmail(value);
        break;
      case "service":
        SetService(value);
        break;
      case "requirement":
        SetRequirement(value);
        break;
      case "phoneNumber":
        SetPhonenumber(value);
        break;
      default:
        break;
    }

    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://smartcliff-app.onrender.com/services",
          {
            companyName: name,
            s_email: email,
            s_phoneNumber: phonenumber,
            service: service,
            requirement: requirement,
          }
        );
        console.log("Response:", response.data);

        if (response.status !== 404) {
          setFormSubmitted(true);
          SetName("");
          SetPhonenumber("");
          SetEmail("");
          SetService("");
          SetRequirement("");
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

    if (name.trim() === "") {
      newErrors.companyName = "Full Name is required";
      isValid = false;
    }

    if (email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/\b^[A-Za-z0-9_]+@[A-Za-z]{3,}\.[A-Za-z\.]{2,}$\b/.test(email)
    ) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (phonenumber.trim() === "") {
      newErrors.phoneNumber = "Phone Number is required";
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(phonenumber)) {
      newErrors.phoneNumber = "Invalid Indian phone number";
      isValid = false;
    }

    if (service.trim() === "") {
      newErrors.service = "Service is required";
      isValid = false;
    }

    if (requirement.trim() === "") {
      newErrors.requirement = "Requirement is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "companyName":
        if (value.trim() === "") {
          newErrors.companyName = "Full Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          newErrors.companyName = "Invalid Name";
        } else {
          delete newErrors.companyName;
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
          newErrors.phoneNumber = "Phone Number is required";
        } else if (!/^[6-9]\d{9}$/.test(value)) {
          newErrors.phoneNumber = "Invalid Indian phone number";
        } else {
          delete newErrors.phoneNumber;
        }
        break;
      case "service":
        if (value.trim() === "") {
          newErrors.service = "Service is required";
        } else {
          delete newErrors.service;
        }
        break;
      case "requirement":
        if (value.trim() === "") {
          newErrors.requirement = "Requirement is required";
        } else {
          delete newErrors.requirement;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const trainingContent = {
    title: "MCA Program",
    description:
      "Our Student Training Program offers a wide range of opportunities for students to enhance their skills and gain practical experience. The program covers various topics, including technical skills, soft skills, project management, and teamwork. Students will have the chance to work on real-world projects and interact with industry experts. Join our Student Training Program to accelerate your personal and professional growth!",
    image: "/assets/images/training.png",
    buttonText: "Apply Now",
  };

  return (
    <section>
      <div className="dots2">
        <img src={"/assets/images/dots.png"} alt="" />
      </div>
      <Layout>
        <TitleComponent title={trainingContent.title} />
        <Grid container spacing={2} justifyContent="center">
          <Grid item lg={10} sm={6} md={6} style={{ padding: "2rem" }}>
            <Paper
              elevation={3}
              style={{ overflow: "hidden", background: "#fdf0eb" }}>
              <Grid container className="courses-card" alignItems="center">
                <TrainingCard
                  {...trainingContent}
                  onApplyNow={handleOpenServicesForm} // Pass the handler here
                />
                <Grid
                  item
                  lg={6}
                  sm={12}
                  sx={{ display: { lg: "block", sm: "none", md: "none" } }}>
                  <img
                    src={trainingContent.image}
                    alt="Training"
                    width={"70%"}
                    style={{
                      width: "100%",
                      marginTop: "1rem",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Layout>
      <Dialog
        open={openServicesForm}
        onClose={handleCloseServicesForm}
        maxWidth="sm"
        fullWidth>
        <DialogTitle
          style={{ fontWeight: "bold", textAlign: "center", fontSize: "25px" }}>
          MCA<span style={{ color: "#ed4d01" }}> Form</span>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} style={{ padding: "1rem" }}>
            <InputLabel>Full Name</InputLabel>
            <FormControl fullWidth style={{ marginBottom: "1rem" }}>
              <TextField
                name="companyName"
                value={name}
                onChange={handleChange}
                fullWidth
                error={!!errors.companyName}
                helperText={errors.companyName}
              />
            </FormControl>
            <InputLabel>Email</InputLabel>
            <FormControl fullWidth style={{ marginBottom: "1rem" }}>
              <TextField
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
              />
            </FormControl>
            <InputLabel>Phone Number</InputLabel>
            <FormControl fullWidth style={{ marginBottom: "1rem" }}>
              <TextField
                name="phoneNumber"
                value={phonenumber}
                onChange={handleChange}
                fullWidth
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </FormControl>

            <InputLabel id="service-label">Service Type</InputLabel>
            <FormControl fullWidth style={{ marginBottom: "1rem" }}>
              <Select
                labelId="service-label"
                name="service"
                value={service}
                onChange={handleChange}
                error={!!errors.service}>
                <MenuItem value="" disabled>
                  Select Service
                </MenuItem>
                <MenuItem value="MCA">MCA</MenuItem>
              </Select>
            </FormControl>

            <InputLabel>Requirement</InputLabel>
            <FormControl fullWidth style={{ marginBottom: "1rem" }}>
              <TextField
                name="requirement"
                value={requirement}
                onChange={handleChange}
                fullWidth
                error={!!errors.requirement}
                helperText={errors.requirement}
              />
            </FormControl>
            <DialogActions
              style={{ justifyContent: "center", marginTop: "1rem" }}>
              <Button
                onClick={handleCloseServicesForm}
                variant="contained"
                color="secondary">
                Close
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default MCA;
