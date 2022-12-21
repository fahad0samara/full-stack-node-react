import {useLogIN} from "../../ContextLog";
import "./Table.css";

const About = () => {
  const { Profile, setProfile, loading, setLoading, dark} =
    useLogIN();
  const convertDate = (date: any) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    return `${day}/${month}/${year}`;
  };
  return (
    // <table>
    //   <thead>
    //     <tr>
    //       <th></th>
    //       <th> Doctor</th>
    //       <th>Appointment date</th>
    //       <th> medicines</th>
    //       <th>Tests</th>
    //       <th>Prescription</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {Profile
    //       ? Profile.prescriptions.map((mappedData: any) => {
    //           return (
    //             <tr>
    //               <th>{mappedData ? mappedData._id : null}</th>
    //               <td>{mappedData ? mappedData.doctor : null}</td>
    //               <td>{mappedData ? convertDate(mappedData.date) : null}</td>
    //               {mappedData?.medicines?.map((medicine: any) => {
    //                 return (
    //                   <td>
    //                     {medicine.name}
    //                     <br />
    //                     {medicine.type}
    //                     <br />
    //                     {medicine.frequency}
    //                   </td>
    //                 );
    //               })}
    //               <td>{mappedData ? mappedData.tests.name : null}</td>
    //               <td className="">
    //                 {mappedData ? (
    //                   <a href={mappedData.prescription} download className="">
    //                     Download
    //                   </a>
    //                 ) : null}
    //               </td>
    //             </tr>
    //           );
    //         })
    //       : null}
    //   </tbody>
    // </table>
    <div
      className="
      flex flex-col items-center justify-center"
      style={{
        backgroundColor: dark ? "#1e1e1e" : "#fff",
        color: dark ? "#fff" : "#000",
      }}
    >
      <h1>Dashboard</h1>
      <h1>{Profile?.name}</h1>
      <h1>{Profile?.email}</h1>
      <h1>{Profile?.role}</h1>

    </div>
  );
};

export default About;
