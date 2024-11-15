import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layout";
import { Grid, Paper, Typography, Modal, Button } from "@mui/material";
import QuickEnquiry from "../quickenquiry";
import Link from "next/link";
import { useRouter } from "next/router";
import CourseDetails from "./CourseDetails";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openCourseModal, setOpenCourseModal] = useState(false);
  const router = useRouter();
  const queryCategory = router.query.category;
  const [clickedApply, setClickedApply] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(queryCategory || "");
  const [selectedCourse, setSelectedCourse] = useState(null);

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

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/courses");
      setCourses(response.data);
      console.log("UI fetching");
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchCourses();
  }, []);

  useEffect(() => {
    setSelectedFilter(queryCategory || "");
  }, [queryCategory]);

  const handleFilterChange = async (event) => {
    const selectedCategory = event.target.value;
    setSelectedFilter(selectedCategory);
    console.log("Selected Category:", selectedCategory);

    setSelectedFilter(selectedCategory);

    if (selectedCategory) {
      try {
        const response = await axios.get(
          `http://localhost:5000/courses?category=${selectedCategory}`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    } else {
      fetchCourses();
    }
  };

  const handleOpenModal = (course) => {
    setOpenModal(true);
    setClickedApply(true);
  };

  const handleOpeCoursenModal = (course) => {
    setOpenCourseModal(true);
    setSelectedCourse(course);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenCourseModal(false);
    setSelectedCourse(null);
  };

  return (
    <section>
      <Layout>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <label htmlFor="filter">
            <h1>Filter by:</h1>
          </label>
          <select
            id="filter"
            value={selectedFilter}
            onChange={handleFilterChange}
            style={{ padding: ".5rem", fontSize: "17px", marginLeft: ".4rem" }}
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
        {courses.filter(
          (course) =>
            selectedFilter === "" || selectedFilter === course.category
        ).length === 0 && (
          <Paper elevation={3} style={{ padding: "2rem", marginTop: "2rem" }}>
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  style={{ textAlign: "center", marginBottom: "2rem" }}
                >
                  Oops, it looks like there are no courses assigned yet.
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  x
                  src="/assets/images/courses404.gif"
                  alt="No Courses Found"
                  style={{
                    display: "block",
                    margin: "0 auto",
                    maxWidth: "100%",
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        )}

        <Grid container spacing={2} justifyContent="center">
          {courses.map(
            (course, index) =>
              (selectedFilter === "" || selectedFilter === course.category) && (
                <Grid
                  item
                  xs={10}
                  key={course.c_id}
                  style={{ padding: "2rem" }}
                >
                  <Paper elevation={3} style={{ overflow: "hidden" }}>
                    <Grid
                      container
                      className={`courses-card ${
                        index % 2 === 0 ? "even" : "odd"
                      }`}
                    >
                      {/* Conditional rendering based on even or odd index */}
                      {index % 2 === 0 ? (
                        <>
                          <Grid className="course-grid" item xs={12} md={6}>
                            {/* Content */}
                            <Typography
                              variant="h4"
                              style={{
                                fontWeight: "bold",
                                marginBottom: "2rem",
                              }}
                            >
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
                              }}
                            >
                              <Link href="/apply">
                                <Button
                                  variant="contained"
                                  sx={{
                                    marginRight: "1rem",
                                  }}
                                >
                                  Apply Now
                                </Button>
                              </Link>
                              <Button
                                variant="contained"
                                sx={{
                                  marginRight: "1rem",
                                }}
                                onClick={handleOpenModal}
                              >
                                Quick Enquiry
                              </Button>

                              <Button
                                variant="contained"
                                onClick={() => handleOpeCoursenModal(course)}
                              >
                                View More
                              </Button>
                            </div>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            {/* Image */}
                            {course.image_url && (
                              <img
                                src={
                                  `http://localhost:5000/${course.image_url}`
                                    ? `http://localhost:5000/${course.image_url}`
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
                            )}
                          </Grid>
                        </>
                      ) : (
                        <>
                          <Grid item xs={12} md={6}>
                            {/* Image */}
                            {course.image_url && (
                              <img
                                src={
                                  `http://localhost:5000/${course.image_url}`
                                    ? `http://localhost:5000/${course.image_url}`
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
                            )}
                          </Grid>
                          <Grid className="course-grid" item xs={12} md={6}>
                            {/* Content */}
                            <Typography
                              variant="h4"
                              style={{
                                fontWeight: "bold",
                                marginBottom: "2rem",
                              }}
                            >
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
                              }}
                            >
                              <Link href="/apply">
                                <Button
                                  variant="contained"
                                  sx={{
                                    marginRight: "1rem",
                                  }}
                                >
                                  Apply Now
                                </Button>
                              </Link>
                              <Button
                                variant="contained"
                                sx={{
                                  marginRight: "1rem",
                                }}
                                onClick={handleOpenModal}
                              >
                                Quick Enquiry
                              </Button>

                              <Button
                                variant="contained"
                                onClick={() => handleOpeCoursenModal(course)}
                              >
                                View More
                              </Button>
                            </div>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Paper>
                </Grid>
              )
          )}
        </Grid>

        <Modal
          open={openCourseModal}
          onClose={handleCloseModal}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
            <CourseDetails course={selectedCourse} onClose={handleCloseModal} />
        </Modal>

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <QuickEnquiry onClose={handleCloseModal} />
        </Modal>
      </Layout>
    </section>
  );
}

export default Courses;
