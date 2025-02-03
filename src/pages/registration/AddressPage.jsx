import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Header from "../../components/Header";
import FormInput from "../../components/FormInput";
import SubmitButton from "../../components/SubmitButton";
import MapComponent from "../../components/MapComponent";
import BackButton from "../../components/BackButton";

export default function AddressPage() {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: -6.2088, lng: 106.8456 });
  const navigate = useNavigate();

  const handleLocationSelect = (lat, lng) => setLocation({ lat, lng });
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/registrationdone");
  };
  const handleBack = () => navigate('/profilepicture')

  return (
    <Card>
      <BackButton onClick={handleBack}/>
      <Header
        title="Isi Alamat Anda"
        subtitle="Gunakan alamat Anda sekarang untuk pengiriman produk atau alat."
      />
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Alamat Lengkap"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Masukkan alamat lengkap Anda"
        />
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pinpoint Lokasi Anda
          </label>
          <MapComponent onLocationSelect={handleLocationSelect} />
        </div>
        <SubmitButton>Lanjutkan</SubmitButton>
      </form>
    </Card>
  );
}
