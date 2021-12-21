import Header from "../components/Header";
import UserForm from "../components/UserForm";
import { fetchJson } from "../utils/HttpUtils";


function User(props) {
    return (
        <div>
            <Header />
            <main className="max-w-screen-md mx-auto py-10">
                <UserForm user={props.res} />
            </main>
        </div>
    );
}

export default User;

export async function getServerSideProps() {
    let res = null;
    const id = process.env.NEXT_PUBLIC_USER_ID;
    const isItDoctor = process.env.NEXT_PUBLIC_VIEW_MODE === 'doctor' ? true : false;
    const isItWorker = process.env.NEXT_PUBLIC_VIEW_MODE === 'worker' ? true : false;

    if (isItDoctor) {
        res = await fetchJson(`/Doctor/get?doctorId=${id}`);
    } else if(isItWorker) {
        res = await fetchJson(`/LabWorker/get/worker/byId?workerId=${id}`);
    } else {
        res = await fetchJson(`/Patient/get?id=${id}`);
    }
    return { props: { res } }
}
