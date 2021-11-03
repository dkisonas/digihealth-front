import Header from "../components/Header";
import PatientForm from "../components/PatientForm";

function Patient() {
  return (
    <div>
      <Header />

      <main className="max-w-screen-md mx-auto py-10">
        <PatientForm />
      </main>
    </div>
  );
}

export default Patient;
