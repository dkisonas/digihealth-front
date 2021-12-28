/* This example requires Tailwind CSS v2.0+ */
import { PlusIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

export default function AddLabTests(props) {
  const [selectedTests, setSelectedTests] = useState([]);
  const [testName, setTestName] = useState('');
  const [testDescription, setTestDescription] = useState('');

  const handleTestName = (e) => {
    setTestName(e.target.value);
  };

  const handleTestDescription = (e) => {
    setTestDescription(e.target.value);
  };

  const addLabTest = () => {
    const test = {
      id: uuid(),
      name: testName,
      description: testDescription,
    };
    const result = selectedTests.concat(test);
    setSelectedTests(result);
    props.onChange(result);
  };

  const deleteLabTest = (id) => {
    const newTests = [...selectedTests];
    const result = newTests.filter((x) => x.id !== id);
    setSelectedTests(result);
    props.onChange(result);
  };

  return (
    <div className="text-center border mt-6 py-6">
      <div className="mb-6">
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <label
            htmlFor="using-times"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Tyrimo pavadinimas
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <input
              type="text"
              id="test-name"
              className="mx-auto mb-6 max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              value={testName}
              onChange={handleTestName}
            />
          </div>

          <label
            htmlFor="using-times"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Tyrimo aprašymas
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <textarea
              rows={3}
              type="text"
              id="test-name"
              className="mx-auto mb-6 max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              value={testDescription}
              onChange={handleTestDescription}
            />
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={addLabTest}
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
                        Tyrimo pavadinimas
                      </th>

                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Ištrinti</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTests.map(({ id, name, description }, medIdx) => (
                      <tr
                        key={medIdx}
                        className={medIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div
                            onClick={() => deleteLabTest(id)}
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
