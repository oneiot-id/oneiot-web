import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import FormInput from "../../components/FormInput";
import SubmitButton from "../../components/SubmitButton";

export default function BiodataForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVer, setPasswordVer] = useState("");
  const navigate = useNavigate();

  const handleBack = () => navigate("/verify");
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/phonenumber");
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
          <FormInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormInput
            label="Konfirmasi Password"
            type="password"
            value={passwordVer}
            onChange={(e) => setPasswordVer(e.target.value)}
          />
          <SubmitButton>Lanjutkan</SubmitButton>
        </form>
      </Card>
  );
}