import React, { useState } from 'react';
import axios from 'axios';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(import.meta.env.VITE_NEWSLETTER_API_URL, { email });
      setMessage(response.data.message);
      setMessageType('success');
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.error);
      } else {
        setMessage('Error subscribing to the newsletter. Please try again.');
      }
      setMessageType('error');
    } finally {
      setEmail('');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 6000); 
    }
  };

  return (
    <div className="newsletter-container">
      <h3>Subscribe to my newsletter to stay up to date with the latest news in the tech world.</h3>
      <div className="newsletter-wrapper">
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="read-more-button button">Subscribe</button>
        </form>
      </div>
      {message && <p className={`message ${messageType}`}>{message}</p>}
    </div>
  );
};

export default Newsletter;
