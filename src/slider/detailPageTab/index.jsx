import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./index.css"; // Import your custom CSS file
import RemoveTag from "../../components/removetag";
import { Avatar } from "@mui/material";

const DetailPageTab = ({ description, general, Reviews }) => {
  const showSpecificationTab = general && general.length > 0;
  const reviewCount = Reviews ? Reviews.length : 0; // Calculate the number of reviews

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
            <div className="reviews-container">
              <h3>Reviews ({reviewCount})</h3> {/* Dynamically display review count */}
              {Reviews.map((review, index) => (
                <div key={index} className="review">
                  <div className="rating d-flex">
                    <Avatar
                      alt={review.name}
                      src="/static/images/avatar/1.jpg" // Ensure this path is correct or dynamic
                      sx={{ width: 56, height: 56 }}
                    />
                    <div className="data mx-3">
                      <p>{review.name}</p>
                      <p>Email: {review.email}</p>
                      <p>Rating: {review.rating}</p>
                      <p>Comment: {review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
        )}
      </Tabs>
    </div>
  );
};

export default DetailPageTab;
