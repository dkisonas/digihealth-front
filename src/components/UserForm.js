import { useRouter } from 'next/router';
import { update } from '../utils/HttpUtils';
import { useState } from 'react';

const doctorMode = process.env.NEXT_PUBLIC_VIEW_MODE === 'doctor' ? true : false;
const workerMode = process.env.NEXT_PUBLIC_VIEW_MODE === 'worker' ? true : false;


export default function UserForm(props) {

    const router = useRouter();
    const [user, setUser] = useState(props.user);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);

    async function updateUserInfo() {
        let newUser;

        if (doctorMode) {
            newUser = {
                id: user.id,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                birthday: user.birthday,
                doctorType: user.doctorType
            }
        } else {
            newUser = {
                id: user.id,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                birthday: user.birthday
            }
        }

        if (JSON.stringify(user) == JSON.stringify(newUser)) {
            router.push('/');
        }

        if (doctorMode) {
            update(`/Doctor/update`, newUser);
        } else if (workerMode) {
            update(`/LabWorker/update/worker`, newUser);
        } else {
            update(`/Patient/update`, newUser);
        }

        router.push('/');
    }


    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const handleSecondName = (e) => {
        setLastName(e.target.value);
    };

    const handlePhone = (e) => {
        setPhone(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div>
            <div style={{ paddingBottom: 25 }}>
                <h3 className="text-lg leading-6 font-medium text-gray-900" >
                    Vartotojo informacija
                </h3>
            </div>
            <p className="mt-2 text-sm text-gray-500" style={{ paddingBottom: 5 }}>
                Vardas
            </p>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                    id="name"
                    name="name"
                    rows={1}
                    disabled={true}
                    style={{ resize: 'none' }}
                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                    value={firstName}
                    onChange={handleFirstName}
                />
            </div>
            <p className="mt-2 text-sm text-gray-500" style={{ paddingBottom: 5 }}>
                Pavardė
            </p>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                    id="secondName"
                    name="secondName"
                    rows={1}
                    style={{ resize: 'none' }}
                    disabled={true}
                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                    value={lastName}
                    onChange={handleSecondName}
                />
            </div>
            <p className="mt-2 text-sm text-gray-500" style={{ paddingBottom: 5 }}>
                Telefonas
            </p>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                    id="phone"
                    name="phone"
                    rows={1}
                    style={{ resize: 'none' }}
                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                    value={phone}
                    onChange={handlePhone}
                />
            </div>
            <p className="mt-2 text-sm text-gray-500" style={{ paddingBottom: 5 }}>
                El. paštas
            </p>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                    id="email"
                    name="email"
                    rows={1}
                    style={{ resize: 'none' }}
                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                    value={email}
                    onChange={handleEmail}
                />
            </div>
            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={updateUserInfo}
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
            </div>
        </div>
    );
}
