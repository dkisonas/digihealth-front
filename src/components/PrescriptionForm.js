import { useState } from 'react';
import AddMedicine from './AddMedicine';
import moment from 'moment';
import { Router, useRouter } from 'next/router';
import { update } from '../utils/HttpUtils';

const doctorMode = process.env.NEXT_PUBLIC_VIEW_MODE === 'doctor' ? true : false;

export default function PrescriptionForm(props) {
    const [medicine] = useState(props.prescription.medicaments);
    const [usingTimes] = useState(props.prescription.usingTimes);
    const router = useRouter();

    function setTimes(medicamentId) {

        let usingTime = "";
        let validUsingTimes = [];

        usingTimes.forEach(usingTime => {
            if (usingTime.medicamentId == medicamentId) {
                validUsingTimes.push(usingTime);
            }
        });

        validUsingTimes.forEach(validUsingTime => {

            usingTime = usingTime.concat(validUsingTime.time, "; ");
        });

        return usingTime;
    }

    function goBack() {
        router.back();
    }

    return (
        <div>
            <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Recepto informacija
                </h3>
            </div>
            <div className="mt-5 border-t border-gray-200">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Medikamentai</dt>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                >
                                    Medikamento pavadinimas
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                >
                                    Medikamento aprašymas
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                >
                                    Vartojimo laikai
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicine.map((item, id) => (
                                <tr
                                    key={item.id}
                                    className={id % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                >
                                    <td className="px-6 py-4 whitespace-rap text-sm font-medium text-gray-900">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-gray-900">
                                        {item.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-wrap text-right text-sm font-medium">
                                        {setTimes(item.id)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </dl>
            </div>
            <div className="flex justify-center py-10">
                <button
                    type="button"
                    onClick={goBack}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Atgal
                </button>
            </div>
        </div>
    );
}

