// import React, { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types'; // Import PropTypes
// import '../../styles/PopUp.css';
// import { MdCancel } from "react-icons/md";
// import axios from 'axios';

// // Import Ant Design components
// import { Upload, Button, message } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

// function PopUp({ closePopUp, addBlog }) {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const editorRef = useRef(null);

//   // Initialize Quill editor from CDN
//   useEffect(() => {
//     const Quill = window.Quill;
//     if (editorRef.current && !editorRef.current.quillInstance) {
//       editorRef.current.quillInstance = new Quill(editorRef.current, {
//         theme: 'snow', // Use Quill's default theme
//       });
//     }
//   }, []);

//   // Ant Design Upload props
//   const uploadProps = {
//     name: 'file',
//     // Prevent auto-upload by returning false
//     beforeUpload: (file) => {
//       // Generate a preview for the selected image
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setImagePreview(event.target.result);
//       };
//       reader.readAsDataURL(file);
//       setImage(file);
//       return false; // Prevent upload
//     },
//     onChange(info) {
//       // You can log or show messages based on info if needed
//       if (info.file.status !== 'uploading') {
//         console.log(info.file, info.fileList);
//       }
//     },
//   };

//   const handleSubmit = async () => {
//     // Retrieve and parse user data from localStorage
//     let userID = localStorage.getItem("user");
//     userID = JSON.parse(userID);
//     userID = userID._id;
    
//     // Get content from the Quill editor
//     const content = editorRef.current.quillInstance.root.innerHTML;
    
//     // Create a blogData object (you might use this for local state)
//     const blogData = {
//       title,
//       description,
//       image,
//       content,
//     };

//     // Build FormData to send to your backend
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("content", content);
//     if (image) {
//       formData.append("image", image);
//     }
//     formData.append("author", userID);

//     // You can use the addBlog callback for local updates
//     addBlog(blogData);
//     alert('Blog saved successfully!');
//     closePopUp(); // Close the pop-up after submission

//     // Clear local states
//     setTitle('');
//     setDescription('');
//     setImage(null);
//     setImagePreview(null);

//     // Send the FormData to the backend
//     try {
//       let result = await axios.post("http://localhost:5000/home/blogdata", formData, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       console.log('Server response:', result.data);
//     } catch (error) {
//       console.error('Error uploading blog:', error);
//     }
//   };

//   const animation = {
//     animation: 'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
//   };

//   return (
//     <div className="popup-overlay">
//       <div className="popup-container" style={animation}>
//         <button className="close-btn" onClick={closePopUp}>
//           <MdCancel />
//         </button>
//         <h1 className="heading font-extrabold text-blue-900 text-3xl">Create Blog</h1>
//         <div className="form-group">
//           <label htmlFor="title" className='font-bold'>Title</label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter the blog title"
//             className="input-field focus:outline-none focus:ring-blue-900 focus:border-blue-900"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description" className='font-bold'>Description</label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Enter a short description"
//             className="textarea-field focus:outline-none focus:ring-blue-900 focus:border-blue-900"
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label htmlFor="image" className='font-bold mr-2'>Upload Image</label>
//           {/* Replace native file input with Ant Design Upload component */}
//           <Upload {...uploadProps}>
//             <Button icon={<UploadOutlined />}>Click to Upload</Button>
//           </Upload>
//           {imagePreview && (
//             <img
//               src={imagePreview}
//               alt="Preview"
//               className="image-preview"
//               style={{ marginTop: '1rem', maxWidth: '100%' }}
//             />
//           )}
//         </div>
//         <div className="form-group">
//           <label htmlFor="editor" className='font-bold'>Content</label>
//           <div ref={editorRef} className="quill-editor"></div>
//         </div>
//         <button
//           className="submit-btn bg-blue-900 hover:bg-blue-950 hover:transition-colors duration-300"
//           onClick={handleSubmit}
//         >
//           Save Blog
//         </button>
//       </div>
//     </div>
//   );
// }

// PopUp.propTypes = {
//   closePopUp: PropTypes.func.isRequired,
//   addBlog: PropTypes.func.isRequired,
// };

// export default PopUp;


import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import '../../styles/PopUp.css';
import { MdCancel } from "react-icons/md";
import axios from 'axios';

// Import Ant Design components
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function PopUp({ closePopUp, addBlog }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const editorRef = useRef(null);

  // Initialize Quill editor from CDN
  useEffect(() => {
    const Quill = window.Quill;
    if (editorRef.current && !editorRef.current.quillInstance) {
      editorRef.current.quillInstance = new Quill(editorRef.current, {
        theme: 'snow', // Use Quill's default theme
      });
    }
  }, []);

  // Ant Design Upload props
  const uploadProps = {
    name: 'file',
    // Prevent auto-upload by returning false
    beforeUpload: (file) => {
      // Generate a preview for the selected image
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
      setImage(file);
      return false; // Prevent upload
    },
    onChange(info) {
      // You can log or show messages based on info if needed
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
    },
  };

  const handleSubmit = async () => {
    // Retrieve and parse user data from localStorage
    let userID = localStorage.getItem("user");
    userID = JSON.parse(userID);
    userID = userID._id;
    
    // Get content from the Quill editor
    const content = editorRef.current.quillInstance.root.innerHTML;
    
    // Create a blogData object (you might use this for local state)
    const blogData = {
      title,
      description,
      image,
      content,
    };

    // Build FormData to send to your backend
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }
    formData.append("author", userID);

    // You can use the addBlog callback for local updates
    addBlog(blogData);
    alert('Blog saved successfully!');
    closePopUp(); // Close the pop-up after submission

    // Clear local states
    setTitle('');
    setDescription('');
    setImage(null);
    setImagePreview(null);

    // Send the FormData to the backend
    try {
      let result = await axios.post("http://localhost:5000/home/blogdata", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log('Server response:', result.data);
    } catch (error) {
      console.error('Error uploading blog:', error);
    }
  };
    const animation = {
    animation: 'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 max-h-[90vh] overflow-y-auto p-6 relative" style={animation}>
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-900" onClick={closePopUp}>
          <MdCancel className="text-2xl" />
        </button>
        <h1 className="text-3xl font-extrabold text-blue-900 mb-6">Create Blog</h1>
        <div className="space-y-4">
          <div className="form-group">
            <label htmlFor="title" className="block font-bold mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the blog title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="block font-bold mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a short description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="image" className="block font-bold mb-2">Upload Image</label>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 max-w-full h-auto rounded-lg"
              />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="editor" className="block font-bold mb-2">Content</label>
            <div ref={editorRef} className="quill-editor h-48"></div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-300"
              onClick={closePopUp}
            >
              Cancel
            </button>
            <button
              className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-950 transition-colors duration-300"
              onClick={handleSubmit}
            >
              Save Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

PopUp.propTypes = {
  closePopUp: PropTypes.func.isRequired,
  addBlog: PropTypes.func.isRequired,
};

export default PopUp;