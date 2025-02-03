import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import FormInput from "../../components/FormInput";
import SubmitButton from "../../components/SubmitButton";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleBack = () => navigate("/");
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home");
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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