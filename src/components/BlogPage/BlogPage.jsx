import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../BlogCard/BlogCard';
import { Link } from 'react-router-dom';
import './BlogPage.css';
import Loader from '../Loader/Loader';

const BlogPage = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const response = await axios.get(`https://blog-serverless-93v0new9c-ermiras-projects-cb44b1b3.vercel.app/`);
        const sortedBlogs = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecentBlogs(sortedBlogs.slice(0, 6)); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs', error);
        setLoading(false);
      }
    };

    fetchRecentBlogs();
  }, []);

  return (
    <div className="blogs-container">
      <h1>Recent Blogs</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="blogs-grid">
          {recentBlogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}

      <Link to="/blogs" className="see-all-blogs-button button">SEE ALL BLOGS</Link>
    </div>
  );
};

export default BlogPage;