import React, { Component } from "react";
import { Accordion } from "react-bootstrap";

const FAQDetails = () => {
  return (
    <div className="FAQBox">
      <div className="FAQHeader">
        <h3>FAQ</h3>
      </div>
      <div className="AccordionBody">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h6 style={{fontSize:"1.5rem"}}>
                Q. I am not having access to my outlook email id provided by
                Manipal University.{" "}
              </h6>
            </Accordion.Header>

            <Accordion.Body>
              <span>
                Ans. Please drop a mail at{" "}
                <a href="mailto:it.support@jaipur.manipal.edu">
                  it.support@jaipur.manipal.edu
                </a>{" "}
                , you will get your login credentials.
              </span>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <h6 style={{fontSize:"1.5rem"}}>
                Q. I have cleared my dues, but still, I am not able to login.
              </h6>
            </Accordion.Header>
            <Accordion.Body>
              <span>
                Ans. It will take 1-2 day to update the status of dues. Please
                check back after 1-2 days, or drop an email at{" "}
                <a href="mailto:manipalconvocation@gmail.com.">
                  manipalconvocation@gmail.com.
                </a>
              </span>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <h6 style={{fontSize:"1.5rem"}}>
                Q. I haven’t received password for login after registering.
              </h6>
            </Accordion.Header>
            <Accordion.Body>
              <span>
                Ans. Please check your spam/promotion folder. If not found in
                there also, please drop a mail at{" "}
                <a href="mailto:manipalconvocation@gmail.com.">
                  manipalconvocation@gmail.com.
                </a>
              </span>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <h6 style={{fontSize:"1.5rem"}}>Q. How many people can accompany me to the Convocation?</h6>
            </Accordion.Header>
            <Accordion.Body>
              <span>Ans. Maximum two guests can accompany you.</span>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <h6 style={{fontSize:"1.5rem"}}>
                Q. I want to change the number of people accompanying me in
                Convocation.
              </h6>
            </Accordion.Header>
            <Accordion.Body>
              <span>
                Ans. Please drop a mail at{" "}
                <a href="mailto:manipalconvocation@gmail.com.">
                  manipalconvocation@gmail.com.
                </a>{" "}
                Please limit the number of guests to two.
              </span>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>
              <h6 style={{fontSize:"1.5rem"}}>
                Q. Will the accommodation be provided by Manipal University?
              </h6>
            </Accordion.Header>
            <Accordion.Body>
              <span>
                Ans. No, but you can explore nearby places for pre-booking.
                Details of the same is available on our website under{" "}
                <strong>nearby places.</strong>
              </span>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="6">
            <Accordion.Header>
              <h6 style={{fontSize:"1.5rem"}}>
                Q. What if I register myself but can no longer attend the
                Convocation?
              </h6>
            </Accordion.Header>
            <Accordion.Body>
              <span>
                Ans. Please intimate us as soon as possible via email at{" "}
                <a href="mailto:manipalconvocation@gmail.com.">
                  manipalconvocation@gmail.com.
                </a>
              </span>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="7">
            <Accordion.Header>
              <h6 style={{fontSize:"1.5rem"}}>
                Q. How do I ensure that I have completed all necessary
                requirements from my end.
              </h6>
            </Accordion.Header>
            <Accordion.Body>
              <span>
                Ans. After completing all necessary requirements, you will get a
                confirmation mail stating details of your registration.
              </span>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQDetails;
