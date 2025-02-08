import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Header from "../../components/Header";
import FormInput from "../../components/FormInput";
import SubmitButton from "../../components/SubmitButton";
import MapComponent from "../../components/MapComponent";
import BackButton from "../../components/BackButton";
import axios from "axios";

export default function AddressPage() {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: -6.2088, lng: 106.8456 });
  const navigate = useNavigate();

  const handleLocationSelect = (lat, lng) => setLocation({ lat, lng });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        user: {
          Id: 0,
          full_name: localStorage.getItem("fullName"),
          email: localStorage.getItem("email"),
          password: localStorage.getItem("password"),
          phone_number: localStorage.getItem("phoneNumber"),
          picture: "",
          address: address,
          pin_point: JSON.stringify(location),
        },
      };

      const registerResponse = await axios.post(
        "http://localhost:8000/api/register",
        userData
      );

      if (registerResponse.status !== 201) {
        throw new Error("Registrasi gagal.");
      }

      console.log("Registering done successfully:", registerResponse.data);

      const userId = registerResponse.data.data.id;

      // Convert Base64 string to a File
      const base64String = localStorage.getItem("profilePicture");
      if (!base64String) {
        alert("Foto profil belum dipilih.");
        return;
      }

      const blob = await fetch(base64String).then((res) => res.blob()); // Convert Base64 to Blob
      const file = new File([blob], `user_${userId}_profile.jpg`, {
        type: blob.type,
      });

      console.log(file);

      const formData = new FormData();
      formData.append("image_data", file);
      formData.append("user_email", localStorage.getItem("email"));
      formData.append("user_password", localStorage.getItem("password"));

      console.log(formData);

      const uploadResponse = await axios.post(
        "http://localhost:8000/api/user/upload-image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log(uploadResponse);
      
      if (uploadResponse.status !== 200) {
        throw new Error("Gagal mengunggah foto profil.");
      }

      navigate("/registrationdone");
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  const handleBack = () => navigate("/profilepicture");

  return (
    <Card>
      <BackButton onClick={handleBack} />
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
