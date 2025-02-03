import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import FormInput from "../../components/FormInput";
import SubmitButton from "../../components/SubmitButton";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleBack = () => navigate("/");
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!fullName || !email) {
      alert("Nama lengkap dan email harus diisi.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/email/verification",
        {
          user: {
            Id: 0,
            full_name: fullName,
            email: email,
            password: "",
            phone_number: "",
            picture: "",
            address: "",
            pin_point: "",
          },
        }
      );

      const verificationCode = response.data.payload.uniqueCode;
      localStorage.setItem("verificationCode", verificationCode);

      console.log(response, verificationCode);

      navigate("/verify");
    } catch (error) {
      console.error("Error verifying email:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  return (
    <Card>
      <BackButton onClick={handleBack} />
      <div className="flex justify-center mb-6">
        <img src="/logo.png" alt="Profile" className="w-24 h-24" />
      </div>
      <Header title="Daftar" subtitle="Daftarkan diri anda ke OneIoT" />
      <form onSubmit={handleRegister}>
        <FormInput
          label="Nama Lengkap"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <SubmitButton>Verifikasi Email</SubmitButton>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Sudah memiliki akun?{" "}
        <a
          onClick={() => navigate("/login")}
          href="#"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Login
        </a>
      </p>
    </Card>
  );
}
