import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Loader from '../Loader/Loader';
import './BlogDetail.css';
import BlogCard from '../BlogCard/BlogCard';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BLOG_DETAIL_URL}?id=${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching the blog', error);
      }
    };

    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_BLOG_DETAIL_URL);
        setAllBlogs(response.data);
      } catch (error) {
        console.error('Error fetching all blogs', error);
      }
    };

    fetchBlog();
    fetchAllBlogs();
  }, [id]);

  useEffect(() => {
    if (blog && blog.keywords && allBlogs.length > 0) {
      const related = allBlogs.filter((b) => 
        b._id !== blog._id && b.keywords.some((keyword) => blog.keywords.includes(keyword))
      );
      setRelatedBlogs(related);
    }
  }, [blog, allBlogs]);

  if (!blog) return <Loader />;

  return (
    <div className="blog-detail-container">
      <div className="blog-detail">
        <img src={blog.image} alt={blog.title} className="blog-detail-image" />
        <div className="blog-detail-meta">
          <p>{blog.author} - {new Date(blog.date).toLocaleDateString()}</p>
        </div>
        <h2 className="blog-detail-title">{blog.title}</h2>
        <p className="blog-detail-description">{blog.description}</p>
        <div className="blog-detail-content">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
        <div className="share-buttons">
          <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')} className='button'>Share on Facebook</button>
          <button onClick={() => window.open(`https://twitter.com/share?url=${window.location.href}`, '_blank')} className='button'>Share on Twitter</button>
        </div>
      </div>
      <div className="related-blogs">
        <h3 className="related-blogs-heading">You might also like</h3>
        <div className="related-blogs-grid">
        {relatedBlogs.map((relatedBlog) => (
          <BlogCard key={relatedBlog._id} blog={relatedBlog} variant="blog-detail-variant" />
        ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
