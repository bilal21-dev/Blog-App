import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../../styles/PopUp.css';
import { MdCancel } from "react-icons/md";
import axios from 'axios';

// Import Ant Design components
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function EditPostPopUp({ closePopUp, addBlog, blogId }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [content, setContent] = useState('');
    const editorRef = useRef(null);

    // Initialize Quill editor when component mounts
    useEffect(() => {
        const Quill = window.Quill;
        if (editorRef.current && !editorRef.current.quillInstance) {
            editorRef.current.quillInstance = new Quill(editorRef.current, {
                theme: 'snow', // Use Quill's default theme
            });
        }
    }, []);

    // Fetch blog data for editing and update local state and editor content
    useEffect(() => {
        if (blogId) {
            axios.get(`http://localhost:5000/home/blogdata/${blogId}`)
                .then(response => {
                    const blogData = response.data;
                    setTitle(blogData.title);
                    setDescription(blogData.description);
                    setContent(blogData.content);
                    // Prepend server URL if blogData.image exists and is relative
                    setImagePreview(blogData.image ? `http://localhost:5000/${blogData.image}` : null);
                    setImage(null);

                    // Set the Quill editor content if it's been initialized
                    if (editorRef.current && editorRef.current.quillInstance) {
                        editorRef.current.quillInstance.root.innerHTML = blogData.content || '';
                    }
                })
                .catch(err => console.error('Error fetching blog:', err));
        }
    }, [blogId]);

    // Ant Design Upload props
    const uploadProps = {
        name: 'file',
        beforeUpload: (file) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(file);
            setImage(file);
            return false; // Prevent auto-upload
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
        },
    };

    const handleSubmit = async () => {
        let userID = localStorage.getItem("user");
        userID = JSON.parse(userID);
        userID = userID._id;

        // Retrieve content from the Quill editor
        const editorContent = editorRef.current.quillInstance.root.innerHTML;

        // Build FormData to send to your backend
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("content", editorContent);
        if (image) {
            formData.append("image", image);
        }
        formData.append("author", userID);

        try {
            let result;
            if (blogId) {
                // Send PUT request for editing
                result = await axios.put(`http://localhost:5000/home/blogdata/${blogId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                console.log('Blog updated:', result.data);
            } else {
                // Create new blog (if needed)
                result = await axios.post("http://localhost:5000/home/blogdata", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                console.log('Blog created:', result.data);
            }

            // Update local state via callback
            addBlog(result.data);
            alert('Blog saved successfully!');
            closePopUp();

            // Clear local states
            setTitle('');
            setDescription('');
            setImage(null);
            setImagePreview(null);
            setContent('');
        } catch (error) {
            console.error('Error saving blog:', error);
        }
    };
    const animation = {
        animation: 'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 max-h-[90vh] overflow-y-auto p-6 relative" style={animation}>
                <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-900" onClick={closePopUp}>
                    <MdCancel className="text-2xl " />
                </button>
                <h1 className="text-3xl font-extrabold text-blue-900 mb-6">
                    {blogId ? 'Edit Blog' : 'Create Blog'}
                </h1>
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
                    <button
                        className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-950 transition-colors duration-300"
                        onClick={handleSubmit}
                    >
                        Save Blog
                    </button>
                </div>
            </div>
        </div>
    );
}

EditPostPopUp.propTypes = {
    closePopUp: PropTypes.func.isRequired,
    addBlog: PropTypes.func.isRequired,
    blogId: PropTypes.string, // Optional, needed for editing
};

export default EditPostPopUp;
