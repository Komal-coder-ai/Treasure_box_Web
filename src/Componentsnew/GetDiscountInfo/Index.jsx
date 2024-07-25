// src/components/CenteredContent.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './index.css';
import ButtonForAll from '../../components/ButtonForALL';

const CenteredContent = () => {
    return (
        <Container className="centered-container">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={10}>
                    <div className="content">
                        <h2>Get Discount Info</h2>
                        <p>Subscribe to the Outstock mailing list to receive updates on new arrivals, special offers, and other discount information.

                        </p>
                        <input type="text" placeholder="Subscribe to our newsletter..." className='inputGetDiscount' />
                       <div className="subscribe_btn">
                       <ButtonForAll name="Subscribe" />
                       </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CenteredContent;
