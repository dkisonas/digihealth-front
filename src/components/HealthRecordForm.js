import { useState } from 'react';
import AddLabTests from './AddLabTests';
import AddMedicine from './AddMedicine';
import ShowLabTests from './ShowLabTests';
import moment from 'moment';
import { useRouter } from 'next/router';
import { update, post, fetchJson } from '../utils/HttpUtils';
import { formatVisitForRequest } from '../utils/VisitUtils';
import { v4 as uuid } from 'uuid';
import PrescriptionTable from '../components/PrescriptionTable';

const doctorMode =
  process.env.NEXT_PUBLIC_VIEW_MODE === 'doctor' ? true : false;

const patientMode =
  process.env.NEXT_PUBLIC_VIEW_MODE === 'patient' ? true : false;

export default function HealthRecordForm(props) {

  const router = useRouter();

  const [selectableMedicine] = useState(props.selectableMedicine);
  const [visit, setVisit] = useState(props.visit);
  const [patient] = useState(props.patient);
  const [record] = useState(props.record);
  const [prescriptions, setPrescriptions] = useState(
    props.record.prescriptions
  );
  const [labTests] = useState(props.record.labTests);
  const [medicine] = useState(props.record.prescriptions[0]?.medicaments);
  const [usingTimes] = useState(props.record.prescriptions[0]?.usingTimes);
  const [selectedMedicines, setSelectedMedicines] = useState(
    convertToMedicineView()
  );
  const [selectedLabTests, setSelectedLabTests] = useState(
    convertToLabTestView()
  );
  const [healthRecordDescription, setVisitDescription] = useState(props.record.description);
  const [isSms, setIsSms] = useState(false);
  const [updateView, setUpdateView] = useState(false);

  function convertToMedicineView() {
    let result = [];

    if (medicine === null || medicine === undefined) {
      return result;
    }

    medicine.forEach((item) => {
      result.push({
        med: item,
        times: formatUsingTime(
          usingTimes.filter((x) => x.medicamentId === item.id)
        ),
      });
    });
    return result;
  }

  function convertToLabTestView() {
    let result = [];

    if (labTests === null || labTests === undefined) {
      return result;
    }

    labTests.forEach((x) => {
      result.push({
        id: x.id,
        name: x.name,
        description: x.description,
      });
    });
    return result;
  }

  function formatUsingTime(input) {
    if (input === null || input === undefined) {
      return '';
    }

    let result = '';
    input.forEach((x) => {
      result = result + x.time.substring(0, 5) + ';';
    });
    return result;
  }

  async function updateHealthRecord() {

    if (record) {
      const startDate = moment();
      const formattedLabTests = formatLabTests(record.id);
      const recipeId = uuid();
      const formattedMediceAndUsingTimes = formatMedicine(prescriptions[0] === undefined ? recipeId : prescriptions[0].id);
      const newHealhRecord = {
        id: record.id,
        date: record.date,
        description: healthRecordDescription,
        visitId: visit.id,
        patientId: record.patientId,
        receipts: [
          {
            id: prescriptions[0] === undefined ? recipeId : prescriptions[0].id,
            patientId: visit.patientId,
            remind: isSms,
            healthRecordId: record.id,
            usingTimes: formattedMediceAndUsingTimes.currentUsingTimes,
            medicaments: formattedMediceAndUsingTimes.currentMedicines,
            expiredDate:
              record.prescriptions[0] === undefined
                ? startDate
                  .add(1, 'month')
                  .format('yyyy-MM-DD[T]hh:mm:ss.SSS[Z]')
                : record.prescriptions[0].expiredDate,
          },
        ],
        labTests: formattedLabTests,
      };
      console.log(newHealhRecord);
      const result = await update('/HealthRecord/update', newHealhRecord);
      if (result.success === true) {
        alert('Ligos istorijos ??ra??as atnaujintas');
        router.push('/patients/' + record.patientId);
      }
    }
  }

  const handleVisitStatus = (e) => {
    setVisitStatus(e.target.value);
  };

  const handleMedicine = (medicine) => {
    setSelectedMedicines(medicine);
  };

  const changeView = () => {
    setUpdateView(!updateView);
  };

  const handleLabTests = (tests) => {
    setSelectedLabTests(tests);
  };

  const handleTestDescription = (e) => {
    setVisitDescription(e.target.value);
  };

  const handleSms = () => {
    setIsSms(!isSms);
  };

  const formatMedicine = (recipeId) => {

    let currentUsingTimes = [];
    let currentMedicines = [];

    if (selectableMedicine === null || selectableMedicine === undefined || selectableMedicine === []) {
      return;
    }

    selectedMedicines.forEach((element) => {
      let usingTime = element.times.split(';');

      let existingMed = medicine?.find((x) => x.name === element.name && x.description === element.description);

      let medId =
        existingMed === null || existingMed === undefined
          ? uuid()
          : existingMed.id;

      usingTime.forEach((t) => {


        if (t !== '') {
          let existingUsingTime;
          if (usingTimes !== undefined && usingTimes !== null && usingTimes !== []) {
            existingUsingTime = usingTimes.find(
              (x) => x.medicamentId === medId && x.time === t
            );
          }

          if (existingUsingTime !== undefined) {
            currentUsingTimes.push({
              id: existingUsingTime.id,
              medicamentId: medId,
              time: existingUsingTime.time,
              recipeId: recipeId,
            });
          } else {
            currentUsingTimes.push({
              id: uuid(),
              medicamentId: medId,
              time: t,
              recipeId: recipeId,
            });
          }
        }
      });

      currentMedicines.push({
        id: medId,
        name: element.med.name,
        description: element.med.description,
        recipeId: recipeId,
      });
    });
    return { currentMedicines, currentUsingTimes };
  };

  const formatLabTests = (id) => {
    return selectedLabTests.map((test) => ({
      id: test.id === null || test.id === undefined ? uuid() : test.id,
      name: test.name,
      description: test.description,
      labWorkerId: '0d86f189-65ea-48d5-9224-36618b2b493e',
      result: '',
      status:
        test.status === null || test.status === undefined
          ? 'Laukiamas'
          : test.status,
      healthRecordId: id,
    }));
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div>
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          ??ra??o Informacija
        </h3>
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
              {doctorMode
                ? patient.firstName + ' ' + patient.lastName
                : visit.doctorName}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:gnrid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              {' '}
              Vizito apra??ymas
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {visit.description}
            </dd>
          </div>
        </dl>
        {!updateView ? (
          <div className="py-4 sm:py-5 sm:gnrid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              {' '}
              ??ra??o apra??ymas
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {healthRecordDescription}
            </dd>
          </div>
        ) : null}
        {updateView ? (
          <div>
            <div className="py-4 sm:py-5 sm:gnrid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                {' '}
                ??ra??o apra??ymas
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <textarea
                  rows={3}
                  type="text"
                  id="test-name"
                  className="mx-auto mb-6 max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  value={healthRecordDescription}
                  onChange={handleTestDescription}
                />
              </dd>
            </div>
            <div className="relative flex items-start mt-5">
              <div className="flex items-center h-5">
                <input
                  id="comments"
                  aria-describedby="comments-description"
                  name="comments"
                  type="checkbox"
                  onClick={handleSms}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="comments" className="font-medium text-gray-700">
                  Si??sti SMS vaist?? priminimus
                </label>
              </div>
            </div>
            <AddMedicine
              medicine={selectableMedicine}
              usingTimesCurrent={usingTimes}
              medicineCurrent={medicine}
              onChange={handleMedicine}
            />
            <div className="ml-3 text-sm"></div>
            <AddLabTests labTestCurrent={labTests} onChange={handleLabTests} />
          </div>
        ) : null}
      </div>
      {!updateView ? (
        <div>
          <label htmlFor="comments" className="font-medium text-gray-700">
            Tyrimai
          </label>
          <ShowLabTests labTest={labTests} />
          <label htmlFor="comments" className="font-medium text-gray-700">
            Receptai
          </label>
          <PrescriptionTable prescription={prescriptions} />
        </div>
      ) : null}
      <div className="flex justify-center py-10">
        {doctorMode && !updateView ? (
          <button
            onClick={changeView}
            type="button"
            className="inline-flex items-center mr-2.5 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Koreguoti
          </button>
        ) : null}
        {(patientMode || doctorMode) && updateView ? (
          <button
            type="button"
            className="inline-flex items-center mr-2.5 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={updateHealthRecord}
          >
            I??saugoti
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
