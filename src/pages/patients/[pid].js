import Header from '../../components/Header';
import PatientForm from '../../components/PatientForm';
import { fetchJson } from '../../utils/HttpUtils';

function Patient(props) {
  return (
    <div>
      <Header />

      <main className="max-w-screen-md mx-auto py-10">
        <PatientForm patient={props.patient} records={props.records} />
      </main>
    </div>
  );
}

export default Patient;

export async function getServerSideProps({ query }) {
  const patientId = query.pid;
  const patient = await fetchJson(`/Patient/get?id=${patientId}`);
  const records = await fetchJson(
    `/HealthRecord/get/byPatient?patientId=${patientId}`
  );
  return { props: { patient, records } };
}
