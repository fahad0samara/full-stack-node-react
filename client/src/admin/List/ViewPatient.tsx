import axios from "axios";
import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useTable, usePagination} from "react-table";
import saveAs from "file-saver";
import {useLocation, useNavigate} from "react-router-dom";
import {patient} from "../../types";
import Loder from "../../tools/Loder";
import {useLogIN} from "../../../ContextLog";
import FileSaver from "file-saver";
const ViewPatient = () => {
  const {
    logPatient,

    Profile,
    setProfile,

    dark,
    setdark,
  } = useLogIN();
  let {id} = useParams();

  const [patient, setpatient] = React.useState<patient>({
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
    diseaseList: [
      {
        disease: "",
        YearRound: 0,
      },
    ],
    allergyList: [
      {
        allergy: "",
        yearRound: 0,
      },
    ],
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
  console.log(patient.medicationList, "fffffff");
  const [error, setError] = React.useState<boolean>(false);
  const [Loading, setLoading] = React.useState<boolean>(true);
  const [prescriptions, setPrescriptions] = React.useState<any>([]);

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
        setpatient(res.data);
        setLoading(false);

        // make the second API call to retrieve the prescriptions
        axios
          .get(`http://localhost:3000/admin/patient/${id}/prescriptions`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(res => {
            console.log(res.data);
            setPrescriptions(res.data);
            setLoading(false);
          })
          .catch(err => {
            setError(true);
            setLoading(false);
          });
      })
      .catch(err => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const downloadPrescription = async prescriptionId => {
    setLoading(true);
    console.log(prescriptionId);
    try {
      const res = await axios.get(
        `http://localhost:3000/admin/patient/${id}/prescriptions/${prescriptionId}/download`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "arraybuffer",
        }
      );
      FileSaver.saveAs(
        new Blob([res.data], {type: "application/pdf"}),
        `Prescription ${prescriptionId}.pdf`
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Doctor Name",
        accessor: "doctor",
      },
      {
        Header: "Date",

        accessor: "date",
        Cell: ({value}) => {
          const date = new Date(value);
          return date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          });
        },
      },
      {
        Header: "Dosage",
        accessor: "dosage",
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
      {
        Header: "Instruction",
        accessor: "frequency",
      },
      {
        Header: "Medication",
        accessor: "medication",
      },
      {
        Header: "Notes",
        accessor: "notes",
      },
      {
        Header: "Refills",
        accessor: "refills",
      },
      {
        Header: "Download",
        accessor: row => (
          <button
            onClick={() => {
              downloadPrescription(row._id);
            }}
          >
            Download
          </button>
        ),
      },
    ],
    []
  );

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable(
      {
        //@ts-ignore
        columns,
        data: prescriptions,
      },
      usePagination
    );

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
          <div className="md:p-16 p-9 md:mx-6 ml-12 ">
            <div
              style={{
                backgroundColor: dark ? "#000" : "white",
                color: dark ? "white" : "black",
                boxShadow: dark
                  ? "0px 0px 10px 0px rgb(103 232 249)"
                  : "0px 0px 10px 0px rgb(103 232 249)",
              }}
              className="md:p-8 shadow mt-14 p-2 "
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
              <div
                className=" border-t-4 border-cyan-400   grid  grid-cols-1
                 
              xl:grid-cols-3 mt-7 "
              >
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
                    {patient.name.firstName} {patient.name.middleName}{" "}
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
                        {patient.user.createdAt
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
                        <div className="px-4 py-2">
                          {patient.name.firstName}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-bold">Last Name</div>
                        <div className="px-4 py-2">{patient.name.LastName}</div>
                      </div>
                      <div className="grid grid-cols-2 ">
                        <div className="px-4 py-2 font-bold">
                          Health ID Number:
                        </div>
                        <div className="px-4 py-2">
                          {patient.healthIDNumber}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-bold">Gender</div>
                        <div className="px-4 py-2">Female</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-bold">Contact No.</div>
                        <div className="px-4 py-2">{patient.mobile}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-bold">
                          Current Address
                        </div>
                        <div className="px-4 py-2">{patient.address.city}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-bold">
                          {patient.address.district}
                        </div>
                        <div className="px-4 py-2">{patient.address.state}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="px-4 py-2 font-bold">Email.</div>
                        <div
                          className="py-2 px-4 md:mr-11
                          mr-2
                      
                        "
                        >
                          {patient.user.email}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-bold">Birthday</div>
                        <div className="px-4 py-2">
                          {patient.date
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
              <div
                className="  grid
                  grid-cols-1
                  md:gap-5
               xl:grid-cols-3 mt-2 "
              >
                <div
                  style={{
                    boxShadow: dark
                      ? "0px 0px 01px 0px #cccc "
                      : "0px 0px 10px 0px  #ccc",
                  }}
                  className=" 
                  shadow-lg 
                  mx-2
                  md:mx-0
                    my-3  rounded-2xl  
                  "
                >
                  <h1
                    className="text-2xl
                      text-center 

                    font-bold text-cyan-400 my-6"
                  >
                    Emergency Contact
                  </h1>
                  <div className=" grid grid-cols-2 ">
                    <div className="px-4 py-2 font-bold">Name</div>
                    <div className="px-4 py-2">
                      {patient.contactPerson.name.firstName}
                      <span className="font-semibold ml-1">
                        {patient.contactPerson.name.LastName}
                      </span>
                    </div>

                    <div className="px-4 py-2 font-bold">Contact No.</div>
                    <div className="px-4 py-2">
                      {patient.contactPerson.mobile}
                    </div>
                    <div className="px-4 py-2 font-bold">Email</div>
                    <h4 className=" py-2  xl:text-base text-sm">
                      {patient.contactPerson.email}
                    </h4>

                    <div className="px-4 py-2 font-bold">relation</div>
                    <div className="px-4 py-2">
                      {patient.contactPerson.relation}
                    </div>

                    <div className="px-4 py-2 font-bold">age</div>
                    <div className="px-4 py-2">
                      {patient.contactPerson.age
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                    </div>

                    <div className="px-2 py-2 font-bold">Address</div>
                    <div className=" py-2 font-semibold ">
                      {patient.contactPerson.address.city}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    boxShadow: dark
                      ? "0px 0px 01px 0px #cccc "
                      : "0px 0px 10px 0px  #ccc",
                  }}
                  className=" md:p-8 my-3 col-span-2 rounded-2xl
                  mx-2
                  shadow-lg  "
                >
                  <h1
                    className=" text-2xl mb-5
                      text-center
                      md:text-left

                      font-bold
                  md:my-6
                     text-cyan-400 "
                  >
                    Medical History
                  </h1>
                  <div className="grid grid-rows-2">
                    <div className="col-span-3 ">
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-bold">Blood Group</div>
                        <div className="px-4 py-2">{patient.bloodGroup}</div>
                        <div className="px-4 py-2 font-bold">Height</div>
                        <div className="px-4 py-2">
                          {patient.height}
                          <span className="font-semibold">cm</span>
                        </div>
                        <div className="px-4 py-2 font-bold">Weight</div>
                        <div className="px-4 py-2">
                          {patient.weight}
                          <span className="font-semibold">kg</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3 ">
                      <div
                        className=" grid 
                          lg:grid-cols-3
                        grid-cols-2
                      shadow-md
                        rounded-lg
                        md:my-2
                        md:gap-11
                        gap-0
                        
                      "
                      >
                        <div>
                          <h1 className="text-center text-xl text-cyan-400 font-bold">
                            Allergies:
                          </h1>
                          {patient.allergyList.length > 0 ? (
                            <div className="mx-auto p-4  ">
                              {patient.allergyList.filter(
                                allergy =>
                                  allergy.allergy !== "" &&
                                  allergy.allergy !== null
                              ).length > 0 ? (
                                patient.allergyList
                                  .filter(
                                    allergy =>
                                      allergy.allergy !== "" &&
                                      allergy.allergy !== null
                                  )
                                  .map(allergy => {
                                    return (
                                      <div
                                        key={allergy.allergy}
                                        className="px-4 py-1 m-1 text-center text-xs font-semibold text-white uppercase transition-all duration-150 ease-linear bg-red-500 rounded-full shadow outline-none focus:outline-none"
                                      >
                                        {allergy.allergy}
                                      </div>
                                    );
                                  })
                              ) : (
                                <p className="text-center font-medium">
                                  No Allergies Recorded
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="text-center font-medium">
                              No Allergies Recorded
                            </p>
                          )}
                        </div>
                        <div>
                          {" "}
                          <h1 className="text-center text-xl text-cyan-400 font-bold">
                            Medications:
                          </h1>
                          {patient.medicationList.length > 0 ? (
                            <div className="mx-auto p-4  ">
                              {patient.medicationList.filter(
                                medication =>
                                  medication.medication !== "" &&
                                  medication.medication !== null
                              ).length > 0 ? (
                                patient.medicationList
                                  .filter(
                                    medication =>
                                      medication.medication !== "" &&
                                      medication.medication !== null
                                  )
                                  .map(medication => {
                                    return (
                                      <div
                                        key={medication.medication}
                                        className="px-4 py-1 m-1 text-center text-xs font-semibold text-white uppercase transition-all duration-150 ease-linear bg-red-500 rounded-full shadow outline-none focus:outline-none"
                                      >
                                        {medication.medication}
                                      </div>
                                    );
                                  })
                              ) : (
                                <p className="text-center font-medium">
                                  No medication Recorded
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="text-center font-medium">
                              No medication Recorded
                            </p>
                          )}
                        </div>
                        <div>
                          <h1 className="text-center text-xl text-cyan-400 font-bold">
                            Diseases:
                          </h1>
                          {patient.diseaseList.length > 0 ? (
                            <div className="mx-auto p-4  ">
                              {patient.diseaseList.filter(
                                disease =>
                                  disease.disease !== "" &&
                                  disease.disease !== null
                              ).length > 0 ? (
                                patient.diseaseList
                                  .filter(
                                    disease =>
                                      disease.disease !== "" &&
                                      disease.disease !== null
                                  )
                                  .map(disease => {
                                    return (
                                      <div
                                        key={disease.disease}
                                        className="px-4 py-1 m-1 text-center text-xs font-semibold text-white uppercase transition-all duration-150 ease-linear bg-red-500 rounded-full shadow outline-none focus:outline-none"
                                      >
                                        {disease.disease}
                                      </div>
                                    );
                                  })
                              ) : (
                                <p className="text-center font-medium">
                                  No disease Recorded
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="text-center font-medium">
                              No disease Recorded
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  boxShadow: dark
                    ? "0px 0px 01px 0px #cccc "
                    : "0px 0px 10px 0px  #ccc",
                }}
                className="overflow-x-auto
                  p-8 my-3 col-span-2 rounded-2xl 
                  shadow-lg
                "
              >
                {
                  //prescription
                }

                <h1
                  className="
                  text-center
                  md:text-left
                  font-bold
                   text-2xl mb-5 text-cyan-400 "
                >
                  Prescription History
                </h1>

                <table
                  className="w-full text-center table-collapse
                  border border-cyan-300-200 rounded-lg shadow-lg
                 
                  "
                >
                  <thead>
                    {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                          <th
                            style={{
                              backgroundColor: dark ? "#fff" : "#000",
                              color: dark ? "#000" : "#fff",
                            }}
                            className="px-1 py-1 font-medium  "
                            {...column.getHeaderProps()}
                          >
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {rows.map((row, index) => {
                      prepareRow(row);
                      return (
                        <tr
                          {...row.getRowProps()}
                          style={{
                            backgroundColor:
                              index % 3 === 0
                                ? ""
                                : index % 3 === 1
                                ? "#67e8f9"
                                : "purple",
                          }}
                        >
                          {row.cells.map(cell => {
                            return (
                              <td
                                className="px-4 py-2"
                                {...cell.getCellProps()}
                              >
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewPatient;
