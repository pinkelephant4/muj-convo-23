import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
const CommForm = ({ singleUser, setSingleUser }) => {
  const { token, setToken, isuserloggedin, setIsuserloggedin } = useAuth();
  const [showBtn, setShowBtn] = useState(false);
  const [formData, setFormData] = useState({
    country: singleUser.country || "",
    phone: singleUser.phone || "",
    state: singleUser.state || "",
    city: singleUser.city || "",
    district: singleUser.district || "",
    address: singleUser.address || "",
    pincode: singleUser.pincode || "",
    checked: false,
    account_holder_name: singleUser.account_holder_name || "",
    bank_address: singleUser.bank_address || "",
    account_number: singleUser.account_number || "",
    bank_name: singleUser.bank_name || "",
    branch_name: singleUser.branch_name || "",
    ifsc_code: singleUser.ifsc_code || "",
    aadhar_front_picture: singleUser.adhar_front_picture || "",
    aadhar_back_picture: singleUser.adhar_back_picture || "",
    cancel_check: singleUser.cancel_check || "",
  });
  useEffect(() => {
    let c = 0;
    console.log("use effect runs");
    Object.keys(formData).map((element) => {
      console.log(element);
      if (formData[element].length <= 0) {
        c = 1;
      }
      if (element === "phone" && formData[element].length !== 10) {
        c = 1;
      }
    });
    if (c === 1) {
      setShowBtn(false);
    } else {
      setShowBtn(true);
    }
  }, [formData]);
  const handleChange = (e) => {
    console.log(e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post(
        "https://us-central1-muj-convocation-2023.cloudfunctions.net/app/auth/add-communication-data",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setSingleUser(response.data.data);
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
      <div className='right-div'>
        <form>
          <div
            className='comm-div'
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 style={{ textAlign: "center" }}>Communication Details</h2>
            <div className='comm-inp-div'>
              <div className='comm-inp'>
                <input
                  name='phone'
                  type='number'
                  className='form-control'
                  placeholder='Phone Number'
                  id='phone'
                  min='1000000000'
                  max='9999999999'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='comm-inp'>
                <input
                  name='address'
                  type='text'
                  className='form-control'
                  placeholder='Address'
                  id='address'
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='comm-inp'>
                <input
                  name='city'
                  type='text'
                  className='form-control'
                  placeholder='City'
                  id='city'
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='comm-inp'>
                <input
                  name='state'
                  type='text'
                  className='form-control'
                  placeholder='State'
                  id='state'
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='comm-inp'>
                <input
                  name='pincode'
                  type='number'
                  className='form-control'
                  placeholder='Pincode'
                  id='pincode'
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='comm-inp'>
                <input
                  name='district'
                  type='text'
                  className='form-control'
                  placeholder='District'
                  id='district'
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='comm-inp'>
                <input
                  name='country'
                  type='text'
                  className='form-control'
                  placeholder='Country'
                  id='country'
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className='refund-div'>
            <h2 style={{ textAlign: "center" }}>
              Details for Caution <br /> Money Refund
            </h2>

            <div className='refund-inp-div'>
              <div className='refund-inp'>
                <input
                  name='account_holder_name'
                  type='text'
                  className='form-control'
                  placeholder='Account Holder Name'
                  id='AccHolderName'
                  value={formData.account_holder_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='refund-inp'>
                <input
                  name='account_number'
                  type='text'
                  className='form-control'
                  placeholder='Account Number'
                  id='AccNum'
                  value={formData.account_number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='refund-inp'>
                <input
                  name='bank_name'
                  type='text'
                  className='form-control'
                  placeholder='Bank Name'
                  id='bankName'
                  value={formData.bank_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='refund-inp'>
                <input
                  name='branch_name'
                  type='text'
                  className='form-control'
                  placeholder='Bank Branch'
                  id='bankBranch'
                  value={formData.branch_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='refund-inp'>
                <input
                  name='bank_address'
                  type='text'
                  className='form-control'
                  placeholder='Bank Address'
                  id='bankAddress'
                  value={formData.bank_address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='refund-inp'>
                <input
                  name='ifsc_code'
                  type='text'
                  className='form-control'
                  placeholder='IFSC Code'
                  id='ifsc_code'
                  value={formData.ifsc_code}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='refund-inp input-group'>
                <label className='input-group-text' htmlFor='aadhaar-front'>
                  <strong> Aadhar Front Picture</strong>
                </label>
                <input
                  className='form-control'
                  id='aadhaar-front'
                  placeholder='Aadhaar Front Picture'
                  required
                  readOnly
                  value={formData.aadhar_front_picture}
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
                <label className='input-group-text' htmlFor='aadhaar-back'>
                  <strong> Aadhar Back Picture</strong>
                </label>
                <input
                  className='form-control'
                  id='aadhaar-back'
                  placeholder='Aadhaar Back Picture'
                  required
                  value={formData.aadhar_back_picture}
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
                <label className='input-group-text' htmlFor='canceled-cheque'>
                  <strong>Canceled Cheque Picture</strong>
                </label>
                <input
                  className='form-control'
                  id='canceled-cheque'
                  value={formData.cancel_check}
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
            </div>

            <div className='save-btn'>
              <button
                className='btn btn-outline-dark'
                disabled={!showBtn}
                onClick={handleSubmit}
              >
                Save Details
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommForm;
