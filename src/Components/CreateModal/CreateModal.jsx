/** @format */

import React, { useEffect, useState } from "react";
import "./CreateModal.css";
import axios from "axios";
const CreateModal = ({setModal, defaultInputData, modal}) => {
  const {id, userName, department, birthDate, dateOfEmployment, wage, type} = defaultInputData;
  const [postData, setPostData] = useState({
    // id: 4,
    userName,
    department,
    birthDate,
    dateOfEmployment,
    wage,
  });

console.log(type)
  const  submitHandler = (e) => {
    e.preventDefault();
    // Format date strings before making the POST request
    const formattedPostData = {
      ...postData,
      birthDate: formatDateString(postData.birthDate),
      dateOfEmployment: formatDateString(postData.dateOfEmployment),
    };

    fetch("https://api.example.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedPostData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const formatDateString = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toISOString(); 
  };

  return (
    <>
      <div className="modal">
        <form onSubmit={submitHandler}>
          <div className="input-box">
            <div className="input">
              <label>Name</label>
              <input
                type="text"
                onChange={(e) =>
                  setPostData((prev) => ({ ...prev, userName: e.target.value }))
                }
              />
            </div>
            <div className="input">
              <label>Department</label>
              <input
                type="text"
                onChange={(e) =>
                  setPostData((prev) => ({
                    ...prev,
                    department: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="input-box">
            <div className="input">
              <label>Age</label>
              <input type="date"  />
            </div>
            <div className="input">
              <label>Salary</label>
              <input
                type="text"
                onChange={(e) =>
                  setPostData((prev) => ({ ...prev, wage: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="input-box">
            <div className="input">
              <label>Date of Employment</label>
              <input type="date" />
            </div>
          </div>
          <div className="btn-box">
            <button onClick={()=>setModal(false)}>Cancel</button>
            <button type="submit" >
              add
            </button>
          </div>
        </form>
      </div>
      <div className="w-screen"></div>
    </>
  );
};

export default CreateModal;
