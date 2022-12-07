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
    <div className="relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
        <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
          <tr>
            <th scope="col" className="py-3 px-6">
              Doctor
            </th>
            <th scope="col" className="py-3 px-6">
              date
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
                      <th className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap ">
                        <img
                          className="w-10 h-10 rounded-full"
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
                          ? mappedData.advice.slice(0, 40) + "..."
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
