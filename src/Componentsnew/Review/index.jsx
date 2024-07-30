import React, { useState } from 'react';
import { Avatar, Rating } from '@mui/material';
import './index.css';
import ButtonForAll from './../../components/ButtonForALL/index';
import axios from 'axios'; // Import axios
import Product_Comments from '../Product_Comments/Index';

const ReviewForm = ({ userId, orderid, productId, ratingvalue, handleClose, getDetails }) => {
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
  console.log(userId, "userIduserId")
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
      handleClose();
      getDetails();
      console.log("get",getDetails)
      const response = await axios.post('https://treasure.technotoil.com/product-rating/user/do/product-rating', reviewData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Response Data:', response.data);
      setSubmittedData(reviewData);
    } catch (error) {
      console.error('Error posting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      userIdFk: userId,
      productIdFk: productId,
      orderIdFk: orderid,
      rating: ratingvalue,
      name: formData.name,
      email: formData.email,
      comment: formData.comment
    };
    console.log("RRRR", rating)
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

      <Rating
        name="size-large"
        value={ratingvalue}
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
      {/* <Product_Comments  productIdFk={productId}/> */}


    </div>
  );
};

export default ReviewForm;
