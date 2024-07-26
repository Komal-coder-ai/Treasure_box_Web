import React from "react";
import "./index.css";
import { ImageUrl } from "../../API/baseUrl";
import { Link } from "react-router-dom";

const HoomepageSlider2 = ({ titleList }) => {
  // Limit the number of items to 3
  const limitedTitleList = titleList.slice(0, 3);

  return (
    <div className="HomepageSliderCon2 container-fluid">
      <div className="row">
        {limitedTitleList.map((item, index) => (
          <div key={index} className="col-12 col-md-4">
            <div className="box box1">
              <div className="box-content d-flex">
                <div>
                  <p>{item.category_name}</p>
                  <Link to="/product" className="DiscovernowBNT">
                    Discover now
                  </Link>
                </div>
                <img
                  src={`${ImageUrl}${item.files}`}
                  alt={item.category_name}
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoomepageSlider2;
