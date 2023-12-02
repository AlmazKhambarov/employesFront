/** @format */

import React, { useEffect, useState } from "react";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./TableList.css";
import { deleteIcon, viewIcon, editIcon } from "./assets";
import axios from "axios";
import CreateModal from "./CreateModal/CreateModal";
// import
const TableList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("All");
  const [active, setActive] = useState(false);

  const [modal, setModal] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get("https://localhost:7007/api/Employees");
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <div>
      <nav className="nav">
        <div class="button" onClick={() => setModal(!modal) }>
          <button type="submit" class="finbyz-button btn-form-submit">
            Create new
          </button>
        </div>
        {modal ? <CreateModal  defaultInputData={{ ...data, type: "add" }} setModal={setModal} type={"create"}/> : null}
        <div className="dropdown">
          <div className="dropdown_active" onClick={() => setActive(!active)}>
            <p>{name}</p>
            <svg
              className={`img ${active ? "round" : ""}`}
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 1.5L8 8.5L14.5 1.5"
                stroke="black"
                stroke-width="2"
              />
            </svg>
          </div>
          <ul className={`dropdown_menu ${active ? "active" : ""}`}>
            <button onClick={() => setName("All")}>All</button>
            <button onClick={() => setName("Active")}>Active</button>
            <button onClick={() => setName("completed")}>Completed</button>
          </ul>
        </div>
      </nav>
      <div className="table">
        <div className="table-list">
          <table>
            {data?.map((el) => (
              <tr>
                <td>
                  <div className="table-item">
                    <p>{el.userName}</p> <span>Name</span>
                  </div>
                </td>
                <td>
                  <div className="table-item">
                    <p>{el.department}</p> <span>Department</span>
                  </div>
                </td>
                <td>
                  <div className="table-item">
                    <p>{formatDate(el.birthDate)}</p>
                    <span>Subscrube data</span>
                  </div>
                </td>
                <td>
                  <div className="table-item">
                    <p>{formatDate(el.dateOfEmployment)}</p>{" "}
                    <span>Renewe date</span>
                  </div>
                </td>
                <td>
                  <div className="table-item">
                    <p>{el.wage}</p>
                    <span>Monhly const</span>
                  </div>
                </td>
                <td>
                  <div className="icons">
                    <img src={editIcon} alt="" postId={el.id} onClick={()=>setModal(el.id)}/>
                    <img src={viewIcon} alt="" />
                    <img src={deleteIcon} alt="" />
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableList;
