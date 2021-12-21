import Header from '../../components/Header';
import VisitForm from '../../components/VisitForm';
import { formatVisitForDisplay } from '../../utils/VisitUtils';
import { fetchJson } from '../../utils/HttpUtils';

function Visit(props) {
  return (
    <div>
      <Header />

      <main className="max-w-screen-md mx-auto py-10">
        <VisitForm visit={props.visit} medicine={props.medicine} />
      </main>
    </div>
  );
}

export default Visit;

export async function getServerSideProps({ query }) {
  const visitId = query.vid;

  const result = await fetchJson(`/Visit/get?visitId=${visitId}`);
  const visit = await formatVisitForDisplay(result).then((x) => {
    return x;
  });
  const medicine = await fetchJson('/Recipe/get/selectableMedicaments');

  return { props: { visit, medicine } };
}
