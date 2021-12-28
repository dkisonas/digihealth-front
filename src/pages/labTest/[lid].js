import Header from "../../components/Header";
import LabTestForm from "../../components/LabTestForm";
import { fetchJson } from '../../utils/HttpUtils';

function LabTest(props) {
  return (
    <div>
      <Header />
      <main className="max-w-screen-md mx-auto py-10">
        <LabTestForm labTest={props} />
      </main>
    </div>
  );
}

export default LabTest;

export async function getServerSideProps({ query }) {

  const labTestId = query.lid;
  const labTest = await fetchJson(`/LabWorker/get/labTest/byId?labTestId=${labTestId}`);
  return { props: { labTest } };
}