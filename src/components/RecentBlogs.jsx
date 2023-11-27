import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

// Importing Components 
import BlogCard from "./BlogCard"
import { Link } from 'react-router-dom';

const RecentBlogs = ({ blogs }) => {
    if (blogs.length === 0) {
        return (
            <p>Loading...</p>
            )
        } else {
            console.log(blogs);
            return (
            <div className="recent-blogs ml-[10vw] mt-[10vh]">
                <h1 className='text-3xl font-bold text-white mb-8'>Recent Blogs</h1>
                <div className="blogs grid grid-cols-3 gap-x-4 gap-y-8">
                    {
                        blogs.map((blog) => {
                            return (
                                <Link to={`/blogs/${blog.slug}`}>
                                    <BlogCard   
                                        title={blog.title}
                                        tags={blog.tags}
                                        createdAt={blog.createdAt}
                                        slug={blog.slug}
                                        imageURL={blog.blocks[0].url}
                                    />
                                </Link>
                            )
                        })  
                    }
                </div>
            </div>
        )
    }

}

export default RecentBlogs