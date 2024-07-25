import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./index.css"; // Import your custom CSS file
import RemoveTag from "../../components/removetag";
import ReviewCom from "../../Componentsnew/Review";

const DetailPageTab = ({ description, general, Reviews }) => {
  const showSpecificationTab = general && general.length > 0;

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
              width: "100%", // Ensure description content takes full width
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
        <ReviewCom></ReviewCom>
          </TabPanel>
        )}
      </Tabs>
    </div>
  );
};

export default DetailPageTab;
