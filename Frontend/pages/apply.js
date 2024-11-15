import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import Layout from "./Layout/index";
import TitleComponent from "./Header";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const ApplyNowForm = () => {
  const [categories, setCategories] = useState([]);
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const { from } = router.query;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    degree: "",
    yearOfPassing: "",
    marksPercentage: "",
    category: "",
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

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      mobileNumber: "",
      degree: "",
      yearOfPassing: "",
      marksPercentage: "",
      category: "",
    });

    setErrors({});
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(value);
    setCategoryError(value === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFormData({
        name: "",
        email: "",
        mobileNumber: "",
        degree: "",
        yearOfPassing: "",
        marksPercentage: "",
        category: "",
      });

      setErrors({});

      try {
        const response = await axios.post(
          "http://localhost:5000/applications",
          {
            a_name: formData.name,
            a_email: formData.email,
            a_mobileNumber: formData.mobileNumber,
            a_degree: formData.degree,
            a_yearOfPassing: formData.yearOfPassing,
            a_marksPercentage: formData.marksPercentage,
            a_category: formData.category,
          }
        );

        console.log("Response:", response.data);

        if (response.status !== 404) {
          console.log("Data Added");
        }

        setFormData({
          name: "",
          email: "",
          mobileNumber: "",
          degree: "",
          yearOfPassing: "",
          marksPercentage: "",
          category: "",
        });
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
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Name should not contain numbers";
      isValid = false;
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\b^[A-Za-z0-9_]+@[A-Za-z]{3,}\.[A-Za-z\.]{2,}$\b/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (formData.mobileNumber.trim() === "") {
      newErrors.mobileNumber = "Phone number is required";
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Invalid mobile number";
      isValid = false;
    }

    if (formData.degree.trim() === "") {
      newErrors.degree = "Degree is required";
      isValid = false;
    }

    if (formData.yearOfPassing.trim() === "") {
      newErrors.yearOfPassing = "Year of passing is required";
      isValid = false;
    }

    if (formData.marksPercentage.trim() === "") {
      newErrors.marksPercentage = "Marks percentage is required";
      isValid = false;
    }

    if (formData.category.trim() === "") {
      newErrors.category = "Category is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  //fetch
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categories");
      if (Array.isArray(response.data)) {
        setCategories(response.data);

        console.log("Fetched categories:", response.data);
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
        } else if (!/\b^[A-Za-z0-9_]+@[A-Za-z]{3,}\.[A-Za-z\.]{2,}$\b/.test(value)) {
          newErrors.email = "Invalid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "mobileNumber":
        if (value.trim() === "") {
          newErrors.mobileNumber = "Mobile number is required";
        } else if (!/^[6-9]\d{9}$/.test(value)) {
          newErrors.mobileNumber = "Invalid mobile number";
        } else {
          delete newErrors.mobileNumber;
        }
        break;
      case "degree":
        if (value.trim() === "") {
          newErrors.degree = "Degree is required";
        } else {
          delete newErrors.degree;
        }
        break;
      case "yearOfPassing":
        if (value.trim() === "") {
          newErrors.yearOfPassing = "Year of passing is required";
        } else if (isNaN(value) || value < 2000 || value > currentYear + 1) {
          newErrors.yearOfPassing =
            "Invalid year of passing. Please enter a year between 2000 and the current year.";
        } else {
          delete newErrors.yearOfPassing;
        }
        break;

      case "marksPercentage":
        if (value.trim() === "") {
          newErrors.marksPercentage = "Marks percentage is required";
        } else if (isNaN(value) || value < 0 || value > 100) {
          newErrors.marksPercentage =
            "Invalid marks percentage. Please enter a value between 0 and 100.";
        } else {
          delete newErrors.marksPercentage;
        }
        break;
      case "category":
        if (value.trim() === "") {
          newErrors.category = "category is required";
        } else {
          delete newErrors.category;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  return (
    <Layout>
      <section id="ApplyNow">
        {/* Breadcrumbs */}
        <div style={{marginLeft:"6rem"}}
        className="breadcrumbs">
          <Link href="/" className="breadcrumb-link">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/Courses" className="breadcrumb-link">
            Courses
          </Link>{" "}
          / Apply
        </div>

        <div
          className="circles"
          sx={{ mt: 1, display: { xs: "none", sm: "block" } }}
        >
          <img src={"/assets/images/circles.png"} alt="" className="w-100" />
        </div>
        <Container
          maxWidth="md"
          sx={{ mt: 4, color: "#000", padding: "2rem", borderRadius: "8px" }}
        >
          <TitleComponent
            title={
              <span style={{ color: "#000" }}>
                Apply<span> Now</span>
              </span>
            }
          />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputLabel id="name">Name</InputLabel>
                <TextField
                  fullWidth
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
                <InputLabel id="email">Email</InputLabel>
                <TextField
                  fullWidth
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
                <InputLabel id="mobile">Mobile Number</InputLabel>
                <TextField
                  fullWidth
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  error={!!errors.mobileNumber}
                  helperText={errors.mobileNumber}
                  color="primary"
                  inputProps={{
                    pattern: "^[6-9]\\d{9}$",
                    title: "Invalid mobile number",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="degree-label">Degree</InputLabel>
                <Select
                  fullWidth
                  labelId="degree-label"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  error={!!errors.degree}
                  color="primary"
                >
                  <MenuItem value="">Select Degree</MenuItem>
                  <MenuItem value="Bachelor">Bachelor</MenuItem>
                  <MenuItem value="Master">Master</MenuItem>
                  <MenuItem value="PhD">PhD</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="year">Year of Passing</InputLabel>
                <TextField
                  fullWidth
                  name="yearOfPassing"
                  type="number"
                  value={formData.yearOfPassing}
                  onChange={handleChange}
                  error={!!errors.yearOfPassing}
                  helperText={errors.yearOfPassing}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="marks">Marks Percentage</InputLabel>
                <TextField
                  fullWidth
                  name="marksPercentage"
                  type="number"
                  value={formData.marksPercentage}
                  onChange={handleChange}
                  error={!!errors.marksPercentage}
                  helperText={errors.marksPercentage}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  fullWidth
                  labelId="category-label"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  error={!!errors.category}
                  color="primary"
                >
                  <MenuItem value="">Select Category</MenuItem>
                  {categories.map((category) => (
                    <MenuItem
                      key={category.category_id}
                      value={category.category}
                    >
                      {category.category}
                    </MenuItem>
                  ))}
                </Select>
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
                  style={{ marginLeft: "1rem" }}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
        {/* <div className="dots1" style={{ zIndex: "-1", opacity: "0.4" }}>
          <img src={"/assets/images/dots1.png"} alt="" />
        </div> */}
      </section>
    </Layout>
  );
};

export default ApplyNowForm;
