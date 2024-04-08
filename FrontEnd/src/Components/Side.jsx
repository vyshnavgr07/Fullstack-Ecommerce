import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from '../Components/Assets/pic1.jpg'
import imgage2 from '../Components/Assets/pic2.jpg'
import image3 from '../Components/Assets/pic3.jpg'
import image4 from '../Components/Assets/pic4.jpg'
import image5 from '../Components/Assets/pic5.jpg'
function Slick() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3500,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
  return (
    <div className="slider-container">
    <Slider {...settings}>
      <div className="image-1 mx-1 ">
        <img src="https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/november/231121-fl-up-to-50-off-bf-3up-1-nike-b.jpg"   alt="" style={{ width: '15em' }} />
      </div>
      <div className="image-1 mx-1">
        <img src="https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/november/231121-fl-up-to-50-off-bf-3up-2-jordan-b.jpg" alt="" style={{ width: '15em' }} />
      </div>
      <div className="image-1 mx-1">
        <img src="https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/november/231121-fl-up-to-50-off-bf-3up-5-a-converse-b.jpg" alt="" style={{ width: '15em' }} />
      </div>
      <div className="image-1 mx-1">
        <img src="https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/november/231121-fl-up-to-50-off-bf-3up-4-ugg-b.jpg" alt="" style={{ width: '15em' }} />
      </div>
      <div className="image-1 mx-1">
        <img src="https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/november/231121-fl-up-to-50-off-bf-3up-1-nike-b.jpg" alt="" style={{ width: '15em' }} />
      </div>
    </Slider>
  </div>
  
  );
}

export default Slick;