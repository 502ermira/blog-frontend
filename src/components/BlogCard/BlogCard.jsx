import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaReadme, FaShareAlt } from 'react-icons/fa';
import './BlogCard.css';

const BlogCard = ({ blog, variant }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/blog/${blog._id}`);
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/blog/${blog._id}`;
    const text = `Check out this blog: ${blog.title}`;
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: text,
        url: shareUrl,
      });
    } else {
      alert(`Share this link: ${shareUrl}`);
    }
  };

  return (
    <div className={`blog-card ${variant}`}>
      <div className="image-container">
        <img src={blog.image} alt={blog.title} className="blog-image" />
      </div>
      <div className="blog-meta">
        <span className="author">{blog.author}</span>
        <span className="date">{new Date(blog.date).toLocaleDateString()}</span>
      </div>
      <h2 className="blog-title">{blog.title}</h2>
      <p className="blog-description">{blog.description}</p>
      <div className="blog-actions">
        <FaReadme onClick={handleReadMore} className="action-icon" title="Read More" />
        <FaShareAlt onClick={handleShare} className="action-icon" title="Share" />
      </div>
    </div>
  );
};

export default BlogCard;