import React, { useState } from "react";
import Layout from "../Layout";
import TitleComponent from "../Header";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, Grid, Typography, Paper } from "@mui/material";
import ServicesForm from "./ServicesForm";

function TrainingCard({ title, description, image, buttonText, buttonLink, onApplyNow }) {
  return (
    <Grid item lg={6} md={12} sm={12} className="course-grid">
      <div className="htd-training" style={{ padding: "1rem" }}>
        <div className="description">
          <Typography variant="body1" style={{ fontSize: "17px", textAlign: "justify" }}>
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

function HTD() {
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
    title: "HTD (Hire Train Deploy) Training",
    description:
      "HTD (Hire Train Deploy) is an innovative program designed to bridge the gap between skills demand and talent supply in the high-tech industry. HTD focuses on empowering individuals with the necessary training and expertise to meet the specific needs of companies seeking skilled professionals. Through HTD, participants gain comprehensive hands-on training in high-tech design principles and techniques, equipping them with the knowledge and skills needed to excel in various domains such as software development, data analytics, artificial intelligence, and more.",
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
            <Paper elevation={3} style={{ overflow: "hidden", background: "#fdf0eb" }}>
              <Grid container className="courses-card" alignItems="center">
                <TrainingCard {...trainingContent} onApplyNow={handleOpenServicesForm} />
                <Grid item lg={6} sm={12} sx={{display: {lg:"block",sm:"none",md:"none"}}}>
                  <img
                    src={trainingContent.image}
                    alt="Training"
                    width={"70%"}
                    style={{ width: "100%", marginTop: "1rem", margin: "0 auto",
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Layout>
      <ServicesForm open={openServicesForm} 
      initialService="HTD"
      onClose={handleCloseServicesForm} onSubmit={handleSubmitServicesForm} />
    </section>
  );
}

export default HTD;




// <section>
// <div className="dots2">
//   <img src={"/assets/images/dots.png"} alt="" />
// </div>
// <Layout>
//   <TitleComponent title={trainingContent.title} />
//   <Grid container spacing={2} justifyContent="center">
//     <Grid item lg={10} style={{ padding: "2rem" }}>
//       <Paper elevation={3} style={{ overflow: "hidden", background: "#fdf0eb" }}>
//       <Grid className="course-grid" item xs={12} md={6}>
//           <TrainingCard {...trainingContent} onApplyNow={handleOpenServicesForm} />
//         </Grid>
//           <Grid className="course-grid" item xs={12} md={6}>
//             <img
//               src={trainingContent.image}
//               alt="Training"
//               width={"70%"}
//               style={{ width: "100%", marginTop: "1rem", display: "block", margin: "0 auto" }}
//             />
//           </Grid>
//       </Paper>
//     </Grid>
//   </Grid>
// </Layout>
// <ServicesForm open={openServicesForm} 
// initialService="HTD"
// onClose={handleCloseServicesForm} onSubmit={handleSubmitServicesForm} />
// </section>