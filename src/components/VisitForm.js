import { useState } from 'react';
import AddLabTests from './AddLabTests';
import AddMedicine from './AddMedicine';
import ShowLabTests from './ShowLabTests';
import moment from 'moment';
import { useRouter } from 'next/router';
import { update } from '../utils/HttpUtils';
import { formatVisitForRequest } from '../utils/VisitUtils';
import PrescriptionTable from './PrescriptionTable'


const labNiuhalas = [
  {Name: "testas1", description: "zdrw1", status: "Baigtas"},
  {Name: "testas2", description: "zdrw2", status: "Laukiamas"},
  {Name: "testas3", description: "zdrw3", status: "Laukiamas"},
  {Name: "testas4", description: "zdrw4", status: "Baigtas"},
  {Name: "testas5", description: "zdrw5", status: "Laukiamas"},
];




const doctorMode =
  process.env.NEXT_PUBLIC_VIEW_MODE === 'doctor' ? true : false;

const patientMode = 
  process.env.NEXT_PUBLIC_VIEW_MODE === 'patient' ? true : false;

export default function VisitForm(props) {
  const router = useRouter();
  const [visitStatus, setVisitStatus] = useState(props.visit.status);
  const [visit, setVisit] = useState(props.visit);
  const [record, setRecord] = useState(props.record[0]);
  const [medicine] = useState(props.medicine);
  const [allMedicine] = useState(props.medicine);
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  console.log(props);

  async function cancelVisit() {
    let cancelledVisit = formatVisitForRequest({ ...visit });
    cancelledVisit.status = 'Atšauktas';
    await update(`/Visit/update`, cancelledVisit);
    alert('Vizitas atšauktas');
    router.push('/');
  }

  const handleVisitStatus = (e) => {
    setVisitStatus(e.target.value);
  };

  const handleMedicines = (medicine) => {
    let tempMedicines = selectedMedicines;
    tempMedicines.push(medicine);
    setSelectedMedicines(tempMedicines);
  };

  const goBack = () => {
    router.push('/');
  };

  return (
    <div>
      <div>
        {visitStatus === 'Įvykęs' ? (
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Įrašo Informacija
          </h3>
        ) : (
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Vizito Informacija{' '}
          </h3>
        )}
      </div>
      <div className="mt-5 border-t border-gray-200">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Data</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {moment(visit.date).format('yyyy-MM-DD hh:mm')}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Pavadinimas</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {visit.name}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              {doctorMode ? 'Pacientas' : 'Gydytojas'}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {doctorMode ? visit.patientName : visit.doctorName}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:gnrid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              {' '}
              Vizito aprašymas
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {visit.description}
            </dd>
          </div>
          {visitStatus === 'Įvykęs' ? (
            <div className="py-4 sm:py-5 sm:gnrid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                {' '}
                Įrašo aprašymas
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {record?.description}
              </dd>
            </div>
          ) : null}
        </dl>
        {!patientMode ? (
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Statusas
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <select
              defaultValue={visit.status}
              disabled={doctorMode ? false : true}
              onChange={handleVisitStatus}
              id="country"
              className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            >
              <option>Laukiamas</option>
              <option>Patvirtintas</option>
              <option>Atšauktas</option>
              <option>Įvykęs</option>
            </select>
          </div>
        </div> ) : null }
        {visitStatus === 'Įvykęs' && doctorMode ? (
          <div>
            <div className="relative flex items-start mt-5">
              <div className="flex items-center h-5">
                <input
                  id="comments"
                  aria-describedby="comments-description"
                  name="comments"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="comments" className="font-medium text-gray-700">
                  Siųsti SMS vaistų priminimus
                </label>
              </div>
            </div>
            <AddMedicine medicine={allMedicine} onChange={handleMedicines} />
            <AddLabTests />
          </div>
        ) : null}
      </div>
      {patientMode && visitStatus === 'Įvykęs' ? (
        <div>
          <ShowLabTests labTest={labNiuhalas}/>
          </div>
      ) : null}
      {visitStatus !== 'Įvykęs' ? (
        <div className="flex justify-center py-10">
          <button
            type="button"
            onClick={cancelVisit}
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Atšaukti vizitą
          </button>
        </div>
      ) : null} 
      {patientMode && visitStatus === 'Įvykęs' ? (
        <div className="flex justify-center py-10">
          <button
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={goBack}
          >
            Atgal
          </button>
        </div>
      ): null}
    </div>
  );
}
