import Header from "../../components/Header";
import VisitForm from "../../components/VisitForm";

function Visit() {
  return (
    <div>
      <Header />

      <main className="max-w-screen-md mx-auto py-10">
        <VisitForm />
      </main>
    </div>
  );
}

export default Visit;
