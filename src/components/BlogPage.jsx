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
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6InMwR1JRSWdVNVhHUXVVU1IiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzAxNTk3Mzc3LCJpYXQiOjE3MDA5OTI1NzcsImlzcyI6Imh0dHBzOi8vbWRrcHFpeXBsa3B1dWhjdmxlYmUuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImRhOTQ3OWE1LWFiNTQtNGM2MS1hZjIzLTI2NGI3ODYxMjBkNCIsImVtYWlsIjoib3JrdXR3YXNteWlkZWFAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJnb29nbGUiLCJwcm92aWRlcnMiOlsiZ29vZ2xlIl19LCJ1c2VyX21ldGFkYXRhIjp7ImF2YXRhcl91cmwiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJYzdDRzRKOHZyemxZUHpEVXFBZl9UdC0xa1pucExmX3dMTVdyaHB5NHRDZz1zOTYtYyIsImVtYWlsIjoib3JrdXR3YXNteWlkZWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IkF0aGFydmEgTWFza2FyIiwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tIiwibmFtZSI6IkF0aGFydmEgTWFza2FyIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0ljN0NHNEo4dnJ6bFlQekRVcUFmX1R0LTFrWm5wTGZfd0xNV3JocHk0dENnPXM5Ni1jIiwicHJvdmlkZXJfaWQiOiIxMDA1NzI0MjU2OTcxMzA4MDkyNjQiLCJzdWIiOiIxMDA1NzI0MjU2OTcxMzA4MDkyNjQifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvYXV0aCIsInRpbWVzdGFtcCI6MTY5OTg1NDMxNX1dLCJzZXNzaW9uX2lkIjoiZmVlZDJkODMtYWEyYi00MzU5LWJlOWEtYjk1ZGY0ZTlkOGYyIn0.mECXzHCxyi0ZOpPWUHsJC9IHV6uVR5-r0lwtgrcwc_0',
            'X-Project-Id': '0093ce10-544e-41cf-bf88-3e607f2a2c86',
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