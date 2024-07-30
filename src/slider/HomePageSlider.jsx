import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./homepageSlider.css";
import ButtonForAll from "../components/ButtonForALL";
import secondbanner from "../Assect/bannerImage/secong_banner.png";
import first from "../Assect/bannerImage/First_banner.jpeg";

function DarkVariantExample() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="sliderCon">
      {/* <h1>Komal</h1> */}
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={3000}
        controls={false}
        indicators
        pause={false}
        className="HomePageSliderCon"
      >
        <Carousel.Item>
          <div className="carousel-item-content">
            <div className="content-text"></div>
            <img
              className="d-block w-100"
              src={secondbanner}
              alt="Second slide"
            />
          </div>  
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-item-content">
            <div className="content-text"></div>
            <img className="d-block w-100" src={first} alt="Third slide" />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default DarkVariantExample;
