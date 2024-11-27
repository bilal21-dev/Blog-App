import { useState } from "react";
import { FaRegHeart, FaRegComment, FaShareSquare } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import PopUp from "./PopUp";

const Post = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const handleIconClick = () => {
    setIsPopUpVisible(true);
  };

  const handleClosePopUp = () => {
    setIsPopUpVisible(false);
  };

  const addBlog = (newBlog) => {
    setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
  };

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
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">{blog.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{blog.description}</p>
            </div>

            {/* Image Section */}
            {blog.image ? (
              <img
                src={URL.createObjectURL(blog.image)}
                alt="Blog"
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
        className="fixed bottom-5 right-5 text-[70px] text-green-500 hover:text-green-700 cursor-pointer"
      />

      {/* Conditionally Render the PopUp */}
      {isPopUpVisible && <PopUp closePopUp={handleClosePopUp} addBlog={addBlog} />}
    </div>
  );
};

export default Post;
