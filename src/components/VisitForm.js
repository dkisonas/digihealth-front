import { useState } from "react";
import AddLabTests from "./AddLabTests";
import AddMedicine from "./AddMedicine";
import AddItems from "./AddMedicine";

const doctorMode =
  process.env.NEXT_PUBLIC_VIEW_MODE === "doctor" ? true : false;

export default function VisitForm() {
  const [visitStatus, setVisitStatus] = useState("Užregistruotas");

  const handleStatus = (e) => {
    setVisitStatus(e.target.value);
  };

  return (
    <div>
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Vizito Informacija
        </h3>
      </div>
      <div className="mt-5 border-t border-gray-200">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Data</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              2021-11-11
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Pavadinimas</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Akių patikra
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              {doctorMode ? "Pacientas" : "Gydytojas"}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {doctorMode ? "Jonas Jonaitis" : "Daktaras Hausas"}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Aprašymas</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
              incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
              consequat sint. Sit id mollit nulla mollit nostrud in ea officia
              proident. Irure nostrud pariatur mollit ad adipisicing
              reprehenderit deserunt qui eu.
            </dd>
          </div>
        </dl>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Statusas
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <select
              value={visitStatus}
              onChange={handleStatus}
              id="country"
              name="country"
              autoComplete="country-name"
              className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            >
              <option>Užregistruotas</option>
              <option>Patvirtintas</option>
              <option>Atšauktas</option>
              <option>Įvykęs</option>
            </select>
          </div>
        </div>
        <div className="relative flex items-start mt-5">
          <div className="flex items-center h-5">
            <input
              id="comments"
              aria-describedby="comments-description"
              name="comments"
              type="checkbox"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="comments" className="font-medium text-gray-700">
              Siųsti SMS vaistų priminimus
            </label>
          </div>
        </div>
        {visitStatus === "Įvykęs" ? (
          <div>
            <AddMedicine />
            <AddLabTests />
          </div>
        ) : null}
      </div>

      {!doctorMode ? (
        <div className="flex justify-center py-10">
          <button
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Atšaukti vizitą
          </button>
        </div>
      ) : (
        <div className="flex justify-center py-10">
          <button
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Išsaugoti
          </button>
        </div>
      )}
    </div>
  );
}
