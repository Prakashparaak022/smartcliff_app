import React from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Layout from "../Layout/index";
import CountUp from "react-countup";
import Link from "next/link";

const AboutSection = () => {
  return (
    <Layout>
      <section id="About">
        <Container>
          <Grid container spacing={2}>
            <Grid
              item
              lg={5}
              md={5}
              sx={{
                position: "absolute",
                marginTop: "-2rem",
                left: "3rem",
                zIndex: -1,
              }}
            ></Grid>

            <Grid item lg={7} md={7}>
              <div className="About_content">
                <Typography
                  variant="h3"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 700, textAlign: "center" }}
                >
                  About <span>Us</span>
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  gutterBottom
                  sx={{ fontSize: 18 }}
                >
                  A purpose-built global career mobility solutions company
                  transforming individual professionals and enterprise
                  work-force by addressing the digital skills gap, train and
                  empower them to forge a dream career path into future tech.
                  From our perspective, the need for reskilling and upskilling
                  opportunities has never been higher. No matter the times
                  career growth is key for people and the most exciting thing is
                  to train the talent that the university does not cultivate,
                  but that industry needs.
                </Typography>
              </div>
              <Button
                variant="contained"
                sx={{
                  background: "#ed4d01",
                  marginTop: "1rem",
                  "&:hover": {
                    background: "#ff0000",
                  },
                }}
                onClick={(event) => {
                  event.preventDefault();
                  const targetElement = document.getElementById("aboutContent");
                  if (targetElement) {
                    const offset = 230; // Adjust this offset value as per your requirement
                    const targetPosition = targetElement.offsetTop - offset;
                    window.scrollTo({
                      top: targetPosition,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                Explore
              </Button>
            </Grid>

            <Grid
              item
              lg={5}
              md={5}
              sx={{ marginTop: "-1rem", textAlign: "center" }}
            >
              <div className="About_img">
                <img
                  src={"/assets/images/about.png"}
                  alt=""
                  className="w-100"
                />
              </div>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            alignItems="center"
            style={{ marginTop: "5rem" }}
          >
            <Grid item lg={6} md={6}>
              <div className="about__img">
                <img
                  src={"/assets/images/Our_beleif.jpg"}
                  alt=""
                  style={{ width: "100%" }}
                  className="w-100"
                />
              </div>
            </Grid>
            <Grid item lg={6} md={6}>
              <div className="about__content" id="aboutContent">
                <Typography variant="h3" component="h2" gutterBottom>
                  Smart<span style={{ color: "#ed4d01" }}>Cliff</span>
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                  SmartCliff Coimbatore is a leading technology company based in
                  Coimbatore, India. We specialize in providing innovative
                  software solutions to businesses and individuals, helping them
                  achieve their goals and thrive in the digital age.
                </Typography>

                <div className="about__counter">
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} md={3}>
                      <div className="single__counter">
                        <span className="counter">
                          <CountUp start={0} end={25} duration={2} suffix="K" />
                        </span>
                        <p className="counter__title">Completed Projects</p>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <div className="single__counter">
                        <span className="counter">
                          <CountUp start={0} end={12} duration={2} suffix="K" />
                        </span>
                        <p className="counter__title">Clients Served</p>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <div className="single__counter">
                        <span className="counter">
                          <CountUp start={0} end={95} duration={2} suffix="K" />
                        </span>
                        <p className="counter__title">Ideas Executed</p>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <div className="single__counter">
                        <span className="counter">
                          <CountUp start={0} end={10} duration={2} suffix="K" />
                        </span>
                        <p className="counter__title">Happy Clients</p>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid>
            <Grid
              container
              spacing={3}
              justifyContent="center"
              style={{ marginTop: "5rem" }}
            >
              <Grid item xs={12}>
                <Typography
                  variant="h3"
                  component="h2"
                  gutterBottom
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  Our<span style={{ color: "#ed4d01" }}> Core</span> Values
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <ul className="core-values-list">
                  <li>
                    <Typography variant="body1" component="p" gutterBottom>
                      Be Bold, Be Innovative
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" component="p" gutterBottom>
                      Achieving SmartCliff’s mission requires creativity,
                      innovative ideas, and new ways of thinking. We’re willing
                      to try hard things, take big bets, and work on problems
                      that haven’t been solved before.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" component="p" gutterBottom>
                      Focus on Individual impact
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" component="p" gutterBottom>
                      At all times, we remain focused on the impact we have for
                      students, and the families and educators who support them.
                      What makes SmartCliff unique is our relentless focus on
                      career mobility and transforming their lives.
                    </Typography>
                  </li>
                </ul>
              </Grid>

              <Grid item xs={12} md={6}>
                <ul className="core-values-list">
                  <li>
                    <Typography variant="body1" component="p" gutterBottom>
                      Progress Over Perfection
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" component="p" gutterBottom>
                      We believe that the best way to have an impact in the
                      world and to build a great company is through continuous
                      progress, paired with iteration, experimentation, and
                      learning. We strive to get better every day and we take a
                      growth mindset.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" component="p" gutterBottom>
                      Care About People
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" component="p" gutterBottom>
                      We take a human-first approach to building our
                      organization. We care deeply about our teammates, our
                      clients, the students, educators, and families we serve.
                    </Typography>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <div
          className="dots1"
          style={{ position: "absolute", bottom: "-700px" }}
        >
          <img src={"/assets/images/dots1.png"} alt="" />
        </div>
      </section>
    </Layout>
  );
};

export default AboutSection;
