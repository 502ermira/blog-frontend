import React, { useEffect, useState } from 'react';
import './Home.css';
import Paragraphs from '../Paragraphs/Paragraphs';
import Circles from '../Circles/Circles'; 
import { bgVideo } from '../../utils';

const HeroSection = ({ aboutRef }) => {

  const [activeIndex, setActiveIndex] = useState(0);

  const paragraphs = [
    "Explore the world of technology and innovation with me. From coding to problem-solving, we'll journey through the exciting landscape of software engineering.",
    "Discover the building blocks of computer science, from algorithms to data structures. Together, we'll unravel the mysteries of how computers work and how we can make them do amazing things.",
    "Create software that makes a difference. Learn how to design user-friendly interfaces and powerful backend systems. Let's turn ideas into reality and change the world, one line of code at a time."
  ];

  const handleCircleClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % paragraphs.length);
    }, 5000); 

    return () => clearInterval(intervalId); 
  }, [paragraphs.length]); 

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero">
      <video autoPlay muted loop className="background-video">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <div className="hero-content-container">
        <h1 className="hero-title">Ermira's <span>Blogs</span></h1>
        <h2 className="hero-subtitle">Welcome to Ermira's world of thoughts and ideas</h2>
        <div className="hero-content">
          <div>
            <Paragraphs paragraphs={paragraphs} activeIndex={activeIndex} />
            <Circles paragraphs={paragraphs} activeIndex={activeIndex} onCircleClick={handleCircleClick} />
            <button className="read-more-button button" onClick={scrollToAbout}>READ MORE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
