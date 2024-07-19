import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoBagHandleOutline } from "react-icons/io5";
import { Badge } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
import { handlegetdeliverycharge, getcartcount } from './someFile'; // Adjust the path accordingly
import { getApiCall, postApiCall, ToastMessage } from './anotherFile'; 
import MobileMenu from "../../Componentsnew/mobilemenu";

import SearchPage from "../../Pages/searchPage";
// import headerlogo from "../../Assect/logo.png";
import headerlogo from "../../../public/images/hederlogoMobile.png";
import "./index.css";
import TryNav from "../../Componentsnew/com/trynav";
import Login from "../../Pages/login/login";

const NewNavbar = ({
  reload,
  setReload,
  fontval,
  setFontval,
  catval,
  setCatval,
}) => {
  const user_id = localStorage.getItem("user_id");
  const mobile = localStorage.getItem("mobile");
  const username = localStorage.getItem("name");
  const navigate = useNavigate();

  const [showloginpopup, setShowloginpopup] = useState(false);
  const [showmblMenu, setShowmblMenu] = useState(false);
  const [searchvisible, setSearchvisibal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchdata, setSearchdata] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [subcategoryfilterList, setSubcategoryfilterList] = useState([]);
  const [deliverycharge, setDeliverycharge] = useState();
  const [cartcount, setCartcount] = useState("");
  const [cartTotal, setCartTotal] = useState("");
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchcategoryList();
    fetchsubcategoryList();
    handlegetdeliverycharge();
    getcartcount();
  }, []);

  const fetchcategoryList = async () => {
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
      console.log("error", error);
    }
  };

  const fetchsubcategoryList = async () => {
    try {
      const result = await getApiCall(Activesubcategory);
      if (result.data.status) {
        setSubcategoryList(result.data.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDetailPage = (id, name) => {
    const str = name.replace(/[^\w\s]/gi, "");
    navigate(`/productDetails/${id}/${str}`);
    setSearchdata([]);
    setCatval("");
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setAnchorEl(null);
    }
  };

  const handlelogout = async () => {
    setAnchorEl(null);
    setAnchorE3(null);
    setShowTryNav(false);
    try {
      const result = await postApiCall(`${logoutApi}/${user_id}`);
      if (result?.data?.status) {
        ToastMessage("success", result.data.message);
        localStorage.removeItem("user_id");
        localStorage.removeItem("mobile");
        localStorage.removeItem("name");
        setReload(!reload);
        getcartcount();
        navigate("/");
        setCatval("");
        setShowTryNav(false);
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSearchClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className={`headersection_container container-fluid ${isSticky ? "sticky" : ""}`}>
        <div className="headersection_container_one welcome_container">
          <div className="sectionBody">
            <div className="headersection_container_profile">
              <li className="col-lg-4">
                <Link to="/" className="web_logo_container_link">
                  <img src={headerlogo} alt="IMG-LOGO" onClick={imageclick} style={{ width: "200px" }} />
                </Link>
              </li>
              <div className="col-lg-4" style={{ display: "flex" }}>
                <li className="profile_list navbarListItemsStyle" ref={tryNavRef1}>
                  <div className="dropdown navbarListItemsStylex">
                    <button className="dropbtn" onClick={toggleTryNav}>
                      <span className="navbarListItemsStyle bold">
                        Shop <IoIosArrowDown />
                      </span>
                    </button>
                    <div className="">
                      <div className="shoplistdata" style={{ background: "white", width: "1220px" }}>
                        {showTryNav && <TryNav />}
                      </div>
                    </div>
                  </div>
                </li>
                <li className="profile_list navbarListItemsStyle" onClick={gotoabout}>
                  About
                </li>
                <li className="profile_list navbarListItemsStyle" onClick={gotocontact}>
                  Contact
                </li>
              </div>
              <div>
                <button onClick={handleSearchClick}>Search</button>
                {showPopup && (
                  <div className="popup">
                    <div className="popup-content">
                      <button className="close-button" onClick={handleClosePopup}>close</button>
                      <SearchPage onClose={handleClosePopup} />
                    </div>
                  </div>
                )}
              </div>
              <div className="cart_container_fluid">
                <div className="cart_price_count_container" onClick={Gotocart}>
                  <p className="cart_text_count navbarListItemsStyle">
                    <IoBagHandleOutline className="navbarListItemsStyle my-3" sx={{ cursor: "pointer" }} style={{ marginTop: "20px " }} />{" "}
                    <span sx={{ cursor: "pointer" }} style={{ marginTop: "20px" }}>
                      {" "}
                      Cart({cartcount ? cartcount : 0})
                    </span>
                  </p>
                </div>
              </div>
              <div className="dropdown-container1" ref={dropdownRef}>
                <li className="headersection_container_profile_Link_dis">
                  <Link onClick={toggleDropdownProfile}>
                    <FiAlignJustify style={{ fontSize: "25px" }} className="mx-3" />
                  </Link>
                </li>
                {isDropdownOpenProfile && (
                  <div className="dropdown-content1">
                    <ul>
                      <li className="">
                        <div className="profile_container">
                          <div className="profile_logo_container"></div>
                          {username ? (
                            <h6 style={{ color: "#5d5555", fontWeight: 600 }}>
                              Hello {username}
                            </h6>
                          ) : (
                            <h6 style={{ color: "#5d5555", fontWeight: 600 }}>
                              Welcome
                            </h6>
                          )}
                          {user_id ? (
                            <p>{mobile}</p>
                          ) : (
                            <p className="profile_welcome_msg">
                              To access account and manage orders
                            </p>
                          )}
                          {user_id ? (
                            <Link className="profile_link" to="/user">
                              Your account
                            </Link>
                          ) : (
                            <Link className="profile_link" to="/">
                              Sign In
                            </Link>
                          )}
                          {user_id ? (
                            <button
                              className="navbarListItemsStyle logout"
                              onClick={handlelogout}
                            >
                              Logout
                            </button>
                          ) : (
                            <button
                              className="navbarListItemsStyle login"
                              onClick={() => {
                                setShowloginpopup(true);
                              }}
                            >
                              Sign In
                            </button>
                          )}
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              {showloginpopup && (
                <div className="authModal popup">
                  <div className="popup-content">
                    <button className="close-button" onClick={() => setShowloginpopup(false)}>
                      close
                    </button>
                    <Login onClose={() => setShowloginpopup(false)} />
                  </div>
                </div>
              )}
              <div
                ref={profileRef}
                onClick={handleClickOutside}
                className="profile_menu"
              >
                <ul>
                  <li>
                    <Link to="/track">
                      <FavoriteIcon className="navbarListItemsStyle" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/user">
                      <MenuIcon className="navbarListItemsStyle" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileMenu showmblMenu={showmblMenu} setShowmblMenu={setShowmblMenu} />
    </>
  );
};

export default NewNavbar;
