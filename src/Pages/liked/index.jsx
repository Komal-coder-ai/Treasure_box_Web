import React, { useEffect, useState } from 'react'
import { LikedHeading } from "../../components/heading";
import "./index.css"
import ToastMessage from '../../utils/ToastMessage';
import { getApiCall, getlikedProductApi } from '../../API/baseUrl';
import Loader from '../../components/loader';
import Empty from '../emptypage/emptyCart';
import emptyWishlist from "../../Assect/emptywishlist.png";
import ProductBox from '../../Componentsnew/productBox';
import TopPageImage from '../../components/toppageimage';
import ButtonForAll from '../../components/ButtonForALL';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';
import { BreadcrumbsFunction } from '../../Componentsnew/Breadcrumbs/Index';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
const Liked = () => {
    const user_id = localStorage.getItem("user_id")
    const [productList, setProductList] = useState([]);
    const [pending, setPending] = useState(false);
    const { liked } = useParams()
    console.log(liked, "liked")
    const getLiked = async () => {
        setPending(true)
        try {
            const result = await getApiCall(`${getlikedProductApi}/${user_id}`)
            if (result?.data?.status) {
                setProductList(result?.data?.productDetails)
                setPending(false)
            } else {
                ToastMessage("error", result.data.message);
            }
        } catch (error) {
        } finally {
            setPending(false)
        }
    }

    useEffect(() => {
        getLiked()
    }, [])

    const updateApiCall = async () => {
        try {
            const result = await getApiCall(`${getlikedProductApi}/${user_id}`)
            if (result?.data?.status) {
                setProductList(result?.data?.productDetails)
            } else {
                ToastMessage("error", result.data.message);
            }
        } catch (error) {
        } finally {
        }
    }



    return (
        <>

            <div className="TopPageForMobile">
                {/* <TopPageImage pagename="Wishlist.."></TopPageImage> */}
            </div>

            {pending ? <Loader /> :
                <div style={{
                    width: "90vw",
                    height: "cover",
                    background: 'white',
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    margin: "auto",
                    padding: "20px"
                }}>
                    {productList.length ?
                        <div >
                            <div className='wishlist_heading'>
                                {LikedHeading}
                            </div>
                            <div className='wishlist_container'

                            >  <Breadcrumbs
                                separator={<NavigateNextIcon fontSize="small" />}
                                aria-label="breadcrumb"
                            >
                                    <BreadcrumbsFunction link1="Home"
                                        page="Like"
                                    />
                                </Breadcrumbs>
                                <div className="wishList_img "

                                    style={{
                                        padding: "20px"
                                    }}
                                >
                                    <ProductBox renderproduct={productList} setProductList={setProductList} productApifunc={updateApiCall}
                                    />
                                </div>
                            </div>
                        </div>
                        :
                        <div className="emptycon">
                            <div className="data">
                                <h3>No Wishlist Items Found</h3>
                                <div className="btnWishlist"
                                >
                                    <Link to={"/product"} style={{ textDecoration: 'none' }}><ButtonForAll name="CONTINUE SHOPING" className="Wishlistbtn"></ButtonForAll></Link>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default Liked;


