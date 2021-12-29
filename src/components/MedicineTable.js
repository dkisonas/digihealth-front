import { useState } from 'react';

export default function MedicineTable(props) {
  const [selectedMedicines] = useState(props.medicine);

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
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
                    Vartojimo laikai
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Ištrinti</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedMedicines.map(
                  ({ selectedMedicine, usingTimes }, medIdx) => (
                    <tr
                      key={selectedMedicine.id}
                      className={medIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {selectedMedicine.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {usingTimes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="text-indigo-600 hover:text-indigo-900 link">
                          Ištrinti
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
