import React, { useEffect, useState } from "react";
import "./index.css";
import ToastMessage from "../../utils/ToastMessage";
import { ImageUrl, orderDetails, postApiCall } from "../../API/baseUrl";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import moment from "moment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ReviewForm from "../../Componentsnew/Review";
import { Button, Modal } from "react-bootstrap";
import { Box } from "@mui/material";
import { Rating } from "@mui/material";
import { Avatar } from "@material-ui/core";

const OrderDetails = () => {
    const { id } = useParams();
    const [details, setDetails] = useState({});
    const [data, setData] = useState([]);
    const [pending, setPending] = useState(false);
    const [userId, setUserId] = useState(null);
    const [productId, setProductId] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleOpen = (productId) => {
        setSelectedProductId(productId);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const getDetails = async () => {
        setPending(true);
        try {
            const result = await postApiCall(`${orderDetails}/${id}`);
            if (result?.data?.status) {
                const UserId = result?.data?.data?.userId;
                setUserId(UserId);
                setDetails(result?.data?.data);
                setData(result?.data?.data?.All_Orderd_Product);
            } else {
                ToastMessage("error", result.data.message);
            }
        } catch (error) {
            // Handle error
        } finally {
            setPending(false);
        }
    };

    useEffect(() => {
        getDetails();
    }, []);

    const handleInvoice = () => {
        window.open(`${ImageUrl}/${details.invoice_url}`, "_blank");
    };

    return (
        <>
            {pending ? (
                <Loader />
            ) : (
                <div className="orderDetailsOutsideClass">
                    <div className="orderDetailsMainClass">
                        {/* Order Details */}
                        <div className="deliveryAddressNameNumber">
                            <div className="deliveryAddressNameNumber_fluid">
                                {/* Delivery Address */}
                                <div>
                                    <p className="deliveryAddressParaHead">Delivery Address</p>
                                    <p className="deliveryNamePara">{details.name}</p>
                                    <p className="deliveryAddressPara">
                                        {details.address}, {details.city}, {details.state}- {details.addressType}
                                    </p>
                                    <p className="deliveryNumberPara">Phone Number : {details.mobile}</p>
                                    <p className="deliveryNumberPara">Email : {details.email}</p>
                                </div>
                                <div>
                                    <div className="orderOnAndTotalClass">
                                        <div className="orderOnClass">
                                            <p>Order On :</p>
                                        </div>
                                        <div className="orderOnDateClass">
                                            <p>{moment(details.Date).format("MMMM Do YYYY")}</p>
                                        </div>
                                    </div>
                                    <div className="orderOnAndTotalClass">
                                        <div className="orderOnClass">
                                            <p>Order Status :</p>
                                        </div>
                                        <div className="orderOnDateClass">
                                            <p>{details.orderStatus}</p>
                                        </div>
                                    </div>
                                    <div className="orderOnAndTotalClass">
                                        <div className="orderOnClass">
                                            <p>Delivery Charge :</p>
                                        </div>
                                        <div className="orderOnDateClass">
                                            {details.delivery_charge === "Free" ? (
                                                <p className="header-cart-item-rupee">
                                                    {details.delivery_charge}
                                                </p>
                                            ) : (
                                                <p className="header-cart-item-rupee">
                                                    <CurrencyRupeeIcon sx={{ fontSize: "15px" }} />{" "}
                                                    {Number(details.delivery_charge || 0.0).toFixed(2)}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="orderOnAndTotalClass">
                                        <div className="orderOnClass">
                                            <p>Order Total :</p>
                                        </div>
                                        <div className="orderOnDateClass">
                                            <p className="header-cart-item-rupee">
                                                <CurrencyRupeeIcon sx={{ fontSize: "15px" }} />{" "}
                                                {Number(details.total_order_amount).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="invoice_btn" onClick={handleInvoice}>
                                Download Invoice
                            </button>
                        </div>

                        {data.map((product, index) => (
                            <div key={index}>
                                <div className="productImageRateTrack">
                                    <div className="orderDetailsImageDiv">
                                        <img
                                            src={`${ImageUrl}${product.files}`}
                                            alt="IMG"
                                            height={150}
                                            width={150}
                                        />
                                    </div>

                                    <div className="orderDetailsNameFeaturePrice">
                                        <p className="colorGrayFontSize product_name_order_details">
                                            {product.product_name ? product.product_name : "-"}
                                            <p>ProductID :-</p> {product.productId}
                                        </p>
                                        {product.color_name === "FreeColor" ? (
                                            <p className="colorGrayFontSize">Color: -</p>
                                        ) : (
                                            <p className="colorGrayFontSize">
                                                Color: {product.color_name ? product.color_name : "-"}
                                            </p>
                                        )}
                                        {product.product_size === "FreeSize" ? (
                                            <p className="colorGrayFontSize">Size: -</p>
                                        ) : (
                                            <p className="colorGrayFontSize">
                                                Size: {product.product_size ? product.product_size : "-"}
                                            </p>
                                        )}
                                        <p className="colorGrayFontSize">
                                            Quantity: {product.quantity ? product.quantity : "-"}
                                        </p>
                                        <p className="colorGrayFontSize">
                                            Price: ₹
                                            {product.discount_percent === 0
                                                ? product.mrp_amount
                                                : product.discount_amount}
                                        </p>

                                        {product.ratingData?.isProductRated === 1 ? (
                                            // <div className="rating-comments">
                                            //     <Rating
                                            //         name="product-rating"
                                            //         value={parseFloat(product.ratingData.rating)}
                                            //         readOnly
                                            //     />
                                            //     <p className="colorGrayFontSize">
                                            //         {product.ratingData.name}
                                            //     </p>
                                            //     <p className="colorGrayFontSize">
                                            //         Email: {product.ratingData.email}
                                            //     </p>
                                            //     <p className="colorGrayFontSize">
                                            //         Comment: {product.ratingData.comment}
                                            //     </p>
                                            // </div>

                                            <div className="reviews-container mt-2    ">
                                                <h3>Your Reviews </h3> {/* Dynamically display review count */}

                                                <div key={index} className="review mt-3">
                                                    <div className="rating d-flex">
                                                        <Avatar
                                                            alt={product.ratingData.name}
                                                            src="/static/images/avatar/1.jpg" // Ensure this path is correct or dynamic
                                                            sx={{ width: 74, height: 74 }}
                                                        />
                                                        <div className="data mx-3">
                                                            <h5> {product.ratingData.name}</h5>
                                                            <p>{product.ratingData.email}</p>
                                                            <Rating name="no-value" value={product.ratingData.rating} />

                                                            {/* <p>Rating: {review.rating}</p> */}
                                                            <p>{product.ratingData.comment}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>

                                            </div>

                                        ) : (
                                            <span onClick={() => handleOpen(product.productId)}>
                                                <Rating name="no-value" value={null} color="var(--primary-color)" className="startrating mt-1" />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Modal
                show={open}
                onHide={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                centered
            >
                <Box
                    style={{
                        backgroundColor: 'background.paper',
                        padding: 3,
                        borderRadius: 2,
                        boxShadow: 24,
                        maxWidth: 500,
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    <ReviewForm orderid={id} userId={userId} productId={selectedProductId} />
                </Box>
            </Modal>
        </>
    );
};

export default OrderDetails;
