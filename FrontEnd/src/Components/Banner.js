import React from 'react';
import Carousel from "react-bootstrap/Carousel";
import pic1 from "./Assets/pic1.jpg";
import pic2 from "./Assets/pic2.jpg";
import pic3 from "./Assets/pic3.jpg";
import pic4 from "./Assets/pic4.jpg";
import pic5 from "./Assets/pic5.jpg";


const Banner = () => {
  return (
    <div className='bg-black w-100 mt-2 d-flex align-items-center'>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <Carousel>
              <Carousel.Item>
                <img src={pic1} className="w-100" style={{ maxHeight: "50vh", objectFit: "cover" }} alt="ExampleImage" />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={pic2} className="w-100" style={{ maxHeight: "50vh", objectFit: "cover" }} alt="ExampleImage" />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={pic3} className="w-100" style={{ maxHeight: "50vh", objectFit: "cover" }} alt="ExampleImage" />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={pic4} className="w-100" style={{ maxHeight: "50vh", objectFit: "cover" }} alt="ExampleImage" />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={pic5} className="w-100" style={{ maxHeight: "50vh", objectFit: "cover" }} alt="ExampleImage" />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col">
            <Carousel>
              <Carousel.Item>
                <img src={pic1} className="w-100" style={{ maxHeight: "50vh", objectFit: "cover" }} alt="ExampleImage" />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={pic2} className="w-100" style={{ maxHeight: "50vh", objectFit: "cover" }} alt="ExampleImage" />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={pic3} className="w-100" style={{ maxHeight: "50vh", objectFit: "cover" }} alt="ExampleImage" />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={pic4} className="w-100" style={{ maxHeight: "50vh", objectFit: "cover" }} alt="ExampleImage" />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={pic5} className="w-100" style={{ maxHeight: "50vh", objectFit: "cover" }} alt="ExampleImage" />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>



          <div className="col">
            <Carousel>
              <Carousel.Item>
                <img src={pic1} className="w-100" style={{ maxHeight: "50vh", objectFit: "cover" }} alt="ExampleImage" />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={pic2} className="w-100" style={{ maxHeight: "50vh", objectFit: "cover" }} alt="ExampleImage" />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={pic3} className="w-100" style={{ maxHeight: "50vh", objectFit: "cover" }} alt="ExampleImage" />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={pic4} className="w-100" style={{ maxHeight: "50vh", objectFit: "cover" }} alt="ExampleImage" />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={pic5} className="w-100" style={{ maxHeight: "50vh", objectFit: "cover" }} alt="ExampleImage" />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner;
