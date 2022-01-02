import { useState } from 'react';
import { useRouter } from 'next/router';
import { update } from '../utils/HttpUtils';

const userId = process.env.NEXT_PUBLIC_USER_ID;
const workerMode = process.env.NEXT_PUBLIC_VIEW_MODE === 'worker' ? true : false;
const patientMode = process.env.NEXT_PUBLIC_VIEW_MODE === 'patient' ? true : false;
const doctorMode = process.env.NEXT_PUBLIC_VIEW_MODE === 'doctor' ? true:  false;

export default function LabTestForm(props) {
    const router = useRouter();
    const [labTest, setLabTest] = useState(props.labTest.labTest);
    const [testResult, setTestResult] = useState(labTest.result);
    const [testStatus, setTestStatus] = useState(labTest.status);

    const handleResultForTest = (e) => {
        setTestResult(e.target.value);
    };

    const handleTestStatus = (e) => {
        setTestStatus(e.target.value);
    };

    async function Update() {

        const newTest = {
            id: labTest.id,
            description: labTest.description,
            result: testResult,
            status: testStatus,
            labWorkerId: userId
        };

        await update(`/LabWorker/update/labTest`, newTest);
        router.push('/');
    }

    const goBack = () => {
        router.push('/');
    };

    return (
        <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
                Tyrimo informacija
            </h3>
            <div className="py-4 sm:py-5 sm:gnrid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500 mb-5">
                    {' '}
                    Tyrimo aprašymas
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {labTest.description}
                </dd>
            </div>
            <div className="py-4 sm:py-5 sm:gnrid sm:grid-cols-3 sm:gap-4 mt-5">
                <dt className="text-sm font-medium text-gray-500 mb-5">
                    {' '}
                    Rezultatai
                </dt>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <textarea
                        id="secondName"
                        name="secondName"
                        rows={5}
                        style={{ resize: 'none' }}
                        className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                        value={testResult}
                        disabled={!workerMode}
                        onChange={handleResultForTest}
                    />
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                {workerMode ? (
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                            Statusas
                        </label>
                        <select
                            defaultValue={labTest.status}
                            onChange={handleTestStatus}
                            id="country"
                            className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        >
                            <option>Laukiamas</option>
                            <option>Įvykdytas</option>
                        </select>
                    </div>) : null}
                {workerMode ? (<div className="mt-1 sm:mt-0 sm:col-span-2">
                    <select
                        defaultValue={labTest.status}
                        onChange={handleTestStatus}
                        id="country"
                        className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    >
                        <option>Laukiamas</option>
                        <option>Įvykdytas</option>
                    </select>
                </div>) : null}
            </div>
            {workerMode ? (<div className="pt-5">
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={Update}
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Išsaugoti
                    </button>
                    <p style={{ paddingRight: 5 }}>
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Atšaukti
                    </button>
                </div>
            </div>) : null}
            {patientMode || doctorMode ? (
                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={goBack}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Atgal
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
