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

    const totalRatings = productRatingExcellent + productRatingVeryGood + productRatingGood + productRatingAverage + productRatingPoor;

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
              <h4>Product Ratings</h4>

            <Row className="align-items-center mt-2">
                <Col xs={12} sm={12} md={4} lg={2} xl={2} className="text-center text-md-start">
                    <div className="average-rating d-flex ">
                        <p>{averageProductRating}</p>
                        <span><GoStarFill /></span>
                    </div>
                    <p className='align-center'> {productRatingCount} <span> Ratings</span></p>
                </Col>
                <Col xs={12} sm={12} md={8} lg={10} xl={10}>
                  
                    <div className="rating-bars">
                        {ratings.map((rating, index) => (
                            <div key={index} className="rating-bar-container d-flex align-items-baseline">
                                <p className='d-flex justify-content-end'
                                    style={{
                                        textAlign: "right",
                                        width: "200px"
                                    }}
                                >    <span> {rating.label} </span>
                                    {/* <span>({rating.count})</span> */}
                                </p>
                                <div className="outerbar mx-2">
                                    <div
                                        className="rating-bar"
                                        style={{
                                            width: `${getWidthPercentage(rating.count)}%`,
                                            backgroundColor: rating.count > 0 ? rating.color : 'none' 
                                        }}
                                    >
                                    </div>
                                </div>
                                <p className='d-flex justify-content-end'
                                    style={{
                                        textAlign: "right",
                                        width: "100px"
                                    }}
                                >
                                    {/* <span> {rating.label} </span> */}
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
