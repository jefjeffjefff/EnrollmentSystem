import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Input from "./Input";

const MySwal = withReactContent(
  Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  })
);

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [DOB, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    loadStudentList();
  }, []);

  const saveStudent = () => {
    axios({
      url: "/student",
      method: "POST",
      data: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        dateOfBirth: DOB,
      },
    })
      .then((res) => {
        alert("Saved student successfully.");
        loadStudentList();
      })
      .catch((err) => {
        setErrorMessage(JSON.stringify(err));
      });
  };

  const loadStudentList = () => {
    axios({
      url: "/student",
      method: "GET",
    })
      .then((res) => {
        setStudentList(res.data);
        console.log(res);
      })
      .catch((err) => {
        setErrorMessage(JSON.stringify(err));
      });
  };

  const deleteStudent = (studentId) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          url: "/student?studentId=" + studentId,
          method: "DELETE",
        })
          .then((res) => {
            loadStudentList();
          })
          .catch((err) => {
            setErrorMessage(JSON.stringify(err));
          });
      }
    });
  };

  return (
    <>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          Please fill in all required fields before saving.
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {studentList.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={5}>
                No row is loaded.
              </td>
            </tr>
          ) : (
            <>
              {studentList.map((s) => (
                <tr key={s.id}>
                  <td>{s.firstName}</td>
                  <td>{s.lastName}</td>
                  <td>{s.dateOfBirth}</td>
                  <td>{s.address}</td>
                  <td>
                    <button
                      onClick={() => deleteStudent(s.id)}
                      type="button"
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>

      <div style={{ marginLeft: "15%", marginRight: "15%", marginTop: "5%" }}>
        <div className="d-flex" style={{ gap: "20px" }}>
          <div className="mb-3 col-6">
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              label="First Name"
              type="text"
            />
          </div>

          <div className="mb-3 col-6">
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              label="Last Name"
              type="text"
            />
          </div>
        </div>

        <div className="d-flex" style={{ gap: "20px" }}>
          <div className="mb-3 col-6">
            <Input
              value={DOB}
              onChange={(e) => setDOB(e.target.value)}
              label="Date of Birth"
              type="date"
            />
          </div>

          <div className="mb-3 col-6">
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              label="Address"
              type="text"
            />
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <button
            onClick={saveStudent}
            type="button"
            className="btn btn-primary"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
