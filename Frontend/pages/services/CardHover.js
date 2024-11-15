import React from 'react';

const CardHover = ({ title, text, linkText, imageUrl }) => {
  return (
    <div className='card-hover' style={{marginBottom:'2rem'}}>
      <div className=''>
        <img src={imageUrl} alt='' className='img_service' />
      </div>
      <div className='card-hover__content'>
        <h3 className='card-hover__title'>{title}</h3>
        <p className='card-hover__text'>{text}</p>
        <a href='#' className='card-hover__link'>
          <span>{linkText}</span>
          <svg fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' />
          </svg>
        </a>
      </div>
      <div className='card-hover__extra'>
        <h4>Learn now and get <span>40%</span> discount!</h4>
      </div>
      <div className=''>
        <img src={imageUrl} alt='' className='.img_service' />
      </div>
    </div>
  );
};

export default CardHover;
