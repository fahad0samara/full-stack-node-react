import axios from "axios";
import { useState } from "react";


const Appointment = () => {
    const [doctor, setDoctor] = useState("");
    const [patient, setPatient] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const [symptoms, setSymptoms] = useState("");


    const createAppointment = () => {
      axios
        .post("http://localhost:3000/appo/appointments", {
          doctor,
          patient,
          appointmentDate,
          appointmentTime,
          symptoms,
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    };
  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full"
    >
      <h1 className="text-3xl font-semibold tracking-wide mt-6">Appointment</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          createAppointment();
        }}
      >
        <label className="block font-bold text-gray-700 text-sm mb-2">
          Doctor
        </label>
        <input
          type="text"
          className="form-input rounded-md shadow-sm mb-4"
          value={doctor}
          onChange={e => setDoctor(e.target.value)}
        />

        <label className="block font-bold text-gray-700 text-sm mb-2">
          Patient
        </label>
        <input
          type="text"
          className="form-input rounded-md shadow-sm mb-4"
          value={patient}
          onChange={e => setPatient(e.target.value)}
        />
        <label className="block font-bold text-gray-700 text-sm mb-2">
          Appointment Date
        </label>
        <input
          type="date"
          className="form-input rounded-md shadow-sm mb-4"
          value={appointmentDate}
          onChange={e => setAppointmentDate(e.target.value)}
        />
        <label className="block font-bold text-gray-700 text-sm mb-2">
          Appointment Time
        </label>
        <input
          type="text"
          className="form-input rounded-md shadow-sm mb-4"
          value={appointmentTime}
          onChange={e => setAppointmentTime(e.target.value)}
        />
        <label className="block font-bold text-gray-700 text-sm mb-2">
          Symptoms
        </label>
        <input
          type="text"
          className="form-input rounded-md shadow-sm mb-4"
          value={symptoms}
          onChange={e => setSymptoms(e.target.value)}
        />
        <button
          type="submit"
          className="
          bg-blue-500
           hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Create Appointment
        </button>
      </form>
    </div>
  );
}

export default Appointment