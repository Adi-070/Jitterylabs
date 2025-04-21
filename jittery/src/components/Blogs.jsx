'use client';
import React, { useEffect, useState } from 'react';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('https://backend-jittery.onrender.com/api/blogs?populate=*')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.data);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Latest Blogs</h1>
      <div className="space-y-10">
        {blogs.map((blog) => {
          const { id, blog_title, blog_description, blog_cover } = blog;
          const imageUrl = blog_cover?.url;

          return (
            <div
              key={id}
              className="flex flex-col md:flex-row bg-white shadow-lg rounded-2xl overflow-hidden"
            >
              {/* Left - Image */}
              <div className="md:w-1/3">
                <img
                  src={imageUrl}
                  alt={blog_title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right - Text */}
              <div className="p-6 md:w-2/3 flex flex-col justify-between">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {blog_title}
                </h2>
                <p className="text-gray-600">{blog_description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
