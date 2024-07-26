import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { IoAddSharp } from "react-icons/io5";
import './index.css'; // Ensure this CSS file contains necessary styles
import { addtowishlist, deleteApiCall, deleteFromWishlistApi, ImageUrl, postApiCall } from '../../API/baseUrl';


const RelatedProductList = ({
  reload,
  setReload,
  newarrivalList,
  setNewarrivalList,
  user_id
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondaryImages, setSecondaryImages] = useState({});
  const navigate = useNavigate();
  // Number of products to display at a time
  const itemsPerPage = 4;

  // The payload for the POST request
  const requestPayload = {
    subCategory_Id: 0,
    user_id
  };
console.log("userid",user_id)
  // Fetch data from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://treasure.technotoil.com/product/get/sub-category-product/list', {
          method: 'POST',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestPayload),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.status) {
          setProducts(data.list); // Update state with fetched data
        } else {
          setError('No data available');
        }
      } catch (error) {
        setError(error.message); // Set error state if an error occurs
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchProducts();
  }, []);

  // Handle previous button click
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  // Handle next button click
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  // Determine which products to display
  const displayedProducts = products.slice(currentIndex, currentIndex + itemsPerPage).concat(
    products.slice(0, Math.max(0, currentIndex + itemsPerPage - products.length))
  );

  // Handle image hover
  const handleImageHover = (index, isHovering) => {
    setSecondaryImages((prevImages) => ({
      ...prevImages,
      [index]: isHovering
        ? `${ImageUrl}/${products[index].secondary_image}`
        : null,
    }));
  };

  // Render loading, error, or product list
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
      <div className="heading d-flex ">
        <hr />
        <h1>Related Products</h1>
        <hr />
      </div>
      <div className="slider-wrapper">
        <ArrowBackIosIcon
          onClick={handlePrev}
          style={{ cursor: 'pointer', fontSize: '2rem' }}
        />
        <div className="slider-container">
          <div className="product-list" style={{ display: 'flex' }}>
            {displayedProducts.map((product, index) => (
              <div key={product.id} className="product-box" style={{ flex: '0 0 auto', width: `${100 / itemsPerPage}%`, padding: '10px' }}>
                <div className="product-img-box">
                  <div
                    className="likebuttonForMobile"
                    onClick={() => handleLikeToggle(product.id, index, product.is_wishlist ? "remove" : "add")}
                  >
                    {product.is_wishlist ? (
                      <FavoriteIcon className="product-icon" />
                    ) : (
                      <FavoriteBorderIcon className="product-icon" />
                    )}
                  </div>
                  <img
                    onMouseEnter={() => handleImageHover(index, true)}
                    onMouseLeave={() => handleImageHover(index, false)}
                    onClick={() => handleDetailPage(product.id, product.product_name)}
                    className="product-image"
                    src={secondaryImages[index] || `${ImageUrl}/${product.files}`}
                    alt={product.product_name}
                  />
                  <div className="product-icons">
                    <ShoppingBagOutlinedIcon
                      className="product-icon"
                      onClick={() => handleDetailPage(product.id, product.product_name)}
                    />
                    {product.is_wishlist ? (
                      <FavoriteIcon
                        className="product-icon"
                        onClick={() => handleLikeToggle(product.id, index, "remove")}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        className="product-icon"
                        onClick={() => handleLikeToggle(product.id, index, "add")}
                      />
                    )}
                  </div>
                </div>
                <div className="product-description" style={{ marginTop: "20px" }}>
                  <p
                    className="product-name"
                    onClick={() => handleDetailPage(product.id, product.product_name)}
                  >
                    {truncateProductName(product.product_name, 25)}
                  </p>
                  <p className="product-price">
                    {product.discount_percent === 0 ? (
                      <span className="mrp-with-discount product-icon_rs">
                        <CurrencyRupeeIcon style={{ fontSize: '14px' }} /> {product.discount_amount || product.price}
                      </span>
                    ) : (
                      <>
                        <span className="mrp-with-discount product-icon_rs">
                          <CurrencyRupeeIcon style={{ fontSize: '14px' }} />
                          {product.discount_amount}
                        </span>
                        <strike className="discount-mrp">
                          {product.mrp_amount || product.price}
                        </strike>
                        <span className="discount-percent">
                          {product.discount_percent}% off
                        </span>
                      </>
                    )}
                  </p>
                  <div className="addtocart"
                  
               
                  onClick={() => handleDetailPage(product.id, product.product_name)}
              
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
          style={{ cursor: 'pointer', fontSize: '2rem' }}
        />
      </div>
    </div>
  );
};

export default RelatedProductList;
