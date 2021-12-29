import Header from "../../components/Header";
import HealthRecordForm from "../../components/HealthRecordForm";

function HealthRecord() {
  return (
    <div>
      <Header />
      <main className="max-w-screen-md mx-auto py-10">
        <HealthRecordForm />
      </main>
    </div>
  );
}

export default HealthRecord;
