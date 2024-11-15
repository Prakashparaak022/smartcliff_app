import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import TitleComponent from "./Header";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const QuickEnquiry = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    category: "",
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

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://smartcliff-app.onrender.com/categories"
      );
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        console.error("Invalid categories data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://smartcliff-app.onrender.com/enquiry",
          {
            e_name: formData.name,
            e_email: formData.email,
            e_phone_number: formData.phoneNumber,
            e_message: formData.message,
            category: formData.category,
          }
        );

        console.log("Response:", response);

        if (response.status === 201) {
          resetForm();
          onClose();
          console.log("Data Added");
        }
      } catch (error) {
        console.error("Error submitting form data:", error);
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

    if (formData.category.trim() === "") {
      newErrors.category = "Area of Interest is required";
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
      case "category":
        if (value.trim() === "") {
          newErrors.category = "Area of Interest is required";
        } else {
          delete newErrors.category;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      category: "",
      message: "",
    });
    setErrors({});
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Quick Enquiry Form</DialogTitle>
      <DialogContent>
        <IconButton
          sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
          onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Container maxWidth="md" sx={{ color: "#000", borderRadius: "8px" }}>
          <TitleComponent
            title={
              <span style={{ color: "#000" }}>
                Quick<span> Enquiry</span>
              </span>
            }
          />
          <form onSubmit={handleSubmit}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
                <Select
                  fullWidth
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  error={!!errors.category}
                  color="primary"
                  displayEmpty>
                  <MenuItem value="">Select Area of Interest</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.category}>
                      {category.category}
                    </MenuItem>
                  ))}
                </Select>
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
          </form>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default QuickEnquiry;
