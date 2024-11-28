import { useState, useEffect } from "react";
import { FaRegHeart, FaRegComment, FaShareSquare } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import PopUp from "./PopUp";
import { useAuth } from '../AuthContext';
import axios from "axios";


const Post = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const { register, blogs, setBlogs, setMyblogs } = useAuth()
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null);    // State to manage errors

  const handleIconClick = () => {
    if (register) {
      setIsPopUpVisible(true);
    }
    else {
      alert("You must resgiter to create a post")
    }
  };

  const handleClosePopUp = () => {
    setIsPopUpVisible(false);
  };
  // useEffect(() => {
  //   const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
  //   setBlogs(storedBlogs);
  // }, [setBlogs]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/home"); // Replace with your API endpoint
      setBlogs(response.data); // Axios automatically parses JSON
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch blogs");
      setLoading(false);
    }
  }

  const addBlog = (newBlog) => {
    if (newBlog.image) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        const updatedBlog = { ...newBlog, image: base64Image };

        setMyblogs((prevBlogs) => {
          const updatedBlogs = [...prevBlogs, updatedBlog];
          localStorage.setItem("myblogs", JSON.stringify(updatedBlogs));
          return updatedBlogs;
        });
      };
      reader.readAsDataURL(newBlog.image); // Convert image to base64
    } else {
      setMyblogs((prevBlogs) => {
        const updatedBlogs = [...prevBlogs, newBlog];
        localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
        return updatedBlogs;
      });
    }
  };
  if (loading) {
    return <p>Loading blogs...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }


  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-4 space-y-6">
      {/* Blog Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl ">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md shadow-black overflow-hidden border border-gray-200"
          >
            {/* Caption Section */}
            <p className="ml-4 text-[12px] my-1 text-gray-400 font-light">Posted by {blog.author}</p>
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">{blog.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{blog.description}</p>
            </div>

            {/* Image Section */}
            {blog.image ? (
              <img
                src={`http://localhost:5000/${blog.image}`}
                alt={blog.title}
                className="w-full h-64 object-cover"
              />
            ) : (
              <img
                src="https://via.placeholder.com/400x250"
                alt="Placeholder"
                className="w-full h-64 object-cover"
              />
            )}

            {/* Action Row */}
            <div className="p-6 flex justify-around items-center border-t">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
                <FaRegHeart />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500">
                <FaRegComment />
                <span>Comment</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-purple-500">
                <FaShareSquare />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Floating Icon to Trigger Pop-Up */}
      <IoCreate
        onClick={handleIconClick}
        className="fixed bottom-2 right-2 text-[70px] text-green-500 hover:text-green-700 cursor-pointer"
      />

      {/* Conditionally Render the PopUp */}
      {isPopUpVisible && <PopUp closePopUp={handleClosePopUp} addBlog={addBlog} />}
    </div>
  );
};

export default Post;
