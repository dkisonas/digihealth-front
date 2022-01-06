import { PlusIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import moment from 'moment';

const regex = "^[0-9;:\b]+$";

export default function AddMedicine(props) {
  const [existingMedicine] = useState(props.medicineCurrent);
  const [existingUsingTimes] = useState(props.usingTimesCurrent);
  const [selectedMedicines, setSelectedMedicines] = useState(convertToView());
  const [allMedicineList] = useState(props.medicine);
  const [selectedMedicine, setSelectedMedicine] = useState(
    allMedicineList[0].name
  );
  const [usingTimes, setUsingTimes] = useState('');

  const handleUsingTimes = (e) => {

    const pattern = new RegExp(regex);
    const value = e.target.value;
    
    if(e.target.value === '') {
      setUsingTimes(e.target.value);
      return;
    }

    if(pattern.test(value) && e.target.value !== '')
    {
      setUsingTimes(e.target.value);
    }

  };
  
  function validateHhMm(inputField) {
    return /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(inputField);
  }


  const handleMedicine = (e) => {
    const med = allMedicineList.find((x) => x.name === e.target.value);
    setSelectedMedicine(med.name);
  };

  const addMedicine = () => {

    let usingTime = usingTimes.split(';');

    let inValid = 0;

    usingTime.forEach(time => {
      if(time !== '') {
        if(!validateHhMm(time)) {
          inValid++;
        }
      }
    });

    if(inValid > 0) {
      alert('Blogai įvestas laikas.');
      setUsingTimes('');
      return;
    }


    const medicine = {
      med: allMedicineList.find((x) => x.name === selectedMedicine),
      times: usingTimes,
    };

    if (selectedMedicines.find((x) => x.med.name === selectedMedicine)) {
      return;
    }

    const result = selectedMedicines.concat(medicine);
    setSelectedMedicines(result);
    props.onChange(result);
  };

  const deleteMedicine = (name) => {
    const newMeds = [...selectedMedicines];
    const result = newMeds.filter((x) => x.med.name !== name);
    setSelectedMedicines(result);
    props.onChange(result);
  };

  function convertToView() {
    let result = [];

    if (existingMedicine === null || existingMedicine === undefined) {
      return result;
    }

    existingMedicine.forEach((medicine) => {
      result.push({
        med: medicine,
        times: formatUsingTime(
          existingUsingTimes.filter((x) => x.medicamentId === medicine.id)
        ),
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

  return (
    <div className="text-center border mt-6 py-6">
      <div className="mb-6">
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Vaistas
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <select
            id="medicineDropdown"
            className="mx-auto mb-6 max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            value={selectedMedicine}
            onChange={handleMedicine}
          >
            {allMedicineList.map(({ id, name }, i) => (
              <option key={i} value={name}>
                {name}
              </option>
            ))}
          </select>

          <label
            htmlFor="using-times"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Vartojimo laikai
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <input
              type="text"
              id="using-times"
              className="mx-auto mb-6 max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              value={usingTimes}
              onChange={handleUsingTimes}
            />
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={addMedicine}
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Pridėti vaistų
        </button>

        <div className="flex flex-col mt-6">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Pavadinimas
                      </th>
                      <th
                        scope="col"
                        className="text-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Vartojimo laikai
                      </th>

                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Ištrinti</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedMedicines.map(({ med, times }, medIdx) => (
                      <tr
                        key={medIdx}
                        className={medIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {med.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {times}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div
                            onClick={() => deleteMedicine(med.name)}
                            className="text-indigo-600 hover:text-indigo-900 link"
                          >
                            Ištrinti
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
