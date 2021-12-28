import Header from '../../components/Header';
import VisitForm from '../../components/VisitForm';
import { formatVisitForDisplay } from '../../utils/VisitUtils';
import { fetchJson } from '../../utils/HttpUtils';

function Visit(props) {
  return (
    <div>
      <Header />

      <main className="max-w-screen-md mx-auto py-10">
        <VisitForm
          visit={props.visit}
          medicine={props.medicine}
          record={props.record}
        />
      </main>
    </div>
  );
}

export default Visit;

export async function getServerSideProps({ query }) {
  const visitId = query.vid;
  const selectableMedicine = await fetchJson('/Recipe/get/selectableMedicaments');
  const result = await fetchJson(`/Visit/get?visitId=${visitId}`);
  const visit = await formatVisitForDisplay(result).then((x) => {
    return x;
  });

  if (visit.status === "Įvykęs") {
    let record = await fetchJson(`/HealthRecord/get/byVisit?visitId=${visitId}`);
    const labTest = await fetchJson(`/LabWorker/get/labTest/byHealthRecordId?healthRecordId=${record[0].id}`);
    record[0].labTests = labTest;
    return { props: { visit, selectableMedicine, record } }
  }
  return { props: { visit, selectableMedicine } };
}
