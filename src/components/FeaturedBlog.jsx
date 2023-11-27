import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const FeaturedBlog = ({blogs}) => {
    if (blogs.length === 0) {
        return (
            <p>Loading...</p>
        )
    } else {
        console.log();
        return (
            <div className="featured-blogs ml-[10vw] mt-[10vh]">
                <h1 className='font-bold text-white text-2xl mb-[5vh]'>Featured Blogs</h1>
                <div className="grid-section md:flex justify-between mr-[20vw]">
                    <div className="left-section md:w-[40vw] mr-8">
                        <img src={blogs[0].blocks[0].url} className='w-100% md:w-[40vw] md:h-[40vh] rounded-xl' alt="image" />
                        <Link to={`/blogs/${blogs[0].slug}`}>
                        <div className="blog-information">
                            <h1 className='text-2xl font-semibold text-white mt-4 mb-2 hover:text-slate-400'>{blogs[0].title}</h1>
                            <p className='bg-white w-auto rounded-xl px-4 w-1/4 inline'>{blogs[0].tags}</p>
                        </div>
                        </Link>
                    </div>
                    <div className="right-section">
                    <img src={blogs[1].blocks[0].url} className='w-100% md:w-[20vw] md:h-[20vh] rounded-xl' alt="image" />
                    <Link to={`/blogs/${blogs[1].slug}`}>
                    <div className="blog-information">
                            <h1 className='text-xl font-semibold md:w-[20vw] text-white mt-2 mb-2 hover:text-slate-400'>{blogs[1].title}</h1>
                            <h2 className='bg-white w-auto rounded-xl px-4 w-1/4 inline'>{blogs[1].tags}</h2>
                        </div>
                    </Link>
                        <img src={blogs[2].blocks[0].url} className='w-100% md:w-[20vw] md:h-[20vh] rounded-xl mt-4' alt="image" />
                        <Link to={`/blogs/${blogs[2].slug}`}>
                        <div className="blog-information">
                            <h1 className='text-xl font-semibold md:w-[20vw] text-white mt-2 mb-2 hover:text-slate-400'>{blogs[2].title}</h1>
                            <h2 className='bg-white w-auto rounded-xl px-4 w-1/4 inline'>{blogs[2].tags}</h2>
                        </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }


}

export default FeaturedBlog