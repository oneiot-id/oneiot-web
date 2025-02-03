import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Header from "../../components/Header";
import SubmitButton from "../../components/SubmitButton";

export default function SuccessRegistrationPage() {
  const navigate = useNavigate();

  const handleFinish = () => navigate("/home");

  return (
    <Card>
      <Header
        title="Pengisian Data Diri Selesai"
        subtitle="Sekarang Anda dapat menggunakan fitur secara penuh."
      />
      <div className="flex justify-center mb-6 animate-fade-in">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          fill="currentColor"
          className="bi bi-check2-circle text-green-500"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
          <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
        </svg>
      </div>
      <SubmitButton onClick={handleFinish}>Selesai</SubmitButton>
    </Card>
  );
}
