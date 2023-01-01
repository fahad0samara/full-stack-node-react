import React, {useState, useEffect} from "react";
import axios from "axios";
import {useLogIN} from "../../ContextLog";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


const DoctorList = () => {
  const {
    logPatient,

    Profile,
    setProfile,
    loading,
    setLoading,
    dark,
    setdark,
  } = useLogIN();
  const [doctors, setDoctors] = useState([]);
  const [updatedr, setupdatedr] = useState({
    name: {
      firstName: '',
      lastName: ''
    },
    hospital: '',
    specialty: '',
    experience: 0
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");





  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/doctors", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(res => {
        setDoctors(res.data);
      });
  }, []);

  // delet the doctor
  const deleteDoctor = (id: any) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      axios
        .delete(`http://localhost:3000/admin/doctor/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(res => {
          console.log(res.data);
          setDoctors(doctors.filter((doctor: any) => doctor._id !== id));
        });
    }
  };


  const UpdateDoctorButton = ({ id }: { id: string }) => {
    return (
      <button
        onClick={() => {
          updateDoctor(id);
          handleClose();
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update
      </button>
    );
  };









  //update the dr

  const updateDoctor = (id: any) => {
    axios
      .put(`http://localhost:3000/admin/doctor/${id}`, updatedr, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(res => {
        console.log(res.data);
        setDoctors(doctors.filter((doctor: any) => doctor._id !== id));
      });
  };

  const onChange = (e: any) => {
    setupdatedr({ ...updatedr, [e.target.name]: e.target.value });
  };

  //model for updata the dr
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div
      style={{
        backgroundColor: dark ? "#000" : "#fff",
        color: dark ? "#fff" : "#000",
      }}
    >
      <div className="overflow-x-auto ">
        <div className="min-w-screen mt-4 min-h-screen flex  justify-center overflow-hidden">
          <div className="w-full lg:w-5/6">
            <div
              style={{
                boxShadow: dark
                  ? "0px 0px 10px 0px rgb(103 232 249)  "
                  : "0px 0px 10px 0px #000",
              }}
              className=" shadow-md rounded my-6"
            >
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className=" uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">name</th>
                    <th className="py-3 px-6 text-center">email</th>
                    <th className="py-3 px-6 text-center">joinDate</th>
                    <th className="py-3 px-6 text-center">phoneNumber</th>
                    <th className="py-3 px-6 text-center">Age</th>
                    <th className="py-3 px-6 text-center">specialty</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                {doctors.map(doctor => {
                  return (
                    <tbody
                      key={doctor._id}
                      className=" text-sm font-extrabold font-light"
                    >
                      <tr className="border-b border-gray-200 hover:bg-gray-100 hover:text-black">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="24"
                                height="24"
                                viewBox="0 0 48 48"
                                style={{fill: "#000000"}}
                              >
                                <path
                                  fill="#80deea"
                                  d="M24,34C11.1,34,1,29.6,1,24c0-5.6,10.1-10,23-10c12.9,0,23,4.4,23,10C47,29.6,36.9,34,24,34z M24,16	c-12.6,0-21,4.1-21,8c0,3.9,8.4,8,21,8s21-4.1,21-8C45,20.1,36.6,16,24,16z"
                                ></path>
                                <path
                                  fill="#80deea"
                                  d="M15.1,44.6c-1,0-1.8-0.2-2.6-0.7C7.6,41.1,8.9,30.2,15.3,19l0,0c3-5.2,6.7-9.6,10.3-12.4c3.9-3,7.4-3.9,9.8-2.5	c2.5,1.4,3.4,4.9,2.8,9.8c-0.6,4.6-2.6,10-5.6,15.2c-3,5.2-6.7,9.6-10.3,12.4C19.7,43.5,17.2,44.6,15.1,44.6z M32.9,5.4	c-1.6,0-3.7,0.9-6,2.7c-3.4,2.7-6.9,6.9-9.8,11.9l0,0c-6.3,10.9-6.9,20.3-3.6,22.2c1.7,1,4.5,0.1,7.6-2.3c3.4-2.7,6.9-6.9,9.8-11.9	c2.9-5,4.8-10.1,5.4-14.4c0.5-4-0.1-6.8-1.8-7.8C34,5.6,33.5,5.4,32.9,5.4z"
                                ></path>
                                <path
                                  fill="#80deea"
                                  d="M33,44.6c-5,0-12.2-6.1-17.6-15.6C8.9,17.8,7.6,6.9,12.5,4.1l0,0C17.4,1.3,26.2,7.8,32.7,19	c3,5.2,5,10.6,5.6,15.2c0.7,4.9-0.3,8.3-2.8,9.8C34.7,44.4,33.9,44.6,33,44.6z M13.5,5.8c-3.3,1.9-2.7,11.3,3.6,22.2	c6.3,10.9,14.1,16.1,17.4,14.2c1.7-1,2.3-3.8,1.8-7.8c-0.6-4.3-2.5-9.4-5.4-14.4C24.6,9.1,16.8,3.9,13.5,5.8L13.5,5.8z"
                                ></path>
                                <circle
                                  cx="24"
                                  cy="24"
                                  r="4"
                                  fill="#80deea"
                                ></circle>
                              </svg>
                            </div>
                            <span className="font-medium">
                              {doctor.name.firstName} {doctor.name.lastName}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-6 ">
                          <div className="flex items-center text-center">
                            <div className="mr-2"></div>
                            <span>{doctor.user.email}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            <span>
                              {
                                //createdAt
                                doctor.user.createdAt
                                  .toString()
                                  .substring(0, 10)
                                  .split("-")
                                  .reverse()
                                  .join("-")
                              }
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            <span>{doctor.phoneNumber}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            <span>
                              {doctor.date
                                .toString()
                                .substring(0, 10)
                                .split("-")
                                .reverse()
                                .join("-")}
                            </span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-center">
                          <span
                            className={`py-1 px-2 rounded-full text-white text-md  text-center border-b border-gray-100 hover:bg-black hover:text-white ${
                              doctor.specialty === "Oncology"
                                ? "bg-green-400"
                                : ""
                            } ${
                              doctor.specialty === "Surgery"
                                ? "bg-rose-500"
                                : ""
                            }
                            ${
                              doctor.specialty === "Cardiology"
                                ? "bg-red-600"
                                : ""
                            }${
                              doctor.specialty === "Neurology"
                                ? "bg-purple-500"
                                : ""
                            }
                             ${
                               doctor.specialty === "Pediatrics"
                                 ? "bg-yellow-500"
                                 : ""
                             }`}
                          >
                            {doctor.specialty}
                          </span>
                        </td>

                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </div>

                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          
                            </div>
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <RiDeleteBin5Line
                                onClick={() => {
                                  deleteDoctor(doctor._id);
                                }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
