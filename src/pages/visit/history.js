import Header from "../../components/Header";

import { fetchJson } from '../../utils/HttpUtils';
import HealthRecordTable from '../../components/PatientRecordsTable';

function Visit(props) {
  return (
    <div>
      <Header />
      <main className="max-w-screen-md mx-auto py-10">
        <HealthRecordTable records={props.records}/>
      </main>
    </div>
  );
}

export default Visit;

export async function getServerSideProps({}) {

  const id = process.env.NEXT_PUBLIC_USER_ID;
  const records = await fetchJson(`/HealthRecord/get/byPatient?patientId=${id}`);
  return { props: { records } };
}