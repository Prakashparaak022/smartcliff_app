import React, { useState } from "react";
import Link from "next/link";
import Layout from "../Layout";
import TitleComponent from "../Header";
import { IconButton, Button,Grid } from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import { useRouter } from 'next/router';

const Courses = () => {
  const [expanded, setExpanded] = useState({});
  const router = useRouter();


  const toggleExpand = (index) => {
    setExpanded((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleKnowMore = (path) => {
    console.log("Know More clicked for path:", path);
    router.push(path);
  };

  return (
<Layout>
  <section>
    <TitleComponent title={"Services"} />
    <div className="dots4">
      <img src={"/assets/images/dots1.png"} alt="" />
    </div>
    <Grid container justifyContent="center" alignItems="center">
      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginBottom: "2rem" }}>
        <Grid item xs={12} md={5}>
          <img
            src="/assets/images/Services.jpg"
            alt="Right Side Image"
            style={{ width: "100%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={12} lg={7} style={{padding:"3rem"}}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div
              style={{
                padding: "1rem",
                borderRadius: "8px",
                textAlign: "left",
                position: "relative",
                border: "1px solid #e49300",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontWeight: "bold" }}>
                  HTD (Hire Train Deploy)
                </div>
                <IconButton onClick={() => toggleExpand(0)}>
                  {expanded[0] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </div>
              {expanded[0] && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  Get comprehensive hands-on training in cutting-edge design
                  principles and advanced techniques.
                  <Link href="services/HTD">
                    <Button
                      onClick={() => handleKnowMore("services/HTD")}
                      style={{ background: "transparent", position: "relative", left: "-5px" }}
                    >
                      Know More
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            {/* Repeat the same structure for other service cards */}
            <div
              style={{
                padding: "1rem",
                borderRadius: "8px",
                textAlign: "left",
                position: "relative",
                border: "1px solid #e49300",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontWeight: "bold" }}>
                  Institution Training
                </div>
                <IconButton onClick={() => toggleExpand(1)}>
                  {expanded[1] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </div>
              {expanded[1] && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  Enhance the design capabilities of your educational
                  institution with our comprehensive training programs.
                  <Link href="services/Institution">
                    <Button
                      onClick={() => handleKnowMore("services/Institution")}
                      color="primary"
                      style={{  background:"transparent",position: "relative", left: "-5px" }}
                    >
                      Know More
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            {/* Repeat the same structure for other service cards */}
            <div
              style={{
                padding: "1rem",
                borderRadius: "8px",
                textAlign: "left",
                position: "relative",
                border: "1px solid #e49300",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontWeight: "bold" }}>
                  MCA (Master of Computer Applications) Program
                </div>
                <IconButton onClick={() => toggleExpand(2)}>
                  {expanded[2] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </div>
              {expanded[2] && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  Our MCA program offers a comprehensive curriculum in
                  computer applications.
                  <Link href="services/MCA">
                    <Button
                      onClick={() => handleKnowMore("services/MCA")}
                      color="primary"
                      style={{  background:"transparent",position: "relative", left: "-5px" }}
                    >
                      Know More
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            {/* Repeat the same structure for other service cards */}
            <div
              style={{
                padding: "1rem",
                borderRadius: "8px",
                textAlign: "left",
                position: "relative",
                border: "1px solid #e49300",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontWeight: "bold" }}>
                  Lateral Training
                </div>
                <IconButton onClick={() => toggleExpand(3)}>
                  {expanded[3] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </div>
              {expanded[3] && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  Upgrade your skills and pivot to a new career path with our
                  lateral training program.
                  <Link href="services/Lateral">
                    <Button
                      onClick={() => handleKnowMore("services/Lateral")}
                      color="primary"
                      style={{  background:"transparent",position: "relative", left: "-5px" }}
                    >
                      Know More
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  </section>
</Layout>

  );
};

export default Courses;
