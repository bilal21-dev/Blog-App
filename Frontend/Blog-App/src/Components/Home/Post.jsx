import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaShareSquare } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
const Post = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
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
            <IoCreate  className="fixed bottom-1 right-1 text-[70px] text-green-500 hover:text-green-700 "/>
        </div>
    );
};

export default Post;
