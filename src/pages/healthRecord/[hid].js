import Header from '../../components/Header';
import { fetchJson } from '../../utils/HttpUtils';
import HealthRecordForm from '../../components/HealthRecordForm';

function HealthRecord(props) {
    return (
        <div>
            <Header />
            <main className="max-w-screen-md mx-auto py-10">
                <HealthRecordForm
                    selectableMedicine={props.selectableMedicine}
                    record={props.record}
                    visit={props.visit}
                    patient={props.patient}
                />
            </main>
        </div>
    );
}

export default HealthRecord;

export async function getServerSideProps({ query }) {
    const healthRecordId = query.hid;
    const selectableMedicine = await fetchJson('/Recipe/get/selectableMedicaments');
    let record = await fetchJson(`/HealthRecord/get/?healthRecordId=${healthRecordId}`);

    const visit = await fetchJson(`/Visit/getVisitByHealthRecordId?healthRecordId=${healthRecordId}`);
    const patient = await fetchJson(`/Patient/get?id=${record.patientId}`);

    if (record !== undefined) {
        record.labTests = await fetchJson(`/LabWorker/get/labTest/byHealthRecordId?healthRecordId=${record.id}`);
        record.prescriptions = await fetchJson(`/Recipe/get/byHealthRecordId?healthRecordId=${record.id}`);
    }
    return { props: { record, selectableMedicine, visit, patient } };
}
