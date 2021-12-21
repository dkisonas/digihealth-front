import Header from "../../components/Header";
import PrescriptionForm from "../../components/PrescriptionForm";
import { fetchJson } from '../../utils/HttpUtils';


function Prescription(props) {
  return (
    <div>
      <Header />
      <main className="max-w-screen-md mx-auto py-10">
        <PrescriptionForm prescription={props.prescription} />
      </main>
    </div>
  );
}

export default Prescription;

export async function getServerSideProps({ query }) {

  const recipeId = query.pid;
  const prescription = await fetchJson(`/Recipe/get/byId?recipeId=${recipeId}`);
  return { props: { prescription } };
}