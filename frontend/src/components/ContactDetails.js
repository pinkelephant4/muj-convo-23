import React, { Component } from "react";
import { Accordion } from "react-bootstrap";
import { BsMailbox } from "react-icons/bs";
import { BiMailSend } from "react-icons/bi";
const ContactDetails = () => {
  return (
    <div className='contactBox'>
      <div className='contactHeader'>
        <h3>Contact</h3>
      </div>
      <div className='AccordionBody'>
        <Accordion>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>
              <h6 style={{ fontSize: "1.5rem" }}>
                For Email Id Related Queries
              </h6>
            </Accordion.Header>

            <Accordion.Body>
              <BiMailSend />
              <span>
                Email:{" "}
                <a href='mailto:it.support@jaipur.manipal.edu'>
                  it.support@jaipur.manipal.edu
                </a>
              </span>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey='1'>
            <Accordion.Header>
              <h6 style={{ fontSize: "1.5rem" }}>For Library Dues</h6>
            </Accordion.Header>
            <Accordion.Body>
              <strong>
                Mr. Om Prakash Verma <br />
              </strong>
              Mob: 9828543435
              <br /> <BiMailSend />
              <span>
                Email :{" "}
                <a href='mailto:omprakash.verma@jaipur.manipal.edu'>
                  omprakash.verma@jaipur.manipal.edu
                </a>
              </span>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey='2'>
            <Accordion.Header>
              <h6 style={{ fontSize: "1.5rem" }}>For Finance Dues</h6>
            </Accordion.Header>
            <Accordion.Body>
              <strong>
                Ms Deepthi Rajeev
                <br />
              </strong>

              <BiMailSend />
              <span>
                Email:{" "}
                <a href='mailto:deepthi.rajeev@jaipur.manipal.edu'>
                  deepthi.rajeev@jaipur.manipal.edu
                </a>
              </span>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey='3'>
            <Accordion.Header>
              <h6 style={{ fontSize: "1.5rem" }}>For Mess Dues:</h6>
            </Accordion.Header>
            <Accordion.Body>
              <strong>
                Mr. Satish Adala, GHS <br />
              </strong>
              Mob: 6301683285
              <br />
              <BiMailSend />
              <span>
                Email:{" "}
                <a href='' style={{ color: "red" }}>
                  satish.adala@qmail.quesscorp.com
                </a>
              </span>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey='4'>
            <Accordion.Header>
              <h6 style={{ fontSize: "1.5rem" }}>For Hostel Dues</h6>
            </Accordion.Header>
            <Accordion.Body>
              <strong>
                Mr. Madhusudan Sharma, GHSPL <br />
              </strong>
              Mob: 9467040958
              <br />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey='5'>
            <Accordion.Header>
              <h6 style={{ fontSize: "1.5rem" }}>For AMS/Academics Dues </h6>
            </Accordion.Header>
            <Accordion.Body>
              <strong>
                Dr. Kusum Lata Jain <br />
              </strong>
              Mob: 9828133885
              <br />
              <BiMailSend />
              <span>
                Email:{" "}
                <a href='mailto:kusumlata.jain@jaipur.manipal.edu'>
                  kusumlata.jain@jaipur.manipal.edu
                </a>
              </span>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey='6'>
            <Accordion.Header>
              <h6 style={{ fontSize: "1.5rem" }}>For Sports Dues</h6>
            </Accordion.Header>
            <Accordion.Body>
              <strong>
                Mr. Sanjeev Sharma <br />
              </strong>
              Mob: 9993308598
              <br />
              <BiMailSend />
              <span>
                Email:{" "}
                <a href='mailto:sanjeev.sharma@jaipur.manipal.edu'>
                  sanjeev.sharma@jaipur.manipal.edu
                </a>
              </span>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey='7'>
            <Accordion.Header>
              <h6 style={{ fontSize: "1.5rem" }}>
                For Exam cell related queries
              </h6>
            </Accordion.Header>
            <Accordion.Body>
              <strong>
                Mr. Bijendra Singh
                <br />
              </strong>
              <BiMailSend />
              <span>
                Email:{" "}
                <a href='mailto:it.support@jaipur.manipal.edu'>
                  brijendra.singh@jaipur.manipal.edu
                </a>
              </span>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey='8'>
            <Accordion.Header>
              <h6 style={{ fontSize: "1.5rem" }}>For Any Other Queries</h6>
            </Accordion.Header>
            <Accordion.Body>
              <strong>
                Dr. Vaishali Yadav
                <br />
              </strong>
              Mob: 8386069007
              <br />
              <BiMailSend />
              <span>
                Email:{" "}
                <a href='mailto:it.support@jaipur.manipal.edu'>
                  vaishali.yadav@jaipur.manipal.edu
                </a>
              </span>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default ContactDetails;
