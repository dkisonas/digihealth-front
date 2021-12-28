import Header from '../../components/Header';
import PatientTable from '../../components/PatientTable';
import { fetchJson } from '../../utils/HttpUtils';

function Patients(patients) {
  return (
    <div>
      <Header />

      <main className="max-w-screen-md mx-auto py-10">
        <PatientTable patients={patients} />
      </main>
    </div>
  );
}

export default Patients;

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getServerSideProps() {
  const userId = process.env.NEXT_PUBLIC_USER_ID;
  const patients = await fetchJson(`/Patient/get/byDoctor?id=${userId}`);
  return { props: { patients } };
}
