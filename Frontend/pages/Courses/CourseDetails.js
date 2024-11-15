import React from "react";
import { Paper, Typography, Button } from "@mui/material";

const CourseDetails = ({ course, onClose }) => {
  if (!course) {
    return null;
  }

  return (
    <Paper
      elevation={3}
      style={{
        padding: "2rem",
        width: "1000px",
        height: "500px",
      }}>
      <Typography variant="h6" style={{ marginBottom: "1rem" }}>
        Category: {course.category || "No Category"}
      </Typography>
      <Typography variant="h4" style={{ marginBottom: "1rem" }}>
        {course.c_title}
      </Typography>
      <Typography variant="body1" style={{ marginBottom: "1rem" }}>
        {course.c_description}
      </Typography>
      <img
        src={
          course.image_url
            ? `https://smartcliff-app.onrender.com/${course.image_url}`
            : "/assets/images/Software.png"
        }
        alt={course.c_title}
        width={"100%"}
        style={{
          width: "40%",
          marginTop: "1rem",
          display: "block",
          margin: "0 auto",
        }}
      />

      <Button variant="contained" onClick={onClose}>
        Close
      </Button>
    </Paper>
  );
};

export default CourseDetails;
