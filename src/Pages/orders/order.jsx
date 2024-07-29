import { useEffect, useState } from "react";
import "./index.css";
import ToastMessage from "../../utils/ToastMessage";
import { ImageUrl, orderDetails, postApiCall } from "../../API/baseUrl";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import moment from "moment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ReviewForm from "../../Componentsnew/Review";
import Product_Comments from "../../Componentsnew/Product_Comments/Index";
import { Button, Modal } from "react-bootstrap"; // Adjusted import
import { Box } from "@mui/material";
import { Rating } from "@mui/material";

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
        setSelectedProductId(productId); // Set selected productId
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
                                            <p>productID :-</p> {product.productId}
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

                                        <span onClick={() => handleOpen(product.productId)}>
                                            <Rating name="no-value" value={null} />
                                        </span>
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
                </Box>
            </Modal>

           
        </>
    );
};

export default OrderDetails;





// <Modal
// show={open}
// onHide={handleClose}
// aria-labelledby="modal-modal-title"
// aria-describedby="modal-modal-description" sx={{
// }}
// style={{

//     display: 'flex',
//     alignItems: 'BottomSheet',
//     justifyContent: 'center',
//     height: '100vh',
//     width: '100vw',
//     overflow: 'auto',

//     marginTop: "10%"

// }}
// >
// <Box sx={{

// }}
//     style={{
//         backgroundColor: 'background.paper',
//         padding: 3,
//         borderRadius: 2,
//         boxShadow: 24,
//         maxWidth: 500,
//         width: '100%',
//         textAlign: 'center',
//     }}
// >
//     <div >
//         <ReviewForm orderid={id} userId={userId} productId={productId} />
//         {console.log("productId...", productId)}
//     </div>
// </Box>
// </Modal>