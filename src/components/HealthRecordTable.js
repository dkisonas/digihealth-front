import { useState } from 'react';
import moment from 'moment';
import Link from 'next/link';

const dateFormat = 'yyyy-MM-DD';

export default function HealthRecordTable(props) {
  const [records] = useState(props.records);


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
                    Aprašymas
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Data
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, recordId) => (
                  <tr
                    key={record.id}
                    className={recordId % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-gray-900">
                      {record.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {moment(record.date).format(dateFormat)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/healthRecord/${record.id}`}>
                        <div className="text-indigo-600 hover:text-indigo-900 link">
                          Atidaryti
                        </div>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
