import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { format } from 'date-fns';
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import './ReviewSection.css';

const ReviewSection = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewsPerPage, setReviewsPerPage] = useState(3);

  const clientId = '214577324412-vm4a0ue9iat1sj3girspdck7fchppu6d.apps.googleusercontent.com';

  useEffect(() => {
    fetchReviews();
    updateReviewsPerPage();
    window.addEventListener('resize', updateReviewsPerPage);
    return () => {
      window.removeEventListener('resize', updateReviewsPerPage);
    };
  }, []);

  const updateReviewsPerPage = () => {
    if (window.innerWidth >= 990) {
      setReviewsPerPage(3);
    } 
    else if (window.innerWidth >= 560) {
      setReviewsPerPage(2);
    } else {
      setReviewsPerPage(1);
    }
  };

  const handleLoginSuccess = (response) => {
    try {
      const decoded = decodeJWT(response.credential);
      const userInfo = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      };
      setIsAuthenticated(true);
      setUser(userInfo);
      setToken(response.credential);
      setMessage('Login successful');
    } catch (error) {
      console.error('Error decoding JWT', error);
      setMessage('Login failed. Please try again.');
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_REVIEWS_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews', error);
      setMessage('Error fetching reviews.');
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const reviewData = { rating, review };

    try {
      const response = await axios.post(import.meta.env.VITE_API_REVIEWS_URL, reviewData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log('Review submitted successfully', response.data);
      setMessage('Review submitted successfully!');
      setShowReviewForm(false);
      setPopupContent(
        `Review submitted successfully by:
        ${user.name} (${user.email})
        Rating: ${rating} Stars
        Review: ${review}`
      );
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review', error.response);
      setMessage('Error submitting review.');
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
    setMessage('Login failed. Please try again.');
  };

  const decodeJWT = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };

  const handleNext = () => {
    if (currentIndex + reviewsPerPage < reviews.length) {
      setCurrentIndex(currentIndex + reviewsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - reviewsPerPage >= 0) {
      setCurrentIndex(currentIndex - reviewsPerPage);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, index) => (
          index < rating ? <AiFillStar key={index} /> : <AiOutlineStar key={index} />
        ))}
      </div>
    );
  };

  return (
    <div className="review-section">
      <h1>What the Readers Say</h1>
      <div className='google-login'>
        <GoogleOAuthProvider clientId={clientId}>
          {isAuthenticated ? (
            <div>
              <p className='user-login-info'>
                <img src={user.picture} alt={`${user.name}'s profile`} className='user-profile'/>
                Welcome, {user.name}! You are logged in as {user.email}.
              </p>
              {showReviewForm ? (
                <form onSubmit={handleSubmitReview} className="review-form">
                  <h3>Leave a Review</h3>
                  <div className="rating-input">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} onClick={() => setRating(index + 1)}>
                        {index < rating ? <AiFillStar /> : <AiOutlineStar />}
                      </span>
                    ))}
                  </div>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder='Type your review here'
                    required
                  />
                  <button type="submit" className='button submit-button'>Submit Review</button>
                </form>
              ) : (
                <div className='review-complete'>
                  <p>Thank you for your review!</p>
                  <button onClick={() => setShowReviewForm(true)} className='button another-review-btn'>Leave another review</button>
                </div>
              )}
              {message && <p>{message}</p>}
            </div>
          ) : (
            <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
          )}
        </GoogleOAuthProvider>
      </div>
      <div className="reviews-list">
        <div className="navigation-buttons button">
          <button onClick={handlePrev} disabled={currentIndex === 0}><GrLinkPrevious /></button>
        </div>
        <div className="reviews-container">
          {reviews.slice(currentIndex, currentIndex + reviewsPerPage).map((r, index) => (
            <div key={index} className="review">
              <img src={r.picture} alt={`${r.name}'s profile`} className="profile-picture" />
              <h4>{r.name}</h4>
              <p className='review-email'>{r.email}</p>
              <span>{renderStars(r.rating)}</span>
              <p className='review-content'>{r.review}</p>
              <p className='review-date'>{format(new Date(r.date), 'd MMMM yyyy')}</p>
            </div>
          ))}
        </div>
        <div className="navigation-buttons button">
          <button onClick={handleNext} disabled={currentIndex + reviewsPerPage >= reviews.length}><GrLinkNext /></button>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupContent}</p>
            <button onClick={() => setShowPopup(false)} className='button'>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
