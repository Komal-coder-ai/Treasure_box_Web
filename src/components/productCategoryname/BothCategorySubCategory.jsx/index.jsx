
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.css";
import { categorygetcategorieslist, getApiCall } from "../../../API/baseUrl";

const CategoryAndSubcategoryComponent = ({dropdownRef}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchcategoryList = async () => {
    try {
      const response = await getApiCall(categorygetcategorieslist)
      if (response.data.status) {
        setCategories(response.data.data);
        console.log()
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchcategoryList();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "90vw" ,
            overflowX:"scroll",
          
        }}
        className="CategoryAndSubcategoryCon"
      >
        {/* <h2></h2> */}
        {categories.map((category) => (
           category.subCategory.length > 0 && (
          <ul key={category.id}>
            <li>
              <Link
                to={`/product/${category.id}/${category.category_name}`}
                className="bothList"
                // onClick={dropdownRef}
              >
                {category.category_name}
              </Link>
            </li>

            <ul>
              {category.subCategory.map((subcategory) => (
                <Link
                  to={`/product/${category.id}/${category.category_name}/${subcategory.category_name}`}
                  className="bothList"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <li className="bothList" key={subcategory.id}
                  onClick={dropdownRef}
                  >
                    {subcategory.category_name}{" "}
                  </li>
                </Link>
              ))}
            </ul>
          </ul>
           )
        ))}
      </div>
    </>
  );
};

export default CategoryAndSubcategoryComponent;
