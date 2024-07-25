import React, { useState } from 'react';
import { Rating } from '@mui/material';
import './index.css'; // Import your CSS file for styling

const ReviewForm = () => {
  const [rating, setRating] = useState(0); // State to store rating
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comments: ''
  });
  const [submittedData, setSubmittedData] = useState(null); // State to store submitted data

  // Handle rating change
  const handleRatingChange = (value) => {
    setRating(value);
  };

  // Handle form field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Log form data and rating
    console.log('Form Data:', { ...formData, rating });
    // Store submitted data in state to display
    setSubmittedData({ ...formData, rating });
    // Clear form data and rating after submission
    setFormData({
      name: '',
      email: '',
      comments: ''
    });
    setRating(0);
  };

  return (
    <div className="review-container">
      <h3>Your Review</h3>
      {submittedData && (
        <div className="submitted-data">
          <p>Name: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
          <p>Comments: {submittedData.comments}</p>
          <p>Rating: {submittedData.rating}</p>
        </div>
      )}

      <Rating name="size-large" defaultValue={2} size="large" className='startrating' onChange={(event, newValue) => handleRatingChange(newValue)} />{/* Rating section */}

      <form className="review-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder='Name'
            className='review-form-input review-form-input-name-email'
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder='Email'
            className='review-form-input review-form-input-name-email'
          />
        </div>
        <div className="form-group">
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            required
            placeholder='Comments'
            className='review-form-input'
            rows={5}
          />
        </div>
        <div>
          <button type="submit">Submit Review</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
