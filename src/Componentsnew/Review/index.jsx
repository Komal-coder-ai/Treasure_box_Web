import React, { useState } from 'react';
import { Avatar, Rating } from '@mui/material';
import './index.css';
import ButtonForAll from './../../components/ButtonForALL/index';
import { baseUrl } from '../../API/baseUrl';
const ReviewForm = () => {
  const [rating, setRating] = useState(0); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '' 
  });
  const [submittedData, setSubmittedData] = useState(null); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

 
  const handleRatingChange = (value) => {
    setRating(value);
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const postReview = async (reviewData) => {
    try {
      setIsSubmitting(true); 
      const response = await fetch(`https://treasure.technotoil.com/product-rating/user/do/product-rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response Data:', data);

     
      setSubmittedData(reviewData);
    } catch (error) {
      console.error('Error posting review:', error);
    } finally {
      setIsSubmitting(false); 
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
   
    const reviewData = {
      ...formData,
      rating
    };
    
    postReview(reviewData);
   
    setFormData({
      name: '',
      email: '',
      comment: '' 
    });
    setRating(0);
  };

  return (
    <div className="review-container">
      <p className='reviewheading'
        style={{
          fontSize: "27px",
          color: "var(--black-color)"
        }}
      >Your Review</p>
      {submittedData && (
        <div className="submitted-data">
          <p style={{
            fontSize: "27px",
            color: "var(--black-color)"
          }}></p>
          <div className="rating d-flex">
            <Avatar alt={submittedData.name} src="/static/images/avatar/1.jpg" sx={{ width: 56, height: 56 }} />
            <div className="userinformation mx-4">
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--black-color)"
                }}>{submittedData.name}</p>
              <Rating
                name="size-large"
                value={submittedData.rating}
                size="large"
                className='startrating'
                readOnly
              />
              <p>{submittedData.comment}</p>
            </div>
          </div>
          <hr />
        </div>
      )}

      <Rating
        name="size-large"
        value={rating}
        size="large"
        className='startrating'
        onChange={(event, newValue) => handleRatingChange(newValue)}
      />

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
            name="comment" 
            value={formData.comment} 
            onChange={handleInputChange}
            required
            placeholder='Comments'
            className='review-form-input'
            rows={5}
          />
        </div>
        <div className='reviewsubmit'>
          <ButtonForAll name={isSubmitting ? "Submitting..." : "POST COMMENT"} disabled={isSubmitting} />
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
