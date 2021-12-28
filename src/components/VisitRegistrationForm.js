import axios from 'axios';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';

export default function VisitRegistrationForm() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const doctorTypes = ['', 'Gastrologas', 'Kardiologas'];

  const dateFormat = 'yyyy-MM-DD[T]hh:mm:ss.SSS[Z]';

  const [doctors, setDoctors] = useState([{}]);
  const [doctor, setDoctor] = useState(null);
  const [doctorType, setDoctorType] = useState();
  const [startDate, setStartDate] = useState();
  const [freeTimes, setFreeTimes] = useState([]);
  const [freeTime, setFreeTime] = useState();
  const [description, setDescription] = useState();

  const combineDateAndTime = () => {
    return moment(startDate).format('yyyy-MM-DD') + `T${freeTime}:00.000Z`;
  };

  async function createVisit() {
    const visitId = uuid();
    const startDateTime = combineDateAndTime();
    const endDateTime = moment(startDateTime)
      .add(30, 'minutes')
      .format(dateFormat);
    console.log(`start ${startDateTime} end ${endDateTime}`);
    const visit = {
      id: visitId,
      name: 'Vizitas',
      description: description,
      status: 'Laukiamas',
      startDate: startDateTime,
      endDate: endDateTime,
      patientId: '0411e8d3-7864-4459-bbe7-27940a0293cf',
      doctorId: doctor.id,
    };
    console.log('printing visit object:');
    console.log(visit);
    const res = await axios.post(`${apiUrl}/Visit/create`, visit);
    const { result } = await res.data;
    console.log('printing result from server object:');
    console.log(result);
    alert('Vizitas sėkmingai užregistruotas');
    router.push('/');
  }

  const handleDescription = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  };

  const handleFreeTime = (e) => {
    setFreeTime(e.target.value);
  };

  const handleDoctor = (e) => {
    const { id, fullName } = JSON.parse(e.target.value);
    console.log(id);
    setDoctor({ id, fullName });
  };

  async function handleStartDate(date) {
    setStartDate(date);
    const formattedDate = moment(date).format(dateFormat);
    const params = new URLSearchParams([
      ['date', formattedDate],
      ['doctorId', doctor.id],
    ]);
    const res = await axios.get(`${apiUrl}/Visit/get/freetimes`, { params });
    const { result } = await res.data;
    const tempFreeTimes = result.map((date) => moment(date).format('HH:mm'));
    setFreeTimes(tempFreeTimes);
    setFreeTime(tempFreeTimes[0]);
  }

  async function handleDoctorType(e) {
    setDoctorType(e.target.value);
    setDoctors([{}]);
    const tempDoctors = [{}];
    const doctorTypeId = doctorTypes.indexOf(e.target.value) - 1;
    if (doctorTypeId === -1) return;
    const res = await axios.get(
      `${apiUrl}/Doctor/get/byType?type=${doctorTypeId}`
    );
    const { result } = await res.data;
    result.map(({ id, firstName, lastName }) =>
      tempDoctors.push({
        id: id,
        fullName: `${firstName} ${lastName}`,
      })
    );
    setDoctors(tempDoctors);
  }

  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Registracija vizitui
            </h3>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Gydytojai
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  value={doctorType}
                  onChange={handleDoctorType}
                  className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                >
                  {doctorTypes.map((type, index) => (
                    <option key={index}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Gydytojas
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  onChange={handleDoctor}
                >
                  {doctors.map(({ id, fullName }, i) => (
                    <option key={i} value={JSON.stringify({ id, fullName })}>
                      {fullName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Data
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <DatePicker
                  readOnly={doctor === null ? true : false}
                  id="date"
                  className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  selected={startDate}
                  onChange={handleStartDate}
                  dateFormat="yyyy-MM-dd"
                />
              </div>
              <label
                htmlFor="freeTimes"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Laisvi laikai šią dieną:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
                  id="freeTimes"
                  name="freeTimes"
                  onSelect={handleFreeTime}
                  onChange={handleFreeTime}
                  className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                >
                  {freeTimes.map((time, i) => (
                    <option key={i}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Aprašymas
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={''}
                  value={description}
                  onChange={handleDescription}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Parašykite apie savo būklę
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            onClick={() => router.push('/')}
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Atšaukti
          </button>
          <button
            type="button"
            onClick={createVisit}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Išsaugoti
          </button>
        </div>
      </div>
    </form>
  );
}
