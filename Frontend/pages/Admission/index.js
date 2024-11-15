import React from "react";
import { Typography } from "@mui/material";
import CirclesImg from "../../public/assets/images/circles.png";
import SmartcliffSlider from "../Slider/SmartcliffSlider";
import Image from "next/image";

function Admission() {
  return (
    <section id="Admission">
      <div className="title">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 600, textAlign: "center", fontSize: "35px" }}
        >
          Why <span>Smartcliff</span>
        </Typography>
        <div className="circles" sx={{display: { xs: "none", sm: "block" } }}>
          <img src={"/assets/images/circles.png"} alt="" className="w-100"
          style={{ marginTop:"10rem"}} />
        </div>
        <SmartcliffSlider />
      </div>
    </section>
  );
}

export default Admission;
