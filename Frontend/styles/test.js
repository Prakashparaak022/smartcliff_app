import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { Modal as BootstrapModal } from "react-bootstrap";
import axios from "axios";

const CourseTable = () => {
  
  const CourseUrl = "http://localhost:8000/courses";

  const [courseList, setCourseList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [updateUI,setUpdateUI] = useState(false);
  const [editedCourse, setEditedCourse] = useState({
    cid: null,
    ctitle: "",
    cdesc: "",
    cdur: "",
    ccategory: "",
    cimage: null,
  });

  const categories = [
    "software testing",
    "software development",
    "embedded software",
    "analytics",
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(CourseUrl);
      const data = response.data;
      setCourseList(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [updateUI]);

  const updateCourse = (course) => {
    setSelectedCourse(course);
    setEditedCourse({ ...course });
    setModalShow(true);
  };

  const deleteCourse = async (courseId) => {
    try {
      await axios.delete(`${CourseUrl}/${courseId}`);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const showDeleteWarning = (courseId) => {
    setCourseToDelete(courseId);
    setShowWarningModal(true);
  };

  const handleDeleteConfirmation = () => {
    if (courseToDelete) {
      deleteCourse(courseToDelete);
      setShowWarningModal(false);
      setCourseToDelete(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedCourse((prev) => ({
        ...prev,
        cimage: file,
      }));
    }
  };
  

  const handleSave = async () => {
    try {
      if (!editedCourse.ctitle || !editedCourse.ccategory) {
        console.log("Title and Category cannot be null or empty");
        return;
      }
      const formData = new FormData();
      formData.append("ctitle", editedCourse.ctitle);
      formData.append("cdesc", editedCourse.cdesc);
      formData.append("cdur", editedCourse.cdur);
      formData.append("ccategory", editedCourse.ccategory);
  
      if (editedCourse.cimage !== null) {
        formData.append("image", editedCourse.cimage);
      } else {
        formData.append("cimage", editedCourse.cimage);
      }
      
  
      const response = await axios.put(
        `${CourseUrl}/${editedCourse.cid}`,
        formData
      );

      // console.log(response.data);
      // setUpdateUI(prevState => ! prevState);
      fetchData();
      const updatedCourse = response.data;
      setCourseList((prevCourseList) =>
        prevCourseList.map((course) =>
          course.cid === updatedCourse.cid ? updatedCourse : course
        )
      );
      setModalShow(false);
      setSelectedCourse(null);
      setEditedCourse({
        cid: null,
        ctitle: "",
        cdesc: "",
        cdur: "",
        ccategory: "",
        cimage: null,
      });
    } catch (err) {
      console.log("Update Failed", err);
    }
  };

  const handleCancel = () => {
    setEditedCourse({
      cid: null,
      ctitle: "",
      cdesc: "",
      cdur: "",
      ccategory: "",
      cimage: null,
    });
    setModalShow(false);
    setSelectedCourse(null);
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <div className="row justify-content-md-center mt-5">
        <div className="col-12">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#C69B7B" }}>
                  <TableCell style={{ fontWeight: "bolder", fontSize: "17px" }}>
                    #
                  </TableCell>
                  <TableCell style={{ fontWeight: "bolder", fontSize: "17px" }}>
                    Title
                  </TableCell>
                  <TableCell style={{ fontWeight: "bolder", fontSize: "17px" }}>
                    Description
                  </TableCell>
                  <TableCell style={{ fontWeight: "bolder", fontSize: "17px" }}>
                    Duration
                  </TableCell>
                  <TableCell style={{ fontWeight: "bolder", fontSize: "17px" }}>
                    Image
                  </TableCell>
                  <TableCell style={{ fontWeight: "bolder", fontSize: "17px" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courseList.map((course, index) => (
                  <TableRow key={course.cid}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{course.ctitle}</TableCell>
                    <TableCell>{course.cdesc}</TableCell>
                    <TableCell>{course.cdur}</TableCell>
                    <TableCell>
                      {course.cimage && (
                        <img
                          src={`http://localhost:8000/${course.cimage}`}
                          alt={`Course ${course.cid}`}
                          style={{ width: "50px", height: "auto" }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          width: "100px",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="inherit"
                          className="mb-5"
                          onClick={() => updateCourse(course)}
                        >
                          <BsPencilSquare /> Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => showDeleteWarning(course.cid)}
                        >
                          <BsTrash /> Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      {selectedCourse && (
        <Modal
          open={modalShow}
          onClose={handleCancel}
          encType="multipart/form-data"
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "1rem",
              maxHeight: "80vh", // Limit the modal's height
              overflowY: "auto", // Add scrollbar if content overflows
            }}
          >
            <h2>Edit Course</h2>
            <TextField
              label="Title"
              fullWidth
              style={{ marginBottom: "1rem" }}
              value={editedCourse?.ctitle || ""}
              onChange={(e) =>
                setEditedCourse((prev) => ({ ...prev, ctitle: e.target.value }))
              }
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              style={{ marginBottom: "1rem" }}
              value={editedCourse?.cdesc || ""}
              onChange={(e) =>
                setEditedCourse((prev) => ({ ...prev, cdesc: e.target.value }))
              }
            />
            <TextField
              label="Duration"
              type="number"
              fullWidth
              style={{ marginBottom: "1rem" }}
              value={editedCourse?.cdur || ""}
              onChange={(e) =>
                setEditedCourse((prev) => ({ ...prev, cdur: e.target.value }))
              }
            />
            {/* Replace the TextField with Select */}
            <Select
              label="Category"
              fullWidth
              style={{ marginBottom: "1rem" }}
              value={editedCourse?.ccategory || ""}
              onChange={(e) =>
                setEditedCourse((prev) => ({
                  ...prev,
                  ccategory: e.target.value,
                }))
              }
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            <input
              type="file"
              accept="image/*"
              style={{ marginBottom: "1rem" }}
              onChange={(e) => handleImageChange(e)}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "1rem",
              }}
            >
              <div style={{display: "flex", gap: "2rem"}}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="contained" onClick={handleCancel}>
                Cancel
              </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <BootstrapModal
        show={showWarningModal}
        onHide={() => setShowWarningModal(false)}
      >
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>Warning</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>
          <p>
            If you delete this course, it will be permanently deleted. Are you
            sure you want to proceed?
          </p>
        </BootstrapModal.Body>
        <BootstrapModal.Footer style={{display: "flex", gap: "2rem"}}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeleteConfirmation}
          >
            Yes, Delete
          </Button>
          <Button
            variant="contained"
            onClick={() => setShowWarningModal(false)}
          >
            Cancel
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </div>
  );
};

export default CourseTable;


import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Heading from "./Heading";
import axios from "axios";

const AddCourse = () => {

  const CourseUrl = "http://localhost:8000/courses";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null); // Store the selected image file
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    duration: "",
    category: "",
    image: "",
  });

  const validateInput = (name, value) => {
    // ... (your existing validation code)
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const addCourse = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("duration", duration);
      formData.append("category", category);
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(CourseUrl, formData);

      setTitle("");
      setDescription("");
      setDuration("");
      setCategory("");
      setImage(null);

      console.log(formData)

      console.log("Course added successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pb-5 container">
      <Heading />
      <div className="row">
        <div className="col-8 container" style={{ margin: "auto", alignItems: "center" }}>
          
          <form onSubmit={addCourse} encType="multipart/form-data">

            <TextField
              label="Title"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                validateInput("title", e.target.value);
              }}
              error={errors.title !== ""}
              helperText={errors.title}
              margin="normal"
            />

            <TextField
              label="Description"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                validateInput("description", e.target.value);
              }}
              error={errors.description !== ""}
              helperText={errors.description}
              margin="normal"
              type="text"
            />

            <TextField
              label="Duration"
              fullWidth
              variant="outlined"
              type="number"
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
                validateInput("duration", e.target.value);
              }}
              error={errors.duration !== ""}
              helperText={errors.duration}
              margin="normal"
            />

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  validateInput("category", e.target.value);
                }}
                error={errors.category !== ""}
              >
                <MenuItem value="">
                  <em>Select a category</em>
                </MenuItem>
                <MenuItem value="software development">
                  Software Development
                </MenuItem>
                <MenuItem value="software testing">Software Testing</MenuItem>
                <MenuItem value="embedded software">Embedded Software</MenuItem>
                <MenuItem value="analytics">Analytics</MenuItem>
              </Select>
              {errors.category && (
                <div
                  className="MuiFormHelperText-root Mui-error"
                  style={{color: "red"}}
                >
                  {errors.category}
                </div>
              )}
            </FormControl>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              margin="normal"
            />

            <div className="text-center mt-4">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{backgroundColor: "#332C39"}}
              >
                Add Course
              </Button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
};

export default AddCourse;


const mysql = require("mysql2");
const path = require("path");


// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// app.use(express.static("public"));

// Create a new course - POST
const createCourse = (req, res) => {

  const {title, description, duration, category} = req.body;
  const imagePath = req.file ? "public/images/" + req.file.filename : null;

    // Log the data received before any further processing
    console.log("Received Data:");
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Duration:", duration);
    console.log("Category:", category);
    console.log("Image Path:", imagePath);
  
  const query =
    "INSERT INTO courses (ctitle, cdesc, cdur, ccategory, cimage) VALUES (?, ?, ?, ?, ?)";
    pool.query(
      query,
      [title, description, duration, category, imagePath],
      (err, result) => {
        if (err) {
          console.error("Error inserting data:", err);
          res.status(500).json({ error: "An error occurred" });
        } else {
          // Log success and sent response
          console.log("Course added successfully");
          res.status(200).json({ message: "Course added successfully" });
        }
      }
    );
};



// Get all courses - GET
const getCourses = (req, res) => {
  const selectQuery = "SELECT * FROM courses";

  pool.query(selectQuery, (err, results) => {
    if (err) {
      console.error("Error getting courses:", err);
      res.status(400).json({error: err.message});
    } else {
      res.status(200).json(results);
    }
  });
};



// Get a single course by its id - GET
const getSingleCourse = (req, res) => {
  const {id} = req.params;
  if (!Number.isInteger(Number(id))) {
    return res.status(404).json({error: "Course not Found"});
  }

  const selectQuery = "SELECT * FROM courses WHERE cid = ?";
  pool.query(selectQuery, [id], (err, results) => {
    if (err) {
      console.error("Error getting single course:", err);
      res.status(400).json({error: err.message});
    } else {
      if (results.length === 0) {
        return res.status(404).json({error: "Course not Found"});
      }
      res.status(200).json(results[0]);
    }
  });
};


const updateCourse = (req, res) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id))) {
    return res.status(404).json({ error: "Course not Found" });
  }

  console.log("Received Update Request for Course ID:", id);

  const updateQuery =
    "UPDATE courses SET ctitle = ?, cdesc = ?, cdur = ?, ccategory = ?, cimage = ? WHERE cid = ?";
  const { ctitle, cdesc, cdur, ccategory } = req.body;
  const imagePath = req.file ? "public/images/" + req.file.filename : null;

  if (imagePath === null) {
    // If imagePath is not provided, fetch the existing cimage path from the database
    pool.query(
      "SELECT cimage FROM courses WHERE cid = ?",
      [id],
      (err, results) => {
        if (err) {
          console.error("Error fetching existing image path:", err);
          return res.status(400).json({ error: err.message });
        }

        const existingImagePath = results[0].cimage;
        pool.query(
          updateQuery,
          [ctitle, cdesc, cdur, ccategory, existingImagePath, id],
          (updateErr) => {
            if (updateErr) {
              console.error("Error updating course:", updateErr);
              res.status(400).json({ error: updateErr.message });
            } else {
              res.status(200).json({
                ctitle,
                cdesc,
                cdur,
                ccategory,
                cimage: existingImagePath,
                cid: id,
              });
            }
          }
        );
      }
    );
  } else {
    pool.query(
      updateQuery,
      [ctitle, cdesc, cdur, ccategory, imagePath, id],
      (err) => {
        if (err) {
          console.error("Error updating course:", err);
          res.status(400).json({ error: err.message });
        } else {
          res.status(200).json({
            ctitle,
            cdesc,
            cdur,
            ccategory,
            cimage: imagePath,
            cid: id,
          });
        }
      }
    );
  }
};

// Delete a course by its id - DELETE
const deleteCourse = (req, res) => {
  const {id} = req.params;
  if (!Number.isInteger(Number(id))) {
    return res.status(404).json({error: "Course not Found"});
  }

  const deleteQuery = "DELETE FROM courses WHERE cid = ?";
  pool.query(deleteQuery, [id], (err) => {
    if (err) {
      console.error("Error deleting course:", err);
      res.status(400).json({error: err.message});
    } else {
      res.status(200).json({cid: id});
    }
  });
};

module.exports = {
  createCourse,
  getCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};