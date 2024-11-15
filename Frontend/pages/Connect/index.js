import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CirclesImg from "../../public/assets/images/circles.png";
import TitleComponent from "../Header";
import axios from "axios";

const defaultTheme = createTheme();

export default function Connect() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [studentForm, setStudentForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    areaOfInterest: "",
    errors: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      areaOfInterest: "",
    },
  });
  const [collegeForm, setCollegeForm] = useState({
    collegeName: "",
    collegeEmail: "",
    collegePhone: "",
    serviceType: "",
    errors: {
      collegeName: "",
      collegeEmail: "",
      collegePhone: "",
      serviceType: "",
    },
  });
  const [organizationForm, setOrganizationForm] = useState({
    orgName: "",
    orgEmail: "",
    orgPhone: "",
    serviceType: "",
    errors: {
      orgName: "",
      orgEmail: "",
      orgPhone: "",
      serviceType: "",
    },
  });

  // Fetch categories
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

  // Fetch services
  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "https://smartcliff-app.onrender.com/servicelists"
      );
      if (Array.isArray(response.data)) {
        setServices(response.data);
      } else {
        console.error("Invalid services data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  //Validations

  const validatePhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  const validateEmail = (email) => {
    return /\b^[A-Za-z0-9_]+@[A-Za-z]{3,}\.[A-Za-z\.]{2,}$\b/.test(email);
  };

  const validateName = (name) => {
    return /^[a-zA-Z\s0-9]+$/.test(name);
  };

  const handleStudentFormChange = async (event) => {
    const errors = { ...studentForm.errors };
    const { name, value } = event.target;
    console.log("Event:", event); // Debug logging
    console.log("Name:", name); // Debug logging
    console.log("Value:", value); // Debug logging

    if (name === "email") {
      errors.email = validateEmail(value) ? "" : "Invalid email";
    } else if (name === "firstName" || name === "lastName") {
      errors[name] = validateName(value) ? "" : "Invalid name";
    } else if (name === "phone") {
      errors.phone =
        value.trim() !== ""
          ? validatePhone(value)
            ? ""
            : "Invalid Student phone number"
          : "Please enter a phone number";
    } else if (name === "areaOfInterest") {
      errors.areaOfInterest = value ? "" : "Select an area of interest";
      setSelectedCategory(value);
      if (value) {
        try {
          console.log("Fetching category:", selectedCategory);
          const response = await axios.get(
            `https://smartcliff-app.onrender.com/categories/${selectedCategory}`
          );
          if (Array.isArray(response.data)) {
            setCategories(response.data);
          } else {
            console.error("Invalid categories data:", response.data);
          }
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      } else {
        setCategories([]);
      }
    }

    setStudentForm({ ...studentForm, [name]: value, errors });
  };

  const handleCollegeFormChange = (event) => {
    const { name, value } = event.target;
    const errors = { ...collegeForm.errors };

    if (name === "collegeEmail") {
      errors.collegeEmail = validateEmail(value) ? "" : "Invalid email";
    } else if (name === "collegeName") {
      errors.collegeName = validateName(value) ? "" : "Invalid name";
    } else if (name === "collegePhone") {
      errors.collegePhone =
        value.trim() !== ""
          ? validatePhone(value)
            ? ""
            : "Invalid Institute phone number"
          : "Please enter a phone number";
    } else if (name === "serviceType") {
      errors.serviceType = value ? "" : "Select Service";
      setCollegeForm((prevForm) => ({ ...prevForm, [name]: value, errors }));
      setSelectedService(value);

      if (value) {
        fetchServices(value);
      } else {
        setServices([]);
      }
    }

    setCollegeForm({ ...collegeForm, [name]: value, errors });
  };

  const handleOrganizationFormChange = (event) => {
    const { name, value } = event.target;
    const errors = { ...organizationForm.errors };

    if (name === "orgEmail") {
      errors.orgEmail = validateEmail(value) ? "" : "Invalid email";
    } else if (name === "orgName") {
      errors.orgName = validateName(value) ? "" : "Invalid name";
    } else if (name === "orgPhone") {
      errors.orgPhone =
        value.trim() !== ""
          ? validatePhone(value)
            ? ""
            : "Invalid Corporate phone number"
          : "Please enter a phone number";
    } else if (name === "serviceType") {
      errors.serviceType = value ? "" : "Select Service";
      setOrganizationForm((prevForm) => ({
        ...prevForm,
        [name]: value,
        errors,
      }));
      setSelectedService(value);

      if (value) {
        fetchServices(value);
      } else {
        setServices([]);
      }
    }

    setOrganizationForm({ ...organizationForm, [name]: value, errors });
  };

  const handleStudentFormSubmit = async (event) => {
    event.preventDefault();
    const { firstName, lastName, email, phone, areaOfInterest } = studentForm;
    const errors = { ...studentForm.errors };
    let hasErrors = false;

    if (!validateName(firstName)) {
      errors.firstName = "Invalid name";
      hasErrors = true;
    }
    if (!validateName(lastName)) {
      errors.lastName = "Invalid name";
      hasErrors = true;
    }
    if (!validateEmail(email)) {
      errors.email = "Invalid email";
      hasErrors = true;
    }
    if (phone.trim() === "") {
      errors.phone = "Please enter a phone";
      hasErrors = true;
    } else if (phone.length < 6) {
      errors.phone = "phone should be at least 6 characters long";
      hasErrors = true;
    }

    if (hasErrors) {
      setStudentForm({ ...studentForm, errors });
      return;
    }

    // Check if user already exists
    try {
      const response = await axios.get(
        `https://smartcliff-app.onrender.com/students?std_email=${studentForm.email}`
      );
      if (response.data.std_email === email) {
        setErrorMessage("User already exists");
        setTimeout(() => {
          setErrorMessage("");
        }, 1000);
        return;
      }
    } catch (error) {
      console.error("Error checking existing user:", error);
      return;
    }

    setSuccessMessage("Form submitted successfully!");
    setTimeout(() => {
      setSuccessMessage(false);
    }, 1000);

    setStudentForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      areaOfInterest: "",
      errors: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        areaOfInterest: "",
      },
    });

    try {
      const response = await axios.post(
        "https://smartcliff-app.onrender.com/students",
        {
          std_firstName: firstName,
          std_lastName: lastName,
          std_email: email,
          std_phone: phone,
          category: areaOfInterest,
        }
      );

      console.log("Response:", response.data);

      if (response.status !== 404) {
        setFormSubmitted(true);
        console.log("Data Added");
      }
    } catch (error) {
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
    }
  };

  const handleCollegeFormSubmit = async (event) => {
    event.preventDefault();
    const { collegeName, collegeEmail, collegePhone, serviceType } =
      collegeForm;
    const errors = { ...collegeForm.errors };
    let hasErrors = false;

    if (!validateName(collegeName)) {
      errors.collegeName = "Invalid name";
      hasErrors = true;
    }
    if (!validateEmail(collegeEmail)) {
      errors.collegeEmail = "Invalid email";
      hasErrors = true;
    }
    if (collegePhone.trim() === "") {
      errors.collegePhone = "Please enter a phone number";
      hasErrors = true;
    }

    if (hasErrors) {
      setCollegeForm({ ...collegeForm, errors });
      return;
    }

    setSuccessMessage("Form submitted successfull!");
    setErrorMessage("");
    setCollegeForm({
      collegeName: "",
      collegeEmail: "",
      collegePhone: "",
      serviceType: "",
      errors: {
        collegeName: "",
        collegeEmail: "",
        collegePhone: "",
        serviceType: "",
      },
    });
    setTimeout(() => {
      setSuccessMessage(false);
    }, 1000);
    console.log({
      collegeName,
      collegeEmail,
      collegePhone,
      serviceType,
    });

    //College
    try {
      const response = await axios.get(
        `https://smartcliff-app.onrender.com/institute?collegeEmail=${collegeForm.email}`
      );
      if (response.data.collegeEmail === email) {
        setErrorMessage("User already exists");
        setTimeout(() => {
          setErrorMessage("");
        }, 1000);
        return;
      }
    } catch (error) {
      console.error("Error checking existing user:", error);
      return;
    }

    try {
      const response = await axios.post(
        "https://smartcliff-app.onrender.com/institute",
        {
          collegeName: collegeName,
          collegeEmail: collegeEmail,
          collegePhone: collegePhone,
          service: serviceType,
        }
      );

      console.log("Response:", response.data);

      if (response.status !== 404) {
        setFormSubmitted(true);
        console.log("Data Added");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
    }
  };

  const handleOrganizationFormSubmit = async (event) => {
    event.preventDefault();
    const { orgName, orgEmail, orgPhone, serviceType } = organizationForm;
    const errors = { ...organizationForm.errors };
    let hasErrors = false;

    if (!validateName(orgName)) {
      errors.orgName = "Invalid name";
      hasErrors = true;
    }
    if (!validateEmail(orgEmail)) {
      errors.orgEmail = "Invalid email";
      hasErrors = true;
    }
    if (orgPhone.trim() === "") {
      errors.orgPhone = "Please enter a phone number";
      hasErrors = true;
    }

    if (hasErrors) {
      setOrganizationForm({ ...organizationForm, errors });
      return;
    }

    setSuccessMessage("Form submitted successfull!");
    setErrorMessage("");
    setOrganizationForm({
      orgName: "",
      orgEmail: "",
      orgPhone: "",
      serviceType: "",
      errors: {
        orgName: "",
        orgEmail: "",
        orgPhone: "",
        serviceType: "",
      },
    });
    setTimeout(() => {
      setSuccessMessage(false);
    }, 1000);

    console.log({
      orgName,
      orgEmail,
      orgPhone,
    });

    //Corporate

    // Check if user already exists
    try {
      const response = await axios.get(
        `https://smartcliff-app.onrender.com/corporate?orgEmail=${organizationForm.email}`
      );
      if (response.data.orgEmail === email) {
        setErrorMessage("User already exists");
        setTimeout(() => {
          setErrorMessage("");
        }, 1000);
        return;
      }
    } catch (error) {
      console.error("Error checking existing user:", error);
      return;
    }

    //Post
    try {
      const response = await axios.post(
        "https://smartcliff-app.onrender.com/corporate",
        {
          orgName: orgName,
          orgEmail: orgEmail,
          orgPhone: orgPhone,
          service: serviceType,
        }
      );

      console.log("Response:", response.data);

      if (response.status !== 404) {
        console.log("Data Added");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <section id="Connect">
        <TitleComponent
          title={
            <span style={{ color: "#000" }}>
              Multi-Faceted Inquiry<span> Hub </span>
            </span>
          }
        />
        <div className="circles" sx={{ display: { xs: "none", sm: "block" } }}>
          <img src={"/assets/images/circles.png"} alt="" className="w-100" />
        </div>

        <Container component="main" maxWidth="md" className="Contact">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              alignItems: "center",
              minWidth: "100px",
              [defaultTheme.breakpoints.up("lg")]: {
                margin: "0px -150px",
              },
            }}>
            <Grid container spacing={4}>
              {/* For students form */}
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <Avatar sx={{ m: 1, bgcolor: "#ed4d01" }}>
                  <SchoolIcon />
                </Avatar>
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ fontWeight: "bold" }}>
                  Students
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleStudentFormSubmit}
                  sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        sx={{ width: "100%" }}
                        value={studentForm.firstName}
                        onChange={handleStudentFormChange}
                        error={!!studentForm.errors.firstName}
                        helperText={studentForm.errors.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        sx={{ width: "100%" }}
                        value={studentForm.lastName}
                        onChange={handleStudentFormChange}
                        error={!!studentForm.errors.lastName}
                        helperText={studentForm.errors.lastName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        sx={{ width: "100%" }}
                        value={studentForm.email}
                        onChange={handleStudentFormChange}
                        error={!!studentForm.errors.email}
                        helperText={studentForm.errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="phone"
                        label="Phone No"
                        type="phone"
                        id="phone"
                        autoComplete="new-phone"
                        sx={{ width: "100%" }}
                        value={studentForm.phone}
                        onChange={handleStudentFormChange}
                        error={!!studentForm.errors.phone}
                        helperText={studentForm.errors.phone}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        select
                        required
                        fullWidth
                        id="areaOfInterest"
                        label="Area of Interest"
                        name="areaOfInterest"
                        sx={{ width: "100%" }}
                        value={studentForm.areaOfInterest}
                        onChange={handleStudentFormChange}
                        error={!!studentForm.errors.areaOfInterest}
                        helperText={studentForm.errors.areaOfInterest}>
                        <MenuItem value="">Select an area of interest</MenuItem>
                        {categories.map((category) => (
                          <MenuItem
                            key={category.category_id}
                            value={category.category}>
                            {category.category}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}>
                    Submit
                  </Button>
                </Box>
              </Grid>

              {/* For colleges form */}
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <Avatar sx={{ m: 1, bgcolor: "#ed4d01" }}>
                  <AccountBalanceIcon />
                </Avatar>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ fontWeight: "bold" }}>
                  Institutions
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleCollegeFormSubmit}
                  sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="collegeName"
                        label="College Name"
                        name="collegeName"
                        autoComplete="organization"
                        sx={{ width: "100%" }}
                        value={collegeForm.collegeName}
                        onChange={handleCollegeFormChange}
                        error={!!collegeForm.errors.collegeName}
                        helperText={collegeForm.errors.collegeName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="collegeEmail"
                        label="College Email Address"
                        name="collegeEmail"
                        autoComplete="email"
                        sx={{ width: "100%" }}
                        value={collegeForm.collegeEmail}
                        onChange={handleCollegeFormChange}
                        error={!!collegeForm.errors.collegeEmail}
                        helperText={collegeForm.errors.collegeEmail}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="collegePhone"
                        label="College Phone No"
                        name="collegePhone"
                        autoComplete="Phone"
                        sx={{ width: "100%" }}
                        value={collegeForm.collegePhone}
                        onChange={handleCollegeFormChange}
                        error={!!collegeForm.errors.collegePhone}
                        helperText={collegeForm.errors.collegePhone}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        select // Use the select component for dropdown
                        required
                        fullWidth
                        id="ServiceType"
                        label="Get Service"
                        name="serviceType"
                        sx={{ width: "100%" }}
                        value={collegeForm.serviceType}
                        onChange={handleCollegeFormChange}
                        error={!!collegeForm.errors.serviceType}
                        helperText={collegeForm.errors.serviceType}>
                        <MenuItem value="">Select Service</MenuItem>
                        {services.map((category) => (
                          <MenuItem
                            key={category.s_id}
                            value={category.service}>
                            {category.service}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}>
                    Submit
                  </Button>
                </Box>
              </Grid>

              {/* For organizations form */}
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <Avatar sx={{ m: 1, bgcolor: "#ed4d01" }}>
                  <ApartmentIcon />
                </Avatar>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ fontWeight: "bold" }}>
                  Corporates
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleOrganizationFormSubmit}
                  sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="orgName"
                        label="Organization Name"
                        name="orgName"
                        autoComplete="organization"
                        sx={{ width: "100%" }}
                        value={organizationForm.orgName}
                        onChange={handleOrganizationFormChange}
                        error={!!organizationForm.errors.orgName}
                        helperText={organizationForm.errors.orgName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="orgEmail"
                        label="Organization Email Address"
                        name="orgEmail"
                        autoComplete="email"
                        sx={{ width: "100%" }}
                        value={organizationForm.orgEmail}
                        onChange={handleOrganizationFormChange}
                        error={!!organizationForm.errors.orgEmail}
                        helperText={organizationForm.errors.orgEmail}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="orgPhone"
                        label="Organization Phone No"
                        name="orgPhone"
                        autoComplete="Phone"
                        sx={{ width: "100%" }}
                        value={organizationForm.orgPhone}
                        onChange={handleOrganizationFormChange}
                        error={!!organizationForm.errors.orgPhone}
                        helperText={organizationForm.errors.orgPhone}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        select // Use the select component for dropdown
                        required
                        fullWidth
                        id="ServiceType"
                        label="Get Service"
                        name="serviceType"
                        sx={{ width: "100%" }}
                        value={organizationForm.serviceType}
                        onChange={handleOrganizationFormChange}
                        error={!!organizationForm.errors.serviceType}
                        helperText={organizationForm.errors.serviceType}>
                        <MenuItem value="">Select Service</MenuItem>
                        {services.map((category) => (
                          <MenuItem
                            key={category.s_id}
                            value={category.service}>
                            {category.service}
                          </MenuItem>
                        ))}
                        {/* Add more options as needed */}
                      </TextField>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}>
                    Submit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
        {errorMessage && (
          <Typography variant="body2" color="error" align="center">
            {errorMessage}
          </Typography>
        )}
        {successMessage && (
          <Typography variant="body2" color="primary" align="center">
            {successMessage}
          </Typography>
        )}
      </section>
    </ThemeProvider>
  );
}
