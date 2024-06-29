import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import randomize from "randomatic";
import LOGO from "../assets/LOGO.png";
import Alerts from "./Alert";
import { useAlert } from "../context/AlertMessageContext";
const PAYU_MERCHANT_KEY = "kqfd6O";
const PAYU_SALT_KEY = "n0Qpybgx";
const Details = ({ singleUser }) => {
  const [companions, setCompanions] = useState("");
  const [open, setOpen] = useState(false);
  const [attending, setAttending] = useState();
  const [selectTerms, setSelectTerms] = useState(false);
  const [inPerson, setInPerson] = useState(true);
  const [paid, setPaid] = useState(singleUser.is_paid);
  const { message, setMessage } = useAlert();
  const handleChange = (e) => {
    e.target.value === "inPerson" ? setInPerson(true) : setInPerson(false);
    setAttending(e.target.value);
  };

  //payment for without courier service
  const pd_in = {
    key: PAYU_MERCHANT_KEY,
    txnid: randomize("A0", 8),
    amount: 600,
    firstname: singleUser.student_name,
    email: singleUser.email,
    phone: singleUser.phone,
    productinfo: "Convocation Fees",
    surl: "https://www.mujconvocation.in/",
    furl: "https://www.mujconvocation.in/",
    hash: "",
  };

  //payment for with courier service
  const pd_out = {
    key: PAYU_MERCHANT_KEY,
    txnid: randomize("A0", 8),
    amount: 1000,
    firstname: singleUser.student_name,
    email: singleUser.email,
    phone: singleUser.phone,
    productinfo: "Convocation Fees",
    surl: "https://www.mujconvocation.in/",
    furl: "https://www.mujconvocation.in/",
    hash: "",
  };

  // Data to be Sent to API to generate hash.
  let paymentData_out = {
    txnid: pd_out.txnid,
    email: pd_out.email,
    amount: pd_out.amount,
    productinfo: pd_out.productinfo,
    firstname: pd_out.firstname,
  };

  let paymentData_in = {
    txnid: pd_in.txnid,
    email: pd_in.email,
    amount: pd_in.amount,
    productinfo: pd_in.productinfo,
    firstname: pd_in.firstname,
  };

  const handlePaymentClick = () => {
    if (attending === "inPerson") {
      handleClick_out();
    } else {
      handleClick_in();
    }
  };

  const handleClick_out = async () => {
    try {
      const res = await axios.post(
        "https://us-central1-muj-convocation-2023.cloudfunctions.net/app/student/payment/payumoney",
        {
          ...paymentData_out,
        }
      );
      const data = res.data;
      pd_out.hash = data.hash;
      redirectToPayU(pd_out);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick_in = async () => {
    try {
      const res = await axios.post(
        "https://us-central1-muj-convocation-2023.cloudfunctions.net/app/student/payment/payumoney",
        {
          ...paymentData_in,
        }
      );
      const data = res.data;
      pd_in.hash = data.hash;
      redirectToPayU(pd_in);
    } catch (err) {
      console.log(err);
    }
  };

  const redirectToPayU = (pd) => {
    console.log(pd);
    //use window.bolt.launch if you face an error in bolt.launch
    window.bolt.launch(pd, {
      responseHandler: async function (response) {
        try {
          console.log(response);
          const body = JSON.stringify(response.response);
          // your payment response Code goes here

          const res = await axios.post(
            "https://us-central1-muj-convocation-2023.cloudfunctions.net/app/student/paymentResponse",
            body
          );
          console.log(res);
          console.log(response.response.txnStatus);
          const data = res.data;
          const { success } = data;
          console.log(success);
          if (success && response.response.txnStatus !== "CANCEL") {
            try {
              console.log(pd.txnid);
              const res100 = await axios.post(
                "https://us-central1-muj-convocation-2023.cloudfunctions.net/app/student/getPaymentStatus",
                { mId: pd.txnid }
              );
              console.log(res100);
              console.log(
                res100.data.message,
                res100.data.result[0].postBackParam["status"]
                // res100.data.result[0].status !== "failiure"
              );
              console.log(
                res100.data.message == "All txnIds are valid" &&
                  res100.data.result[0].postBackParam["status"] !== "failure"
              );
              console.log(attending);
              if (
                res100.data.message == "All txnIds are valid" &&
                res100.data.result[0].postBackParam["status"] !== "failure"
              ) {
                if (attending == "inPerson") {
                  const data1 = await axios.put(
                    `https://us-central1-muj-convocation-2023.cloudfunctions.net/app/student/update-student-payment-status/${singleUser.reg_no}`,
                    {
                      reg_no: singleUser.reg_no,
                      paymentId: response.response.payuMoneyId,
                      companions: companions,
                      day: "2nd December",
                    }
                  );
                } else {
                  const data1 = await axios.put(
                    `https://us-central1-muj-convocation-2023.cloudfunctions.net/app/student/update-student-payment-status/${singleUser.reg_no}`,
                    {
                      reg_no: singleUser.reg_no,
                      paymentId: response.response.payuMoneyId,
                      companions: 0,
                      day: "",
                    }
                  );
                }
                setMessage(
                  "Please check your mailbox for registration confirmation"
                );
                setOpen(true);
                setPaid(true);
              } else {
                setMessage("Payment Failed");
                setOpen(true);
              }
            } catch (err) {
              console.log(err);
            }
          }
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      },
    });
  };

  useEffect(() => {
    setTimeout(() => setOpen(false), 3000);
  }, [open]);

  return (
    <div className='dash-main-left'>
      {open ? <Alerts variant={"success"} /> : null}
      <div className='dash-left-div'>
        <h2 className='dash-details-head '>Student Details</h2>
        <div className='table-responsive dash-table-div'>
          <table className='dash-deet-table table table-striped table-borderless'>
            <tbody>
              <tr className='table-dark'>
                <th scope='col'>Field</th>
                <th scope='col'>Details</th>
              </tr>
              {/* {Object.keys(user).forEach((key) => {
              return (
                <tr>
                  <td>{key}</td>
                  <td>{user[key]}</td>
                </tr>
              );
            })} */}
              <tr>
                <th>Faculty</th>
                <td>{singleUser.faculty}</td>
              </tr>
              <tr>
                <th>School</th>
                <td>{singleUser.school}</td>
              </tr>
              <tr>
                <th>Program</th>
                <td>{singleUser.programme}</td>
              </tr>
              <tr>
                <th>Registration No</th>
                <td>{singleUser.reg_no}</td>
              </tr>
              <tr>
                <th>Student Name</th>
                <td>{singleUser.student_name}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{singleUser.gender}</td>
              </tr>
              <tr>
                <th>Batch</th>
                <td>{singleUser.batch}</td>
              </tr>
              <tr>
                <th>Credits</th>
                <td>{singleUser.credits}</td>
              </tr>
              <tr>
                <th>GPA</th>
                <td>{singleUser.cgpa == 0 ? "NA" : singleUser.cgpa}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{singleUser.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <div>
          <strong
            style={{
              color: "red",
              margin: "0 2rem",
              display: "block",
              textAlign: "justify",
            }}
          >
            The 10th Convocation of MUJ is being rescheduled to 2nd Decmber due
            to the Rajasthan Legislative Assembly Election scheduled on 25th
            November 2023.
          </strong>
          <img src={LOGO} alt='' className='LOGONEW' />
        </div>

        {!paid
          ? inPerson && (
              <>
                <div className='dash-left-companions-div'>
                  <p className='dash-companions'>
                    <strong>Choose no. of companions attending with you</strong>
                  </p>
                  <select
                    name='companions'
                    id='companions'
                    value={companions}
                    className='form-select companions-select'
                    onChange={(e) => setCompanions(e.target.value)}
                  >
                    <option value='' disabled selected>
                      Select
                    </option>
                    <option value='0'>0</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                  </select>
                </div>

                <br />
                <br />
              </>
            )
          : null}
        {!paid ? (
          <>
            <div className='dash-attendDiv'>
              <p>
                <strong>
                  Will you be attending the convocation In-Person?{" "}
                </strong>
              </p>
              <div
                className='form-check'
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "5px 0",
                }}
              >
                <input
                  className='form-check-input'
                  type='radio'
                  name='attend'
                  value='inPerson'
                  id='inPerson'
                  onChange={handleChange}
                  style={{
                    width: "30px",
                    height: "30px",
                    marginRight: "5px",
                    borderColor: "lightgray",
                  }}
                />
                <label className='form-check-label' htmlFor='inPerson'>
                  I will collect degree certificate in Person.
                </label>
              </div>
              {/* <input type="radio" name="inPersonopt" id="inPerson" value='inPerson'/>
        <label htmlFor="inPerson"> I will collect degree certificate in Person.</label> */}

              <div
                className='form-check'
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "5px 0",
                }}
              >
                <input
                  className='form-check-input'
                  type='radio'
                  name='attend'
                  value='courier'
                  id='courier'
                  onChange={handleChange}
                  style={{
                    width: "30px",
                    height: "30px",
                    marginRight: "5px",
                    borderColor: "lightgray",
                  }}
                />
                <label className='form-check-label' htmlFor='courier'>
                  I will collect degree certificates through courier service.
                </label>
              </div>
            </div>
            <br />
            <br />
            <div
              className='form-check dash-infoCheckDiv'
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                className='form-check-input'
                type='checkbox'
                value='selected'
                id='infoCheck'
                onChange={(e) => setSelectTerms(!selectTerms)}
                style={{
                  width: "30px",
                  height: "30px",
                  marginRight: "10px",
                  borderColor: "lightgray",
                }}
              />
              <label className='form-check-label' htmlForr='infoCheck'>
                <strong>
                  I hereby declare that the information above stated above is
                  true to the best of my knowlegde.
                </strong>
              </label>
            </div>
            <br />
            <br />

            <div>
              {/* <button
                className='btn btn-dark dash-confirmBtn'
                onClick={handlePaymentClick}
                disabled={
                  (attending == "inPerson" &&
                    companions &&
                    singleUser.phone &&
                    selectTerms) ||
                  (attending == "courier" && singleUser.phone && selectTerms)
                    ? false
                    : true
                }
              >
                CONFIRM & PAY
              </button> */}
              <h4 style={{ color: "red" }}>
                Sorry You seem to have missed out the deadline
              </h4>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <h4>
              CONGRATULATIONS! <br /> You have successfully registerd for <br />
              MUJ 10th Convocation .
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
