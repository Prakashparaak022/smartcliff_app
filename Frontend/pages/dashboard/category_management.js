import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Container, TextField, Button, Box,NoSsr } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from './Navbar';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel'; 
import { useRouter } from 'next/router';

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategory, setEditedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const router = useRouter()
  

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("authenticated");
    console.log("isAuthenticated:", isAuthenticated);
    if (isAuthenticated === "true") {
    } else {
      console.log("Not authorized");
      router.push("/login");
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/categories');
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        console.error('Invalid categories data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditCategory = (categoryId, categoryTitle) => {
    console.log("Editing category with ID:", categoryId);
    setEditingCategoryId(categoryId);
    setEditedCategory(categoryTitle);
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setEditedCategory('');
  };

  const handleSaveEdit = async () => {
    if (editedCategory.trim() === '') {
      return;
    }

    try {
      await axios.put(`http://localhost:5000/categories/${editingCategoryId}`, { category: editedCategory });
      fetchCategories();
      setEditingCategoryId(null);
      setEditedCategory('');
    } catch (error) {
      console.error('Error editing category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:5000/categories/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() === '') {
      return;
    }

    try {
      await axios.post('http://localhost:5000/categories', { category: newCategory });
      fetchCategories();
      setNewCategory('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <>
        <NoSsr>
      <Navbar />
      <Container maxWidth="md" style={{ marginTop: '140px' }}>
      <h2 style={{textAlign:"center"}}>Category<span style={{ color: "#ed4d01" }}> Management</span></h2>
        <Box display="flex" alignItems="center" marginBottom="1rem">
          <TextField
            variant="outlined"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            style={{ marginRight: '1rem' }}
          />
          <Button variant="contained" color="primary" onClick={handleAddCategory}
          style={{ width: '300px',height:"50px" }}
          >
            Add Category
          </Button>
        </Box>
        <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
          <Table>
            <TableHead style={{ backgroundColor: '#e4705d' }}>
              <TableRow>
                <TableCell style={{color:"#fff"}}>Title</TableCell>
                <TableCell style={{color:"#fff"}} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.category_id}>
                  <TableCell>
                    {editingCategoryId === category.category_id ? (
                      <TextField
                        fullWidth
                        value={editedCategory}
                        onChange={(e) => setEditedCategory(e.target.value)}
                      />
                    ) : (
                      category.category
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingCategoryId === category.category_id ? (
                      <>
                        <IconButton onClick={handleSaveEdit}>
                          <SaveIcon />
                        </IconButton>
                        <IconButton onClick={handleCancelEdit}>
                          <CancelIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => handleEditCategory(category.category_id, category.category)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteCategory(category.category_id)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      </NoSsr>
    </>
  );
}

export default CategoryManagement;
