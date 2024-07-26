import React from "react";
import "./index.css";
import span from "../../components/ButtonForALL"; // Assuming this is correctly imported
import { ImageUrl } from "../../API/baseUrl";
import { Link } from "react-router-dom";

const HoomepageSlider2 = ({ titleList }) => {
  return (
    <div className="HomepageSliderCon2 container-fluid">
      <div className="row">
        {titleList.map((item, index) => (
          <div key={index} className="col-12 col-md-4">
            <div className="box box1">
              <div className="box-content">
                <p>{item.category_name}</p>
                <img
                  src={`${ImageUrl}${item.files}`}
                  alt={item.category_name}
                  style={{ width: "50px", height: "50px" }}
                />
                <Link to={"/product"} className="DiscovernowBNT" >Discover now</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoomepageSlider2;
