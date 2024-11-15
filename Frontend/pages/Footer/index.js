import { Container, Grid, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Link from 'next/link';

const footerQuickLinks = [
  {
    display: "Home",
    url: "/",
  },
  {
    display: "About Us",
    url: "/about",
  },
  {
    display: "Courses",
    url: "/Courses",
  },
  {
    display: "Services",
    url: "/services",
  },
];

const footerInfoLinks = [
  {
    display: "Software Development",
    url: "Courses?category=Software%20Development",
  },
  {
    display: "Automotive Embeded",
    url: "Courses?category=Automotive%20Embedded",
  },
  {
    display: "Testing Track",
    url: "Courses?category=Testing%20Track",
  },
  {
    display: "Mechanical Design",
    url: "Courses?category=Mechanical%20Design",
  },
];

const Footer = () => {
  return (
    <footer className="footer" style={{ background: '#fbfbfb' }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={3} md={6} className="mb-5" >
              <img src="https://smartcliff.in/assets/images/logo.png" alt="logo" style={{marginBottom:'10px',width:'70%'}} />
            <div className="follows" style={{marginLeft:'23px'}}>
              <Typography variant="body1" className="mb-0" style={{fontSize:'13px'}}>Follow us on social media</Typography>
              <span>
                <a href="https://www.facebook.com/smartcliff.in">
                  <Facebook sx={{
                    "&:hover": {
                      color: "#3b5998",
                    },
                  }} />
                </a>
              </span>
              <span>
                <a href="https://www.instagram.com/_smartcliff_/">
                  <Instagram sx={{
                    "&:hover": { color: "#fd5d93" }
                  }} />
                </a>
              </span>
              <span>
                <a href="https://www.linkedin.com/company/smartcliff/">
                  <LinkedIn sx={{
                    "&:hover": { color: '#0072b1' }
                  }} />
                </a>
              </span>
              <span>
                <a href="facebook.com">
                  <Twitter sx={{
                    "&:hover": { color: '#00acee' }
                  }} />
                </a>
              </span>
            </div>
          </Grid>

          <Grid item lg={3} md={6} className="mb-4">
            <Typography variant="h6" className="fw-bold" style={{fontSize:'15px'}}>Explore</Typography>
            <List className="link__list">
              {footerQuickLinks.map((item, index) => (
                <ListItem key={index} disablePadding className="border-0 ps-0 link__item">
                  <ListItemText className="links" primary={<Link href={item.url} style={{fontSize:'13px'}}>{item.display}</Link>} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item lg={3} md={6} className="mb-4">
            <Typography variant="h6" className="fw-bold" style={{fontSize:'15px'}}>Courses</Typography>
            <List className="link__list">
              {footerInfoLinks.map((item, index) => (
                <ListItem key={index} disablePadding className="border-0 ps-0 link__item">
                  <ListItemText className="links" primary={<Link href={item.url} style={{fontSize:'13px'}}>{item.display}</Link>} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item lg={3} md={6}>
            <Typography variant="h6" className="fw-bold" style={{fontSize:'15px'}}>Company</Typography>
            <Typography variant="body1" sx={{ marginBottom: '1rem', marginTop: '1rem',fontSize: '13px'}} ><LocationOnIcon style={{ color: "#ed4d01", verticalAlign: "middle", fontSize: '22px' }} />Address: Sylhet, Bangladesh</Typography>
            <Typography variant="body1" sx={{ marginBottom: '1rem' ,fontSize: '13px'}}><PhoneIcon style={{ color: "#ed4d01", verticalAlign: "middle", fontSize: '22px' }} /> Phone: +88 0123456789</Typography>
            <Typography variant="body1" sx={{ marginBottom: '1rem' ,fontSize: '13px'}}><EmailIcon style={{ color: "#ed4d01", verticalAlign: "middle", fontSize: '20px' }} />Email: example@gmail.com</Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
