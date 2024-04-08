import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Side from "../Components/Side"
const BannerQ = () => {
  const navigate=useNavigate()
  return (
    <Container fluid>


  {/* first  row with four images */}
  <Row className='d-flex justify-content-center align-items-center mb-2 mt-4 bg-61677A mt-2' style={{backgroundColor:'#FFF6E0'}}>
  <Col xs={12} md={3} className="mb-4 text-center">
    <img
      src="https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/september/230912-fl-hp-category-6up-update-mens.jpg"
      alt=""
      className="img-fluid  border border-dark img-responsive"
      style={{ width: '100%', maxHeight: '300px' }}

      onClick={()=>navigate("/men")}
    />
    <h3 className="mt-3 text-uppercase">Men</h3>
   
  </Col>
  <Col xs={12} md={3} className="mb-4 text-center">
    <img
      src="https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/september/230912-fl-hp-category-6up-update-womens.jpg"
      alt=""
      className="img-fluid  border border-dark img-responsive"
      style={{ width: '100%', maxHeight: '300px' }}
      onClick={()=>navigate("/women")}
    />
    <h3 className="mt-3 text-uppercase">Women</h3>
  </Col>
  <Col xs={12} md={3} className="mb-4 text-center">
    <img
      src="https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/september/230912-fl-hp-category-6up-update-kids.jpg"
      alt=""
      className="img-fluid  border border-dark img-responsive"
      style={{ width: '100%', maxHeight: '300px' }}
    />
    <h3 className="mt-3 text-uppercase">Kids</h3>
  </Col>
  <Col xs={12} md={3} className="mb-4 text-center">
    <img
      src="https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/september/230912-fl-hp-category-6up-update-sale.jpg"
      alt=""
      className="img-fluid  border border-dark img-responsive"
      style={{ width: '100%', maxHeight: '300px' }}
    />
    <h3 className="mt-3 text-uppercase">Sale</h3>
  </Col>
</Row>




{/* second row with four images */}
      <Row className='d-flex justify-content-center mb-4'>
        {/* <Col xs={12} md={3} className="mb-4">
          <img
            src="https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/november/231121-fl-up-to-50-off-bf-3up-1-nike-b.jpg"
            alt=""
            className="img-fluid"
          />
        </Col>
        <Col xs={12} md={3} className="mb-4">
          <img
            src="https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/november/231121-fl-up-to-50-off-bf-3up-2-jordan-b.jpg"
            alt=""
            className="img-fluid"
          />
        </Col>
        <Col xs={12} md={3} className="mb-4">
          <img
            src="https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/november/231121-fl-up-to-50-off-bf-3up-5-a-converse-b.jpg"
            alt=""
            className="img-fluid"
          />
        </Col>
        <Col xs={12} md={3} className="mb-4">
          <img
            src="https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/november/231121-fl-up-to-50-off-bf-3up-4-ugg-b.jpg"
            alt=""
            className="img-fluid"
          />
        </Col> */}

        <Side/>
      </Row>

      {/* third row with a welcome message and image */}
      <Row className='mb-4'>
        <Col>
          <h1 className="text-center  text-white">Welcome to our store</h1>
          <img
            src="https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/october/231016-fl-hoka-overcast-1up.jpg"
            alt=""
            className="img-fluid"
          />
        </Col>
      </Row>

      {/* fourth row with a heading and another image */}
      <Row className='mb-4'>
        <Col>
          <h1 className="text-center text-white">Explore Top Picks</h1>
          <img
            src="https://3.bp.blogspot.com/-jYviyiH5lCc/U2DDfcOxw0I/AAAAAAAAADk/ktx-5xRBbdA/s1600/10+top+shoe+brands+in+india.PNG"
            alt=""
            className="img-fluid"
          />
        </Col>
      </Row>
     
    </Container>
  );
};

export default BannerQ;
