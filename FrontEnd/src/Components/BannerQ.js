import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const BannerQ = () => {
  return (
    <Container fluid>
      {/* First row with four images */}
      <Row className='d-flex justify-content-center mb-4'>
        <Col xs={12} md={3} className="mb-4">
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
        </Col>
      </Row>

      {/* Second row with a welcome message and image */}
      <Row className='mb-4'>
        <Col>
          <h1 className="text-center">Welcome to our store</h1>
          <img
            src="https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/october/231016-fl-hoka-overcast-1up.jpg"
            alt=""
            className="img-fluid"
          />
        </Col>
      </Row>

      {/* Third row with a heading and another image */}
      <Row className='mb-4'>
        <Col>
          <h1 className="text-center">Explore Top Picks</h1>
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
