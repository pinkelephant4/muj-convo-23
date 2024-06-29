import React, { useState, useEffect } from "react";
import "../style/depDash.css";
import vector from "../assets/Vector.svg";
import DepDetails from "./DepDetails";
import DepForm from "./DepForm";
import DepTable from "./DepTable";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Spinner } from "react-bootstrap";
const DepDash = ({ singleUser, setSingleUser }) => {
  const [student, setStudent] = useState({
    student_name: "",
    faculty: "",
    specialization: "",
    reg_no: "",
  });
  const [dues, setDues] = useState([{}]);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className='home'>
        <div className='layer'>
          <div className='Form-outer'>
            <div className='Form-inner'>
              <div className='Form-Header'>
                <h1>{singleUser.department}</h1>
              </div>
              <div className='Dash-Upper'>
                <DepDetails student={student} setStudent={setStudent} />
                <DepForm
                  student={student}
                  setStudent={setStudent}
                  dues={dues}
                  setDues={setDues}
                  singleUser={singleUser}
                  setSingleUser={setSingleUser}
                  loading={loading}
                  setLoading={setLoading}
                />
              </div>

              <DepTable
                dues={dues}
                setDues={setDues}
                loading={loading}
                setLoading={setLoading}
                student={student}
                setStudent={setStudent}
              />
            </div>
          </div>
        </div>
        <img src={vector} alt='' className='vector' />
      </div>
    </>
  );
};

export default DepDash;
