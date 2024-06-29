import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/SideContext";
import { useAlert } from "../context/AlertMessageContext";
import Alerts from "../components/Alert";
import { Spinner } from "react-bootstrap";
const DepForm = ({
  student,
  setStudent,
  dues,
  setDues,
  singleUser,
  setSingleUser,
  loading,
  setLoading,
}) => {
  const [reg_no, setRegNo] = useState("");

  const [amountDue, setAmountDue] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState("");
  const { message, setMessage } = useAlert();
  const { token, setToken, isuserloggedin, setIsuserloggedin, role, setRole } =
    useAuth();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => setOpen(false), 3000);
  }, [open]);

  const handleRegNoSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://us-central1-muj-convocation-2023.cloudfunctions.net/app/student/get-specific-student/${reg_no}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAllDues();
      setShowDetails(true);
      setStudent(response.data.student);
      console.log(response);
    } catch (e) {
      console.log("HI");
      setMessage("No Student Found");
      setOpen(true);
      console.log(e);
    }
  };
  const getAllDues = async () => {
    try {
      setLoading(true);
      const response2 = await axios.get(
        `https://us-central1-muj-convocation-2023.cloudfunctions.net/app/due/get-student-dept-dues/${reg_no}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response2);
      setDues(response2.data.data.length ? response2.data.data : [{}]);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const handleDueSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log({
        reg_no: student.reg_no,
        amount_due: amountDue,
        details: details,
        department: singleUser.department,
      });
      const response = await axios.post(
        `https://us-central1-muj-convocation-2023.cloudfunctions.net/app/due/create-student-dept-due`,
        {
          reg_no: student.reg_no,
          amount_due: amountDue,
          details: details,
          department: singleUser.department,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setLoading(false);
      getAllDues();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {open ? <Alerts /> : null}
      <div className='form'>
        <h3 className='form-heading'>REGISTER/CLEAR STUDENT DUE</h3>
        <div>
          <form className='form-group'>
            <input
              className='inputs form-control'
              placeholder='Enter Student Registration Number'
              name='reg_no'
              value={reg_no}
              onChange={(e) => setRegNo(e.target.value)}
              inputmode='numeric'
            ></input>
            <br />
            <button
              className='btn btn-secondary'
              type='submit'
              onClick={handleRegNoSubmit}
            >
              Search Student
            </button>
          </form>
          {showDetails ? (
            <form className='form-group'>
              <input
                className='inputs form-control'
                placeholder='Enter Student Due Amount'
                name='amount_due'
                value={amountDue}
                onChange={(e) => setAmountDue(e.target.value)}
                type='text'
              ></input>
              <br />
              <textarea
                className='inputs text-Box'
                placeholder='Enter Student Due Details'
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                name='details'
              ></textarea>
              <br />
              <button
                className='success-btn'
                type='submit'
                onClick={handleDueSubmit}
              >
                REGISTER STUDENT DUE
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default DepForm;
