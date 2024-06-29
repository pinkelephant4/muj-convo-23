import React from "react";
import vector from "../assets/Vector.svg";
import FAQDetails from "../components/FAQDetails";
import "../style/FAQ.css";
const FAQPage = () => {
  return (
    <>
      <div className='homeFAQDiv'>
        <div className='vector_rightFAQDiv'>
          <div className='mainFAQDiv' style={{ marginTop: "7rem" }}>
            <FAQDetails />
          </div>
        </div>
        <img src={vector} alt='' className='vectorFAQDiv' />
      </div>
    </>
  );
};

export default FAQPage;
