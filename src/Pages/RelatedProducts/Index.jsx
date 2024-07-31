import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { IoAddSharp } from "react-icons/io5";
import "./index.css"; // Ensure this CSS file contains necessary styles
import {
  addtowishlist,
  deleteApiCall,
  deleteFromWishlistApi,
  ImageUrl,
  postApiCall,
  relatedProductAPI,
} from "../../API/baseUrl";
import axios from "axios";
import { Col, Container } from "react-bootstrap";

const RelatedProductList = ({
  reload,
  setReload,
  newarrivalList,
  setNewarrivalList,
  user_id,
  subcategory,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondaryImages, setSecondaryImages] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage()); // State for items per page
  const navigate = useNavigate();

  // Function to determine items per page based on screen width
  function getItemsPerPage() {
    const width = window.innerWidth;
    if (width <= 600) return 1; // Mobile
    if (width <= 1200) return 2; // Tablet
    return 4; // Desktop
  }

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await postApiCall(relatedProductAPI, {
        subCategory_Id: subcategory,
        userId: "", // Assuming userId can be an empty string
      });
      console.log("Response data:", response.data);
      if (response.data.status) {
        setProducts(response.data.list);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [subcategory]);

  // Update items per page when window is resized
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - itemsPerPage + products.length) % products.length
    );
  };

  // Handle next button click
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % products.length);
  };

  const displayedProducts = products
    .slice(currentIndex, currentIndex + itemsPerPage)
    .concat(
      products.slice(
        0,
        Math.max(0, currentIndex + itemsPerPage - products.length)
      )
    );

  // Handle image hover
  const handleImageHover = (index, isHovering) => {
    setSecondaryImages((prevImages) => {
      const product = products[index];
      if (!product) {

        return prevImages;
      }
      return {
        ...prevImages,
        [index]: isHovering
          ? `${ImageUrl}/${product.secondary_image}`
          : null,
      };
    });
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleLikeToggle = async (id, index, type, user_id) => {
    if (user_id) {
      try {
        if (type === "remove") {
          await deleteApiCall(`${deleteFromWishlistApi}/${user_id}/${id}`);
          const updatedList = newarrivalList.filter(
            (item) => item.productId !== id
          );
          setNewarrivalList(updatedList);
        } else {
          await postApiCall(addtowishlist, {
            productId: id,
            user_id: user_id,
          });
        }
        newarrivalList[index].is_wishlist = !newarrivalList[index].is_wishlist;
        setNewarrivalList([...newarrivalList]);
      } catch (error) {
        console.log("Error: ", error);
      }
    } else {
      // setShowLoginPopup(!showLoginPopup);
    }
  };

  const handleDetailPage = (id, name) => {
    const cleanedName = name.replace(/[^\w\s]/gi, "");
    navigate(`/productDetails/${id}/${cleanedName}`);
  };

  const truncateProductName = (name, maxLength) => {
    if (name.length > maxLength) {
      return `${name.substring(0, maxLength)}...`;
    }
    return name;
  };

  return (
    <div className="related-products">

      <Container className="d-flex">
        <Col><hr /></Col>
        <Col className="text-center" style={{
          color: "#201f1f"
        }}> <h1>Related Products</h1></Col>
        <Col><hr /></Col>
      </Container>
      <p className="text-center"

      >Check out these related items to complement your choice!</p>



      <div className="slider-wrapper">
        <ArrowBackIosIcon
          onClick={handlePrev}
          style={{ cursor: "pointer", fontSize: "2rem", color: "var(--primary-color)" }}
        />
        <div className="slider-container">
          <div className="product-list" style={{ display: "flex" }}>
            {displayedProducts?.map((item, index) => (
              <div
                key={item.id}
                className="product-box"
                style={{
                  flex: "0 0 auto",
                  width: `${100 / itemsPerPage}%`,
                  padding: "10px",
                }}
              >
                <div className="product-img-box">
                  <div
                    className="likebuttonForMobile"
                    onClick={() =>
                      handleLikeToggle(
                        item.id,
                        index,
                        item.is_wishlist ? "remove" : "add"
                      )
                    }
                  >
                    {item?.is_wishlist ? (
                      <FavoriteIcon className="product-icon" />
                    ) : (
                      <FavoriteBorderIcon className="product-icon" />
                    )}
                  </div>

                  <img
                    onMouseEnter={() => handleImageHover(index, true)}
                    onMouseLeave={() => handleImageHover(index, false)}
                    onClick={() => handleDetailPage(item.id, item.product_name)}
                    className="product-image"
                    src={
                      (item && secondaryImages[index]) || (item && `${ImageUrl}/${item.files}`)

                    }
                    alt={item ? item.product_name : 'Product'}
                    style={{
                        width:'300px',
                        height:"400px"
                    }}
                  />

                  <div className="product-icons">
                    <p>
                      <ShoppingBagOutlinedIcon
                        className="product-icon"
                        onClick={() =>
                          handleDetailPage(
                            item.productId || item.id,
                            item.product_name || item.productName
                          )
                        }
                      />
                    </p>
                    {item.is_wishlist ? (
                      <p>
                        <FavoriteIcon
                          className="product-icon"
                          onClick={() =>
                            handleLikeToggle(
                              item.id || item.productId,
                              index,
                              "remove",
                              user_id
                            )
                          }
                        />
                      </p>
                    ) : (
                      <p>
                        <FavoriteBorderIcon
                          className="product-icon"
                          onClick={() =>
                            handleLikeToggle(
                              item.id || item.productId,
                              index,
                              "add",
                              user_id
                            )
                          }
                        />
                      </p>
                    )}
                  </div>


                </div>
                <div
                  className="product-description"
                  style={{ marginTop: "20px" }}
                >
                  <p
                    className="product-name"
                    onClick={() =>
                      handleDetailPage(item.id, item.product_name)
                    }
                  >
                    {truncateProductName(item.product_name, 25)}
                  </p>
                  <p className="product-price">
                    {item.discount_percent === 0 ? (
                      <span className="mrp-with-discount product-icon_rs">
                        <CurrencyRupeeIcon style={{ fontSize: "14px" }} />{" "}
                        {item.discount_amount || item.price}
                      </span>
                    ) : (
                      <>
                        <span className="mrp-with-discount product-icon_rs">
                          <CurrencyRupeeIcon style={{ fontSize: "14px" }} />
                          {item.discount_amount}
                        </span>
                        <strike className="discount-mrp">
                          {item.mrp_amount || item.price}
                        </strike>
                        <span className="discount-percent">
                          {item.discount_percent}% off
                        </span>
                      </>
                    )}
                  </p>
                  <div
                    className="addtocart"
                    onClick={() =>
                      handleDetailPage(item.id, item.product_name)
                    }
                  >
                    <IoAddSharp /> <span>Add to cart</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ArrowForwardIosIcon
          onClick={handleNext}
          style={{ cursor: "pointer", fontSize: "2rem", color: "var(--primary-color)" }}
        />
      </div>
    </div>
  );
};

export default RelatedProductList;
