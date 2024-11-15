import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateToServer } from "../../redux/taskSlice";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const MyModal = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(0);
  const [url, setUrl] = useState("");
  const [name, Setname] = useState("");
  const { selectedTask } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const updateTask = () => {
    onClose();
    dispatch(updateToServer({ id, title, description, name, url }));
  };
  useEffect(() => {
    if (Object.keys(selectedTask).length !== 0) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setId(selectedTask.id);
      Setname(selectedTask.name);
      setUrl(selectedTask.url);
    }
  }, [selectedTask]);

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
          label="Image Url"
          variant="outlined"
          fullWidth
          name="title"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{ marginBottom: "1rem" }}
        />
        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
          <InputLabel id="course-description-label">Category</InputLabel>
          <Select
            labelId="course-description-label"
            id="course-description"
            onChange={(e) => Setname(e.target.value)}
            sx={{ marginBottom: "1rem" }}
            value={name}
            label="Course Description">
            <MenuItem value="Software Development">
              Software Development
            </MenuItem>
            <MenuItem value="Automotive Embedded">Automotive Embeded</MenuItem>
            <MenuItem value="Functional Testing">Functional Testing</MenuItem>
            <MenuItem value="Mechanical Design">Mechanical Design</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={updateTask}>
          Update Course
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MyModal;
