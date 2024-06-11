import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../BlogCard/BlogCard';
import './Blogs.css';
import Loader from '../Loader/Loader';
import { PiSortDescendingBold, PiSortAscendingBold } from "react-icons/pi";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('mostRecent');
  const [keywords] = useState(['JavaScript', 'React JS', 'Data Mining', 'Data Analysis', 'Python']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_BLOGS_URL);
        setBlogs(response.data);
        setFilteredBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [search, keyword, sortOrder]);

  const filterBlogs = () => {
    let filtered = [...blogs];
    if (search) {
      filtered = filtered.filter(blog => blog.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (keyword) {
      filtered = filtered.filter(blog => blog.keywords.includes(keyword));
    }
    if (sortOrder === 'mostRecent') {
      filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      filtered = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    setFilteredBlogs(filtered);
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'mostRecent' ? 'oldest' : 'mostRecent'));
  };

  return (
    <div className="blogs-container">
      <div className="search-filter-container">
        <input 
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setKeyword(e.target.value)} value={keyword}>
          <option value="">All Blogs</option>
          {keywords.map(kw => (
            <option key={kw} value={kw}>{kw}</option>
          ))}
        </select>
        <button onClick={toggleSortOrder} className="sort-button button">
          {sortOrder === 'mostRecent' ? (
            <>
              <PiSortAscendingBold /> See Oldest
            </>
          ) : (
            <>
              <PiSortDescendingBold /> See Most Recent
            </>
          )}
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="blogs-grid">
          {filteredBlogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
