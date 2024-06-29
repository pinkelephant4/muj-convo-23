import React from "react";
import vector from "../assets/Vector.svg";
import ContactDetails from "../components/ContactDetails";
import "../style/contact.css";
const Contact = () => {
  return (
    <>
      <div className='homeContactDiv'>
        <div className='vector_rightContactDiv'>
          <div className='mainContactDiv' style={{ marginTop: "7rem" }}>
            <ContactDetails />
          </div>
        </div>
        <img src={vector} alt='' className='vectorContactDiv' />
      </div>
    </>
  );
};

export default Contact;
