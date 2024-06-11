import './App.css';
import {useRef} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar, HeroSection, About, BlogPage, ReviewSection, Newsletter, Footer, BlogDetail, Blogs } from './components';

function App() {

  const aboutRef = useRef(null);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <div className='app-background'>
            <div>
            <HeroSection aboutRef={aboutRef} />
            <About ref={aboutRef} />
            <BlogPage />
            <ReviewSection />
            <Newsletter />
            <Footer />
            </div>
          </div>
        } />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
}

export default App;