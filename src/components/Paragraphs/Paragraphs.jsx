import React from 'react';
import './Paragraphs.css'

const Paragraphs = ({ paragraphs, activeIndex }) => {
  return (
    <div className="hero-content-container">
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className={`paragraph ${activeIndex === index ? 'fadeIn' : 'fadeOut'}`}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default Paragraphs;
