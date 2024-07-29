import React from "react";
import "./index.css";
import { ImageUrl } from "../../API/baseUrl";
import { Link, useNavigate } from "react-router-dom";

const HoomepageSlider2 = ({ titleList }) => {
  // Limit the number of items to 3
  const limitedTitleList = titleList.slice(0, 3);
  const navigate = useNavigate();
  
  const handleDetailPage = (id, name) => {  
    const cleanedName = name.replace(/[^\w\s]/gi, "");
    navigate(`/productDetails/${id}/${cleanedName}`);
  };


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
              
                  className="homepagesliderimage "
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
