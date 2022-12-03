import React, {useEffect, useState} from "react";
import axios from "axios";

import {useNavigate} from "react-router-dom";

export default function Register(props: any) {

  const [Loading, setLoading] = useState(false);
  const [Toggle, setToggle] = useState("Patient");
  const [healthID, sethealthID] = useState("");
  const [name, setName] = useState({
    firstName: "",
    middleName: "",
    surName: "",
  });
  const [date, setdate] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [NumberCard, setNumberCard] = useState("");
  const [bloodGroup, setbloodGroup] = useState("");
  const [address, setaddress] = useState({
    building: "",
    city: "",
    taluk: "",
    district: "",
    state: "",
    pincode: "",
  });
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [diseases, setdiseases] = useState("");
  const [diseaseList, setDiseaseList] = useState([{disease: "", yrs: ""}]);
  const [contactPerson, setcontactPerson] = useState({
    name: {
      firstName: "",
      middleName: "",
      surName: "",
    },
    mobile: "",
    email: "",
    relation: "",
    address: {
      building: "",
      city: "",
      taluk: "",
      district: "",
      state: "",
      pincode: "",
    },
  });

  const addDisease = () => {
    const diseaseList1 = [...diseaseList];
    diseaseList1.push({disease: "", yrs: ""});
    setDiseaseList(diseaseList1);
  };

  const handleRegisterPatient = async (e: {preventDefault: () => void}) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {data} = await axios.post(
        "http://localhost:5000/api/patient/register",
        {
          healthID,
          name,
          date,
          mobile,
          email,
          NumberCard,
          bloodGroup,
          address,
          password,
          confirmPassword,
          diseaseList,
          contactPerson,
        }
      );
      setLoading(false);
      setSuccess(data.message);
      setTimeout(() => {
        alert(
          "Registration Successful. Please Login to continue. Redirecting to Login Page"
        )

        
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError(
        (error &&
          // @ts-ignore
          error.response &&
          // @ts-ignore
          error.response.data &&
          // @ts-ignore
          error.response.data.message) ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="body overflow-hidden">
      <div className="bg-secoundry w-full">
        <div className="">
          <div className=" flex justify-center mt-4">
            <h1 className="  p-2 px-8 rounded font-bold text-5xl">Register</h1>
          </div>

          <form
            className="font-poppins lg:ml-60  lg:px-8 lg:py-4 bg-white shadow-lg rounded max-w-screen-lg mt-8 mb-4 "
            onSubmit={handleRegisterPatient}
          >
            <div className="flex   mt-2 bg-bgsecondary w-fit  justify-between rounded mx-auto">
              <button
                onClick={() => setToggle("Patient")}
                className={
                  Toggle === "Patient"
                    ? "py-2 px-8 text-lg font-poppins font-semibold cursor-pointer rounded bg-primary"
                    : "py-2 px-8 text-lg font-poppins font-semibold cursor-pointer rounded bg-bgsecondary"
                }
              >
                Patient
              </button>
              <button
                onClick={() => setToggle("Doctor")}
                className={
                  Toggle === "Doctor"
                    ? "py-2 px-8 text-lg font-poppins font-semibold cursor-pointer rounded bg-primary"
                    : "py-2 px-8 text-lg font-poppins font-semibold cursor-pointer rounded bg-bgsecondary"
                }
              >
                Doctor
              </button>
            </div>
            <div
              className={
                Toggle === "Doctor"
                  ? "h-96 p-2 flex flex-col justify-center "
                  : "hidden"
              }
            >
              <h1 className="font-bold flex justify-center mt-6">
                For register as doctor contact to admin with you all information
              </h1>
              <div className="border-4 p-4 mx-auto w-1/2 rounded-xl mt-8  ">
                <h1>send your all information</h1>
                <div>
                  <div className=" rounded-xl p-4 mt-4 ">
                    <h1 className="font-bold">Email :</h1>
                    <p>admin@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={Toggle === "Patient" ? "" : "hidden"}>
              <div className="lg:grid lg:grid-cols-4 lg:gap-2 mt-4 mr-4 grid grid-cols-4 gap-2">
                <label className="font-bold lg:text-xl font-poppins px-4 my-4 ">
                  Name
                </label>
                <div>
                  <input
                    className="bg-blue-100 rounded lg:h-10 lg:pl-4 mt-4 lg:text-md text-sm h-8 px-2"
                    required
                    placeholder="first name"
                    type="text"
                    value={name.firstName}
                    onChange={e =>
                      setName({
                        ...name,
                        firstName: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <input
                  className="bg-blue-100 rounded lg:h-10 lg:pl-4 mt-4 lg:text-md text-sm h-8 px-2"
                  required
                  placeholder="middle name"
                  type="text"
                  value={name.middleName}
                  onChange={e =>
                    setName({
                      ...name,
                      middleName: e.target.value,
                    })
                  }
                ></input>
                <input
                  className="bg-blue-100 rounded lg:h-10 lg:pl-4 mt-4 lg:text-md text-sm h-8 px-2"
                  required
                  placeholder="last name"
                  type="text"
                  value={name.surName}
                  onChange={e =>
                    setName({
                      ...name,
                      surName: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div className="lg:grid grid-cols-4 gap-2 mt-4 mr-4">
                <label className="font-bold lg:text-xl px-4 ">Birthdate</label>
                <input
                  type="date"
                  className=" bg-blue-100 lg:h-10 rounded pl-4 h-8"
                  required
                  value={date}
                  onChange={e => setdate(e.target.value)}
                ></input>
              </div>
              <div className="lg:grid grid-cols-4 gap-2 mt-4 mr-4">
                <label className="font-bold lg:text-xl px-4 ">
                  Mobile No.{" "}
                </label>

                <input
                  type="tel"
                  placeholder="mobile no."
                  required
                  className="pl-4 bg-blue-100 lg:h-10  rounded h-8"
                  value={mobile}
                  onChange={e => setmobile(e.target.value)}
                ></input>
              </div>

              <div className=" aadhar lg:grid grid-cols-4 gap-2 mt-4 mr-4">
                <label className="font-bold lg:text-xl px-4 ">
                  Aadhar Card No.{" "}
                </label>
                <div>
                  <input
                    type="text"
                    placeholder="Aadhar card No."
                    required
                    className="pl-4 bg-blue-100 lg:h-10  rounded h-8"
                    value={healthID}
                    onChange={e => sethealthID(e.target.value)}
                  ></input>
                  <span className="text-xs text-red-500 py-1">
                    {healthID.length > 0 && healthID.length < 12}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-4 mr-4">
                <label className="  lg:text-xl font-bold px-4 ">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="e.g : abcdefg@gmail.com"
                  required
                  className="bg-blue-100 lg:h-10 rounded pl-4 col-span-2 h-8"
                  value={email}
                  onChange={e => setemail(e.target.value)}
                ></input>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-4 mr-4">
                <label className="  lg:text-xl font-bold px-4">
                  Blood Group
                </label>
                <div className="">
                  <select
                    className="pl-4 lg:w-1/2 bg-blue-100 lg:h-10  rounded  h-8"
                    id="blood-group"
                    required
                    value={bloodGroup}
                    onChange={e => setbloodGroup(e.target.value)}
                  >
                    <option id="select">select</option>
                    <option id="A+">A+</option>
                    <option id="A-">A-</option>
                    <option id="B+">B+</option>
                    <option id="B-">B-</option>
                    <option id="AB+">AB+</option>
                    <option id="AB-">AB-</option>
                    <option id="O+">O+</option>
                    <option id="O-">O-</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-4 mr-4 grid-flow-dense ">
                <label className=" lg:text-xl font-bold px-4 mb-8 col-span-1">
                  Address
                </label>
                <div className="grid grid-cols-2 lg:gap-8 gap-2 col-span-3 ">
                  <input
                    type="text"
                    className="bg-blue-100 lg:h-10  rounded pl-4 h-8 "
                    required
                    placeholder="building/area"
                    value={address.building}
                    onChange={e =>
                      setaddress({
                        ...address,
                        building: e.target.value,
                      })
                    }
                  ></input>
                  <input
                    type="text"
                    className="bg-blue-100 lg:h-10  rounded pl-4 h-8 "
                    required
                    placeholder="city"
                    value={address.city}
                    onChange={e =>
                      setaddress({
                        ...address,
                        city: e.target.value,
                      })
                    }
                  ></input>
                  <input
                    type="text"
                    className="bg-blue-100 lg:h-10  rounded  pl-4 h-8"
                    required
                    placeholder="Taluka"
                    value={address.taluk}
                    onChange={e =>
                      setaddress({
                        ...address,
                        taluk: e.target.value,
                      })
                    }
                  ></input>
                  <input
                    type="text"
                    className="bg-blue-100 lg:h-10  rounded  pl-4 h-8"
                    required
                    placeholder="District"
                    value={address.district}
                    onChange={e =>
                      setaddress({
                        ...address,
                        district: e.target.value,
                      })
                    }
                  ></input>
                  <input
                    type="number"
                    className="bg-blue-100 lg:h-10  rounded  pl-4 h-8"
                    required
                    placeholder="Pin-code"
                    value={address.pincode}
                    onChange={e =>
                      setaddress({
                        ...address,
                        pincode: e.target.value,
                      })
                    }
                  ></input>
                  <input
                    type="text"
                    className="bg-blue-100 lg:h-10  rounded  pl-4 h-8"
                    placeholder="State"
                    required
                    value={address.state}
                    onChange={e =>
                      setaddress({
                        ...address,
                        state: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>

              <div className="lg:grid grid-cols-4 gap-2 mt-4 mr-4">
                <label className="lg:text-xl font-bold px-4">Password</label>
                <input
                  type="password"
                  id="password"
                  className="bg-blue-100 lg:h-10  rounded pl-4 h-8"
                  required
                  placeholder="password"
                  value={password}
                  onChange={e => setpassword(e.target.value)}
                ></input>
              </div>

              <div className="lg:grid lg:grid-cols-4 gap-2 mt-4 mr-4 flex">
                <label className=" lg:text-xl font-bold px-4">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-blue-100 lg:h-10  rounded lg:pl-4 h-8 pl-2"
                  required
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                ></input>
                <span className="text-sm py-1 text-red-500">
                  {password !== confirmPassword && "passwords do not match"}
                </span>
              </div>

              <div className="lg:grid lg:grid-cols-10 gap-2 mt-8 mr-4">
                <div className="col-span-5">
                  <label className=" lg:text-xl font-bold px-4 grid col-start-1 col-span-3">
                    Name of any permanant disease (if any)
                  </label>
                </div>
                <div className="col-span-4">
                  {diseaseList.map((disease, index) => {
                    return (
                      <div
                        key={index}
                        className="grid grid-cols-7 col-span-1 mb-3"
                      >
                        <input
                          className="bg-blue-100 lg:h-10 col-span-3 rounded lg:pl-4 h-8 pl-2"
                          type="text"
                          name="disease"
                          value={disease.disease}
                          placeholder="eg.dibetes"
                          onChange={e => {
                            const values = [...diseaseList];
                            values[index].disease = e.target.value;
                            setDiseaseList(values);
                          }}
                        />
                        <input
                          className="bg-blue-100 lg:h-10 col-span-3  rounded lg:pl-4 h-8 pl-2 ml-4"
                          type="text"
                          name="yrs"
                          placeholder="years e.g 3"
                          value={disease.yrs}
                          onChange={e => {
                            const values = [...diseaseList];
                            values[index].yrs = e.target.value;

                            setDiseaseList(values);
                          }}
                        />

                        <div
                          className="col-span-1 pl-3"
                          onClick={() => {
                            if (diseaseList.length > 1) {
                              const values = [...diseaseList];
                              values.splice(index, 1);
                              setDiseaseList(values);
                            }
                          }}
                        >
                          {/* <img src={minus_logo} alt="" className="h-8 w-8" /> */}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div onClick={addDisease} className="col-span-1">
                  {/* <img src={plus_logo} alt="" className="h-8 w-8" /> */}
                </div>
              </div>
            </div>

            <div className={Toggle === "Patient" ? "" : "hidden"}>
              <div className="flex justify-center">
                <h1 className=" p-4 rounded font-bold lg:text-3xl text-xl mt-2">
                  Emergency Contact Details
                </h1>
              </div>

              <div className="lg:grid grid-cols-4 gap-2 mt-8 mr-4 flex">
                <label className="font-bold lg:text-xl px-4 ">Name</label>
                <input
                  className="bg-blue-100 rounded h-10 pl-4"
                  placeholder="first name"
                  required
                  value={contactPerson.name.firstName}
                  onChange={e =>
                    setcontactPerson({
                      ...contactPerson,
                      name: {
                        ...contactPerson.name,
                        firstName: e.target.value,
                      },
                    })
                  }
                ></input>
                <input
                  className="bg-blue-100 rounded h-10 pl-4"
                  placeholder="last name"
                  required
                  value={contactPerson.name.surName}
                  onChange={e =>
                    setcontactPerson({
                      ...contactPerson,
                      name: {
                        ...contactPerson.name,
                        surName: e.target.value,
                      },
                    })
                  }
                ></input>
              </div>
              <div className="lg:grid grid-cols-4 gap-2 mt-4 mr-4">
                <label className="font-bold lg:text-xl px-4 ">
                  Mobile No.{" "}
                </label>

                <input
                  type="tel"
                  placeholder="mobile no."
                  required
                  className="pl-4 bg-blue-100 lg:h-10  rounded h-8"
                  value={contactPerson.mobile}
                  onChange={e =>
                    setcontactPerson({
                      ...contactPerson,
                      mobile: e.target.value,
                    })
                  }
                ></input>
              </div>

              <div className="lg:grid grid-cols-4 gap-2 mt-4 mr-4">
                <label className="  lg:text-xl font-bold px-4">Email</label>
                <input
                  type="email"
                  id="email"
                  className="bg-blue-100 lg:h-10 rounded pl-4 h-8"
                  required
                  placeholder="email"
                  value={contactPerson.email}
                  onChange={e =>
                    setcontactPerson({
                      ...contactPerson,
                      email: e.target.value,
                    })
                  }
                ></input>
              </div>

              <div className="mt-4">
                <label className=" rounded p-2 lg:text-xl font-bold px-4">
                  Relation with patient
                </label>
                <input
                  className="bg-blue-100 lg:h-10 ml-24 rounded pl-4 h-8 lg:mt-0 lg:ml-0 mt-2 "
                  placeholder="eg. father"
                  required
                  value={contactPerson.relation}
                  onChange={e =>
                    setcontactPerson({
                      ...contactPerson,
                      relation: e.target.value,
                    })
                  }
                ></input>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-4 mr-4 grid-flow-dense ">
                <label className=" lg:text-xl font-bold px-4 mb-8 col-span-1">
                  Address
                </label>
                <div className="grid grid-cols-2 gap-8 col-span-3 ">
                  <input
                    type="text"
                    className="bg-blue-100 h-10  rounded pl-4 "
                    required
                    placeholder="building/area"
                    value={contactPerson.address.building}
                    onChange={e =>
                      setcontactPerson({
                        ...contactPerson,
                        address: {
                          ...contactPerson.address,
                          building: e.target.value,
                        },
                      })
                    }
                  ></input>
                  <input
                    type="text"
                    className="bg-blue-100 h-10  rounded pl-4 "
                    required
                    placeholder="city"
                    value={contactPerson.address.city}
                    onChange={e =>
                      setcontactPerson({
                        ...contactPerson,
                        address: {
                          ...contactPerson.address,
                          city: e.target.value,
                        },
                      })
                    }
                  ></input>
                  <input
                    type="text"
                    className="bg-blue-100 h-10  rounded  pl-4"
                    required
                    placeholder="Taluka"
                    value={contactPerson.address.taluk}
                    onChange={e =>
                      setcontactPerson({
                        ...contactPerson,
                        address: {
                          ...contactPerson.address,
                          taluk: e.target.value,
                        },
                      })
                    }
                  ></input>
                  <input
                    type="text"
                    className="bg-blue-100 h-10  rounded  pl-4"
                    required
                    placeholder="District"
                    value={contactPerson.address.district}
                    onChange={e =>
                      setcontactPerson({
                        ...contactPerson,
                        address: {
                          ...contactPerson.address,
                          district: e.target.value,
                        },
                      })
                    }
                  ></input>
                  <input
                    type="number"
                    className="bg-blue-100 h-10  rounded  pl-4"
                    required
                    placeholder="Pin-code"
                    value={contactPerson.address.pincode}
                    onChange={e =>
                      setcontactPerson({
                        ...contactPerson,
                        address: {
                          ...contactPerson.address,
                          pincode: e.target.value,
                        },
                      })
                    }
                  ></input>
                  <input
                    type="text"
                    className="bg-blue-100 h-10  rounded  pl-4"
                    placeholder="State"
                    required
                    value={contactPerson.address.state}
                    onChange={e =>
                      setcontactPerson({
                        ...contactPerson,
                        address: {
                          ...contactPerson.address,
                          state: e.target.value,
                        },
                      })
                    }
                  ></input>
                </div>
              </div>
              <div className="flex justify-center mb-4 mt-8">
                {Loading ? (
                  <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    disabled
                  >
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1zm0 0a8 8 0 018 8H9a7 7 0 00-7-7v-1zm0 0h1a8 8 0 018 8v1a7 7 0 00-7-7zm0 0h1a8 8 0 01-8 8 7 7 0 007-7v-1z"
                      ></path>
                    </svg>
                    Loading...
                  </button>
                ) : (
                  <button className="bg-primary rounded p-2 px-8 font-bold text-xl hover:bg-bgsecondary mb-4 ">
                    Submit
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
