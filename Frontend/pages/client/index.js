import React from "react";
import { Container, Typography } from "@mui/material";
import Image from "next/image";

import MontbleuImg from "../../public/assets/images/montbleu.jpg";
import ExpleoImg from "../../public/assets/images/expleo.png";
import PricolImg from "../../public/assets/images/pricol.png";
import KgislImg from "../../public/assets/images/Kgisl.jpg";
import WiproImg from "../../public/assets/images/wipro.png"

const clientData = [
  { name: "Montbleu", image: MontbleuImg },
  { name: "Expleo", image: ExpleoImg },
  { name: "Pricol", image: PricolImg },
  { name: "Kgisl", image: KgislImg },
  { name: "wipro", image: WiproImg },

];

const Clients = () => {
  return (
    <section id="Clients">
      <div className="Clients_contents">
        <div className="title">
          <Typography
            variant="h2"
            component="h2"
            sx={{ fontWeight: 600, textAlign: "center", fontSize: "35px" }}
          >
            Our<span> Clients</span>
          </Typography>
        </div>
        <div
          className="Clients_content"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflowX: "auto",
          }}
        >
          <Container>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2rem",
              }}
            >
              {clientData.map((client, index) => (
                <div key={index} style={{ cursor: "pointer", margin: "10px",marginRight:"20px" }}>
                  <Image
                    src={client.image}
                    alt={client.name}
                    width={200}
                    height={200}
                    className="client-image"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
};

export default Clients;
