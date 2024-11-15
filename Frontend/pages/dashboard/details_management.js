import React, { useState, useEffect } from "react";
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
  Container,
  Paper,
  Typography,
  Avatar,
  NoSsr,
} from "@mui/material";
import { Visibility, Delete } from "@mui/icons-material";
import { useRouter } from "next/router";
import axios from "axios";
import {
  PersonOutlined as PersonOutlinedIcon,
  SchoolOutlined as SchoolOutlinedIcon,
  BusinessOutlined as BusinessOutlinedIcon,
} from "@mui/icons-material";
import Navbar from "./Navbar";

function DetailsManagement() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [selectedCorporate, setSelectedCorporate] = useState(null);
  const [details, setDetails] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [corporates, setCorporates] = useState([]);
  const [error, setError] = useState("");
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [openInstituteModal, setOpenInstituteModal] = useState(false);
  const [openCorporateModal, setOpenCorporateModal] = useState(false);
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("");
  const [filter, setFilter] = useState("students");

  const handleCardClick = (clickedFilter) => {
    setActiveFilter(clickedFilter);
    setFilter(clickedFilter);
  };

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("authenticated");
    console.log("isAuthenticated:", isAuthenticated);
    if (isAuthenticated === "true") {
    } else {
      console.log("Not authorized");
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    fetchDetails();
    fetchInstitutes();
    fetchCorporates();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      setDetails(response.data);
    } catch (err) {
      setError("Error fetching detail:" + err.message);
    }
  };

  const fetchInstitutes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/institute");
      setInstitutes(response.data);
    } catch (err) {
      setError("Error fetching institutes:" + err.message);
    }
  };

  const fetchCorporates = async () => {
    try {
      const response = await axios.get("http://localhost:5000/corporate");
      setCorporates(response.data);
    } catch (err) {
      setError("Error fetching corporates:" + err.message);
    }
  };

  //Delete
  const deleteStudent = async (studentId) => {
    try {
      await axios.delete(`http://localhost:5000/students/${studentId}`);
      fetchDetails();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const deleteInstitute = async (instituteId) => {
    try {
      await axios.delete(`http://localhost:5000/institute/${instituteId}`);
      fetchInstitutes();
    } catch (error) {
      console.error("Error deleting institute:", error);
    }
  };

  const deleteCorporate = async (corporateId) => {
    try {
      await axios.delete(`http://localhost:5000/corporate/${corporateId}`);
      fetchCorporates();
    } catch (error) {
      console.error("Error deleting corporate:", error);
    }
  };

  const handleOpenModal = (detail) => {
    setSelectedDetail(detail);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedDetail(null);
    setOpenModal(false);
  };

  const handleOpenStudentModal = (student) => {
    setSelectedStudent(student);
    setOpenStudentModal(true);
  };

  const handleCloseStudentModal = () => {
    setSelectedStudent(null);
    setOpenStudentModal(false);
  };

  const handleOpenInstituteModal = (institute) => {
    setSelectedInstitute(institute);
    setOpenInstituteModal(true);
  };

  const handleCloseInstituteModal = () => {
    setSelectedInstitute(null);
    setOpenInstituteModal(false);
  };

  const handleOpenCorporateModal = (corporate) => {
    setSelectedCorporate(corporate);
    setOpenCorporateModal(true);
  };

  const handleCloseCorporateModal = () => {
    setSelectedCorporate(null);
    setOpenCorporateModal(false);
  };

  return (
    <>
      <NoSsr>
        <Container>
          <Navbar />
          <section
            style={{
              marginTop: "10rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Paper
              elevation={3}
              onClick={() => handleCardClick("student")}
              style={{
                width: "30%",
                padding: "20px",
                backgroundColor:
                  activeFilter === "student" ? "#f2705a" : "#f0f0f0",
                color: activeFilter === "student" ? "#fff" : "#000",
                border: "2px solid #f2705a",
                fontSize: "19px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Avatar style={{ background: "#f2705a", marginBottom: "10px" }}>
                <PersonOutlinedIcon />
              </Avatar>
              <Typography
                variant="body2"
                style={{
                  fontWeight: "bolder",
                  fontFamily: "poppins",
                }}
              >
                Students Enquiries!
              </Typography>
            </Paper>

            <Paper
            elevation={3}
            onClick={() => handleCardClick('college')}
            style={{
              width: '30%',
              padding: '20px',
              backgroundColor: activeFilter === 'college' ? '#f2705a' : '#f0f0f0',
              color: activeFilter === 'college' ? '#fff' : '#000',
              border:'2px solid #f2705a',
              fontSize: '19px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
              <Avatar style={{ background: "#f2705a", marginBottom: "10px" }}>
                <SchoolOutlinedIcon />
              </Avatar>
              <Typography
                variant="body2"
                style={{
                  fontWeight: "bolder",
                  fontFamily: "poppins",
                }}
              >
                Institute Enquiries!
              </Typography>
            </Paper>

            <Paper
              elevation={3}
              onClick={() => handleCardClick("organization")}
              style={{
                width: "30%", // Adjust the width based on your design
                padding: "20px",
                backgroundColor:
                  activeFilter === "organization" ? "#f2705a" : "#f0f0f0",
                color: activeFilter === "organization" ? "#fff" : "#000",
                border: '2px solid #f2705a',
                fontSize: "19px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Avatar style={{ background: "#f2705a", marginBottom: "10px" }}>
                <BusinessOutlinedIcon />
              </Avatar>
              <Typography
                variant="body2"
                style={{
                  fontWeight: "bolder",
                  fontFamily: "poppins",
                }}
              >
                Corporate Enquiries!
              </Typography>
            </Paper>
          </section>

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <h1 className="primary" style={{ color: "#f2705a" }}>
              Details Management
            </h1>
            {/* <p className="text-center lead">{`Currently ${details.length} Service(s) available`}</p>
        {error !== "" ? <h5>{error}</h5> : null} */}
          </div>

          {/* Dropdown filter */}
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ padding: "0.5rem" }}
            >
              <option value="all">All</option>
              <option value="student">Student Enquiries</option>
              <option value="college">College Enquiries</option>
              <option value="organization">Organization Enquiries</option>
            </select>
          </div>

          {filter === "student" && (
            <div>
              <h2>
                Student<span style={{ color: "#ed4d01" }}> Enquiries:</span>
              </h2>
              <Table
                component={Paper}
                style={{
                  borderCollapse: "separate",
                  borderSpacing: "0",
                  marginTop: "2rem",
                }}
              >
                <TableHead style={{ backgroundColor: "#e4705d" }}>
                  <TableRow className="text-center">
                    <TableCell style={{ color: "#fff" }}>#</TableCell>
                    <TableCell style={{ color: "#fff" }}>First Name</TableCell>
                    <TableCell style={{ color: "#fff" }}>Last Name</TableCell>
                    <TableCell style={{ color: "#fff" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {details.map((detail, index) => (
                    <TableRow key={detail.std_id} className="text-center">
                      <TableCell style={{ border: "1px solid #e0e0e0" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell style={{ border: "1px solid #e0e0e0" }}>
                        {detail.std_firstName}
                      </TableCell>
                      <TableCell style={{ border: "1px solid #e0e0e0" }}>
                        {detail.std_lastName}
                      </TableCell>
                      <TableCell style={{ border: "1px solid #e0e0e0" }}>
                        <IconButton
                          variant="outlined"
                          onClick={() => handleOpenStudentModal(detail)}
                        >
                          <Visibility style={{ color: "#1976d2" }} />
                        </IconButton>
                        <IconButton
                          variant="contained"
                          onClick={() => deleteStudent(detail.std_id)}
                        >
                          <Delete style={{ color: "#c11919" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {filter === "college" && (
            <div>
              <h2>
                College<span style={{ color: "#ed4d01" }}> Enquiries:</span>
              </h2>
              <Table
                component={Paper}
                style={{
                  borderCollapse: "separate",
                  borderSpacing: "0",
                  marginTop: "2rem",
                }}
              >
                <TableHead style={{ backgroundColor: "#e4705d" }}>
                  <TableRow className="text-center">
                    <TableCell style={{ color: "#fff" }}>#</TableCell>
                    <TableCell style={{ color: "#fff" }}>
                      College Name
                    </TableCell>
                    <TableCell style={{ color: "#fff" }}>Email</TableCell>
                    <TableCell style={{ color: "#fff" }}>Phone</TableCell>
                    <TableCell style={{ color: "#fff" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {institutes.map((institute, index) => (
                    <TableRow key={institute.coll_id} className="text-center">
                      <TableCell style={{ border: "1px solid #e0e0e0" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell style={{ border: "1px solid #e0e0e0" }}>
                        {institute.collegeName}
                      </TableCell>
                      <TableCell style={{ border: "1px solid #e0e0e0" }}>
                        {institute.collegeEmail}
                      </TableCell>
                      <TableCell style={{ border: "1px solid #e0e0e0" }}>
                        {institute.collegePhone}
                      </TableCell>
                      <TableCell style={{ border: "1px solid #e0e0e0" }}>
                        <IconButton
                          variant="outlined"
                          onClick={() => handleOpenInstituteModal(institute)}
                        >
                          <Visibility style={{ color: "#1976d2" }} />
                        </IconButton>
                        <IconButton
                          variant="contained"
                          onClick={() => deleteInstitute(institute.coll_id)}
                        >
                          <Delete style={{ color: "#c11919" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {filter === "organization" && (
            <div>
              <h2>
                Organization
                <span style={{ color: "#ed4d01" }}> Enquiries:</span>
              </h2>
              <Table
                component={Paper}
                style={{
                  borderCollapse: "separate",
                  borderSpacing: "0",
                  marginTop: "2rem",
                }}
              >
                <TableHead style={{ backgroundColor: "#e4705d" }}>
                  <TableRow className="text-center">
                    <TableCell style={{ color: "#fff" }}>#</TableCell>
                    <TableCell style={{ color: "#fff" }}>
                      Organization Name
                    </TableCell>
                    <TableCell style={{ color: "#fff" }}>Email</TableCell>
                    <TableCell style={{ color: "#fff" }}>Phone</TableCell>
                    <TableCell style={{ color: "#fff" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {corporates.map((corporate, index) => (
                    <TableRow key={corporate.org_id} className="text-center">
                      <TableCell style={{ border: "1px solid #e0e0e0" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell style={{ border: "1px solid #e0e0e0" }}>
                        {corporate.orgName}
                      </TableCell>
                      <TableCell style={{ border: "1px solid #e0e0e0" }}>
                        {corporate.orgEmail}
                      </TableCell>
                      <TableCell style={{ border: "1px solid #e0e0e0" }}>
                        {corporate.orgPhone}
                      </TableCell>
                      <TableCell style={{ border: "1px solid #e0e0e0" }}>
                        <IconButton
                          variant="outlined"
                          onClick={() => handleOpenCorporateModal(corporate)}
                        >
                          <Visibility style={{ color: "#1976d2" }} />
                        </IconButton>
                        <IconButton
                          variant="contained"
                          onClick={() => deleteCorporate(corporate.org_id)}
                        >
                          <Delete style={{ color: "#c11919" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Container>
        <Dialog
          open={openStudentModal}
          onClose={handleCloseStudentModal}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "30px",
            }}
          >
            Student<span style={{ color: "#ed4d01" }}> Details</span>
          </DialogTitle>
          <DialogContent>
            {selectedStudent && (
              <div>
                <Typography>
                  <strong>First Name:</strong> {selectedStudent.std_firstName}
                </Typography>
                <Typography>
                  <strong>Last Name:</strong> {selectedStudent.std_lastName}
                </Typography>
                <Typography>
                  <strong>Student Email:</strong> {selectedStudent.std_email}
                </Typography>
                <Typography>
                  <strong>Student Phone:</strong> {selectedStudent.std_phone}
                </Typography>
                <Typography>
                  <strong>category:</strong> {selectedStudent.category}
                </Typography>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseStudentModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openInstituteModal}
          onClose={handleCloseInstituteModal}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "30px",
            }}
          >
            Institute<span style={{ color: "#ed4d01" }}> Details</span>
          </DialogTitle>
          <DialogContent>
            {selectedInstitute && (
              <div>
                <Typography>
                  <strong>College Name:</strong> {selectedInstitute.collegeName}
                </Typography>
                <Typography>
                  <strong>College Email:</strong>{" "}
                  {selectedInstitute.collegeEmail}
                </Typography>
                <Typography>
                  <strong>College Phone:</strong>{" "}
                  {selectedInstitute.collegePhone}
                </Typography>
                <Typography>
                  <strong>Service Type:</strong> {selectedInstitute.service}
                </Typography>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseInstituteModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openCorporateModal}
          onClose={handleCloseCorporateModal}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "30px",
            }}
          >
            Organization<span style={{ color: "#ed4d01" }}> Details</span>
          </DialogTitle>
          <DialogContent>
            {selectedCorporate && (
              <div>
                <Typography>
                  <strong>Organization Name:</strong>{" "}
                  {selectedCorporate.orgName}
                </Typography>
                <Typography>
                  <strong>Organization Email:</strong>{" "}
                  {selectedCorporate.orgEmail}
                </Typography>
                <Typography>
                  <strong>Organization Phone:</strong>{" "}
                  {selectedCorporate.orgPhone}
                </Typography>
                <Typography>
                  <strong>Service Type:</strong> {selectedCorporate.service}
                </Typography>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCorporateModal} variant="contained" color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </NoSsr>
    </>
  );
}

export default DetailsManagement;
