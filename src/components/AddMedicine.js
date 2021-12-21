/* This example requires Tailwind CSS v2.0+ */
import { PlusIcon } from '@heroicons/react/solid';
import { useState } from 'react/cjs/react.development';
import { fetchJson } from '../utils/HttpUtils';

export default function AddMedicine(props) {
  const [medicineList] = useState(props.medicine);
  const [selectedMedicine, setSelectedMedicine] = useState();
  const [usingTimes, setUsingTimes] = useState();

  const handleUsingTimes = (e) => {
    // setFirstName(e.target.value);
  };

  const handleMedicine = (e) => {
    // setFirstName(e.target.value);
  };

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
          >
            {medicineList.map(({ id, name }, i) => (
              <option key={i} value={JSON.stringify({ id, name })}>
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
              onChange={handleUsingTimes()}
            />
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleMedicine()}
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Pridėti vaistų
        </button>
      </div>

      <h3 className="mt-2 text-sm font-medium text-gray-900">Nėra vaistų</h3>
      <p className="mt-1 text-sm text-gray-500">
        Pridėkite reikalingus vaistus.
      </p>
    </div>
  );
}
