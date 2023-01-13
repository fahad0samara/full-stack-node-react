import axios from "axios";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";


import {useLocation} from "react-router-dom";
import {patient} from "../../types";
import Loder from "../../tools/Loder";
import { useLogIN } from "../../../ContextLog";
import PatientPrescriptions from "./PatientPrescriptions";
const ViewPatient = () => {
  const {
    logPatient,

    Profile,
    setProfile,

    dark,
    setdark,
  } = useLogIN()
  const {id} = useParams();
  const [data, setData] = React.useState<patient>({
    _id: "",
    healthIDNumber: "",
    name: {
      firstName: "",
      middleName: "",
      LastName: "",
    },
    user: {
      email: "",
      password: "",
      createdAt: "",
    },
    mobile: 0,
    address: {
      building: "",
      city: "",
      street: "",
      district: "",
      state: "",
      zipCode: 0,
    },
    date: "",
    bloodGroup: "",
    weight: 0,
    height: 0,
    diseaseList: [{
      disease: "",
      YearRound: 0,
    }],
    allergyList: [{
      allergy: "",
      yearRound: 0,
    }],
    medicationList: [
      {
        medication: "",
        yearRound: 0,
      },
    ],
    contactPerson: {
      name: {
        firstName: "",
        middleName: "",
        LastName: "",
      },
      mobile: 0,
      email: "",
      relation: "",
      age: "",
      address: {
        building: "",
        city: "",
        zipCode: 0,
        street: "",
        district: "",
        state: "",
      },
    },
  });

  const [error, setError] = React.useState<boolean>(false);
  const [Loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/admin/patient/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(res => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, [id]);
  const [prescriptions, setPrescriptions] = React.useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/patient/${id}/prescriptions`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(res => {
        setPrescriptions(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);



  return (
    <>
      {Loading ? (
        <Loder />
      ) : (
        <div
          className=""
          style={{
            backgroundColor: dark ? "#000" : "white",
            color: dark ? "white" : "black",
            boxShadow: dark
              ? "0px 0px 10px 0px rgb(103 232 249)"
              : "0px 0px 10px 0px #ccc",
          }}
        >
          <div className="p-16 ">
            <div
              style={{
                boxShadow: dark
                  ? "0px 0px 10px 0px rgb(103 232 249)"
                  : "0px 0px 10px 0px rgb(103 232 249)",
              }}
              className="p-8 shadow mt-14 "
            >
              <div className={"grid grid-cols-1 md:grid-cols-3 "}>
                {" "}
                <div
                  className={
                    "grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0"
                  }
                >
                  {" "}
                  <div>
                    {" "}
                    <p className="font-bold  text-xl">22</p>{" "}
                    <p className="text-gray-400">Friends</p>{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <p className="font-bold  text-xl">10</p>{" "}
                    <p className="text-gray-400">Photos</p>{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <p className="font-bold  text-xl">89</p>{" "}
                    <p className="text-gray-400">Comments</p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="relative">
                  {" "}
                  <div className="w-48 h-48 bg-red-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-24 w-24"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      {" "}
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      />
                    </svg>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                  <button className=" py-2 px-4 uppercase rounded bg-cyan-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                    {" "}
                    Connect
                  </button>{" "}
                  <button
                    style={{
                      backgroundColor: dark ? "#fff" : "black",
                      color: dark ? "black" : "#fff",
                    }}
                    className=" py-2 px-4 uppercase rounded  hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  >
                    {" "}
                    Message
                  </button>{" "}
                </div>{" "}
              </div>
              <div className=" border-t-4 border-cyan-400  grid grid-cols-3 mt-7 ">
                <div
                  style={{
                    boxShadow: dark
                      ? "0px 0px 01px 0px #cccc "
                      : "0px 0px 10px 0px  #ccc",
                  }}
                  className=" mx-4  my-3  rounded-2xl  
                 p-4"
                >
                  <h1 className="font-bold text-xl leading-8 my-1 text-cyan-400">
                    {data.name.firstName} {data.name.middleName}{" "}
                  </h1>

                  <p className="text-sm  hover: leading-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsam quae vitae maiores ullam. Quo voluptas expedita
                    voluptatum amet ut, inventore totam non repudiandae quidem
                    iure vitae, aliquam unde dolorum odio!
                  </p>
                  <ul className="   py-2 px-3 mt-3 divide-y rounded shadow-sm">
                    <li className="flex items-center py-3">
                      <span>Status</span>
                      <span className="ml-auto">
                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                          Active
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span>Member since</span>
                      <span className="ml-auto">
                        {data.user.createdAt
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join("-")}
                      </span>
                    </li>
                  </ul>
                </div>
                <div
                  style={{
                    boxShadow: dark
                      ? "0px 0px 01px 0px #cccc "
                      : "0px 0px 10px 0px  #ccc",
                  }}
                  className=" p-8 my-3 col-span-2 rounded-2xl  
                  shadow-lg  "
                >
                  <div className="flex items-center space-x-2 font-bold  leading-8">
                    <span className=" text-2xl mb-5 text-cyan-400 ">About</span>
                  </div>
                  <div className="">
                    <div className="grid md:grid-cols-2 text-sm">
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-bold">First Name</div>
                        <div className="px-4 py-2">{data.name.firstName}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-bold">Last Name</div>
                        <div className="px-4 py-2">{data.name.LastName}</div>
                      </div>
                      <div className="grid grid-cols-2 ">
                        <div className="px-4 py-2 font-bold">
                          Health ID Number:
                        </div>
                        <div className="px-4 py-2">{data.healthIDNumber}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-bold">Gender</div>
                        <div className="px-4 py-2">Female</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-bold">Contact No.</div>
                        <div className="px-4 py-2">{data.mobile}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-bold">
                          Current Address
                        </div>
                        <div className="px-4 py-2">{data.address.city}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-bold">
                          {data.address.district}
                        </div>
                        <div className="px-4 py-2">{data.address.state}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-bold">Email.</div>
                        <div className="mr-8 py-2">{data.user.email}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-bold">Birthday</div>
                        <div className="px-4 py-2">
                          {data.date
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("-")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="block w-full text-cyan-300 text-sm font-bold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                    Show Full Information
                  </button>
                </div>
              </div>

              <div className="  grid grid-cols-3 mt-2 ">
                <div
                  style={{
                    boxShadow: dark
                      ? "0px 0px 01px 0px #cccc "
                      : "0px 0px 10px 0px  #ccc",
                  }}
                  className=" mx-4  my-3  rounded-2xl  
                 p-4"
                >
                  <h1>
                    <span className="text-2xl font-bold text-cyan-400 my-6">
                      Emergency Contact
                    </span>
                  </h1>
                  <div className=" grid grid-cols-2 ">
                    <div className="px-4 py-2 font-bold">Name</div>
                    <div className="px-4 py-2">
                      {data.contactPerson.name.firstName}
                      <span className="font-semibold ml-1">
                        {data.contactPerson.name.LastName}
                      </span>
                    </div>

                    <div className="px-4 py-2 font-bold">Contact No.</div>
                    <div className="px-4 py-2">{data.contactPerson.mobile}</div>
                    <div className="px-4 py-2 font-bold">Email</div>
                    <div className="px-4 py-2">{data.contactPerson.email}</div>

                    <div className="px-4 py-2 font-bold">relation</div>
                    <div className="px-4 py-2">
                      {data.contactPerson.relation}
                    </div>

                    <div className="px-4 py-2 font-bold">age</div>
                    <div className="px-4 py-2">
                      {data.contactPerson.age
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                    </div>

                    <div className="px-2 py-2 font-bold">Address</div>
                    <div className=" py-2 font-semibold ">
                      {data.contactPerson.address.city}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    boxShadow: dark
                      ? "0px 0px 01px 0px #cccc "
                      : "0px 0px 10px 0px  #ccc",
                  }}
                  className=" p-8 my-3 col-span-2 rounded-2xl  
                  shadow-lg  "
                >
                  <div className="flex items-center space-x-2 font-bold  leading-8">
                    <span className=" text-2xl mb-5 text-cyan-400 ">
                      Medical History
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    <div className="col-span-3 ">
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-bold">Blood Group</div>
                        <div className="px-4 py-2">{data.bloodGroup}</div>
                        <div className="px-4 py-2 font-bold">Height</div>
                        <div className="px-4 py-2">
                          {data.height}
                          <span className="font-semibold">cm</span>
                        </div>
                        <div className="px-4 py-2 font-bold">Weight</div>
                        <div className="px-4 py-2">
                          {data.weight}
                          <span className="font-semibold">kg</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 ">
                      <div className="grid grid-cols-2">
                        <div className="px-6 py-2 font-bold">Allergies:</div>

                        {data.allergyList.length > 0 ? (
                          <div className="mx-auto py-2">
                            {data.allergyList.map(allergy => (
                              <>
                                <div
                                  key={allergy.allergy}
                                  className="px-2 py-1 m-1 text-center text-xs font-semibold text-white uppercase transition-all duration-150 ease-linear bg-red-500 rounded-full shadow outline-none focus:outline-none"
                                >
                                  {allergy.allergy}
                                </div>
                              </>
                            ))}
                          </div>
                        ) : (
                          <p>No Allergies Recorded</p>
                        )}

                        <div className="px-4 py-2 font-bold">Medications:</div>
                        {data.medicationList.length > 0 ? (
                          <div className="mx-auto py-2">
                            {data.medicationList.map(medication => (
                              <>
                                <div className="px-2 py-1 m-1 text-center text-xs font-semibold text-white uppercase transition-all duration-150 ease-linear bg-red-500 rounded-full shadow outline-none focus:outline-none">
                                  {medication.medication}
                                </div>
                              </>
                            ))}
                          </div>
                        ) : (
                          <p>No Allergies medication</p>
                        )}

                        <div className="px-4 py-2 font-bold">Diseases:</div>
                        {data.diseaseList.length > 0 ? (
                          <div className="mx-auto py-2">
                            {data.diseaseList.map(disease => (
                              <>
                                <div className="px-2 py-1 m-1 text-center text-xs font-semibold text-white uppercase transition-all duration-150 ease-linear bg-red-500 rounded-full shadow outline-none focus:outline-none">
                                  {disease.disease}
                                </div>
                              </>
                            ))}
                          </div>
                        ) : (
                          <p>No Allergies Recorded</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                {prescriptions.map(prescription => (
                  <div key={prescription._id}>
                    <p>Medication: {prescription.medication}</p>
                    <p>Dosage: {prescription.dosage}</p>
                    <p>Frequency: {prescription.frequency}</p>
                    <p>Duration: {prescription.duration}</p>
                    <p>Date: {
                      prescription.date
                    }</p>
                  </div>
                ))}
                </div>
                <PatientPrescriptions
                  prescriptions={prescriptions}
                  patientId={data._id}

                  
                />
       
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewPatient;
