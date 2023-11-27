import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Importing Components 
import Navbar from "./components/Navbar"
import FeaturedBlog from './components/FeaturedBlog'
import RecentBlogs from './components/RecentBlogs'
import BlogPage from './components/BlogPage'
import Footer from './components/Footer'



function App() {
  // Fetching Blogs
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    await fetch('https://graphql.unbody.io', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`,
        'X-Project-Id': `${import.meta.env.VITE_PROJECT_ID}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
      query MyQuery {
        Get {
          GoogleDoc {
            originalName 
            remoteId
            text
            slug
            createdAt
            tags
            title
            subtitle
            blocks {
              ... on ImageBlock {
                alt
                url
              }
            }
          } 
        }
      }` })
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data.Get.GoogleDoc);
        setBlogs(data.data.Get.GoogleDoc);
        console.log(blogs[0].title);
        // console.log(`Hello ${data.data.Get.GoogleDoc[0].originalName}`);
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(() => {
    fetchBlogs();
  }, [])


  return (
    <div className="App h-[100%] bg-[#181A2A]">
      <Navbar />
      <Routes>
        <Route path='/' element={<>
          <FeaturedBlog blogs={blogs} />
          <RecentBlogs blogs={blogs} />
        </>} />
        <Route path='/blogs/:slug' element={<BlogPage/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
