import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';
import { fetchJson } from '../utils/HttpUtils'

const userId = process.env.NEXT_PUBLIC_USER_ID;

export default function LabTestTable(props) {

  const testStatus = [
  { name: "Aktyvus", value: 0 },
  { name: "Įvykdytas", value: 1 },
  ];



  const { labTests } = props.labTest;
  const [viewStatus, setViewStatus] = useState();

  const handleChangesOfView = (e) => {
    loadByStatus(e.target.value);
  };

  async function loadByStatus(viewStatus) {
    console.log(testStatus[1].value);
    //fetchJson(`/LabWorker/get/labTest/byIdAndStatus?workerId=${userId}&&status=${testStatus.find()}`)
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-10">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Rodyti
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
                  onChange={handleChangesOfView}
                  id="country"
                  className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                >
                  <option >Aktyvius</option>
                  <option >Įvykdytus</option>
                </select>
              </div>
            </div>
          </div>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Aprašymas
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Statusas
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {labTests.map((labTest, labTestId) => (
                  <tr
                    key={labTest.id}
                    className={labTestId % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {labTest.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {labTest.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/labTest/${labTest.id}`}>
                        <div className="text-indigo-600 hover:text-indigo-900 link">
                          Atidaryti
                        </div>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
