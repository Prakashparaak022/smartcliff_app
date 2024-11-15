import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Modal, Button } from "@mui/material";
import TitleComponent from "../Header";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import QuickEnquiry from "../quickenquiry";
import CancelIcon from "@mui/icons-material/Cancel";
import Link from "next/link";
import axios from "axios";

const EmbeddedCourses = () => {
  const [category, setCategory] = useState([]);
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "https://smartcliff-app.onrender.com/courses"
      );
      setCourses(response.data);
      console.log("UI fetching");
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    setCategory(
      courses.filter((course) => course.category === "Automotive Embedded")
    );
  }, [courses]);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <section>
        <TitleComponent
          title={<span style={{ color: "#000" }}>Automotive Embedded</span>}
        />
        <Grid container spacing={2} justifyContent="center">
          {category.map((course) => {
            const isImageOnRight = course.c_id % 2 === 0;

            return (
              <Grid
                item
                lg={10}
                sm={6}
                md={6}
                key={course.c_id}
                style={{ padding: "2rem" }}>
                <Paper elevation={3} style={{ overflow: "hidden" }}>
                  <Grid container className="courses-card">
                    {isImageOnRight ? (
                      <>
                        <Grid className="course-grid" item xs={6}>
                          <Typography
                            variant="h4"
                            style={{
                              fontWeight: "bold",
                              marginBottom: "2rem",
                            }}>
                            {course.c_title}
                          </Typography>
                          <Typography variant="p">
                            {course.c_description}
                          </Typography>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "1rem",
                            }}>
                            <Link href="/apply">
                              <Button
                                variant="contained"
                                sx={{
                                  marginRight: "1rem",
                                }}
                                endIcon={
                                  <ArrowForwardIcon sx={{ color: "#000" }} />
                                }>
                                Apply Now
                              </Button>
                            </Link>
                            <Button
                              variant="contained"
                              sx={{
                                marginLeft: "1rem",
                              }}
                              endIcon={
                                <ArrowForwardIcon sx={{ color: "#000" }} />
                              }
                              onClick={handleOpenModal}>
                              Quick Enquiry
                            </Button>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <img
                            src={
                              course.url
                                ? course.url
                                : "/assets/images/Software.png"
                            }
                            alt={course.c_title}
                            width={"70%"}
                            style={{
                              width: "100%",
                              marginTop: "1rem",
                              display: "block",
                              margin: "0 auto",
                            }}
                          />
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid item xs={6}>
                          <img
                            src={
                              course.url
                                ? course.image_url
                                : "/assets/images/Software.png"
                            }
                            alt={course.c_title}
                            width={"70%"}
                            style={{
                              width: "100%",
                              marginTop: "1rem",
                              display: "block",
                              margin: "0 auto",
                            }}
                          />
                        </Grid>
                        <Grid className="course-grid" item xs={6}>
                          <Typography
                            variant="h4"
                            style={{
                              fontWeight: "bold",
                              marginBottom: "2rem",
                            }}>
                            {course.c_title}
                          </Typography>
                          <Typography variant="p">
                            {course.c_description}
                          </Typography>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "1rem",
                            }}>
                            <Link href="/apply">
                              <Button
                                variant="contained"
                                sx={{
                                  marginRight: "1rem",
                                }}
                                endIcon={
                                  <ArrowForwardIcon sx={{ color: "#000" }} />
                                }>
                                Apply Now
                              </Button>
                            </Link>
                            <Button
                              variant="contained"
                              sx={{
                                marginLeft: "1rem",
                              }}
                              endIcon={
                                <ArrowForwardIcon sx={{ color: "#000" }} />
                              }
                              onClick={handleOpenModal}>
                              Quick Enquiry
                            </Button>
                          </div>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </section>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <QuickEnquiry onClose={handleCloseModal} />
      </Modal>
    </>
  );
};

export default EmbeddedCourses;
