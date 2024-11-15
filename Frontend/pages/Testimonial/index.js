import React from 'react';
import Slider from 'react-slick';
import Avatar from '@mui/material/Avatar';
import TitleComponent from '../Header';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import UserImg from '../../public/assets/images/ChrishHems.jpg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,         
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section id='Testimonials' style={{marginLeft:"50px"}}>
      <TitleComponent title={<span style={{ color: '#000' }}>What our <span className='students'>Trainess</span> Say</span>} />
      <div className="carousel-container">
        <Slider {...settings}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="testimonial-card">
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <div className="User_img">
                    <Avatar src={'/assets/images/ChrishHems.jpg'} alt="Avatar" style={{ width: '100px', height: '100px' }} />
                  </div>
                </Grid>
                <Grid item>
                  <CardContent>
                    <Typography variant="h5" component="h3" className="User_title">Daniel Scott</Typography>
                  </CardContent>
                </Grid>
                <Grid item>
                  <CardContent className='Card_body'>
                    <Typography variant="body2">Practice sessions and clear concept delivery help me enhance my skills and knowledge.</Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="testimonial-card">
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <div className="User_img">
                    <Avatar src={'/assets/images/ChrishHems.jpg'} alt="Avatar" style={{ width: '100px', height: '100px' }} />
                  </div>
                </Grid>
                <Grid item>
                  <CardContent>
                    <Typography variant="h5" component="h3" className="User_title">Bala Shelby</Typography>
                  </CardContent>
                </Grid>
                <Grid item>
                  <CardContent className='Card_body'>
                    <Typography variant="body2">Practice sessions and clear concept delivery help me enhance my skills and knowledge.</Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="testimonial-card">
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <div className="User_img">
                    <Avatar src={'/assets/images/ChrishHems.jpg'} alt="Avatar" style={{ width: '100px', height: '100px' }} />
                  </div>
                </Grid>
                <Grid item>
                  <CardContent>
                    <Typography variant="h5" component="h3" className="User_title">Mano Author</Typography>
                  </CardContent>
                </Grid>
                <Grid item>
                  <CardContent className='Card_body'>
                    <Typography variant="body2">Practice sessions and clear concept delivery help me enhance my skills and knowledge.</Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Slider>
      </div>
    </section>
  );
};

export default Testimonial;
