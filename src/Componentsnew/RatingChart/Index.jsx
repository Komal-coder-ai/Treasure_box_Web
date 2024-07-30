import React from 'react';
import './index.css';
import { Col, Container, Row } from 'react-bootstrap';
import { GoStarFill } from 'react-icons/go';

const RatingChart = ({
    averageProductRating,
    productRatingExcellent,
    productRatingVeryGood,
    productRatingGood,
    productRatingAverage,
    productRatingPoor,
    productRatingCount,
}) => {

    const totalRatings = averageProductRating;

    const getWidthPercentage = (count) => totalRatings ? (count / totalRatings) * 100 : 0;

    const ratings = [
        { label: 'Excellent', count: productRatingExcellent, color: '#4caf50' },
        { label: 'Very Good', count: productRatingVeryGood, color: '#8bc34a' },
        { label: 'Good', count: productRatingGood, color: '#cddc39' },
        { label: 'Average', count: productRatingAverage, color: '#ffeb3b' },
        { label: 'Poor', count: productRatingPoor, color: '#f44336' },
    ];

    return (
        <Container className="rating-container">
            <Row className="align-items-center mt-2">
                <Col xs={12} sm={12} md={4} lg={2} xl={2} className="text-center text-md-start mb-4 mb-md-0">
                    <div className="average-rating d-flex align-items-center">
                        <p className="mb-0">{averageProductRating}</p>
                        <span className="ms-2"><GoStarFill /></span>
                    </div>
                    <p className='mt-2'>{productRatingCount} <span>Ratings</span></p>
                </Col>
                <Col xs={12} sm={12} md={8} lg={10} xl={10}>
                    <div className="rating-bars">
                        {ratings.map((rating, index) => (
                            <div key={index} className="rating-bar-container d-flex align-items-center mb-2">
                                <p className='mb-0 me-2' style={{ width: "200px", textAlign: "right" }}>
                                    <span>{rating.label}</span>
                                </p>
                                <div className="outerbar mx-2 flex-grow-1">
                                    <div
                                        className="rating-bar"
                                        style={{
                                            width: `${getWidthPercentage(rating.count)}%`,
                                            backgroundColor: rating.count > 0 ? rating.color : '#e0e0e0' // Use a light grey for empty bars
                                        }}
                                    >
                                    </div>
                                </div>
                                <p className='mb-0' style={{ width: "100px", textAlign: "right" }}>
                                    <span>{rating.count}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default RatingChart;
