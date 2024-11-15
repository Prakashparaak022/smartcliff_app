import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  TextField,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Grid,
  Paper,
  FormHelperText,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableCell,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MyModal from "./update";
import axios from "axios";
import { writeFile, utils } from "xlsx";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import jsPDF from "jspdf";
import "jspdf-autotable";


const AddTask = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [TitleError, setTitleError] = useState(false);
  const [DescriptionError, setDescriptionError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [carouselImages, setCarouselImages] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryValue, setEditingCategoryValue] = useState("");

  const exportFilteredCoursesToExcel = () => {
    const filteredCourses = filteredTasks.map((course) => ({
      Category: course.category,
      Title: course.c_title,
      Description: course.c_description,
    }));

    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(filteredCourses);

    utils.book_append_sheet(workbook, worksheet, "FilteredCourses");

    const excelFileName = "filtered_courses.xlsx";
    writeFile(workbook, excelFileName);
  };

  const exportFilteredCoursesToPDF = () => {
    const filteredCoursesData = filteredTasks.map((course) => ({
      Category: course.category,
      Title: course.c_title,
      Description: course.c_description,
    }));
  
    console.log("Titles:", filteredCoursesData.map((course) => course.Title));

    const tableData = filteredCoursesData.map((course,index) => [
      index +1,
      course.Category,
      course.Title,
      course.Description,
    ]);
  
    const doc = new jsPDF();
  
    doc.autoTable({
      head: [["SI No","Category", "Title", "Description"]],
      body: tableData,
      headStyles: {
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        textColor: [0, 0, 0],
      },
    });
  
    doc.save("Courses.pdf");
  };
  

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
    setDescriptionError(value === "");
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(value);
    setCategoryError(value === "");
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
    setTitleError(value === "");
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];

    if (!selectedImage) {
      setImage(null);
      setImageError(false);
    } else if (!isImageValid(selectedImage)) {
      setImage(null);
      setImageError(true);
    } else {
      setImage(selectedImage);
      setImageError(false);
    }
  };

  const handleEditCategory = (categoryId, categoryValue) => {
    setEditingCategoryId(categoryId);
    setEditingCategoryValue(categoryValue);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/categories", {
        category: editingCategoryValue,
      });
      fetchCategories();
      setEditingCategoryValue("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setEditingCategoryValue("");
  };

  const isImageValid = (file) => {
    const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
    return allowedFormats.includes(file.type);
  };

  //fetch
  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/courses");
      setCourses(response.data);
      console.log("Courses Fetched");
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
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

  // post
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description || !category || !image || !isImageValid(image)) {
      setTitleError(!title);
      setDescriptionError(!description);
      setCategoryError(!category);
      setImageError(!image || !isImageValid(image));
      fetchCourses();
      return;
    }

    const selectedImage = null;
    const formData = new FormData();
    formData.append("c_title", title);
    formData.append("c_description", description);
    formData.append("category", category);
    formData.append("image", selectedImage);

    const requestBody = {
      c_title: title,
      c_description: description,
      category: category,
    };

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/courses",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);

      if (response.status !== 404) {
        setFormSubmitted(true);
        setTitle("");
        setDescription("");
        setImage(null);
        setCategory("");
        setImageError(false);
        console.log("Course Added");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  //delete
  const deleteCourse = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/courses/${id}`
      );
      if (response.status === 200) {
        setCourses(courses.filter((course) => course.c_id !== id));
        console.log("Delete Successful!");
      }
    } catch (error) {
      console.error("Error deleting courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const updateCourse = (course) => {
    console.log("updateTask");
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedFilter(value);
    console.log("Selected filter:", value);
  };

  const filteredTasks = selectedFilter
    ? courses.filter((course) => course.category === selectedFilter)
    : courses;

  //Carousel
  const fetchRandomImages = async () => {
    const SPORTS = ["study", "Courses", "Book"];
    const API_URL = `https://api.unsplash.com/photos/random?query=${SPORTS.join(
      ","
    )}&count=3&client_id=mDIfcA0AouaUgNxTId4ZHRrIVodzxQzPy4u1Fm5IHVQ`;

    try {
      const response = await axios.get(API_URL);
      const imagesData = response.data;
      const images = imagesData.map((imageData) => (
        <img
          key={imageData.id}
          src={imageData.urls.regular}
          alt={imageData.alt_description}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
    const interval = setInterval(() => {
      setCarouselImages((prevImages) => {
        const updatedImages = [...prevImages];
        const firstImage = updatedImages.shift();
        updatedImages.push(firstImage);
        return updatedImages;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages]);

  return (
    <>
      <Container maxWidth="lg" style={{ marginTop: "3rem" }}>
        <div className="my-5">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid container spacing={2}>
              <Paper
                elevation={5}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Grid item xs={12} md={6}>
                  {/* Carousel */}
                  <Carousel
                    showThumbs={false}
                    showIndicators={false}
                    infiniteLoop={true}
                    autoPlay={true}
                  >
                    {carouselImages.length > 0 ? (
                      carouselImages.map((image, index) => (
                        <div
                          key={index}
                          style={{ width: "100%", height: "670px" }}
                        >
                          {image}
                        </div>
                      ))
                    ) : (
                      <p>Loading images...</p>
                    )}
                  </Carousel>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  {/* Form */}
                  <form
                    style={{ textAlign: "left", padding: "2rem" }}
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <InputLabel
                        id="course-title-label"
                        style={{ marginRight: "3px" }}
                      >
                        Course Title
                      </InputLabel>
                      <TextField
                        id="course-title-label"
                        variant="outlined"
                        fullWidth
                        name="title"
                        value={title}
                        onChange={handleTitleChange}
                        sx={{ marginBottom: "1rem" }}
                        error={TitleError}
                      />
                      {TitleError && (
                        <FormHelperText error>
                          Invalid Course Title.
                        </FormHelperText>
                      )}
                    </div>

                    <div>
                      <InputLabel id="course-description-label">
                        Course Description
                      </InputLabel>
                      <TextField
                        id="course-description-label"
                        variant="outlined"
                        fullWidth
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        sx={{ marginBottom: "1rem" }}
                        error={DescriptionError}
                      />
                      {DescriptionError && (
                        <FormHelperText error>
                          Invalid Description.
                        </FormHelperText>
                      )}
                    </div>

                    <div>
                      <InputLabel id="image-url-label">Image</InputLabel>
                      <TextField
                        id="image-url-label"
                        variant="outlined"
                        fullWidth
                        name="title"
                        disabled
                        value={image ? image.name : ""}
                        onChange={(e) => setImage(e.target.value)}
                        sx={{ marginBottom: "1rem" }}
                      />
                      {imageError && (
                        <FormHelperText error>
                          Unsupported Image Type
                        </FormHelperText>
                      )}
                    </div>

                    <div>
                      <InputLabel id="course-category-label">
                        Course Category
                      </InputLabel>
                      <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
                        <Select
                          id="course-category"
                          onChange={handleCategoryChange}
                          value={category}
                          error={categoryError}
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
                          <MenuItem value="add-category">Add Category</MenuItem>{" "}
                        </Select>
                        {categoryError && (
                          <FormHelperText error>
                            Please select a category.
                          </FormHelperText>
                        )}
                      </FormControl>
                      {category === "add-category" && (
                        <div>
                          <InputLabel id="add-category-label">
                            New Category
                          </InputLabel>
                          <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
                            <TextField
                              id="add-category-label"
                              variant="outlined"
                              value={editingCategoryValue}
                              onChange={(e) =>
                                setEditingCategoryValue(e.target.value)
                              }
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton onClick={handleSaveEdit}>
                                      <AddIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </FormControl>
                        </div>
                      )}
                    </div>

                    <div>
                      <Button
                        component="label"
                        fullWidth
                        color="secondary"
                        variant="contained"
                        style={{ marginBottom: "1rem" }}
                      >
                        Choose Image
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={handleImageUpload}
                        />
                      </Button>
                      <Typography variant="body2" color="primary">
                        *Accepts image formats (jpg, jpeg, png, gif, etc.)
                        <br />
                      </Typography>
                    </div>

                    <div style={{ textAlign: "left", marginTop: "1rem" }}>
                      <Button variant="contained" type="submit">
                        Add Course
                      </Button>
                    </div>
                  </form>
                </Grid>
              </Paper>
            </Grid>
          </div>
        </div>
        <section>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <select
              id="filter"
              value={selectedFilter}
              onChange={handleFilterChange}
              style={{ padding: ".5rem", fontSize: "17px" }}
            >
              <option value="">All</option>
              {Array.isArray(categories) && categories.length > 0 ? (
                Array.from(
                  new Set(categories.map((course) => course.category))
                ).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))
              ) : (
                <option value="">Loading categories...</option>
              )}
            </select>
            <Button
              variant="contained"
              color="success"
              onClick={exportFilteredCoursesToExcel}
              style={{ marginLeft: "1rem" }}
            >
              Export to Excel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={exportFilteredCoursesToPDF}
              style={{ marginLeft: "1rem" }}
            >
              Export to PDF
            </Button>
          </div>
          <Grid container spacing={2}>
            {filteredTasks.map((course, index) => (
              <Grid item xs={12} sm={6} md={4} key={course.c_id}>
                <Card
                  style={{
                    height: "450px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent>
                    {course.image_url && (
                      <img
                        src={`http://localhost:5000/${course.image_url}`}
                        alt={`Course ${course.c_id}`}
                        style={{ objectFit: "cover", width: "100%" }}
                      />
                    )}
                    <p>
                      <span style={{ fontWeight: "bold" }}>Category: </span>
                      {course.category}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Title: </span>
                      {course.c_title}
                    </p>
                  </CardContent>
                  <CardActions>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        position: "relative",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <h3>Actions:</h3>
                      </div>
                      <div>
                        <IconButton
                          color="primary"
                          onClick={() => updateCourse(course)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => deleteCourse(course.c_id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>
      </Container>
      {selectedCourse && (
        <MyModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedCourse(null);
          }}
          course={selectedCourse}
        />
      )}
    </>
  );
};
export default AddTask;
