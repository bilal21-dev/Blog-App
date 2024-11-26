import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes
import '../../styles/PopUp.css';

function PopUp({ closePopUp }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    const Quill = window.Quill; // Access Quill from CDN
    if (editorRef.current && !editorRef.current.quillInstance) {
      editorRef.current.quillInstance = new Quill(editorRef.current, {
        theme: 'snow', // Quill's default theme
      });
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const handleSubmit = () => {
    const content = editorRef.current.quillInstance.root.innerHTML;
    const blogData = {
      title,
      description,
      image,
      content,
    };

    console.log('Blog Data:', blogData);
    alert('Blog saved successfully!');
    closePopUp(); // Close the pop-up after submission
    setTitle('');
    setDescription('');
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-btn" onClick={closePopUp}>
          &times;
        </button>
        <h1 className="heading">Create Blog</h1>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the blog title"
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a short description"
            className="textarea-field"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
          {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
        </div>
        <div className="form-group">
          <label htmlFor="editor">Content</label>
          <div ref={editorRef} className="quill-editor"></div>
        </div>
        <button className="submit-btn" onClick={handleSubmit}>
          Save Blog
        </button>
      </div>
      
    </div>

    
  );
}

PopUp.propTypes = {
  closePopUp: PropTypes.func.isRequired,
};

export default PopUp;
