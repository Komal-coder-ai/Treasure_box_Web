// import { useState } from "react";
// import Carousel from "react-bootstrap/Carousel";
// import "./homepageSlider.css";
// import ButtonForAll from "../components/ButtonForALL";
// import secondbanner from "../Assect/bannerImage/secong_banner.png";
// import first from "../Assect/bannerImage/First_banner.jpeg";

// function DarkVariantExample() {
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex, e) => {
//     setIndex(selectedIndex);
//   };

//   return (
//     <div className="sliderCon">
//       {/* <h1>Komal</h1> */}
//       <Carousel
//         activeIndex={index}
//         onSelect={handleSelect}
//         interval={3000}
//         controls={false}
//         indicators
//         pause={false}
//         className="HomePageSliderCon"
//       >
//         <Carousel.Item>
//           <div className="carousel-item-content">
//             <div className="content-text"></div>
//             <img
//               className="d-block w-100"
//               src={secondbanner}
//               alt="Second slide"
//             />
//           </div>  
//         </Carousel.Item>
//         <Carousel.Item>
//           <div className="carousel-item-content">
//             <div className="content-text"></div>
//             <img className="d-block w-100" src={first} alt="Third slide" />
//           </div>
//         </Carousel.Item>
//       </Carousel>
//     </div>
//   );
// }

// export default DarkVariantExample;


import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./homepageSlider.css";
import ButtonForAll from "../components/ButtonForALL";
import { BannerList, getApiCall, ImageUrl } from "../API/baseUrl";
import { Link, useNavigate } from "react-router-dom";

function DarkVariantExample() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const [data, setData] = useState([])
	const [pending, setPending] = useState(false)

  const fetchBannerList = async () => {
		setPending(true)
	    try {
	        const result = await getApiCall(BannerList)
	        if (result.data.status) {
            setBanners(result.data.data)
              console.log("result.data.data", result.data.data)
      
				setPending(false)
	        }
	    } catch (error) {
	        console.log("error", error);
	    } finally {
			setPending(false)
	    }
	}

	useEffect(() => {
	    fetchBannerList();
	}, []);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="sliderCon">
      <Link to="/product">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={3000}
        controls={false}
        indicators
        pause={false}
        className="HomePageSliderCon"
      >
        {banners.map((banner, idx) => (
          <Carousel.Item key={idx}>
            <div className="carousel-item-content">
            
            
             <img src={`${ImageUrl}${banner.banner_image}`} alt="ss"className="d-block w-100" />
             {console.log(`${ImageUrl}${banner.banner_image}`,"sssss")}
            </div>

          </Carousel.Item>
        ))}
      </Carousel>
      </Link>
    </div>
  );
}

export default DarkVariantExample;
