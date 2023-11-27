import React from 'react'

const BlogCard = ({title, tags, imageURL}) => {
  return (
    <div className="blog-container">
    <img src={imageURL} className='w-100% md:w-[20vw] md:h-[25vh] rounded-xl' alt="image" />
    <div className="blog-information">
        <h1 className='text-2xl font-semibold md:w-[20vw]  text-white mt-4 mb-2 hover:text-slate-400'>{title}</h1>
        <p className='bg-white w-auto rounded-xl px-4 w-1/4 inline'>{tags}</p>
    </div>
</div>
  )
}

export default BlogCard