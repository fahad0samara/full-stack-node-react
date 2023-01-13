import React, {useState, useEffect} from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

const PatientPrescriptions = ({patientId}) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/patient/${patientId}/prescriptions`)
      .then(res => res.json())
      .then(data => {
        setPrescriptions(data);
        setLoading(false);
      });
  }, [patientId]);

  const columns = [
    {
      Header: "Medication",
      accessor: "medication",
    },
    {
      Header: "Dosage",
      accessor: "dosage",
    },
    {
      Header: "Frequency",
      accessor: "frequency",
    },
    {
      Header: "Duration",
      accessor: "duration",
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Notes",
      accessor: "notes",
    },
    {
      Header: "Refills",
      accessor: "refills",
    },
  ];

  return (
    <div>
      <ReactTable
        data={prescriptions}
        columns={columns}
        loading={loading}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    </div>
  );
};

export default PatientPrescriptions;
