import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import SubmitButton from "../../components/SubmitButton";

export default function NumberVerificationPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
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

  const handleBack = () => {
    navigate("/phonenumber");
  };

  const handleCodeChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5)
      document.getElementById(`code-input-${index + 1}`).focus();
  };

  const handleResend = () => {
    setTimer(60);
    setIsResendDisabled(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/profilepicture");
  };

  return (
    <Card>
      <BackButton onClick={handleBack} />
      <Header
        title="Masukkan Kode"
        subtitle={
          <>
            Kode verifikasi telah dikirimkan ke nomor WA{" "}
            <span className="font-semibold">+62812239813</span>. Bukan nomor
            Anda?{" "}
            <button className="text-blue-500 hover:underline">Ubah</button>
          </>
        }
      />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center space-x-2">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              maxLength={1}
              className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        <SubmitButton>Verifikasi</SubmitButton>
      </form>
      <p className="text-center mt-6">
        Tidak menerima kode?{" "}
        <button
          onClick={handleResend}
          disabled={isResendDisabled}
          className={`text-blue-500 ${
            isResendDisabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:underline"
          }`}
        >
          Kirim ulang ({timer}s)
        </button>
      </p>
    </Card>
  );
}
