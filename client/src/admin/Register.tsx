

// export default About;
import {useLogIN} from "../../ContextLog";

import {Link, useLocation} from "react-router-dom";
import Loder from "../tools/Loder";

import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const RegisterDr = () => {
  const Navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [success, setsuccess] = useState(false);

  const {
    logPatient,

    Profile,
    setProfile,

    dark,
    setdark,
  } = useLogIN();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: {
      firstName: "",
      middleName: "",
      lastName: "",
    },
    email: "",
    password: "",
    role: "",
    user: "",
    phoneNumber: "",
    Hospital: "",
    HospitalAddress: {
      city: "",
      building: "",
      state: "",
      ZipCode: "",
      Country: "",
    },
    specialty: "",
    degree: "",
    experience: "",
    date: "",
    bloodGroup: "",
  });
  const [error, setError] = useState("");

  // Proceed to next step
  const nextStep = () => {
    //
    setStep(step + 1);
  };
  // Create a mutable ref object to store the form data
  const formDataRef = useRef(formData);

  // Use the useEffect hook to update the value of the ref object
  // whenever the form data changes
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  // Update the form data when the user goes back a step
  const prevStep = () => {
    setFormData(formDataRef.current);
    setStep(step - 1);
  };


  // Handle fields change
  const handleChange = input => e => {
    setFormData({...formData, [input]: e.target.value});
  };

  // Handle form submission
  const handleSubmit = async (e: {preventDefault: () => void}) => {
    setLoading(true);
    e.preventDefault();

    const {
      name,
      email,
      password,
      role,
      user,
      Hospital,
      HospitalAddress,
      date,
      phoneNumber,
      bloodGroup,
      degree,
      specialty,
      experience,
    } = formData;

    if (step === 1) {
      setLoading(true);
      try {
        const res = await axios.post(
          "http://localhost:3000/admin/register-user",
          {name, email, password, role}
        );
        setStep(2);
        setFormData({...formData, user: res.data.user._id});
        setLoading(false);
      } catch (error) {
        console.log("Error: ", error.response.data);
      }
    } else if (step === 2) {
      setLoading(true);
      try {
        await axios.post("http://localhost:3000/admin/register", {
          user,
          name: name,
          Hospital: Hospital,
          HospitalAddress: HospitalAddress,
          date: date,
          phoneNumber: phoneNumber,
          bloodGroup: bloodGroup,
          degree: degree,
          specialty: specialty,
          experience: experience,
        });
        setStep(3);
        setLoading(false);
        // Navigate to the appropriate route based on the user's role
        if (role === "admin") {
          Navigate("/admin/doctorList");
        } else if (role === "user") {
          Navigate("/user");
        } else if (role === "doctor") {
            Navigate("/admin/doctorList");
        }
      } catch (error) {
        console.log("Error: ", error.response.data);
        setError(error.response.data);
        setLoading(false);
      }
    }
  };

  // Render the form based on the current step
  const renderForm = () => {
    if (step === 1) {
      return (
        <div
          className={`${
            dark ? "bg-black" : "bg-white"
            //color
          } ${dark ? "text-white" : "text-black"}
        ${
          //font
          dark ? "font-bold" : "font-normal"
        }
         h-screen flex flex-col justify-center items-center`}
        >
          <div className="w-full max-w-xs">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            {
              //error
              error ? (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Error!</strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              ) : null
            }
            {success ? (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline">{success}</span>
              </div>
            ) : null}
          </div>

          <form className=" mx-28 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block  text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange("email")}
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block  text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange("password")}
                placeholder="Password"
                required
              />
            </div>
            <div className="mb-4 flex">
              <label
                className="block  text-sm font-bold mb-2 mr-4"
                htmlFor="role"
              >
                Role:
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleChange("role")}
                />
                <span className="ml-2">Admin</span>
              </label>

              <label className="inline-flex items-center ml-4">
                <input
                  type="checkbox"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange("role")}
                />
                <span className="ml-2">User</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="checkbox"
                  name="role"
                  value="doctor"
                  checked={formData.role === "doctor"}
                  onChange={handleChange("role")}
                />
                <span className="ml-2">Dr</span>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                className="bg-cyan-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-cyan-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Next
              </button>
              {success && <p>{success}</p>}
            </div>
          </form>
        </div>
      );
    } else if (step === 2) {
      return (
        <>
          {loading ? (
            <Loder />
          ) : (
            <div
              style={{
                backgroundColor: dark ? "#000" : "white",
                color: dark ? "white" : "black",
              }}
              className="
    
      "
            >
              <form className="w-full max-w-screen-md mx-auto  ">
                <h1 className="text-3xl font-bold text-center pt-4 mb-5">
                  Edit Doctor
                </h1>
                <div
                  className=" grid grid-cols-4 gap-6 
  
  
        "
                >
                  <label
                    className="block font-bold text-lg mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="name"
                    name="name"
                    id="name"
                    value={formData.name.firstName}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        name: {...formData.name, firstName: e.target.value},
                      })
                    }
                  />
                  <input
                    className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name.middleName}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        name: {...formData.name, middleName: e.target.value},
                      })
                    }
                  />

                  <input
                    className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name.lastName}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        name: {...formData.name, lastName: e.target.value},
                      })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block font-bold text-lg mb-2"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                    className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phoneNumber}
                    onChange={e =>
                      setFormData({...formData, phoneNumber: e.target.value})
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-28">
                  <div className="mb-4">
                    <label
                      className="block font-bold text-lg mb-2"
                      htmlFor="bloodGroup"
                    >
                      bloodGroup
                    </label>
                    <select
                      style={{
                        backgroundColor: dark ? "#000" : "white",
                        color: dark ? "white" : "black",
                      }}
                      name="bloodGroup"
                      id="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={e =>
                        setFormData({...formData, bloodGroup: e.target.value})
                      }
                      className="block appearance-none w-full  border-b border-cyan-400 hover:border-cyan-400
            px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select bloodGroup</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>{" "}
                  <div className="mb-4">
                    <label
                      className="block font-bold text-lg mb-2"
                      htmlFor=" date"
                    >
                      date
                    </label>

                    <input
                      className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                      required
                      type={formData.date}
                      name="date"
                      id="date"
                      value={formData.date
                        .toString()
                        .substring(0, 10)
                        .split("-")
                        .reverse()
                        .join("-")}
                      onChange={e =>
                        setFormData({...formData, date: e.target.value})
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8  mb-4  mt-9">
                  <div className="mb-4">
                    <label
                      htmlFor="speciality"
                      className="
  mt-2
  text-lg
  font-bold
  
  "
                    >
                      Speciality
                    </label>
                    <select
                      style={{
                        backgroundColor: dark ? "#000" : "white",
                        color: dark ? "white" : "black",
                      }}
                      name="speciality"
                      id="speciality"
                      value={formData.specialty}
                      onChange={e =>
                        setFormData({...formData, specialty: e.target.value})
                      }
                      className="block appearance-none w-full bg-inherit   border-b border-cyan-400 hover:border-cyan-400 
            px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select Speciality</option>
                      <option value="Cardiologist">Cardiologist</option>
                      <option value="Dentist">Dentist</option>
                      <option value="Dermatologist">Dermatologist</option>
                      <option value="Endocrinologist">Endocrinologist</option>
                      <option value="Gastroenterologist">
                        Gastroenterologist
                      </option>
                      <option value="Gynecologist">Gynecologist</option>
                      <option value="Neurologist">Neurologist</option>
                      <option value="Oncologist">Oncologist</option>
                      <option value="Ophthalmologist">Ophthalmologist</option>
                      <option value="Orthopedic">Orthopedic</option>
                      <option value="Pediatrician">Pediatrician</option>
                      <option value="Psychiatrist">Psychiatrist</option>
                      <option value="Pulmonologist">Pulmonologist</option>
                      <option value="Rheumatologist">Rheumatologist</option>
                      <option value="Urologist">Urologist</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      className="block font-bold text-lg mb-2"
                      htmlFor="experience"
                    >
                      experience
                    </label>
                    <input
                      className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                      name="experience"
                      id="experience"
                      value={formData.experience}
                      onChange={e =>
                        setFormData({...formData, experience: e.target.value})
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8  mb-4  mt-9">
                  <div className="mb-5">
                    <label
                      className="block font-bold text-lg mb-2"
                      htmlFor="address"
                    >
                      Hospital
                    </label>
                    <input
                      className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      name="address"
                      id="address"
                      value={formData.Hospital}
                      onChange={e =>
                        setFormData({...formData, Hospital: e.target.value})
                      }
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      className="block font-bold text-lg  mb-2"
                      htmlFor="degree"
                    >
                      Degree
                    </label>
                    <select
                      style={{
                        backgroundColor: dark ? "#000" : "white",
                        color: dark ? "white" : "black",
                      }}
                      className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                      name="degree"
                      id="degree"
                      value={formData.degree}
                      onChange={e =>
                        setFormData({...formData, degree: e.target.value})
                      }
                    >
                      <option value="MBBS">MBBS</option>
                      <option value="MD">MD</option>
                      <option value="MS">MS</option>
                      <option value="MDS">MDS</option>
                      <option value="MCh">MCh</option>
                      <option value="DM">DM</option>
                      <option value="DNB">DNB</option>
                      <option value="BDS">BDS</option>
                      <option value="BHMS">BHMS</option>
                      <option value="BAMS">BAMS</option>
                      <option value="BSc">BSc</option>
                      <option value="BPT">BPT</option>
                      <option value="BPharm">BPharm</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-lg " htmlFor="address">
                    HospitalAddress
                  </label>
                </div>
                <div className="grid grid-cols-5 gap-8  mb-4  mt-9">
                  <div>
                    <label
                      className="block font-bold text-lg mb-2"
                      htmlFor="address"
                    >
                      Street
                    </label>
                    <input
                      className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      name="address"
                      id="address"
                      value={formData.HospitalAddress.city}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          HospitalAddress: {
                            ...formData.HospitalAddress,
                            city: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block font-bold text-lg mb-2"
                      htmlFor="address"
                    >
                      City
                    </label>

                    <input
                      className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      name="address"
                      id="address"
                      value={formData.HospitalAddress.building}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          HospitalAddress: {
                            ...formData.HospitalAddress,
                            building: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block font-bold text-lg mb-2"
                      htmlFor="address"
                    >
                      Building
                    </label>
                    <input
                      className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      name="address"
                      id="address"
                      value={formData.HospitalAddress.state}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          HospitalAddress: {
                            ...formData.HospitalAddress,
                            state: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block font-bold text-lg mb-2"
                      htmlFor="address"
                    >
                      Country
                    </label>

                    <input
                      className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      name="address"
                      id="address"
                      value={formData.HospitalAddress.Country}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          HospitalAddress: {
                            ...formData.HospitalAddress,
                            Country: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block font-bold text-lg mb-2"
                      htmlFor="address"
                    >
                      ZipCode
                    </label>

                    <input
                      className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="number"
                      name="ZipCode"
                      id="ZipCode"
                      value={formData.HospitalAddress.ZipCode}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          HospitalAddress: {
                            ...formData.HospitalAddress,
                            ZipCode: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </form>
              <div
                className="flex
        justify-center
        items-center
        mt-10"
              >
                <button
                  className="bg-cyan-400 hover:bg-cyan-500  font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={prevStep}
                >
                  Previous
                </button>

                <button
                  className="bg-cyan-400 hover:bg-cyan-500  font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleSubmit}
                >
                  Update
                </button>
                <div className="my-11"></div>
                {loading ? <Loder /> : null}
              </div>
            </div>
          )}
        </>
      );
    } else if (step === 3) {
      return (
        <div
          className="flex
        justify-center
        items-center
        mt-10"
        >
          <div className="text-2xl font-bold text-green-500">
            Registration Successful
          </div>

          <div className="my-11">
            <Link to="/login">
              <button
                className="bg-cyan-400 hover:bg-cyan-500  font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      );
    }
  };

  return <div>{renderForm()}</div>;
};

export default RegisterDr;
