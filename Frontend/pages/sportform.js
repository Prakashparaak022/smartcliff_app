import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Divider,
  Grid,
  ThemeProvider,
  createTheme,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Paper
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { useRouter } from "next/router";

function SportHouse() {
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [adharNumber, setAdharNumber] = useState("");
  const [name, setName] = useState("");
  const [parentContactNumber, setParentContactNumber] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [address, setAddress] = useState("");
  const [currentTeam, setCurrentTeam] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [sports, setSports] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const router = useRouter();

  // Validations
  const [nameError, setNameError] = useState(false);
  const [adharError, setAdharError] = useState(false);
  const [admissionNumberError, setAdmissionNumberError] = useState(false);
  const [parentContactNumberError, setParentContactNumberError] =
    useState(false);
  const [parentNameError, setParentNameError] = useState(false);
  const [parentEmailError, setParentEmailError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [currentTeamError, setCurrentTeamError] = useState(false);
  const [heightError, setHeightError] = useState(false);
  const [weightError, setWeightError] = useState(false);
  const [sportsError, setSportsError] = useState(false);

  // handlechange da dani

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    setNameError(value === "");
  };

  const handleParentContactNumberChange = (event) => {
    const value = event.target.value;
    setParentContactNumber(value);
    setParentContactNumberError(value === "");
  };

  const handleParentNameChange = (event) => {
    const value = event.target.value;
    setParentName(value);
    setParentNameError(value === "");
  };

  const handleParentEmailChange = (event) => {
    const value = event.target.value;
    setParentEmail(value);
    setParentEmailError(value === "");
  };

  const handleAddressChange = (event) => {
    const value = event.target.value;
    setAddress(value);
    setAddressError(value === "");
  };

  const handleCurrentTeamChange = (event) => {
    const value = event.target.value;
    setCurrentTeam(value);
    setCurrentTeamError(value === "");
  };

  const handleAdmissionNumberChange = (event) => {
    const value = event.target.value;
    setAdmissionNumber(value);
    setAdmissionNumberError(value === "");
  };

  const handleAdharNumberChange = (event) => {
    const inputAdharNumber = event.target.value;
    setAdharNumber(inputAdharNumber);
    setAdharError(!isValidAdharNumber(inputAdharNumber));
  };

  const handleHeightChange = (event) => {
    const value = event.target.value;
    setHeight(value);
    setHeightError(value === "");
  };

  const handleWeightChange = (event) => {
    const value = event.target.value;
    setWeight(value);
    setWeightError(value === "");
  };

  const sportsList = [
    "Football",
    "Basketball",
    "Swimming",
    "Tennis",
    "Volleyball",
    "Badminton",
    "Running",
    "Cycling",
    "Yoga",
    "Cricket",
    "Kabaddi",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation checks for all fields
    if (
      !isValidAdmissionrNumber(admissionNumber) ||
      !name ||
      !parentContactNumber ||
      !parentName ||
      !parentEmail ||
      !address ||
      !currentTeam ||
      !height ||
      !weight ||
      !sports ||
      !isValidAdharNumber(adharNumber) ||
      !isValidPhoneNumber(parentContactNumber) ||
      !isValidPhoneNumber(mobileNumber)
    ) {
      // Set error states for invalid fields
      setAdmissionNumberError(!admissionNumber);
      setNameError(!name);
      setParentContactNumberError(!isValidPhoneNumber(parentContactNumber));
      setParentNameError(!parentName);
      setParentEmailError(!parentEmail);
      setAddressError(!address);
      setCurrentTeamError(!currentTeam);
      setHeightError(!height);
      setWeightError(!weight);
      setSportsError(!sports);
      return;
    }

    setFormSubmitted(true);
    router.push("/dashboard/sports");
  };

  const isValidAdharNumber = (adharNumber) => {
    return /^\d{12}$/.test(adharNumber); // 12-digit Aadhar number
  };  
  
  const isValidAdmissionrNumber = (admissionNumber) => {
    return /^[0-9]$/.test(admissionNumber); // 12-digit Aadhar number
  };

  const isValidPhoneNumber = (phoneNumber) => {
    return /^[6-9]\d{9}$/.test(phoneNumber); // 10-digit phone number starting with 6, 7, 8, or 9
  };

  // Function to calculate BMI
  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const weightInKg = weight;
    const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(
      2
    );
    return isNaN(bmiValue) ? "N/A" : bmiValue;
  };

  // Recommended sports based on BMI
  const recommendedSports = calculateRecommendedSports();

  function calculateRecommendedSports() {
    const bmiValue = parseFloat(calculateBMI());

    if (!isNaN(bmiValue)) {
      if (bmiValue < 16) {
        // Severe Thinness
        return ["Swimming", "Basketball", "Volleyball"];
      } else if (bmiValue >= 16 && bmiValue < 17) {
        // Moderate Thinness
        return ["Football", "Tennis", "Badminton"];
      } else if (bmiValue >= 17 && bmiValue < 18.5) {
        // Mild Thinness
        return ["Football", "Tennis", "Badminton"];
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        // Normal
        return ["Football", "Tennis", "Badminton"];
      } else if (bmiValue >= 25 && bmiValue < 30) {
        // Overweight
        return ["Running", "Cycling", "Jump Rope"];
      } else if (bmiValue >= 30 && bmiValue < 35) {
        // Obese Class I
        return ["Running", "Cycling", "Jump Rope"];
      } else if (bmiValue >= 35 && bmiValue < 40) {
        // Obese Class II
        return ["Running", "Cycling", "Jump Rope"];
      } else {
        // Obese Class III
        return ["Running", "Cycling", "Jump Rope"];
      }
    }

    return [];
  }

  const theme = createTheme({
    typography: {
      fontFamily: "Poppins, Arial, sans-serif",
      h4: {
        fontSize: "2rem",
        fontWeight: 500,
      },
    },
  });

  // const carouselImages = [
  //   <img
  //     src="https://wallpapercave.com/wp/wp5425877.jpg"
  //     alt="Carousel Image 1"
  //     style={{
  //       position: "relative",
  //       right: "70px",
  //       width: "90%",
  //     }}
  //   />,
  //   <img
  //     src="https://wallpaperaccess.com/full/4254924.jpg"
  //     alt="Carousel Image 2"
  //     style={{
  //       position: "relative",
  //       right: "200px",
  //     }}
  //   />,
  // ];

  // Unsplash api
  const [carouselImages, setCarouselImages] = useState([]);

  // Function to fetch random images from Unsplash
  const fetchRandomImages = async () => {
    const SPORTS = ["cricket","Volley ball","Football"]
    const API_URL = `https://api.unsplash.com/photos/random?query=${SPORTS.join(",")}&count=16&client_id=mDIfcA0AouaUgNxTId4ZHRrIVodzxQzPy4u1Fm5IHVQ`;

    try {
      const response = await axios.get(API_URL);
    console.log("Unsplash API response:", response.data);
    const imagesData = response.data;
    console.log("Images data:", imagesData);
    const images = imagesData.map((imageData) => (
      <img
        key={imageData.id}
        src={imageData.urls.regular}
        alt={imageData.alt_description}
        style={{width: "100%",height:"100%",objectFit: "cover"}}
      />
    ));
    setCarouselImages(images);
  } catch (error) {
    console.error("Error fetching random images from Unsplash:", error);
    setCarouselImages([]); 
  }
};

  useEffect(() => {
    fetchRandomImages();
  }, []);

  useEffect(() => {
    // Auto increment the index to switch images every 5 seconds
    const interval = setInterval(() => {
      setCarouselImages((prevImages) => {
        // Move the first image to the end to create infinite carousel effect
        const updatedImages = [...prevImages];
        const firstImage = updatedImages.shift();
        updatedImages.push(firstImage);
        return updatedImages;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages]);

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={6} style={{ overflow: "hidden",margin:"10px 40px",position: "relative" }}>
      <Grid container spacing={2}>
        {/* Carousel */}
        <Grid item xs={12} md={6}>
          <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Carousel showThumbs={false} showIndicators={false} infiniteLoop={true} autoPlay={true}>
              {carouselImages.length > 0 ? (
                carouselImages.map((image, index) => (
                  <div key={index} style={{ width: "100%", height: "733px" }}>
                    {image}
                  </div>
                ))
              ) : (
                <p>Loading images...</p>
              )}
            </Carousel>
          </div>
        </Grid>

        {/* Form */}
        <Grid item xs={12} md={6} style={{ overflowX: "hidden", zIndex: "5" }}>
          <Grid style={{ opacity: "0.8", zIndex: "-1" }}>
            <div className="circles" sx={{ display: { xs: "none", sm: "block" } }}>
              <img src={"/assets/images/circles.png"} alt="" style={{ marginTop: "-3rem", rotate: "90deg" }} />
            </div>
            <div className="circles" sx={{ display: { xs: "none", sm: "block" } }}>
              <img src={"/assets/images/circles.png"} alt="" style={{ marginTop: "-3rem" }} />
            </div>
          </Grid>
          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography variant="h4" style={{ fontWeight: "bold", textAlign: "center" }}>
              Sports Club Registration
            </Typography>
          </Box>
          <form style={{ height: "80vh", overflowY: "auto",margin:"10px" }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h3>Student Information</h3>
                <Divider style={{ margin: "16px 0" }} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Admission Number"
                  variant="outlined"
                  value={admissionNumber}
                  onChange={handleAdmissionNumberChange}
                  error={admissionNumberError}
                  style={{ backgroundColor: "#fff" }}
                  helperText={admissionNumberError && "Invalid Admission number. It should be a number"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Student Name"
                  variant="outlined"
                  value={name}
                  onChange={handleNameChange}
                  error={nameError}
                  style={{ backgroundColor: "#fff" }}
                  helperText={nameError && "This field cannot be empty."}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Student Email"
                  variant="outlined"
                  value={parentEmail}
                  onChange={handleParentEmailChange}
                  error={parentEmailError}
                  style={{ backgroundColor: "#fff" }}
                  helperText={parentEmailError && "This field cannot be empty."}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  variant="outlined"
                  value={parentContactNumber}
                  onChange={handleParentContactNumberChange}
                  error={parentContactNumberError}
                  style={{ backgroundColor: "#fff" }}
                  helperText={
                    parentContactNumberError &&
                    "Invalid phone number. It should be a 10-digit number starting with 6, 7, 8, or 9."
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  style={{ backgroundColor: "#fff" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Aadhar Number"
                  variant="outlined"
                  value={adharNumber}
                  onChange={handleAdharNumberChange}
                  error={adharError}
                  style={{ backgroundColor: "#fff" }}
                  helperText={adharError && "Invalid Aadhar number. It should be a 12-digit number."}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="House Name"
                  variant="outlined"
                  select
                  value={currentTeam}
                  onChange={handleCurrentTeamChange}
                  error={currentTeamError}
                  style={{ backgroundColor: "#fff" }}
                  helperText={currentTeamError && "This field cannot be empty."}
                >
                  <MenuItem value="Gryffindor">Gryffindor</MenuItem>
                  <MenuItem value="Hufflepuff">Hufflepuff</MenuItem>
                  <MenuItem value="Ravenclaw">Ravenclaw</MenuItem>
                  <MenuItem value="Slytherin">Slytherin</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Divider style={{ margin: "16px 0" }} />
              </Grid>
              <Grid item xs={12}>
                <h3>Physical Information</h3>
                <Divider style={{ margin: "16px 0" }} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Height (in cm)"
                  variant="outlined"
                  value={height}
                  onChange={handleHeightChange}
                  error={heightError}
                  style={{ backgroundColor: "#fff" }}
                  helperText={heightError && "This field cannot be empty."}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Weight (in kg)"
                  variant="outlined"
                  value={weight}
                  onChange={handleWeightChange}
                  error={weightError}
                  style={{ backgroundColor: "#fff" }}
                  helperText={weightError && "This field cannot be empty."}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="BMI Value"
                  variant="outlined"
                  value={calculateBMI()}
                  disabled
                  style={{ backgroundColor: "#fff" }}
                />
              </Grid>

              <Grid item xs={12}>
                <h3>Sports</h3>
                <Divider style={{ margin: "16px 0" }} />
                <FormControl fullWidth variant="outlined">
                  <TextField
                    select
                    label="Select Sports"
                    value={sports}
                    onChange={(event) => setSports(event.target.value)}
                    variant="outlined"
                    error={sportsError}
                    style={{ backgroundColor: "#fff" }}
                    helperText={sportsError && "This field cannot be empty."}
                  >
                    {sportsList.map((sport, index) => (
                      <MenuItem key={index} value={sport}>
                        {sport}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <h3>Recommended Sports</h3>
                <Divider style={{ margin: "16px 0" }} />
                {recommendedSports.length === 0 ? (
                  <Typography>
                    No recommended sports based on BMI value.
                  </Typography>
                ) : (
                  <FormControl fullWidth>
                    <InputLabel>Select Sports</InputLabel>
                    <Select
                      multiple
                      value={recommendedSports}
                      input={<OutlinedInput label="Select Sports" />}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {recommendedSports.map((sport, index) => (
                        <MenuItem key={index} value={sport}>
                          <Checkbox checked={true} />
                          <ListItemText primary={sport} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Grid>

              <Grid item xs={12}>
                <Divider style={{ margin: "16px 0" }} />
              </Grid>
              <Grid item xs={12}>
                <h3>Parent Information</h3>
                <Divider style={{ margin: "16px 0" }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Parent Contact Number"
                  variant="outlined"
                  value={parentContactNumber}
                  onChange={handleParentContactNumberChange}
                  error={parentContactNumberError}
                  style={{ backgroundColor: "#fff" }}
                  helperText={
                    parentContactNumberError &&
                    "Invalid phone number. It should be a 10-digit number starting with 6, 7, 8, or 9."
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Parent Name"
                  variant="outlined"
                  value={parentName}
                  onChange={handleParentNameChange}
                  error={parentNameError}
                  style={{ backgroundColor: "#fff" }}
                  helperText={parentNameError && "This field cannot be empty."}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Parent Email"
                  variant="outlined"
                  value={parentEmail}
                  onChange={handleParentEmailChange}
                  error={parentEmailError}
                  style={{ backgroundColor: "#fff" }}
                  helperText={parentEmailError && "This field cannot be empty."}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  variant="outlined"
                  value={address}
                  onChange={handleAddressChange}
                  error={addressError}
                  style={{ backgroundColor: "#fff" }}
                  helperText={addressError && "This field cannot be empty."}
                />
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" type="submit" style={{ marginTop: "16px" }}>
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default SportHouse;
