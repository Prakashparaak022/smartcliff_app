import React from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Typography, Card, CardContent, NoSsr } from '@mui/material';
import WhyImg from '../../public/assets/images/whysmartcliff.jpg';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const CustomCard = ({ title, description }) => {
  return (
    <div style={{ height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ maxWidth: 345 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: 300 }}>
          <div style={{ position: 'relative', width: '90%', top: 0, paddingTop: '90%' }}>
            <Image src={WhyImg} alt="Why Smartcliff" layout="fill" objectFit="cover" />
          </div>
        </div>
        <CardContent style={{ paddingTop: '1rem' }}>
          <Typography gutterBottom variant="h5" component="div" className="custom-card-title" sx={{ fontWeight: '600' }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="custom-card-description">
            {description}
          </Typography>
        </CardContent>
      </Card>
     </div>
  );
};

const AliceCarousel = dynamic(() => import('react-alice-carousel'));

const SmartcliffSlider = () => {
  const responsive = {
    0: { items: 1 },
    768: { items: 3 },
  };

  return (
    <NoSsr>
      <div>
        <AliceCarousel
          infinite
          autoPlay
          autoPlayInterval={3000}
          mouseTracking
          disableButtonsControls
          responsive={responsive}
        >
          <CustomCard
            key="1"
            title="Skill Development through measurable transformation"
            description="Tailor-made learning with flexible & scalable programs, problem solving, decision-making, critical thinking and analytical capabilities, behavioral skills, language and Communication skills."
          />
          <CustomCard
            key="2"
            title="High Engagement Learning Experience"
            description="Industry relevant focus knowledge built into learning programs across domains that map to industry skill gaps, interact with domain experts from across industries through regular industry sessions."
          />
          <CustomCard
            key="3"
            title="Assured Placement Assistance"
            description="Each learner will work with an assigned career specialist to build out their personal and professional brand and provide assistance to participate in exclusive interviews and work for great organizations."
          />
        </AliceCarousel>
      </div>
    </NoSsr>
  );
};

export default SmartcliffSlider;

