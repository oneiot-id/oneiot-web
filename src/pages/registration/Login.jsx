import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import FormInput from "../../components/FormInput";
import SubmitButton from "../../components/SubmitButton";
import bcrypt from "bcryptjs";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleBack = () => navigate("/");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const salt = await bcrypt.genSalt();
      // const hashedPassword = await bcrypt.hash(password, salt);

      const requestBody = { user: { email: email, password: password } };

      const response = await axios.post(
        "http://localhost:8000/api/login",
        requestBody
      );

      if (response.status === 200) {
        localStorage.setItem('email', email)
        localStorage.setItem('password', password)
        
        navigate("/home"); 
      } else {
        alert("Login gagal. Silakan cek email dan password Anda.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Card>
      <BackButton onClick={handleBack} />
      <div className="flex justify-center mb-6">
        <img src="/logo.png" alt="Profile" className="w-24 h-24" />
      </div>
      <Header title="Login" subtitle="Masuk untuk menggunakan aplikasi" />
      <form onSubmit={handleLogin}>
        <FormInput
          label="Username atau Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-between mb-6">
          <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
            Lupa kata sandi?
          </a>
        </div>
        <SubmitButton>Login</SubmitButton>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Belum memiliki akun?{" "}
        <a
          onClick={() => navigate("/register")}
          href="#"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Daftar
        </a>
      </p>
    </Card>
  );
}
