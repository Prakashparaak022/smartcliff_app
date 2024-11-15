import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import TitleComponent from '../Header';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const itemData = [
  {
    img: '/assets/images/Smartcliff1.jpg',
    title: 'Smartcliff',
  },
  {
    img: '/assets/images/Smartcliff2.jpg',
    title: 'Smartcliff',
  },
  {
    img: '/assets/images/Smartcliff3.jpg',
    title: 'Smartcliff',
  },
];

const Gallery = () => {
  const customPrevArrow = (clickHandler, hasPrev, label) => (
    <button
      onClick={clickHandler}
      title={label}
      style={{
        position: 'absolute',
        top: '50%',
        left: '30px',
        zIndex: '2',
        background: '#f16c56',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ArrowBackIcon fontSize="large" style={{ color: 'white' }} />
    </button>
  );

  const customNextArrow = (clickHandler, hasNext, label) => (
    <button
      onClick={clickHandler}
      title={label}
      style={{
        position: 'absolute',
        top: '50%',
        right: '30px',
        zIndex: '2',
        background: '#f16c56',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ArrowForwardIcon fontSize="large" style={{ color: 'white' }} />
    </button>
  );

  return (
    <section
      id="Gallery"
      style={{
        background: `url('/assets/images/clientBackground.png')`,
        backgroundPositionX: '200px',
      }}
    >
      <div style={{ paddingTop: '5rem' }}>
        <TitleComponent title={<span style={{ color: '#000' }}>Gallery</span>} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop
          autoPlay
          showArrows={true} // Show arrows
          renderThumbs={() => null}
          renderArrowPrev={customPrevArrow} // Custom previous arrow
          renderArrowNext={customNextArrow} // Custom next arrow
          responsive={[
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {itemData.map((item, index) => (
            <div key={index} style={{ padding: '1rem', width: '100%', margin: '0' }}>
              <img src={item.img} alt={item.title} style={{ width: '50%', height: 'auto', boxShadow: '0px 4px 5px 1px #000' }} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Gallery;
