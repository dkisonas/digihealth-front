import { useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { update, post, fetchJson } from '../utils/HttpUtils';
import {
  formatVisitForRequest,
  formatVisitForDisplay,
} from '../utils/VisitUtils';
import { v4 as uuid } from 'uuid';

const doctorMode =
  process.env.NEXT_PUBLIC_VIEW_MODE === 'doctor' ? true : false;

const patientMode =
  process.env.NEXT_PUBLIC_VIEW_MODE === 'patient' ? true : false;

export default function VisitForm(props) {
  const router = useRouter();
  const [visitStatus, setVisitStatus] = useState(props.visit.status);
  const [visit, setVisit] = useState(props.visit);

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

  async function saveVisit() {
    let newVisit = formatVisitForRequest({ ...visit });
    newVisit.status = visitStatus;
    await update(`/Visit/update`, newVisit);
    newVisit = await formatVisitForDisplay(newVisit);
    setVisit(newVisit);

    if (visitStatus === 'Įvykęs') {
      const healthRecordId = uuid();
      console.log(healthRecordId);

      const startDate = moment();

      const healthRecord = {
        id: healthRecordId,
        date: startDate.format('yyyy-MM-DD[T]hh:mm:ss.SSS[Z]'),
        description: '',
        visitId: visit.id,
        patientId: visit.patientId,
        receipts: [],
        labTests: [],
      };
      const result = await post('/HealthRecord/create', healthRecord);
      if (result.success === true) {
        alert('Ligos istorijos įrašas sukurtas');
        router.push(`/healthRecord/${healthRecordId}`);
      } else {
        alert('Ligos istorija nebuvo sukurta: ' + result.exception);
      }
    }
  }

  const goBack = () => {
    router.push('/');
  };

  return (
    <div>
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Vizito Informacija{' '}
        </h3>
      </div>
      <div className="mt-5 border-t border-gray-200">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Data</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {visit.date}
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
        </dl>
        {doctorMode ? (
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
          </div>
        ) : null}
      </div>
      {visitStatus == 'Laukiamas' && patientMode ? (
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
      <div className="flex justify-center py-10">
        {doctorMode ? (
          <button
            type="button"
            className="inline-flex items-center mr-2.5 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={saveVisit}
          >
            Išsaugoti
          </button>
        ) : null}
        <button
          type="button"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={goBack}
        >
          Atgal
        </button>
      </div>
    </div>
  );
}
