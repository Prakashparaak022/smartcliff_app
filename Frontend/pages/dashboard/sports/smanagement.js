import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  IconButton,
  Container
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Sportstable() {
  return (
    <Container style={{maxWidth:"100%"}}>
      <TableContainer component={Paper} >
        <Table>
          <TableHead style={{ background: "linear-gradient(to right top, #ffab7a, #f2705a" }}>
            <TableRow>
              <TableCell
                style={{ color: "#fff", fontWeight: "bold", fontSize: "18px" }}
              >
                Admission Number
              </TableCell>
              <TableCell
                style={{ color: "#fff", fontWeight: "bold", fontSize: "18px" }}
              >
                Student Name
              </TableCell>
              <TableCell
                style={{ color: "#fff", fontWeight: "bold", fontSize: "18px" }}
              >
                Student Email
              </TableCell>
              <TableCell
                style={{ color: "#fff", fontWeight: "bold", fontSize: "18px" }}
              >
                Parent Number
              </TableCell>
              <TableCell
                style={{ color: "#fff", fontWeight: "bold", fontSize: "18px" }}
              >
                Interested Sports
              </TableCell>
              <TableCell
                style={{ color: "#fff", fontWeight: "bold", fontSize: "18px" }}
              >
                House Name
              </TableCell>
              <TableCell
                style={{ color: "#fff", fontWeight: "bold", fontSize: "18px" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>123456</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>john.doe@example.com</TableCell>
              <TableCell>9876543210</TableCell>
              <TableCell>Football</TableCell>
              <TableCell>Blue House</TableCell>
              <TableCell>
                <IconButton aria-label="edit" color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" style={{ color: '#dc5353' }}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>789012</TableCell>
              <TableCell>Jane Smith</TableCell>
              <TableCell>jane.smith@example.com</TableCell>
              <TableCell>1234567890</TableCell>
              <TableCell>Basketball</TableCell>
              <TableCell>Red House</TableCell>
              <TableCell>
                <IconButton aria-label="edit" color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" style={{ color: '#dc5353' }}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            {/* Add more rows as needed */}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
  );
}

export default Sportstable;
