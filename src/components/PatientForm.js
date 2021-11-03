import VisitTable from "../components/VisitTable";
import PatientRecordsTable from "./PatientRecordsTable";

const doctorMode =
  process.env.NEXT_PUBLIC_VIEW_MODE === "doctor" ? true : false;

export default function PatientForm() {
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
              Jonas Jonaitis
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Gimimo Data</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              1969-01-01
            </dd>
          </div>
        </dl>
        <PatientRecordsTable />
      </div>
    </div>
  );
}
