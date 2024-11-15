import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import {
  Table,
  Button,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Container,
  NoSsr,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Visibility, Delete } from "@mui/icons-material";
import { useRouter } from "next/router";
import SearchIcon from "@mui/icons-material/Search";

function apply_management() {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("authenticated");
    console.log("isAuthenticated:", isAuthenticated);
    if (isAuthenticated !== "true") {
      console.log("Not authorized");
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/applications");
      setApplications(response.data);
    } catch (error) {
      setError("Error fetching applications: " + error.message);
    }
  };

  const deleteApplication = async (applicationId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/applications/${applicationId}`);
      setApplications((prevApplications) =>
        prevApplications.filter(
          (application) => application.a_form_id !== applicationId
        )
      );
      console.log("Deleted successfully!");
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const handleOpenModal = (application) => {
    setSelectedApplication(application);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
    setOpenModal(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredApplications = applications.filter((application) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      application.a_name.toLowerCase().includes(searchLower) ||
      application.a_email.toLowerCase().includes(searchLower) ||
      application.a_category.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <NoSsr>
        <Container>
          <Navbar />
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <h1 className="primary" style={{ color: "#f2705a" }}>
              Applications Management
            </h1>
            <TextField
              label="Search by Name, Email, Category"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ color: "#f16c56" }}>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ marginTop: "1rem" }}
            />
          </div>

          <Paper component={Paper} style={{ marginTop: "2rem" }}>
            <Table>
              <TableHead style={{ backgroundColor: "#e4705d" }}>
                <TableRow className="text-center">
                  <TableCell style={{ color: "#fff" }}>#</TableCell>
                  <TableCell style={{ color: "#fff" }}>Name</TableCell>
                  <TableCell style={{ color: "#fff" }}>Email</TableCell>
                  <TableCell style={{ color: "#fff" }}>Category</TableCell>
                  <TableCell style={{ color: "#fff" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredApplications.map((application, index) => (
                  <TableRow key={application.a_form_id} className="text-center">
                    <TableCell style={{ border: "1px solid #e0e0e0" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell style={{ border: "1px solid #e0e0e0" }}>
                      {application.a_name}
                    </TableCell>
                    <TableCell style={{ border: "1px solid #e0e0e0" }}>
                      {application.a_email}
                    </TableCell>
                    <TableCell style={{ border: "1px solid #e0e0e0" }}>
                      {application.a_category}
                    </TableCell>
                    <TableCell style={{ border: "1px solid #e0e0e0" }}>
                      <IconButton
                        variant="outlined"
                        onClick={() => handleOpenModal(application)}
                      >
                        <Visibility style={{ color: "#1976d2" }} />
                      </IconButton>
                      <IconButton
                        variant="contained"
                        onClick={() => deleteApplication(application.a_form_id)}
                      >
                        <Delete style={{ color: "#c11919" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          <Dialog
            open={openModal}
            onClose={handleCloseModal}
            maxWidth="sm"
            style={{ fontSize: "18px" }}
          >
            <DialogTitle
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "23px",
              }}
            >
              <span style={{ color: "#f2705a" }}>Application</span> Details
            </DialogTitle>
            <DialogContent sx={{ width: "500px", padding: "20px" }}>
              {selectedApplication && (
                <div>
                  <p>
                    <strong>Name:</strong> {selectedApplication.a_name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedApplication.a_email}
                  </p>
                  <p>
                    <strong>Mobile Number:</strong>{" "}
                    {selectedApplication.a_mobileNumber}
                  </p>
                  <p>
                    <strong>Degree:</strong> {selectedApplication.a_degree}
                  </p>
                  <p>
                    <strong>Year of Passing:</strong>{" "}
                    {selectedApplication.a_yearOfPassing}
                  </p>
                  <p>
                    <strong>Marks Percentage:</strong>{" "}
                    {selectedApplication.a_marksPercentage}
                  </p>
                  <p>
                    <strong>Category:</strong> {selectedApplication.a_category}
                  </p>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} variant="contained" color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </NoSsr>
    </>
  );
}

export default apply_management;
