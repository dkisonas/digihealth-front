import Header from "../components/Header";
import PatientTable from "../components/PatientTable";

function Patients() {
  return (
    <div>
      <Header />

      <main className="max-w-screen-md mx-auto py-10">
        <PatientTable />
      </main>
    </div>
  );
}

export default Patients;
