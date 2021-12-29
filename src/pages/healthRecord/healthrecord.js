import Header from '../../components/Header';
import HealthRecordTable from '../../components/VisitForm';
import { formatVisitForDisplay } from '../../utils/VisitUtils';
import { fetchJson } from '../../utils/HttpUtils';

function HealthRecord(props) {
  return (
    <div>
      <Header />
      <main className="max-w-screen-md mx-auto py-10">
        <HealthRecordTable records={props.records} />
      </main>
    </div>
  );
}

export default HealthRecord;

export async function getServerSideProps({}) {
    const id = process.env.NEXT_PUBLIC_USER_ID;
    const records = await fetchJson(`/HealthRecord/get/byPatient?patientId=${id}`);
    return { props: { records } };
}
