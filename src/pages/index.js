import Head from "next/head";
import Header from "../components/Header";
import VisitTable from "../components/VisitTable";

export default function Home() {
  return (
    <div>
      <Head>
        <title>DigiHealth</title>
      </Head>

      <Header />

      <main className="max-w-screen-md mx-auto py-10">
        <VisitTable />
      </main>
    </div>
  );
}
