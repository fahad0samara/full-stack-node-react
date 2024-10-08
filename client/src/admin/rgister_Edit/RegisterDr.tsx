// export default About;
import {useLogIN} from "../../../ContextLog";

import {Link, useLocation} from "react-router-dom";
import Loder from "../../tools/Loder";

import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import "./SideNavigate.css";
import {useNavigate} from "react-router-dom";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import e from "cors";
const RegisterDr = () => {
  const Navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");

  const [success, setsuccess] = useState(false);

  const {logPatient, Profile, setProfile, dark, setdark} = useLogIN();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: {
      firstName: "",
      middleName: "",
      lastName: "",
    },
    email: "",
    password: "",

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

  const totalSteps = 2;
  const currentStep = 1;
  const progress = (currentStep / totalSteps) * 100;

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

      // Check if email and password are not empty
      if (!name || !email || !password || !role) {
        setError("Please fill in all fields");
        setTimeout(() => setError(""), 2000);
        setLoading(false);
        return;
      }
      // Check if the user has already been registered
      if (formData.user) {
        // If the user has already been registered, don't register them again
        setStep(2);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post(
          "http://localhost:3000/admin/register-user",
          {name, email, password, role}
        );

        setStep(2);
        setFormData({...formData, user: res.data.user._id});
      // cheek who is register and redicet to the 
        if (role === "admin") {
          Navigate("/admin/doctorList");
        }
        if (role === "doctor") {
          Navigate("/admin/RegisterDr");
        }
        if (role === "patient") {
          Navigate("/admin/Rg_patient");
        }
        setLoading(false);


      } catch (error) {
        console.log("Error: ", error.response.data);
        setError(error.response.data);
        setTimeout(() => setError(""), 2000);
        setLoading(false);
      }
    } else if (step === 2) {
      setTimeout(() => {
        setsuccess(true);
      }, 2000);

      try {
        if (
          !formData.name.firstName ||
          !formData.name.lastName ||
          !formData.Hospital ||
          !formData.HospitalAddress.city ||
          !formData.phoneNumber ||
          !formData.bloodGroup ||
          !formData.degree ||
          !formData.specialty ||
          !formData.experience
        ) {
          setError("Please fill in all fields");
          setTimeout(() => setError(""), 2000);
          setLoading(false);
        }

        await axios.post("http://localhost:3000/admin/register-dr", {
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
          grid grid-cols-3 card  h-screen
          `}
        >
          <img
            alt="Image"
            className="object-cover bottom-5 
            h-72 ml-32"
          />

          <div
            className={`
        ${
          //font
          dark ? "font-bold" : "font-normal"
        }
        flex flex-col justify-center items-center   `}
          >
            <div className="w-full glass-object    ">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-black">Register</h1>
                <p className="text-md font-bold  text-black">
                  Please fill in this form to create an account!
                </p>
              </div>

              {
                //error
                error ? (
                  <div
                    className="bg-red-400 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <strong
                      className="
                  font-bold
                  
                  "
                    >
                      Error!
                    </strong>
                    <span className="block sm:inline">{error}</span>
                  </div>
                ) : null
              }
            </div>

            <form
              className="
            w-full max-w-sm
            mx-auto
            mt-10
            rounded-lg
            shadow-xl
            overflow-hidden
            p-8
            border-cyan-300
            border-2
          
            "
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className={`appearance-none bg-transparent placeholder:font-semibold  border-b-2 border-cyan-300  w-full  mr-3 py-1 px-2 leading-tight focus:outline-none
                ${error ? "border-red-500 " : ""}
                `}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  placeholder="
                  Enter your Email 
                  "
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
                  className={`appearance-none bg-transparent placeholder:font-semibold  border-b-2 border-cyan-300 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none
                ${error ? "border-red-500  " : ""}
                `}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange("password")}
                  placeholder="
                  Enter your Password
                  "
                  required
                />
              </div>
              <div className="mb-4 flex  font-bold">
                <label className="block    mr-4" htmlFor="role">
                  Role:
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="role"
                    value="admin"
                    checked={
                      role ==="role"

                    }
                    onChange={e => {

                      setRole(e.target.value)
                      console.log(e.target.value)
 
                    } 
                    }  
                  />
                  <span className="ml-2">Admin</span>
                </label>

                <label className="inline-flex items-center ml-4">
                  {/* <input
                    type="checkbox"
                    name="role"
                    value="doctor"
                    checked={formData.role === "doctor"}
                    onChange={handleChange("role")}
                  /> */}
                  <span className="ml-2">Dr</span>
                </label>
              </div>
              <div className="flex items-center justify-between mx-24">
                {formData.email && formData.password ? (
                  <button
                    onClick={handleSubmit}
                    className="bg-cyan-400 hover:bg-green-400  text-white font-bold py-2 px-9 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="bg-gray-400 text-white font-bold py-2 px-9 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Next
                  </button>
                )}
                {success && <p>{success}</p>}
              </div>
            </form>
          </div>
          <img
            alt="Image"
            className="object-cover 
            object-center h-72 w-72

              "
          />
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
              className="flex flex-col items-center justify-center min-h-screen py-2"
            >
              {
                //error
                error ? (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <strong
                      className="
                  font-bold
                  
                  "
                    >
                      Error!
                    </strong>
                    <span className="block sm:inline">{error}</span>
                  </div>
                ) : (
                  <form
                    className="
                      w-full  max-w-2xl
                mx-28 shadow-md rounded px-8 pt-6 pb-8 mb-4 
                "
                  >
                    <h1 className="text-3xl font-bold text-center pt-4 mb-5">
                      Register
                    </h1>
                    <div className=" grid grid-cols-4 gap-6 ">
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
                            name: {
                              ...formData.name,
                              middleName: e.target.value,
                            },
                          })
                        }
                      />

                      <input
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        required
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

                    <div
                      className="
                        flex items-center  my-5 gap-4
      

                    "
                    >
                      <label
                        className="
                        font-bold text-lg "
                        htmlFor="phone"
                      >
                        Phone
                      </label>
                      <input
                        className="appearance-none bg-transparent mr-16  border-b-2 border-cyan-400   leading-tight focus:outline-none"
                        type="text"
                        name="phone"
                        required
                        id="phone"
                        value={formData.phoneNumber}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            phoneNumber: e.target.value,
                          })
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
                          required
                          name="bloodGroup"
                          id="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              bloodGroup: e.target.value,
                            })
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
                          type="date"
                          name="date"
                          id="date"
                          value={formData.date.split("T")[0]}
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
                          required
                          style={{
                            backgroundColor: dark ? "#000" : "white",
                            color: dark ? "white" : "black",
                          }}
                          name="speciality"
                          id="speciality"
                          value={formData.specialty}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              specialty: e.target.value,
                            })
                          }
                          className="block appearance-none w-full bg-inherit   border-b border-cyan-400 hover:border-cyan-400 
            px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value="">Select Speciality</option>
                          <option value="Cardiologist">Cardiologist</option>
                          <option value="Dentist">Dentist</option>
                          <option value="Dermatologist">Dermatologist</option>
                          <option value="Endocrinologist">
                            Endocrinologist
                          </option>
                          <option value="Gastroenterologist">
                            Gastroenterologist
                          </option>
                          <option value="Gynecologist">Gynecologist</option>
                          <option value="Neurologist">Neurologist</option>
                          <option value="Oncologist">Oncologist</option>
                          <option value="Ophthalmologist">
                            Ophthalmologist
                          </option>
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
                          required
                          className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                          name="experience"
                          id="experience"
                          value={formData.experience}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              experience: e.target.value,
                            })
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
                          required
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
                          required
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
                      <label
                        className="block font-bold text-lg "
                        htmlFor="address"
                      >
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
                          required
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
                          required
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
                          required
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
                          required
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
                          required
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
                )
              }

              <div
                className="flex
        justify-center
        items-center
        space-x-4
        "
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
                  Submit
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
