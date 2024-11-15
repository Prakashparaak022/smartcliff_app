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
} from "@mui/material";
import TitleComponent from "../Header";

const ServicesForm = ({ initialService, open, onClose, onSubmit }) => {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [service, SetService] = useState(initialService);
  const [requirement, SetRequirement] = useState("");
  const [phonenumber, SetPhonenumber] = useState("");
  const [FormSubmitted, setFormSubmitted] = useState(false);

  const [errors, setErrors] = useState({});

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
        const response = await axios.post("http://localhost:5000/services", {
          companyName: name,
          s_email: email,
          s_phoneNumber: phonenumber,
          service: service,
          requirement: requirement,
        });

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
      newErrors.companyName = "Company Name is required";
      isValid = false;
    }

    if (email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
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
          newErrors.companyName = "Company Name is required";
        } else {
          delete newErrors.companyName;
        }
        break;
      case "email":
        if (value.trim() === "") {
          newErrors.email = "Email is required";
        } else if (!/\b^[A-Za-z0-9_]+@[A-Za-z]{3,}\.[A-Za-z\.]{2,}$\b/.test(value)) {
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        style={{ fontWeight: "bold", textAlign: "center", fontSize: "25px" }}
      >
        <TitleComponent
          title={
            <span style={{ color: "#000" }}>
              Services<span> Form</span>
            </span>
          }
        />
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} style={{ padding: "1rem" }}>
          <InputLabel>Company Name</InputLabel>
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
              error={!!errors.service}
            >
              <MenuItem value="" disabled>
                Select Service
              </MenuItem>
              <MenuItem value="HTD">HTD</MenuItem>
              <MenuItem value="Lateral Training">Lateral Training</MenuItem>
              <MenuItem value="Institution Training">
                Institution Training
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
            style={{ justifyContent: "center", marginTop: "1rem" }}
          >
            <Button
              onClick={onClose}
              variant="contained"
              color="secondary"
              style={{ color: "#fff" }}
            >
              Close
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default ServicesForm;
