import Header from "../../components/Header";
import VisitTable from "../../components/VisitTable";

function Visit() {
  return (
    <div>
      <Header />

      <main className="max-w-screen-md mx-auto py-10">
        <VisitTable />
      </main>
    </div>
  );
}

export default Visit;
