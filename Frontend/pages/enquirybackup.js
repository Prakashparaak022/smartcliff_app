import React, { useState } from 'react';
import { Container, Grid, TextField, Button } from '@mui/material';
import Layout from './Layout/index';
import TitleComponent from './Header';

const EnquiryForms = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    areaOfInterest: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Perform form submission or other actions here
      console.log(formData);
      // Reset the form
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        areaOfInterest: '',
        message: '',
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (formData.name.trim() === '') {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name should only contain letters and spaces';
      isValid = false;
    }

    if (formData.email.trim() === '') {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (formData.phoneNumber.trim() === '') {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (!/^[0-9]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'name':
        if (value.trim() === '') {
          newErrors.name = 'Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          newErrors.name = 'Name should only contain letters and spaces';
        } else {
          delete newErrors.name;
        }
        break;
      case 'email':
        if (value.trim() === '') {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'Invalid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'phoneNumber':
        if (value.trim() === '') {
          newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^[0-9]+$/.test(value)) {
          newErrors.phoneNumber = 'Invalid phone number';
        } else {
          delete newErrors.phoneNumber;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  return (
    <Layout>
      <div className="circles" sx={{ mt: 1, display: { xs: 'none', sm: 'block' } }}>
        <img src={'/assets/images/circles.png'} alt="" className="w-100" />
      </div>
      <section id="Enquiry">
        <Container maxWidth="md" sx={{ mt: 4, color: '#000', padding: '2rem', borderRadius: '8px' }}>
          <TitleComponent title={<span style={{ color: '#000' }}>Enquiry<span> Now</span></span>} />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  color="primary"
                  inputProps={{
                    pattern: '^[a-zA-Z\s]+$',
                    title: 'Name should only contain letters and spaces',
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  color="primary"
                  inputProps={{
                    pattern: '\\S+@\\S+\\.\\S+',
                    title: 'Invalid email address',
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                  color="primary"
                  inputProps={{
                    pattern: '^[0-9]+$',
                    title: 'Invalid phone number',
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Area of Interest"
                  name="areaOfInterest"
                  value={formData.areaOfInterest}
                  onChange={handleChange}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </section>
    </Layout>
  );
};

export default EnquiryForms;
