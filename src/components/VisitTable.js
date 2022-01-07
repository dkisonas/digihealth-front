import Link from 'next/link';
import { fetchJson } from '../utils/HttpUtils';
import { useState } from 'react';
import { formatVisits } from '../utils/VisitUtils';

const viewMode = process.env.NEXT_PUBLIC_VIEW_MODE;
const userId = process.env.NEXT_PUBLIC_USER_ID;

export default function VisitTable(props) {
  const doctorMode = viewMode === 'doctor' ? true : false;
  const [ visits, setVisits ] = useState(props.visits.visits);
  const [ view, setView ] = useState('Aktyvius');

  const handleChangesOfView = (e) => {
    loadByStatus(e.target.value);
  }

  async function loadByStatus(status) {
    let items = [];
    console.log(status);
    if(status === 'Aktyvius') {
      if(doctorMode) {
        items = await fetchJson(`/Visit/get/byDoctorAndStatus?doctorId=${userId}&visitStatus=Laukiamas`);
      } else {
        items = await fetchJson(`/Visit/get/byPatientAndStatus?patientId=${userId}&visitStatus=Laukiamas`);
      }
    } else if(status === 'Patvirtintus') {
      if(doctorMode) {
        items = await fetchJson(`/Visit/get/byDoctorAndStatus?doctorId=${userId}&visitStatus=Patvirtintas`);
      } else {
        items = await fetchJson(`/Visit/get/byPatientAndStatus?patientId=${userId}&visitStatus=Patvirtintas`);
      }
    } else if(status === 'Atšauktus') {
      if(doctorMode) {
        items = await fetchJson(`/Visit/get/byDoctorAndStatus?doctorId=${userId}&visitStatus=Atšauktas`);
      } else {
        items = await fetchJson(`/Visit/get/byPatientAndStatus?patientId=${userId}&visitStatus=Atšauktas`);
      }
    } else if(status === 'Įvykdytus') {
      if(doctorMode) {
        items = await fetchJson(`/Visit/get/byDoctorAndStatus?doctorId=${userId}&visitStatus=Įvykęs`);
      } else {
        items = await fetchJson(`/Visit/get/byPatientAndStatus?patientId=${userId}&visitStatus=Įvykęs`);
      }
    }

    const formattedVisits = await formatVisits(items).then((x) => {
      return x;
    });

    setVisits(formattedVisits);
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5 mb-10">
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
                <option >Patvirtintus</option>
                <option >Atšauktus</option>
                <option >Įvykdytus</option>
              </select>
            </div>
          </div>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Data
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Pavadinimas
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {viewMode === 'doctor' ? 'Pacientas' : 'Gydytojas'}
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Statusas
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visits.map((visit, visitIdx) => (
                  <tr
                    key={visit.id}
                    className={visitIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {visit.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {visit.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doctorMode ? visit.patientName : visit.doctorName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {visit.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/visit/${visit.id}`}>
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
