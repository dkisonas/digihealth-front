import Header from "../components/Header";
import PrescriptionTable from "../components/PrescriptionTable";

function Prescriptions() {
  return (
    <div>
      <Header />

      <main className="max-w-screen-md mx-auto py-10">
        <PrescriptionTable />
      </main>
    </div>
  );
}

export default Prescriptions;
