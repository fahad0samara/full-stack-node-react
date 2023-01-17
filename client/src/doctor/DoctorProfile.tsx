import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

const DoctorProfile = props => {
const doctorId = props.match.params.id;
    const [doctor, setDoctor] = useState({});
    console.log(doctorId,"ggggggg");
    

  useEffect(() => {
    fetch(`http://localhost:3000/doctor/doctors/${doctorId}`)
      .then(res => res.json())
      .then(data => {
        setDoctor(data);
        console.log("====================================");
        console.log(
          "🚀 ~ file: DoctorProfile.tsx ~ line 1 ~ fetchData ~ res",
          data
        );
        console.log("====================================");
      })
      .catch(err => console.log(err));
  }, [doctorId]);

  return (
    <div>
      {/* <h1>
        {doctor.name.firstName} {doctor.name.lastName}
      </h1>
      <p>Specialty: {doctor.specialty}</p>
      <p>Hospital: {doctor.Hospital}</p>
      display other information as needed */}
          <div>
              <div className="flex flex-col items-center justify-center">
                  <div className="w-1/2">
                      <div className="flex flex-col items-center justify-center">
                          vxvxvxvxvxvcxv
                      </div>

                  </div>
              </div>
              </div>
    </div>
  );
};

export default DoctorProfile;