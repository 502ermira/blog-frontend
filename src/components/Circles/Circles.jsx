import React from 'react';
import './Circles.css';

const Circles = ({ paragraphs, activeIndex, onCircleClick }) => {
    return (
        <div className="circles">
          {paragraphs.map((_, index) => (
            <div
              key={index}
              className={activeIndex === index ? "circle active" : "circle"}
              onClick={() => onCircleClick(index)}
            ></div>
          ))}
        </div>
      );
    };

export default Circles;
