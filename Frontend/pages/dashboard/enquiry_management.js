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
  NoSsr ,
  TextField,
  InputAdornment, 
} from "@mui/material";
import { Visibility, Delete } from "@mui/icons-material";
import {useRouter} from "next/router";
import SearchIcon from "@mui/icons-material/Search";


function EnquiryManagement() {
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [enquirys, setEnquirys] = useState([]);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {   
    const isAuthenticated = sessionStorage.getItem('authenticated');
    console.log('isAuthenticated:', isAuthenticated); 
    if (isAuthenticated === "true") {
    } else {
      console.log('Not authorized');
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/enquiry");
      setEnquirys(response.data);
    } catch (error) {
      setError("Error fetching enquiries: " + error.message);
    }
  };

  const deleteEnquiry = async (enquiryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/enquiry/${enquiryId}`);
      setEnquirys((prevEnquiries) =>
        prevEnquiries.filter((enquiry) => enquiry.e_id !== enquiryId)
      );
      console.log("Deleted successfully!");
    } catch (error) {
      console.error("Error deleting enquiry:", error);
    }
  };

  const handleOpenModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedEnquiry(null);
    setOpenModal(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredEnquiries = enquirys.filter((enquiry) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      enquiry.e_name.toLowerCase().includes(searchLower) ||
      enquiry.e_email.toLowerCase().includes(searchLower) ||
      enquiry.category.toLowerCase().includes(searchLower)
    );
  });


  return (
    <>
        <NoSsr>
    <Container>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <h1 className="primary" style={{ color: "#f2705a" }}>
          Enquiry Management
        </h1>
        {/* <p className="text-center lead">{`Currently ${enquirys.length} Enquiry(s) available`}</p>
        {error !== "" ? <h5>{error}</h5> : null} */}
      </div>

      {/* Table */}

      <TextField
            label="Search by Name,Email,Category"
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

      <Table component={Paper} style={{ borderCollapse: "separate", borderSpacing: "0",marginTop:"5rem" }}>
        <TableHead style={{ backgroundColor: '#e4705d' }}>
          <TableRow className="text-center">
            <TableCell style={{color:"#fff" }}>#</TableCell>
            <TableCell style={{color:"#fff"}}>Name</TableCell>
            <TableCell style={{color:"#fff" }}>Email</TableCell>
            <TableCell style={{color:"#fff"}}>Category</TableCell>
            <TableCell style={{color:"#fff" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredEnquiries.map((enquiry, index) => (
            <TableRow key={enquiry.e_id} className="text-center">
              <TableCell style={{ border: "1px solid #e0e0e0" }}>
                {index + 1}
              </TableCell>
              <TableCell style={{ border: "1px solid #e0e0e0" }}>
                {enquiry.e_name}
              </TableCell>
              <TableCell style={{ border: "1px solid #e0e0e0" }}>
                {enquiry.e_email}
              </TableCell>
              <TableCell style={{ border: "1px solid #e0e0e0" }}>
                {enquiry.category}
              </TableCell>
              <TableCell style={{ border: "1px solid #e0e0e0" }}>
                <IconButton variant="outlined" onClick={() => handleOpenModal(enquiry)}>
                  <Visibility style={{color:"#1976d2"}} />
                </IconButton>
                <IconButton
                  variant="contained"
                  onClick={() => deleteEnquiry(enquiry.e_id)}
                >
                 <Delete style={{color:"#c11919"}} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

   {/* Modal */}
   <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm"
   style={{fontSize:"18px"}}>
  <DialogTitle style={{textAlign:"center",fontWeight:"bold",fontSize:"23px"}}><span style={{color: "#f2705a" }}>Enquiry</span> Details</DialogTitle>
  <DialogContent sx={{ width: "500px", padding: "20px" }}>
    {selectedEnquiry && (
      <div>
        <p><strong>Name:</strong> {selectedEnquiry.e_name}</p>
        <p><strong>Email:</strong> {selectedEnquiry.e_email}</p>
        <p><strong>Phone No:</strong> {selectedEnquiry.e_phone_number}</p>
        <p><strong>Message:</strong> {selectedEnquiry.message}</p>
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

export default EnquiryManagement;
