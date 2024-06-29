import React, { useEffect, useState } from "react";
import vector from "../assets/medium-wave.png";
import {
  FormGroup,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const EditDetailsform = ({
  singleUser,
  editForm,
  setEditForm,
  setSingleUser,
}) => {
  const { token, setToken, isuserloggedin, setIsuserloggedin } = useAuth();
  const [showBtn, setShowBtn] = useState(false);
  const [formData, setFormData] = useState({
    country: singleUser.country,
    phone: singleUser.phone,
    state: singleUser.state,
    city: singleUser.city,
    district: singleUser.district,
    address: singleUser.address,
    pincode: singleUser.pincode,
    checked: false,
    account_holder_name: singleUser.account_holder_name,
    bank_address: singleUser.bank_address,
    account_number: singleUser.account_number,
    bank_name: singleUser.bank_name,
    branch_name: singleUser.branch_name,
    ifsc_code: singleUser.ifsc_code,
    aadhar_front_picture: singleUser.aadhar_front_picture,
    aadhar_back_picture: singleUser.aadhar_back_picture,
    cancel_check: singleUser.cancel_check,
  });

  const handleChange = (e) => {
    console.log(e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    let i = 0;
    // console.log(formData);
    Object.keys(formData).map((data) => {
      console.log(data);
      if (formData[data].length <= 0) {
        i = 1;
        // setShowBtn(false);
      }
    });

    if (i === 0) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
    // Object.keys(formData).map((data) => {
    //   if (formData[data].length > 0) {
    //     setShowBtn(true);
    //   }
    // });
  }, [formData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://us-central1-muj-convocation-2023.cloudfunctions.net/app/auth/add-communication-data`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setSingleUser(response.data.data);
      setEditForm(false);
    } catch (e) {
      console.log(e);
    }
  };
  const openCloudWidget = (value) => {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: "dldnrcfwz",
          uploadPreset: "neautqvj",
          resourceType: "image",
          maxFiles: 1,
          maxImageFileSize: 1500000,
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            if (value === "aadhar_front_picture") {
              setFormData({
                ...formData,
                aadhar_front_picture: result.info.secure_url,
              });
            } else if (value === "aadhar_back_picture") {
              setFormData({
                ...formData,
                aadhar_back_picture: result.info.secure_url,
              });
            } else if (value === "cancel_check") {
              setFormData({
                ...formData,
                cancel_check: result.info.secure_url,
              });
            }
            console.log(formData);
            // setFieldValue("photo", result.info.secure_url);
          }
        }
      )
      .open();
  };
  return (
    <>
      <div className='dash-layer'>
        <div className='dash-super'>
          <div className='dash-mainy'>
            <div className='formGroupDiv' style={{ width: "100%" }}>
              <FormGroup>
                <form>
                  <h2 style={{ textAlign: "center" }}>Communication Details</h2>
                  <div className='ques-div'>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      Phone Number
                    </p>
                    <TextField
                      fullWidth
                      required
                      name='phone'
                      variant='outlined'
                      // type={ques.type}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder='Answer'
                      label='Required'
                    />
                  </div>
                  <div className='ques-div'>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      Address
                    </p>
                    <TextField
                      fullWidth
                      required
                      name='address'
                      variant='outlined'
                      // type={ques.type}
                      value={formData.address}
                      onChange={handleChange}
                      placeholder='Answer'
                      label='Required'
                    />
                  </div>
                  <div className='ques-div'>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      City
                    </p>
                    <TextField
                      fullWidth
                      required
                      name='city'
                      variant='outlined'
                      // type={ques.type}
                      value={formData.city}
                      onChange={handleChange}
                      placeholder='Answer'
                      label='Required'
                    />
                  </div>
                  <div className='ques-div'>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      District
                    </p>
                    <TextField
                      fullWidth
                      name='district'
                      variant='outlined'
                      value={formData.district}
                      onChange={handleChange}
                      // type={ques.type}
                      placeholder='Answer'
                      label='Required'
                    />
                  </div>
                  <div className='ques-div'>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      Pincode
                    </p>
                    <TextField
                      fullWidth
                      required
                      name='pincode'
                      variant='outlined'
                      type='number'
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder='Answer'
                      label='Required'
                    />
                  </div>
                  <div className='ques-div'>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      State
                    </p>
                    <TextField
                      fullWidth
                      required
                      name='state'
                      variant='outlined'
                      //type='number'
                      value={formData.state}
                      onChange={handleChange}
                      placeholder='Answer'
                      label='Required'
                    />
                  </div>
                  <div className='ques-div'>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      Country
                    </p>
                    <TextField
                      fullWidth
                      required
                      name='country'
                      variant='outlined'
                      //   type='number'
                      value={formData.country}
                      onChange={handleChange}
                      // onChange={handleChange}
                      placeholder='Answer'
                      label='Required'
                    />
                  </div>
                  <h2 style={{ textAlign: "center" }}>Refund Details</h2>
                  <div className='ques-div'>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      Account Holder Name
                    </p>
                    <TextField
                      fullWidth
                      required
                      name='account_holder_name'
                      variant='outlined'
                      //type='number'
                      value={formData.account_holder_name}
                      onChange={handleChange}
                      placeholder='Answer'
                      label='Required'
                    />
                  </div>
                  <div className='ques-div'>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      Account Number
                    </p>
                    <TextField
                      fullWidth
                      required
                      name='account_number'
                      variant='outlined'
                      //   type='number'
                      value={formData.account_number}
                      onChange={handleChange}
                      placeholder='Answer'
                      label='Required'
                    />
                  </div>
                  <div className='ques-div'>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      Bank Name
                    </p>
                    <TextField
                      fullWidth
                      required
                      name='bank_name'
                      variant='outlined'
                      //   type='number'
                      value={formData.bank_name}
                      onChange={handleChange}
                      placeholder='Answer'
                      label='Required'
                    />
                  </div>
                  <div className='ques-div'>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      Bank Branch Name
                    </p>
                    <TextField
                      fullWidth
                      required
                      name='branch_name'
                      variant='outlined'
                      //   type='number'
                      value={formData.branch_name}
                      onChange={handleChange}
                      placeholder='Answer'
                      label='Required'
                    />
                  </div>
                  <div className='ques-div'>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      Bank Address
                    </p>
                    <TextField
                      fullWidth
                      required
                      name='bank_address'
                      variant='outlined'
                      //type='number'
                      value={formData.bank_address}
                      onChange={handleChange}
                      placeholder='Answer'
                      label='Required'
                    />
                  </div>
                  <div className='ques-div'>
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      IFSC Code
                    </p>
                    <TextField
                      fullWidth
                      required
                      name='ifsc_code'
                      variant='outlined'
                      //   type='number'
                      value={formData.ifsc_code}
                      onChange={handleChange}
                      // onChange={handleChange}
                      placeholder='Answer'
                      label='Required'
                    />
                  </div>
                  <div className='refund-inp input-group'>
                    <label className='input-group-text' for='aadhaar-front'>
                      <strong> Aadhar Front Picture</strong>
                    </label>
                    <input
                      className='form-control'
                      id='aadhaar-front'
                      value={formData.aadhar_front_picture}
                      placeholder='Aadhaar Front Picture'
                      required
                      readOnly
                    />
                    <button
                      className='btn btn-outline-secondary'
                      type='button'
                      onClick={() => openCloudWidget("aadhar_front_picture")}
                    >
                      Select Image
                    </button>
                  </div>
                  <div className='refund-inp input-group'>
                    <label className='input-group-text' for='aadhaar-back'>
                      <strong> Aadhar Back Picture</strong>
                    </label>
                    <input
                      className='form-control'
                      value={formData.aadhar_back_picture}
                      id='aadhar_back_picture'
                      placeholder='Aadhaar Back Picture'
                      required
                      readOnly
                    />
                    <button
                      className='btn btn-outline-secondary'
                      type='button'
                      onClick={() => openCloudWidget("aadhar_back_picture")}
                    >
                      Select Image
                    </button>
                  </div>
                  <div className='refund-inp input-group'>
                    <label className='input-group-text' for='canceled-cheque'>
                      <strong>Canceled Cheque Picture</strong>
                    </label>
                    <input
                      className='form-control'
                      value={formData.cancel_check}
                      id='canceled-cheque'
                      placeholder='Cancelled Cheque Picture'
                      required
                      readOnly
                    />
                    <button
                      className='btn btn-outline-secondary'
                      type='button'
                      onClick={() => openCloudWidget("cancel_check")}
                    >
                      Select Image
                    </button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "40px",
                    }}
                  >
                    <Button
                      style={{
                        backgroundColor: "black",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                      variant='contained'
                      type='submit'
                      disabled={!showBtn}
                      onClick={handleSubmit}
                    >
                      <span style={{ fontSize: "1.1rem" }}>Save Details</span>
                    </Button>
                  </div>
                </form>
              </FormGroup>
            </div>
          </div>
        </div>
        <img src={vector} alt='' className='dash-vector' />
      </div>
    </>
  );
};

export default EditDetailsform;
