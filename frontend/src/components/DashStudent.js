import React, { useState, useEffect } from "react";
import "../style/dashboard.css";
import vector from "../assets/Vector.svg";
import Details from "./Details";
import CommForm from "./CommForm";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Feedback from "../pages/Feedback";
import SavedDetails from "./SavedDetails";
import EditDetailsForm from "./EditDetailsform";
const DashStudent = ({ singleUser, setSingleUser, getUsers }) => {
  const [editForm, setEditForm] = useState(false);
  const [feedback, setFeedback] = useState(singleUser.feedbackGiven);
  const [detailsSubmitted] = useState(true);

  return (
    <>
      {!feedback ? (
        <Feedback setFeedback={setFeedback} />
      ) : editForm ? (
        <EditDetailsForm
          singleUser={singleUser}
          editForm={editForm}
          setEditForm={setEditForm}
          setSingleUser={setSingleUser}
        />
      ) : (
        <>
          <div className='dash-layer'>
            <div className='dash-super'>
              <div className='dash-mainy'>
                <Details
                  singleUser={singleUser}
                  setSingleUser={setSingleUser}
                />
                {singleUser.phone ? (
                  <SavedDetails
                    singleUser={singleUser}
                    setSingleUser={setSingleUser}
                    editForm={editForm}
                    setEditForm={setEditForm}
                  />
                ) : (
                  <CommForm
                    singleUser={singleUser}
                    setSingleUser={setSingleUser}
                  />
                )}
              </div>
            </div>
            <img src={vector} alt='' className='dash-vector' />
          </div>
        </>
      )}
    </>
  );
};

export default DashStudent;
