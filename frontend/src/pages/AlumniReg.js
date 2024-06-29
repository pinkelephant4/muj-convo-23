import React from "react";
import vector from "../assets/Vector.svg";
import ContactDetails from "../components/ContactDetails";
import "../style/contact.css";
import Alumni from "../components/Alumni";
const AlumniReg = () => {
  return (
    <>
      <div className='homeContactDiv'>
        <div className='vector_rightContactDiv'>
          <div className='mainContactDiv' style={{ marginTop: "7rem" }}>
            <Alumni />
          </div>
        </div>
        <img src={vector} alt='' className='vectorContactDiv' />
      </div>
    </>
  );
};

export default AlumniReg;
