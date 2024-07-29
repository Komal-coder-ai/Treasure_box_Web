import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Rating } from "@mui/material";
// import './index.css'; // Ensure this file exists and contains the necessary styles

const Product_Comments = ({ productIdFk }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.post(
          'https://treasure.technotoil.com/product-rating/get/product-rating/and/comment-list',
          { productIdFk }, 
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("Product ID:", productIdFk);
        console.log("Response Data:", response.data);

        if (response.data.status) {
          setComments(response.data.data || []);
        } else {
          setError(new Error("Failed to fetch comments"));
        }
      } catch (err) {
        setError(err);
        console.error("Error fetching comments:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [productIdFk]);

  if (isLoading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>Error loading comments: {error.message}</p>;
  }

  return (
    <div className="comments-container">
      <h2 style={{ fontSize: "27px", color: "var(--black-color)" }}>
        Comments
      </h2>
      {comments.length === 0 ? (
        <p>No comments available.</p>
      ) : (
        comments.map((comment, index) => (
          <div key={index} className="comment-item">
            <div className="rating d-flex">
              <Avatar
                alt={comment.name}
                src="/static/images/avatar/1.jpg"   
                sx={{ width: 56, height: 56 }}
              />
              <div className="userinformation mx-4">
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--black-color)",
                  }}
                >
                  {comment.name}
                </p>
                <Rating
                  name="size-large"
                  value={parseFloat(comment.rating)} 
                  size="large"
                  className="startrating"
                  readOnly
                />
                <p>{comment.comment}</p>
              </div>
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Product_Comments;
