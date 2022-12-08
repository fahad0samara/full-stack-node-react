import {useLogIN} from "../../ContextLog";

const Table = () => {
  const {log, setLog, Profile, setProfile, loading, setLoading} = useLogIN();
  const convertDate = (date: any) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    return `${day}/${month}/${year}`;
  };
  return (
    <div className="
            w-full
            overflow-x-auto
       
      
            rounded-lg
            shadow-xs
            bg-white
            dark:bg-gray-800
            mt-6
            mb-6

    ">
      <table className="
            w-full
            whitespace-nowrap
            rounded-lg
            bg-white
            dark:bg-gray-800
            divide-y
            divide-gray-300
            dark:divide-gray-700
            overflow-hidden

       ">
        <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
          <tr>
            <th scope="col" className="py-3 px-6">
              Doctor
            </th>
            <th scope="col" className="py-3 px-6">
              Appointment date
            </th>
            <th scope="col" className="py-3 text-center px-6 bg-black">
              Hospital department
            </th>
            <th scope="col" className="py-3 text-center px-6 bg-black">
              medicines
            </th>
            <th scope="col" className="py-3 px-6">
              advice
            </th>
            <th scope="col" className="py-3 px-6">
              Prescription
            </th>
            <th scope="col" className="py-3 px-6">
              Prescription
            </th>
          </tr>
        </thead>
        <tbody>
          {Profile
            ? Profile.prescriptions.map((mappedData: any) => {
                return (
                  <tr className="bg-blue-500 border-b border-blue-400">
                    <>
                      <th className="flex items-center py-1 px-2 text-gray-900 whitespace-nowrap ">
                        <img
                          className="w-5 h-5 rounded-full"
                          src="/docs/images/people/profile-picture-1.jpg"
                        />
                        <div className="pl-3">
                          <div className="text-base font-semibold text-white">
                            {mappedData ? mappedData.doctor : null}
                          </div>
                          <div className="font-normal text-white">
                            neil.sims@flowbite.com
                          </div>
                        </div>
                      </th>
                      <td className="py-4 px-6">
                        {mappedData ? convertDate(mappedData.date) : null}
                      </td>

                      <td className="py-1 px-2 bg-black">
                        {mappedData?.department?.map((department: any) => {
                          return (
                            <div
                              className="
                                        text-center

                                        text-gray-900 whitespace-nowrap "
                            >
                              <div className="text-base font-semibold text-white">
                                {department.name}
                              </div>
                              <div className="text-sm font-semibold text-white">
                                {department.type}
                              </div>
                            </div>
                          );
                        })}
                      </td>

                      <td className="py-1 px-2 bg-black">
                        {mappedData?.medicines?.map((medicine: any) => {
                          return (
                            <div
                              className="
                                        text-center

                                        text-gray-900 whitespace-nowrap "
                            >
                              <div className="text-base font-semibold text-white">
                                {medicine.name}
                              </div>
                              <div className="text-sm font-semibold text-white">
                                {medicine.type}
                              </div>

                              <div className="text-sm font-semibold text-white">
                                {medicine.frequency}
                              </div>
                            </div>
                          );
                        })}
                      </td>
                      <td className=" items-center  px-1 whitespace-nowrap  ">
                        {mappedData.advice.length > 100
                          ? mappedData.advice.slice(0, 10) + "..."
                          : mappedData.advice}
                      </td>
                      <td className="py-4 px-6">{mappedData.prescription}</td>
                      <td className="py-4 px-6">
                        {mappedData ? (
                          <a
                            href={mappedData.prescription}
                            download
                            className="text-white"
                          >
                            Download
                          </a>
                        ) : null}
                      </td>
                    </>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
