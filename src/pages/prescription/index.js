import Header from "../../components/Header";
import PrescriptionTable from "../../components/PrescriptionTable";
import { fetchJson } from '../../utils/HttpUtils';


function Prescription(props) {
  return (
    <div>
      <Header />
      <main className="max-w-screen-md mx-auto py-10">
        <PrescriptionTable prescription={props.prescription} />
      </main>
    </div>
  );
}

export default Prescription;

export async function getServerSideProps() {

  const id = process.env.NEXT_PUBLIC_USER_ID;

  const prescription = await fetchJson(`/Recipe/get/byPatientId?patientid=${id}`);


  return { props: { prescription } };
}