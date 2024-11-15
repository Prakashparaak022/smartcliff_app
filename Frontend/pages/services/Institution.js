import React, { useState } from "react";
import Layout from "../Layout";
import TitleComponent from "../Header";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Typography,
  Paper
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ServicesForm from "./ServicesForm";

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
            }}
          >
            {description}
          </Typography>
        </div>
        <div style={{display:'flex',flexGrow:'1',marginTop:'15px'}}>
          <Button
            variant="contained"
            color="primary"
            onClick={onApplyNow}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </Grid>
  );
}

function InstitutionTraining() {
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

  const trainingContent = {
    title: "Institution Training",
    description:
      "Our Institution Training program provides specialized training for educational institutions to equip educators and staff with the necessary skills and knowledge in various areas. We offer comprehensive training programs tailored to meet the specific needs of institutions, covering topics such as curriculum development, instructional strategies, assessment techniques, and educational technology integration. Our expert trainers will guide participants through engaging workshops and hands-on activities, empowering them to deliver high-quality education and create a conducive learning environment. Join us in our Institution Training and transform your institution's educational practices.",
    image: "/assets/images/training.png",
    buttonText: "Get Service",
    buttonLink: "/apply",
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
            <Paper elevation={3} style={{ overflow: "hidden", background: '#fdf0eb' }}>
              <Grid container className="courses-card" alignItems="center">
              <TrainingCard {...trainingContent} onApplyNow={handleOpenServicesForm} />
              <Grid item lg={6} sm={12} sx={{display: {lg:"block",sm:"none",md:"none"}}}>
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
      <ServicesForm open={openServicesForm}
      initialService="Institution Training"
       onClose={handleCloseServicesForm} onSubmit={handleSubmitServicesForm} />
    </section>
  );
}

export default InstitutionTraining;