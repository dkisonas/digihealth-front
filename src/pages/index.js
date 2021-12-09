import Head from 'next/head';
import Header from '../components/Header';
import VisitTable from '../components/VisitTable';
import { formatVisits } from '../utils/VisitUtils';
import { fetchJson } from '../utils/HttpUtils';

export default function Home(visits) {
  return (
    <div>
      <Head>
        <title>DigiHealth</title>
      </Head>

      <Header />

      <main className="max-w-screen-md mx-auto py-10">
        <VisitTable visits={visits} />
      </main>
    </div>
  );
}

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getServerSideProps() {
  const userId = process.env.NEXT_PUBLIC_USER_ID;
  const viewMode = process.env.NEXT_PUBLIC_VIEW_MODE;

  let visits;

  if (viewMode === 'patient') {
    const result = await fetchJson(
      `/Visit/get/activePatientVisits?patientId=${userId}`
    );
    visits = await formatVisits(result).then((x) => {
      return x;
    });
  } else if (viewMode === 'doctor') {
    const result = await fetchJson(
      `/Visit/getAllByDoctorIdAndActiveStatus?doctorId=${userId}`
    );
    visits = await formatVisits(result).then((x) => {
      return x;
    });
  }
  return { props: { visits } };
}
