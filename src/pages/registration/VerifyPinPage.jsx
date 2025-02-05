import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import Card from "../../components/Card";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import SubmitButton from "../../components/SubmitButton";

export default function VerifyPinPage() {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setIsResendDisabled(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const fullName = location.state?.fullName || "";
  const email = location.state?.email || "";

  const handleBack = () => {
    navigate("/register");
  };

  const handleVerification = (e) => {
    e.preventDefault();
    const storedCode = localStorage.getItem("verificationCode");

    if (code === storedCode) {
      navigate("/biodata", { state: { fullName, email } });
    } else {
      alert("Kode verifikasi tidak valid.");
    }
  };

  const handleResend = () => {
    setTimer(5);
    setIsResendDisabled(true);
  };

  return (
    <Card>
      <BackButton onClick={handleBack} />
      <div className="flex justify-center mb-6">
        <EnvelopeIcon className="h-20 w-20 text-blue-500" />
      </div>
      <Header
        title="Verifikasi Email"
        subtitle="Kode verifikasi terkirim ke abcd@gmail.com."
      />
      <form onSubmit={handleVerification}>
        <div className="mb-12 flex justify-center">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-48 text-center text-2xl font-bold border-b-2 border-blue-500 focus:outline-none focus:border-blue-700"
            maxLength={6}
          />
        </div>
        <SubmitButton>Verifikasi</SubmitButton>
      </form>
      <p className="text-center mt-6">
        Tidak menerima kode?{" "}
        <button
          onClick={handleResend}
          disabled={isResendDisabled}
          className={`text-blue-500 ${
            isResendDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Kirim ulang ({timer}s)
        </button>
      </p>
    </Card>
  );
}
