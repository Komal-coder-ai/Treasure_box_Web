import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./index.css"; // Import your custom CSS file
import RemoveTag from "../../components/removetag";
import { Avatar, Rating } from "@mui/material";
import RatingChart from "../../Componentsnew/RatingChart/Index";
import { Container } from 'react-bootstrap';

const DetailPageTab = ({
  description,
  general,
  Reviews,
  averageProductRating,
  productRatingExcellent,
  productRatingVeryGood,
  productRatingGood,
  productRatingAverage,
  productRatingPoor,
  productRatingCount
}) => {
  const showSpecificationTab = general && general.length > 0;
  const reviewCount = Reviews ? Reviews.length : 0; // Calculate the number of reviews


  const ratings = [productRatingExcellent, productRatingVeryGood, productRatingGood, productRatingAverage, productRatingPoor];

  const getBarColor = (rating) => {
    if (rating > 0) return 'orange';
    return 'lightgray';
  };

  return (
    <div className="detailpagetab">
      <Tabs>
        <TabList className="custom-tab-list">
          <Tab>Description</Tab>
          {showSpecificationTab && <Tab>Specification</Tab>}
          {Reviews && Reviews.length > 0 && <Tab>Reviews</Tab>}
        </TabList>

        <TabPanel>
          <RemoveTag
            ParserText={description}
            style={{
              width: "100%",
              fontSize: "14px",
              lineHeight: "24px",
              color: "red",
              fontFamily: "sans-serif",
              marginBottom: "0",
            }}
          />
        </TabPanel>

        {showSpecificationTab && (
          <TabPanel>
            <div className="table_container">
              <table>
                <tbody>
                  {general.map((item, index) => (
                    <tr key={index}>
                      <td className="general_title">{item.title}</td>
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>
        )}

       
       {Reviews && Reviews.length > 0 && (
          <TabPanel>
            {/* Added visual rating display */}
            <Container>
              
            <div className="rating-summary">


              <RatingChart
                averageProductRating={averageProductRating}

                productRatingExcellent={productRatingExcellent}
                productRatingVeryGood={productRatingVeryGood}
                productRatingGood={productRatingGood}
                productRatingAverage={productRatingAverage}
                productRatingPoor={productRatingPoor}
                productRatingCount={productRatingCount}
              />
        

            <div className="reviews-container mt-2">
              <h3>Reviews ({reviewCount})</h3> {/* Dynamically display review count */}
              {Reviews.map((review, index) => (
                <div key={index} className="review mt-3">
                  <div className="rating d-flex">
                    <Avatar
                      alt={review.name}
                      src="/static/images/avatar/1.jpg" // Ensure this path is correct or dynamic
                      sx={{ width: 74, height: 74 }}
                    />
                    <div className="data mx-3">
                      <h5>{review.name}</h5>
                      <p>{review.email}</p>
                      <Rating name="no-value" 
                      value={review.rating} 
                      color="var(--primary-color)"
                       className="startrating mt-1" 
                    readOnly
                       />

                      <p>{review.comment}</p>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
            </div>
            </Container>
          </TabPanel>
        )}
   
      </Tabs>
    </div>
  );
};

export default DetailPageTab;
