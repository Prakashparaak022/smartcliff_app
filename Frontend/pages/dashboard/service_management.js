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
  Container,
  Paper,
  NoSsr,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Visibility, Delete } from "@mui/icons-material";
import { useRouter } from "next/router";
import SearchIcon from "@mui/icons-material/Search";

function ServiceManagement() {
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/services");
      setServices(response.data);
    } catch (error) {
      setError("Error fetching services: " + error.message);
    }
  };

  const deleteService = async (serviceId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/services/${serviceId}`);
      setServices((prevServices) =>
        prevServices.filter((service) => service.s_id !== serviceId)
      );
      console.log("Deleted successfully!");
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    setOpenModal(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredServices = services.filter((service) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      service.companyName.toLowerCase().includes(searchLower) ||
      service.s_email.toLowerCase().includes(searchLower) ||
      service.service.toLowerCase().includes(searchLower)
    );
  });

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
    fetchServices();
  }, []);

  return (
    <>
      <NoSsr>
        <Container>
         <Navbar />

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <h1 className="primary" style={{ color: "#f2705a" }}>
              Service Management
            </h1>
          </div>

          <TextField
            label="Search by Name,Email,Service Type"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{color:"#f16c56"}}>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ marginTop: "1rem" }}
          />

          {/* Table */}
          <Table
            component={Paper}
            style={{
              borderCollapse: "separate",
              borderSpacing: "0",
              marginTop: "5rem",
            }}
          >
            <TableHead style={{ backgroundColor: "#e4705d" }}>
              <TableRow className="text-center">
                <TableCell style={{ color: "#fff" }}>#</TableCell>
                <TableCell style={{ color: "#fff" }}>Company Name</TableCell>
                <TableCell style={{ color: "#fff" }}>Email</TableCell>
                <TableCell style={{ color: "#fff" }}>Service Type</TableCell>
                <TableCell style={{ color: "#fff" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredServices.map((service, index) => (
                <TableRow key={service.s_id} className="text-center">
                  <TableCell style={{ border: "1px solid #e0e0e0" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell style={{ border: "1px solid #e0e0e0" }}>
                    {service.companyName}
                  </TableCell>
                  <TableCell style={{ border: "1px solid #e0e0e0" }}>
                    {service.s_email}
                  </TableCell>
                  <TableCell style={{ border: "1px solid #e0e0e0" }}>
                    {service.service}
                  </TableCell>
                  <TableCell style={{ border: "1px solid #e0e0e0" }}>
                    <IconButton
                      variant="outlined"
                      onClick={() => handleOpenModal(service)}
                    >
                      <Visibility style={{ color: "#1976d2" }} />
                    </IconButton>
                    <IconButton
                      variant="contained"
                      onClick={() => deleteService(service.s_id)}
                    >
                      <Delete style={{ color: "#c11919" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Modal */}
          <Dialog
            open={openModal}
            onClose={handleCloseModal}
            maxWidth="2"
            style={{ fontSize: "18px" }}
          >
            <DialogTitle
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "30px",
              }}
            >
              Services<span style={{ color: "#ed4d01" }}> Form</span>
            </DialogTitle>
            <DialogContent sx={{ width: "500px", padding: "20px" }}>
              {selectedService && (
                <div>
                  <p>
                    <strong>Name:</strong> {selectedService.companyName}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedService.s_email}
                  </p>
                  <p>
                    <strong>Phone No:</strong> {selectedService.s_phoneNumber}
                  </p>
                  <p>
                    <strong>Service Type:</strong> {selectedService.service}
                  </p>
                  <p>
                    <strong>Requirement:</strong> {selectedService.requirement}
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

export default ServiceManagement;
