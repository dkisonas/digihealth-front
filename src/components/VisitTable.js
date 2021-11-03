import Link from "next/link";

const doctorVisits = [
  {
    id: 1,
    date: "2021-11-11",
    title: "Akių patikra",
    name: "Jonas Jonaitis",
    status: "Patvirtintas",
  },
  {
    id: 2,
    date: "2021-11-12",
    title: "Akių patikra",
    name: "Jonas Jonaitis",
    status: "Atšauktas",
  },
  // More people...
];

const patientVisits = [
  {
    id: 3,
    date: "2021-11-11",
    title: "Akių patikra",
    name: "Daktaras Hausas",
    status: "Patvirtintas",
  },
  {
    id: 4,
    date: "2021-11-12",
    title: "Akių patikra",
    name: "Daktaras Hausas",
    status: "Atšauktas",
  },
  // More people...
];

const viewMode = process.env.NEXT_PUBLIC_VIEW_MODE;

export default function VisitTable() {
  const doctorMode = viewMode === "doctor" ? true : false;
  const visits = doctorMode ? doctorVisits : patientVisits;
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
                    Data
                  </th>
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
                    {viewMode === "doctor" ? "Pacientas" : "Gydytojas"}
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Statusas
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visits.map((visit, visitIdx) => (
                  <tr
                    key={visit.id}
                    className={visitIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {visit.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {visit.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {visit.name}
                    </td>
                    {!doctorMode && visit.status === "Įvykęs" ? null : (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {visit.status}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href="/visit">
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