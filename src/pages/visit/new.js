import Header from "../../components/Header";
import VisitRegistrationForm from "../../components/VisitRegistrationForm";

function Visit() {
  return (
    <div>
      <Header />

      <main className="max-w-screen-md mx-auto py-10">
        <VisitRegistrationForm />
      </main>
    </div>
  );
}

export default Visit;
