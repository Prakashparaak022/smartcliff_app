import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios"; // Import axios for API calls
import Layout from "./Layout/index";
import TitleComponent from "./Header";

const EnquiryForms = () => {
  const [categories, setCategories] = useState([]);
  const [EnquiryData, setEnquiryData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    areaOfInterest: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [category, setCategory] = useState("");

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(value);
  };

  useEffect(() => {
    const storedEnquiryData = localStorage.getItem("EnquiryData");

    if (storedEnquiryData) {
      setEnquiryData(JSON.parse(storedEnquiryData));
      setSubmitted(true);
    }

    const fetchApiData = async () => {
      try {
        const response = await axios.get(
          "https://smartcliff-app.onrender.com/enquiry"
        );
        if (response.status === 200) {
          setApiData(response.data);
        } else {
          console.log("Failed to fetch API data");
        }
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };

    fetchApiData();
    fetchCategories();
  }, []);

  //fetch
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://smartcliff-app.onrender.com/categories"
      );
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnquiryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const resetForm = () => {
    setEnquiryData({
      name: "",
      email: "",
      phoneNumber: "",
      areaOfInterest: "",
      message: "",
    });
    setCategory("");
    setErrors({});
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://smartcliff-app.onrender.com/enquiry",
          {
            e_name: EnquiryData.name,
            e_email: EnquiryData.email,
            e_phone_number: EnquiryData.phoneNumber,
            e_message: EnquiryData.message,
            category: category,
          }
        );
        console.log("Response:", response);

        if (response.status === 201) {
          setSubmitted(true);
          resetForm();
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

    if (EnquiryData.name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(EnquiryData.name)) {
      newErrors.name = "Name should only contain letters and spaces";
      isValid = false;
    }

    if (EnquiryData.email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/\b^[A-Za-z0-9_]+@[A-Za-z]{3,}\.[A-Za-z\.]{2,}$\b/.test(
        EnquiryData.email
      )
    ) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (EnquiryData.phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!/^[6-9]+$/.test(EnquiryData.phoneNumber)) {
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
        } else if (!/^[6-9]+$/.test(value)) {
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

  return (
    <Layout>
      <div
        className="circles"
        sx={{ mt: 1, display: { xs: "none", sm: "block" } }}>
        <img src={"/assets/images/circles.png"} alt="" className="w-100" />
      </div>
      <section id="Enquiry">
        <Container
          maxWidth="md"
          sx={{ mt: 4, color: "#000", padding: "2rem", borderRadius: "8px" }}>
          <TitleComponent
            title={
              <span style={{ color: "#000" }}>
                Enquiry<span> Now</span>
              </span>
            }
          />
          {submitted ? (
            <div style={{ textAlign: "center" }}>
              <h2>
                Welcome,{" "}
                {apiData && apiData.name ? apiData.name : EnquiryData.name}!!
              </h2>
              <p>Thank you for your enquiry.</p>
              <Button variant="contained" color="primary" onClick={resetForm}>
                Reset
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={EnquiryData.name}
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
                    value={EnquiryData.email}
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
                    value={EnquiryData.phoneNumber}
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
                  <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
                    <Select
                      labelId="course-category-label"
                      id="course-category"
                      onChange={handleCategoryChange}
                      value={category}
                      displayEmpty>
                      <MenuItem value="">Select Category</MenuItem>
                      {categories.map((category) => (
                        <MenuItem
                          key={category.category_id}
                          value={category.category}>
                          {category.category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={EnquiryData.message}
                    onChange={handleChange}
                    color="primary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={resetForm}
                    style={{ margin: "0px 10px" }}>
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Container>
      </section>
    </Layout>
  );
};

export default EnquiryForms;
