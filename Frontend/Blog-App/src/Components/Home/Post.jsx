import { useState, useEffect } from "react";
import { FaRegHeart, FaRegComment, FaShareSquare, FaSync } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import PopUp from "./PopUp";
import { useAuth } from '../AuthContext';
import axios from "axios";

const Post = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const { register, blogs, setBlogs, setMyblogs } = useAuth()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});

  const handleIconClick = () => {
    if (register) {
      setIsPopUpVisible(true);
    }
    else {
      alert("You must register to create a post")
    }
  };

  const handleClosePopUp = () => {
    setIsPopUpVisible(false);
  };

  const toggleCardFlip = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/home");
      setBlogs(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch blogs");
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
      reader.readAsDataURL(newBlog.image);
    } else {
      setMyblogs((prevBlogs) => {
        const updatedBlogs = [...prevBlogs, newBlog];
        localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
        return updatedBlogs;
      });
    }
  };

  if (error) {
    return <p className="flex justify-center align-middle text-center">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {loading ? (
          <div className="absolute top-[250px] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4">
            <div className="loader border-t-4 border-green-500 rounded-full w-16 h-16 animate-spin"></div>
            <p className="ml-1 text-lg font-semibold text-black">Loading products...</p>
          </div>
        ) : (
          Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div key={index} className="relative perspective-1000 w-full h-[460px]">
                <div
                  className={`absolute w-full h-full transition-transform duration-700 transform-style-3d ${flippedCards[index] ? 'rotate-y-180' : ''
                    }`}
                >
                  {/* Front of Card */}
                  <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-md shadow-black overflow-hidden border border-gray-200">
                    {/* Flip Button */}
                    <button
                      onClick={() => toggleCardFlip(index)}
                      className="absolute top-2 right-2 z-10 p-2 text-gray-600 hover:text-blue-500"
                    >
                      <FaSync />
                    </button>

                    {/* Caption Section */}
                    <p className="ml-4 text-[12px] my-1 text-gray-400 font-light">
                      Posted by {blog.author}
                    </p>
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

                  {/* Back of Card */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-lg shadow-md shadow-black overflow-hidden border border-gray-200">
                    {/* Flip Back Button */}
                    <button
                      onClick={() => toggleCardFlip(index)}
                      className="absolute top-2 right-2 z-10 p-2 text-gray-600 hover:text-blue-500"
                    >
                      <FaSync />
                    </button>

                    {/* Full Blog Content */}
                    <div className="p-6 h-full overflow-auto">
                      {blog.content && (
                        <div className="prose">
                          <h3 className="text-xl font-semibold mb-2">Content</h3>
                          <div
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // <div className="flex justify-center items-center h-[100vh]">
              <p className="flex justify-center text-center text-gray-500 text-xl">No blogs available</p>
            // {/* </div> */}
          )
        )}
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