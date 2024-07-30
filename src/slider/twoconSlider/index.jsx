import React from "react";
import { Container, Row, Col } from "react-bootstrap"; // Import Bootstrap components
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./index.css";
import { ImageUrl } from "../../API/baseUrl";
import { Link } from "react-router-dom";

const TwoConSlider = ({ titleList = [] }) => {
  // Filter to get items at index 4 and 5
  const filteredTitleList = titleList.slice(3, 7);

  return (
    <Container className="HomepageSliderCon2">
      <Row>
        {filteredTitleList.length > 0 ? (
          filteredTitleList.map((item, index) => (
            <Col key={index} xs={12} md={6} lg={6} className="mb-3">
              <div className="box box1 d-flex">
                <Link to={`/product/${item.id}`} className="DiscovernowBNT">
                  <div className="box-content d-flex  align-items-center justify-content-evenly">
                    <div className="text-center mb-2">
                      <p>{item.category_name}</p>
                      <Link to={`/product/${item.id}`} className="DiscovernowBNT">
                        Discover now
                      </Link>
                    </div>
                    <img
                      src={`${ImageUrl}${item.files}`}
                      alt={item.category_name}
                      className="homepagesliderimage mx-3"
                    />
                  </div>
                </Link>
              </div>
            </Col>
          ))
        ) : (
          <p>No items available</p>
        )}
      </Row>
    </Container>
  );
};

export default TwoConSlider;
