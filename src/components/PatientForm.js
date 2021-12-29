import PatientRecordsTable from './PatientRecordsTable';
import { useState } from 'react';
import moment from 'moment';

export default function PatientForm(props) {
  const [patient] = useState(props.patient);
  return (
    <div>
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Paciento Informacija
        </h3>
      </div>
      <div className="mt-5 border-t border-gray-200">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Vardas Pavardė
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {`${patient.firstName} ${patient.lastName}`}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Gimimo Data</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {moment(patient.birthday).format('yyyy-MM-DD hh:mm')}
            </dd>
          </div>
        </dl>
        <PatientRecordsTable records={props.records} patient={props.patient} />
      </div>
    </div>
  );
}
