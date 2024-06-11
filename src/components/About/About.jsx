import React from 'react';
import './About.css';

const About = React.forwardRef((props, ref) => {
  return (
    <div className='about-bg' ref={ref}>
      <div className="about-container">
        <div className="about-header">
          <h1>Hi, I'm Ermira</h1>
          <p>I am a software engineer sharing insights and trends in technology to empower developers and enthusiasts alike</p>
        </div>
        <div className="about-content">
          <div className="about-section">
            <p>Welcome to my blog!
            Here, you'll find a mix of technical content, industry insights, and personal reflections on my journey as a software engineer. From coding tutorials and project showcases to discussions on emerging technologies and career advice, there's something here for every software enthusiast.
            Whether you're looking to sharpen your coding skills, stay updated on the latest tech trends, or gain inspiration for your next project, you've come to the right place.</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default About;
