/* This example requires Tailwind CSS v2.0+ */
import { PlusIcon } from '@heroicons/react/solid';

export default function AddMedicine() {
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
            <option>Pending</option>
            <option>Approved</option>
            <option>Canceled</option>
            <option>Occurred</option>
          </select>
        </div>

        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
