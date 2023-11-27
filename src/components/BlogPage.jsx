import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import parse from 'html-react-parser';

// {
//     Get {
//       GoogleDoc(
//         where: {operator: Equal, path: "slug", valueString: "mastering-productivity-a-guide-to-achieving-more-with-less-stress"}
//       ) {
//         originalName
//         remoteId
//         text
//       }
//     }
//   }

const BlogPage = () => {
    const [blog, setBlog] = useState([]);
    
    const params = useParams();
    const slug = params.slug;
    let parsedHTML;
    

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
            query findBlog($valueString: TextStringGetObjectsGoogleDoc = "${slug}") {
                Get {
                    GoogleDoc(where: {operator: Equal, path: "slug", valueString: $valueString}) {
                      originalName
                      remoteId
                      subtitle
                      title
                      blocks {
                        ... on TextBlock {
                          html
                          tagName
                        }

                      }
                    }
                  }
            }
            ` })
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
              setBlog(data.data.Get.GoogleDoc[0]);
            //   console.log(data.Get.GoogleDoc);
            // console.log(`Hello ${data.data.Get.GoogleDoc[0].originalName}`);
            console.log(`Blog: ${blog.blocks}`)
            // parsedHTML = parse(blog[0].html);
            // console.log(parsedHTML);
          }).catch(error => {
            console.error('Error fetching data:', error);
          });
      }

      console.log(slug);
      console.log(blog.blocks);

      

      useEffect(() => {
        fetchBlogs();
      }, [])

    if (blog.length === 0) {
        return (
            <p>Loading...</p>
        )
    } else {
        return (
            <div className='Blog Page mx-16'>
                {/* <p className='text-white text-[20px]'>{parse(blog[0].html)}</p> */}
                <article className='text-white text-[20px] leading-[36px]'>
                {
                    blog.blocks.map((element) => {
                        return (
                            <article className='py-2'>{parse(element.html)}</ article>
                        )
                    })
                }
                </article>
            </div>
          )
    }


}

export default BlogPage