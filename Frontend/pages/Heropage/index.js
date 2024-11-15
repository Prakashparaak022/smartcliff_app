import Image from "next/image";
import heroImg from "../../public/assets/images/Smartcilff_logo.png";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const HeroSection = () => {
  const handleSearch = () => {
    const searchValue = document.getElementById("searchField").value.toLowerCase();
  
    const softwareSearchInputs = ["java", ".net","software","Automative","MERN","MEAN","Fullstack",];

    const embededSearchInputs = ["embedded","Automative","SENSOR","Certified Agile Tester"];

    const testSearchInputs = ["testing","Software"];

    const mechanicalSearchInputs = ["mechanical","FLuid Mechanical","Machine Learning","Thermo Dynamics"];
  
    if (softwareSearchInputs.includes(searchValue)) {
      window.location.href = "/Courses?category=Software%20Development";
    }
      
    if (embededSearchInputs.includes(searchValue)) {
      window.location.href = "/Courses?category=Automotive%20Embedded";
    }
      
    if (testSearchInputs.includes(searchValue)) {
      window.location.href = "/Courses?category=Testing%20Track";
    }
      
    if (mechanicalSearchInputs.includes(searchValue)) {
      window.location.href = "//Courses?category=Mechanical%20Design";
    }
  };
  
  return (
    <section id="Hero">
      <Container className="Hero-contents">
        <Grid container spacing={2}>
          <Grid item lg={8} md={8}>
            <div className="hero_content">
              <Typography
                variant="h2"
                component="h2"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Learn without <span>limits</span>
              </Typography>
              <Typography
                variant="body1"
                component="p"
                gutterBottom
                sx={{ fontSize: 25 }}
              >
                We are on a mission to address the digital skills gap for 10 Million+ <br />
                young professionals, train and empower them to forge a career path into future tech
              </Typography>
            </div>
            <div className="search" style={{ marginTop: "3rem" }}>
              <TextField
                type="text"
                placeholder="What do you want to learn?"
                id="searchField"
                sx={{
                  borderRadius: "90px",
                  "& input": {
                    height: "5px",
                    width: "200px",
                    border:'3px solid #7ca9fe'
                  },
                }}
              />
              <Button
                variant="contained"
                className="btn"
                sx={{ marginLeft: "5px",background:"#7ca9fe !important",height: "40px"}}
                onClick={handleSearch}
              >
                <SearchIcon />
              </Button>
            </div> 
          </Grid>

          <Grid item lg={4} md={4} className="hide-on-small-device">
            <Image src={heroImg} alt="" className="w-100 hero_img" />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default HeroSection;
