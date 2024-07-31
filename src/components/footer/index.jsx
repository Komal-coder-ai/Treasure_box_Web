import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import logo from "../../Assect/logo.png";
import Login from "../../Pages/login/login";
import { Activecategory, getApiCall } from "../../API/baseUrl";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

const Footer = ({ catval, setCatval, bgcolor, textcolor, imptext }) => {
  const [showloginpopup, setShowloginpopup] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async () => {
    try {
      const result = await getApiCall(Activecategory);
      if (result.data.status) {
        const categoryData = result.data.category.map((item) => ({
          ...item,
          type: "category",
        }));
        setCategoryList(categoryData);
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const handleCatClick = (name) => {
    setCatval(name);
  };

  const handleEmptyCatval = () => {
    setCatval("");
  };

  const handleProfilePage = () => {
    setShowloginpopup(!showloginpopup);
  };

  // Define default colors
  const defaultBgColor = " var(--secondary-color)";
  const defaultTextColor = "#000000";

  // Determine final colors based on props or defaults
  const finalBgColor = bgcolor || defaultBgColor;
  const finalTextColor = textcolor || defaultTextColor;

  return (
    <footer
      className="footer container-fluid"
      style={{
        padding: "50px",
        backgroundColor: finalBgColor,
        color: finalTextColor,
      }}
    >
      <div
        className="container"
        style={{
          width: "90%",
        }}
      >
        <div className="row footer_list">
          <div className="col-2-2 col-lg-3">
            <ul className="footer_links">
              <p
                className="footerheading"
                style={{
                  color: finalTextColor,
                }}
              >
                Categories
              </p>
              {categoryList.length > 0 ? (
                categoryList.map((name, index) => (
                  <li key={index}>
                    <Link
                      className=""
                      onClick={() => handleCatClick(name.category_name)}
                      to={`/product/${name.id}/${name.category_name}`}
                    >
                      <p
                        style={{
                          color: finalTextColor,
                        }}
                      >
                        {name.category_name}
                      </p>
                    </Link>
                  </li>
                ))
              ) : (
                <li>No categories found</li>
              )}
            </ul>
          </div>

          <div className="col-2-2 col-lg-3">
            <ul className="footer_links">
              <p
                className="footerheading"
                style={{
                  color: finalTextColor,
                }}
              >
                Help
              </p>
              <li
                className="nospace"
                style={{
                  color: finalTextColor,
                }}
              >
                <Link onClick={handleEmptyCatval} to="/contact" className="">
                  Contact
                </Link>
              </li>
              <li
                className="nospace"
                style={{
                  color: finalTextColor,
                }}
              >
                <Link onClick={handleEmptyCatval} to="/help" className="">
                  FAQs
                </Link>
              </li>
              <li
                className="nospace"
                style={{
                  color: finalTextColor,
                }}
              >
                <Link onClick={handleEmptyCatval} to="/terms" className="">
                  Terms and Conditions
                </Link>
              </li>
              <li
                className="nospace"
                style={{
                  color: finalTextColor,
                }}
              >
                <Link onClick={handleEmptyCatval} to="/privacy" className="">
                  Privacy Policy
                </Link>
              </li>
              <li
                className="nospace"
                style={{
                  color: finalTextColor,
                }}
              >
                <Link onClick={handleEmptyCatval} to="/about" className="">
                  About Us
                </Link>
              </li>
              <li
                className="nospace"
                style={{
                  color: finalTextColor,
                }}
              >
                <Link onClick={handleEmptyCatval} to="/return" className="">
                  Return Policy
                </Link>
              </li>
              <li
                className="nospace"
                style={{
                  color: finalTextColor,
                }}
              >
                <Link onClick={handleEmptyCatval} to="/refund" className="">
                  Refund Policy
                </Link>
              </li>
              <li
                className="nospace"
                style={{
                  color: finalTextColor,
                }}
              >
                <Link onClick={handleEmptyCatval} to="/shipping" className="">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          <div
            className="col-2-2 col-lg-3"
            style={{
              color: finalTextColor,
            }}
          >
            <p
              className="footerheading"
              style={{
                color: finalTextColor,
              }}
            >
              GET IN TOUCH
            </p>
            <p
              style={{
                color: finalTextColor,
              }}
            >
              Any questions? <span>Let us know</span>
              <a
                onClick={handleEmptyCatval}
                href="tel:+919294588000"
                className="footcolorlinks"
                style={{
                  color: finalTextColor,
                }}
              >
                {/* (+91) 92945 88000 */}
              </a>
            </p>
            <p
              className="stext-301 nospace footcolor p-b-10 p-t-15"
              style={{
                color: finalTextColor,
              }}
            >
              Follow Us
              <div
             
                className="icon footerSocialMediaIcon"
                style={{
                  color: finalTextColor,
                }}
              >
                <a
                  href="https://www.instagram.com/treasureboxlife/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram
                    className="footerSocialMediaIcon"
                    style={{
                      color: finalTextColor,
                    }}
                  />
                </a>
                <a
                  href="https://www.facebook.com/batracards123?mibextid=LQQJ4d"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF
                    className="footerSocialMediaIcon"
                    style={{
                      color: finalTextColor,
                    }}
                  />
                </a>
                <a href="https://www.google.com/maps/place/TREASURE+BOX/@22.6993657,75.8477109,17z/data=!3m1!4b1!4m6!3m5!1s0x3962fdf8143cc3e5:0x54bc4ea63891ccef!8m2!3d22.6993657!4d75.8502858!16s%2Fg%2F11n0dxv59c?entry=ttu">
                  <CiLocationOn
                    className="footerSocialMediaIcon"
                    style={{
                      color: finalTextColor,
                    }}
                  />
                </a>
              </div>
            </p>
          </div>
        </div>

        <div className="empty_footer_div"></div>
      </div>

      {showloginpopup && (
        <Login
          showloginpopup={showloginpopup}
          setShowloginpopup={setShowloginpopup}
        />
      )}
    </footer>
  );
};

export default Footer;
