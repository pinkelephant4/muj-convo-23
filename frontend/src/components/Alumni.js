import React, { Component } from "react";
import { Accordion } from "react-bootstrap";
import paymentSS from "../assets/Payment SS Alumni.png";
const Alumni = () => {
  return (
    <div className='FAQBox'>
      <div className='FAQHeader'>
        <h3>Alumni Registration</h3>
      </div>
      <div className='AccordionBody'>
        <Accordion>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>
              <h6 style={{ fontSize: "1.5rem" }}>Mission </h6>
            </Accordion.Header>

            <Accordion.Body style={{ textAlign: "justify" }}>
              <span>
                <br />
                Manipal University Jaipur Alumni Association registered under
                the Rajasthan Society Act 1958 on 24 August 2023.
                <br />
                <br />
                The mission of MUJAA is to create an association of the alumni
                of Manipal University Jaipur, for bringing together all the
                alumni of the Manipal University Jaipur so that it may create
                professional networking for mutual benefit in academic and
                professional or business areas. The mission of MUJAA is also to
                encourage alumni to contribute to the university’s efforts for
                achieving excellence in academics and research through
                allocating / raising funds and/or sharing knowledge & expertise
                of its members in areas pertaining to academics, infrastructure,
                industry interactions and any other area that the alumni and the
                university feel appropriate.
                <br />
                <br />
              </span>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey='1'>
            <Accordion.Header>
              <h6 style={{ fontSize: "1.5rem" }}>
                Link for Registration form for MUJAA membership
              </h6>
            </Accordion.Header>
            <Accordion.Body>
              <span>https://forms.gle/1uQoEg96orXg2ZJNA</span>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey='2'>
            <Accordion.Header>
              <h6 style={{ fontSize: "1.5rem" }}>Payment Details</h6>
            </Accordion.Header>
            <Accordion.Body>
              <span>
                <br />
                <strong>
                  Annual membership of ₹200/- and Life membership of ₹800/-
                </strong>
                <br />
                <br />
                <br />
                Bank Account details Bank : Account name- MANIPAL UNIVERSITY
                JAIPUR ALUMNI ASSOCIATION A/C Number- 284201002043 IFSC code:
                ICIC0002842
                <img
                  src={paymentSS}
                  alt=''
                  style={{
                    objectFit: "contain",
                    marginTop: "-30px",
                    marginBottom: "-50px",
                  }}
                />
              </span>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default Alumni;
