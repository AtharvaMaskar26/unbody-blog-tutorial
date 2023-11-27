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
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6InMwR1JRSWdVNVhHUXVVU1IiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzAxNTk3Mzc3LCJpYXQiOjE3MDA5OTI1NzcsImlzcyI6Imh0dHBzOi8vbWRrcHFpeXBsa3B1dWhjdmxlYmUuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImRhOTQ3OWE1LWFiNTQtNGM2MS1hZjIzLTI2NGI3ODYxMjBkNCIsImVtYWlsIjoib3JrdXR3YXNteWlkZWFAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJnb29nbGUiLCJwcm92aWRlcnMiOlsiZ29vZ2xlIl19LCJ1c2VyX21ldGFkYXRhIjp7ImF2YXRhcl91cmwiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJYzdDRzRKOHZyemxZUHpEVXFBZl9UdC0xa1pucExmX3dMTVdyaHB5NHRDZz1zOTYtYyIsImVtYWlsIjoib3JrdXR3YXNteWlkZWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IkF0aGFydmEgTWFza2FyIiwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tIiwibmFtZSI6IkF0aGFydmEgTWFza2FyIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0ljN0NHNEo4dnJ6bFlQekRVcUFmX1R0LTFrWm5wTGZfd0xNV3JocHk0dENnPXM5Ni1jIiwicHJvdmlkZXJfaWQiOiIxMDA1NzI0MjU2OTcxMzA4MDkyNjQiLCJzdWIiOiIxMDA1NzI0MjU2OTcxMzA4MDkyNjQifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvYXV0aCIsInRpbWVzdGFtcCI6MTY5OTg1NDMxNX1dLCJzZXNzaW9uX2lkIjoiZmVlZDJkODMtYWEyYi00MzU5LWJlOWEtYjk1ZGY0ZTlkOGYyIn0.mECXzHCxyi0ZOpPWUHsJC9IHV6uVR5-r0lwtgrcwc_0',
        'X-Project-Id': '0093ce10-544e-41cf-bf88-3e607f2a2c86',
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
