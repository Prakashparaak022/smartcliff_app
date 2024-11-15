import React, { useState,useEffect } from 'react';
import { Typography, Card, CardContent, Button, CardActions, Dialog, DialogTitle, DialogContent, DialogActions, IconButton ,Grid} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import TitleComponent from '../Header';
import EnquiryForm from '../quickenquiry';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const Courses = () => {
  const [openEnquiryForm, setOpenEnquiryForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const router = useRouter();

  const handleOpenEnquiryForm = (course) => {
    setSelectedCourse(course);
    setOpenEnquiryForm(true);
  };

  const handleCloseEnquiryForm = () => {
    setSelectedCourse(null);
    setOpenEnquiryForm(false);
  };

  const handleSubmitEnquiryForm = () => {
    handleCloseEnquiryForm();
    if (selectedCourse) {
      router.push(selectedCourse.route);
    }
  };


  const courseData = [
    {
      title: 'Software Development',
      image: '/assets/images/software.png',
      route: '/Courses?category=Software%20Development',
      description: 'Learn the fundamentals of software development and programming languages.',
    },
    {
      title: 'Automotive Embedded',
      image: '/assets/images/Embeded.png',
      route: '/Courses?category=Automotive%20Embedded',
      description: 'Explore the world of automotive embedded systems and their applications.',
    },
    {
      title: 'Testing Track',
      image: '/assets/images/testing.png',
      route: '/Courses?category=Testing%20Track',
      description: 'Master the art of software testing and quality assurance techniques.',
    },
    {
      title: 'Mechanical Design',
      image: '/assets/images/mechanical.png',
      route: '/Courses?category=Mechanical%20Design',
      description: 'Learn mechanical design principles and CAD software for product development.',
    },
  ];

  return (
    <>
    <main id='Courses'>
      <div className="orange">
        <img src={'/assets/images/orange.png'} alt="" className="w-100" />
        <div className='bulb'>
          <img src={'/assets/images/bulb.png'} style={{ top: '700px',zIndex:"-1" }} alt="" className="w-100 " />
        </div>
      </div>
      <TitleComponent title={<span style={{ color: '#000' }}>Courses<span className='students'> Offered</span></span>} />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem',padding:"2rem"}}>
        <Grid container spacing={2}>
          {courseData.map((course, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', minHeight: '400px' }}>
                <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                  <Image src={course.image} alt={course.title} layout='fill' objectFit='cover' />
                </div>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant='h5' component='h3' sx={{ fontWeight: 600 }}>
                    {course.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary' sx={{ marginTop: '1rem' }}>
                    {course.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Button variant='contained' color='primary' onClick={() => handleOpenEnquiryForm(course)}>
                    Know More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <Dialog open={openEnquiryForm} onClose={handleCloseEnquiryForm} maxWidth='sm' fullWidth>
        <DialogTitle>Quick Enquiry Form</DialogTitle>
        <DialogContent>
          <IconButton sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }} onClick={handleCloseEnquiryForm}>
            <CloseIcon />
          </IconButton>
          <EnquiryForm onClose={handleSubmitEnquiryForm} />
        </DialogContent>
      </Dialog>
    </main>
    </>
  );
};

export default Courses;
