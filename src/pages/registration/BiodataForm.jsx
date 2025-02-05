import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../../components/Card";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import FormInput from "../../components/FormInput";
import SubmitButton from "../../components/SubmitButton";
import bcrypt from "bcryptjs";

export default function BiodataForm() {
  const location = useLocation();
  const [fullName, setFullName] = useState(location.state?.fullName || "");
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [passwordVer, setPasswordVer] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordVer, setShowPasswordVer] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => navigate("/verify");

  const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordVer) {
      alert("Password dan Konfirmasi Password harus sama!");
      return;
    }

    try {
      const hashedPassword = await hashPassword(password);
      localStorage.setItem("password", hashedPassword);
      navigate("/phonenumber");
    } catch (error) {
      console.error("Error hashing password:", error);
      alert("Terjadi kesalahan saat memproses password. Silakan coba lagi.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVerVisibility = () => {
    setShowPasswordVer(!showPasswordVer);
  };

  return (
    <Card>
      <BackButton onClick={handleBack} />
      <Header
        title="Isi Data"
        subtitle="Lanjutkan pengisian data untuk pendaftaran akun ke OneIoT Link"
      />
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Nama Lengkap"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <FormInput
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-3 text-gray-500 hover:text-gray-700 w-8 h-8"
          >
            {showPassword ? (
              <img src="hide-pw-icon.png" />
            ) : (
              <img src="show-pw-icon.png" />
            )}
          </button>
        </div>
        <div className="relative">
          <FormInput
            label="Konfirmasi Password"
            type={showPasswordVer ? "text" : "password"}
            value={passwordVer}
            onChange={(e) => setPasswordVer(e.target.value)}
          />
          <button
            type="button"
            onClick={togglePasswordVerVisibility}
            className="absolute top-1/2 right-3 text-gray-500 hover:text-gray-700 w-8 h-8"
          >
            {showPasswordVer ? (
              <img src="/hide-pw-icon.png" />
            ) : (
              <img src="/show-pw-icon.png" />
            )}
          </button>
        </div>
        <SubmitButton>Lanjutkan</SubmitButton>
      </form>
    </Card>
  );
}
