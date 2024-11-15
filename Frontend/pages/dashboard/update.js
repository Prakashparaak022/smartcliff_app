import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

const MyModal = ({ open, onClose, course }) => {
  const [title, setTitle] = useState(course ? course.c_title : "");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState(
    course ? course.c_description : ""
  );
  const [image, setImage] = useState(course ? course.image_url || "" : "");
  const [Category, SetCategory] = useState(course ? course.category : "");

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
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

  const updateCourse = async () => {
    onClose();
  
    try {
      const formData = new FormData();
      formData.append("c_title", title);
      formData.append("c_description", description);
      formData.append("category", Category);
      if (image instanceof File) {
        formData.append("image", image);
      }
  
      const response = await axios.patch(
        `http://localhost:5000/courses/${course.c_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Updated Successfully!");
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ marginBottom: "1rem" }}>Update Course</DialogTitle>
      <DialogContent>
        <TextField
          label="Course Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: "1rem", marginTop: "0.5rem" }}
        />
        <TextField
          label="Course Description"
          variant="outlined"
          fullWidth
          value={description}
          sx={{ marginBottom: "1rem" }}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Image"
          variant="outlined"
          fullWidth
          value={image ? image.name : ""}
          disabled
          sx={{ marginBottom: "1rem" }}
        />

        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
          <InputLabel id="course-description-label">Category</InputLabel>
          <Select
            labelId="course-description-label"
            id="course-description"
            onChange={(e) => SetCategory(e.target.value)}
            sx={{ marginBottom: "1rem" }}
            value={Category}
            label="Course Description"
          >
            {categories.map((category) => (
              <MenuItem key={category.category_id} value={category.category}>
                {category.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          component="label"
          fullWidth
          color="secondary"
          variant="contained"
        >
          Update Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </Button>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={updateCourse}>
          Update Course
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MyModal;
