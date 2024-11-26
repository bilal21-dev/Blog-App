import { useState } from "react";
import { FaRegHeart, FaRegComment, FaShareSquare } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import PopUp from "./PopUp";

const Post = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  const handleIconClick = () => {
    setIsPopUpVisible(true); 
    console.log(isPopUpVisible);
  };

  const handleClosePopUp = () => {
    console.log(isPopUpVisible);
    setIsPopUpVisible(false); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden border-2">
        {/* Caption Section */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">Card Caption</h2>
          <p className="text-sm text-gray-600">This is a brief description of the card.</p>
        </div>

        {/* Image Section */}
        <img
          src="https://via.placeholder.com/400x250"
          alt="Card"
          className="w-full h-48 object-cover"
        />

        {/* Action Row */}
        <div className="p-4 flex justify-around items-center border-t">
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

      {/* floating Icon to Trigger Pop-Up */}
      <IoCreate
        onClick={handleIconClick} // Render the PopUp on click
        className="fixed bottom-1 right-1 text-[70px] text-green-500 hover:text-green-700 cursor-pointer"
      />

      {/* conditionally Render the PopUp */}
      {isPopUpVisible && <PopUp closePopUp={handleClosePopUp} />}
    </div>
  );
};

export default Post;
