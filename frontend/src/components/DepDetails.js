import React from "react";
import LOGO from "../assets/LOGO.png";

const DepDetails = ({ student, setStudent }) => {
  return (
    <div className='detailsPage'>
      <img src={LOGO} alt='' className='LOGONEW' />

      <div>
        <h5>Student Details</h5>
        <h6>Name: {student.student_name}</h6>
        <h6>Department: {student.faculty}</h6>
        <h6>{student.specialization}</h6>
      </div>
    </div>
  );
};

export default DepDetails;
