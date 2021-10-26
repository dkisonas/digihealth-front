import Head from "next/head";
import Header from "../components/Header";
import TableSelectableRows from "../components/TableSelectableRows";

export default function Home() {
  return (
    <div>
      <Head>
        <title>DigiHealth</title>
      </Head>

      <Header />

      <main className="max-w-screen-lg mx-auto">
        <TableSelectableRows />
      </main>
    </div>
  );
}
