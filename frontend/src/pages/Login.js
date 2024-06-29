import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../style/login.css";
import curve from "../assets/Vector-curve.png";
import img1 from "../assets/DSC_5584 1.png";
import img2 from "../assets/DSC_5995 1.png";
import img3 from "../assets/DSC_5580 1.png";
import img4 from "../assets/image 5.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/SideContext";
import { Alert } from "react-bootstrap";
import { useAlert } from "../context/AlertMessageContext";
import Alerts from "../components/Alert";
const Login = () => {
  const { message, setMessage } = useAlert();
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("danger");
  const navigate = useNavigate();
  const [roles, setRoles] = useState("student");
  const [email, setEmail] = useState("");
  const [regNo, setRegNo] = useState();
  const [newRegNo, setNewRegNo] = useState();
  const [password, setPassword] = useState();
  const [register, setRegister] = useState(false);
  const [alert, setAlert] = useState();
  const [showAlert, setShowAlert] = useState(false);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 760 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const { token, setToken, isuserloggedin, setIsuserloggedin, role, setRole } =
    useAuth();
  const { loading, setLoading } = useLoading();
  // const { loading, setLoading } = useLoading();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let params;
    if (roles == "student") {
      params = { role: roles, reg_no: regNo, password: password };
    } else {
      params = { role: roles, email: email, password: password };
    }
    try {
      const result = await axios.post(
        // "https://us-central1-muj-convocation-2023.cloudfunctions.net/app/auth/login",
        "http://localhost:5001/app/auth/login",
        params
      );
      console.log(result);
      if (result.data.success) {
        const stringifieddata = JSON.stringify({
          loginstatus: true,
          clienttoken: result.data.token,
          loginRole: roles,
        });
        localStorage.setItem("login", stringifieddata);
      }
      setMessage("Logged In Successfully");
      setToken(result.data.token);
      setIsuserloggedin(true);
      setRole(roles);
      navigate("/");
    } catch (e) {
      setMessage(e.response.data.error);
      setVariant("danger");
      setOpen(true);
      console.log(e);
    }
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log("HI");
    try {
      const result = await axios.post(
        "http://localhost:5001/app/auth/register",
        { role: "student", reg_no: newRegNo }
      );
      console.log(result);
      setRegister(false);
      setOpen(true);
      setVariant("success");
      setMessage("Registered Successfully");
      setNewRegNo("");
    } catch (error) {
      setOpen(true);
      setVariant("danger");
      setMessage(error.response.data.error);
      console.log(error);
    }
  };
  useEffect(() => {
    localStorage.clear();
    setIsuserloggedin(false);
  });

  useEffect(() => {
    const timer1 = setTimeout(() => setOpen(false), 3000);
    return () => {
      clearTimeout(timer1);
    };
  }, [open]);

  return (
    <>
      {open ? <Alerts variant={variant} /> : null}
      <div className='login-full'>
        <div className='carousel-login'>
          <Carousel
            responsive={responsive}
            showDots
            arrows={false}
            autoPlay
            autoPlaySpeed={3000}
            infinite
            pauseOnHover={false}
          >
            <div>
              <img src={img4} alt='' />
            </div>
            <div>
              <img src={img2} alt='' />
            </div>
            <div>
              <img src={img1} alt='' />
            </div>
            <div>
              <img src={img3} alt='' />
            </div>
          </Carousel>
        </div>

        <div className='login-txt'>
          <div className='all-txt'>
            <h1 style={{ color: "red", fontSize: "1.4rem" }}>
              Registrations are now Closed
            </h1>
            <p>Your passwords will be sent on the official e-mail id. </p>
            {!register ? (
              <>
                <form>
                  <div className='container'>
                    <select
                      name=''
                      id=''
                      value={roles}
                      onChange={(e) => setRoles(e.target.value)}
                    >
                      <option value='student'>Student</option>
                      <option value='department'>Department</option>
                    </select>
                  </div>
                  <div className='container'>
                    {roles == "student" ? (
                      <input
                        type='number'
                        placeholder='Registration No'
                        value={regNo}
                        onChange={(e) => setRegNo(e.target.value)}
                      />
                    ) : (
                      <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    )}
                  </div>
                  <div className='container'>
                    <input
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className='container sub-btn-container'>
                    <button
                      className='btn-all login-btn'
                      type='submit'
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </form>
                <p className='login-p' onClick={() => setRegister(true)}>
                  Don’t have an account?
                  <span> Register Now</span>
                </p>
              </>
            ) : (
              <>
                <form>
                  <div className='container'>
                    <input
                      type='number'
                      placeholder='Registration No'
                      value={newRegNo}
                      onChange={(e) => setNewRegNo(e.target.value)}
                    />
                  </div>

                  <div className='container sub-btn-container'>
                    <button
                      className='btn-all login-btn'
                      type='submit'
                      onClick={handleRegisterSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </form>
                <p className='login-p' onClick={() => setRegister(false)}>
                  Already have an account?
                  <span> Login Now</span>
                </p>
              </>
            )}
          </div>
        </div>
        <div className='wh-curve'>
          <img src={curve} alt='' className='curve' />
        </div>
      </div>
    </>
  );
};

export default Login;
