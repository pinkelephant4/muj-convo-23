import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "reactstrap";
const DepTable = ({
  dues,
  setDues,
  loading,
  setLoading,
  student,
  setStudent,
}) => {
  const { token } = useAuth();

  const getAllDues = async () => {
    try {
      setLoading(true);
      const response2 = await axios.get(
        `https://us-central1-muj-convocation-2023.cloudfunctions.net/app/due/get-student-dept-dues/${student.reg_no}`,
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

  const clearDue = async (id) => {
    try {
      // const result = await axios.put(
      //   `https://us-central1-muj-convocation-2023.cloudfunctions.net/app/due/clear-student-due/${id}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `https://us-central1-muj-convocation-2023.cloudfunctions.net/app/due/clear-student-due/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.request(config).then((response) => {
        console.log(JSON.stringify(response.data));
      });
      getAllDues();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className='table'>
        <h1>All Dues</h1>
        <br />
        <div>
          <div>
            <table class='table table-hover'>
              <thead>
                <tr>
                  <th scope='col'>Amount</th>
                  <th scope='col'>Details</th>
                  <th scope='col'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <div style={{ width: "270%" }}>
                    <Spinner
                      animation='border'
                      role='status'
                      style={{ margin: "1rem auto" }}
                    ></Spinner>
                  </div>
                ) : (
                  dues.map((due) => {
                    return (
                      <tr>
                        <td>{due.amount_due || "__"}</td>
                        <td>{due.details || "__"}</td>
                        <td>
                          {due.is_clear === undefined ? (
                            "__"
                          ) : due.is_clear ? (
                            "cleared"
                          ) : (
                            <button
                              style={{
                                cursor: "pointer",
                                backgroundColor: "green",
                                color: "white",
                                border: "none",
                                padding: "0.25rem 0.75rem",
                                borderRadius: "7px",
                              }}
                              onClick={() => clearDue(due._id)}
                            >
                              clear
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepTable;
