import React from "react";

const SavedDetails = ({ singleUser, setSingleUser, editForm, setEditForm }) => {
  return (
    <div className='table-responsive saved-table-div'>
      <div className='savedDeet-div '>
        <h2
          style={{ textAlign: "center", margin: "10px", marginBottom: "20px" }}
        >
          Communication & Refund Details
        </h2>
        <table className='table table-striped table-borderless'>
          <tbody>
            <tr className='table-dark'>
              <th scope='col'>Field</th>
              <th scope='col'>Details</th>
            </tr>
            <tr>
              <th>Address</th>
              <td>{singleUser.address}</td>
            </tr>
            <tr>
              <th>Bank Address</th>
              <td>{singleUser.bank_address}</td>
            </tr>
            <tr>
              <th>Bank Name</th>
              <td>{singleUser.bank_name}</td>
            </tr>
            <tr>
              <th>Branch Name</th>
              <td>{singleUser.branch_name}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{singleUser.city}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{singleUser.country}</td>
            </tr>
            <tr>
              <th>District</th>
              <td>{singleUser.district}</td>
            </tr>
            <tr>
              <th>IFSC Code</th>
              <td>{singleUser.ifsc_code}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{singleUser.phone}</td>
            </tr>
            <tr>
              <th>Pincode</th>
              <td>{singleUser.pincode}</td>
            </tr>
            <tr>
              <th>State</th>
              <td>{singleUser.state}</td>
            </tr>
          </tbody>
        </table>

        <div className='edit-details-btn'>
          <button
            className='btn btn-outline-dark'
            onClick={() => setEditForm(true)}
          >
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedDetails;
