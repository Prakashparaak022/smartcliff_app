import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToServer,
  deleteToServer,
  getFromServer,
} from "../../redux/taskSlice";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  Button,
  Container,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MyModal from "./update";
import { setSelectedTask } from "../../redux/taskSlice";
import { removeFromList } from "../../redux/taskSlice";

const AddTask = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [name, Setname] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const { tasksLists } = useSelector((state) => state.tasks);
  const db = useSelector((state) => state.tasks);

  const addTask = (e) => {
    e.preventDefault();
    console.log(title, description, name);
    dispatch(addToServer({ title, description, name, url }));
    setTitle("");
    setDescription("");
    Setname("");
    setUrl("");
  };

  const updateTask = (task) => {
    console.log("updateTask");
    setModalOpen(true);
    dispatch(setSelectedTask(task));
  };

  const deleteTask = (task) => {
    console.log("delete task");
    dispatch(deleteToServer(task))
      .unwrap()
      .then(() => dispatch(removeFromList(task)));
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const filteredTasks = selectedFilter
    ? tasksLists.filter((task) => task.name === selectedFilter)
    : tasksLists;

  useEffect(() => {
    dispatch(getFromServer());
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="lg">
        <div className="my-5">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <div style={{ flex: "1", marginRight: "1rem" }}>
              {/* Image */}
              <img
                src="/assets/images/CoursesImage.jpeg"
                alt="Course"
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ flex: "1" }}>
              <form style={{ textAlign: "center" }}>
                <TextField
                  label="Course Title"
                  variant="outlined"
                  fullWidth
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  sx={{ marginBottom: "1rem" }}
                />

                <TextField
                  label="Course Description"
                  variant="outlined"
                  fullWidth
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{ marginBottom: "1rem" }}
                />
                <TextField
                  label="Image Url"
                  variant="outlined"
                  fullWidth
                  name="title"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  sx={{ marginBottom: "1rem" }}
                />
                <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
                  <InputLabel id="course-description-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="course-description-label"
                    id="course-description"
                    onChange={(e) => Setname(e.target.value)}
                    value={name}
                    label="Course Description">
                    <MenuItem value="Software Development">
                      Software Development
                    </MenuItem>
                    <MenuItem value="Automotive Embeded">
                      Automotive Embeded
                    </MenuItem>
                    <MenuItem value="Functional Testing">
                      Functional Testing
                    </MenuItem>
                    <MenuItem value="Mechanical Design">
                      Mechanical Design
                    </MenuItem>
                  </Select>
                </FormControl>

                <div style={{ textAlign: "right" }}>
                  <Button variant="contained" onClick={addTask}>
                    Add Course
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <section>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
            }}>
            <select
              id="filter"
              value={selectedFilter}
              onChange={handleFilterChange}
              style={{ padding: ".5rem", fontSize: "17px" }}>
              <option value="">All</option>
              {Array.from(new Set(tasksLists.map((task) => task.name))).map(
                (name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                )
              )}
            </select>
          </div>
          <Grid container spacing={2}>
            {filteredTasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <Card
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}>
                  <CardContent>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Category: </span>
                      {task.name}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Title: </span>{" "}
                      {task.title}
                    </p>
                  </CardContent>
                  <CardMedia
                    component="img"
                    src={
                      task.url ? task.url : "/assets/images/CoursesImage.jpeg"
                    }
                    alt={task.url ? "Task Image" : "Default Image"}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <CardActions>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%",
                        alignItems: "center",
                      }}>
                      <div>
                        <h3>Actions:</h3>
                      </div>
                      <div>
                        <IconButton
                          color="primary"
                          onClick={() => updateTask(task)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => deleteTask(task)}>
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

      <MyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default AddTask;
