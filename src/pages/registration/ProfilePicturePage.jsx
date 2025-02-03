import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Header from "../../components/Header";
import SubmitButton from "../../components/SubmitButton";
import BackButton from "../../components/BackButton";

export default function ProfilePicturePage() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      localStorage.setItem("profilePicture", imageUrl);
    }
  };

  const handleSubmit = () => {
    profilePicture
      ? navigate("/address")
      : document.getElementById("profile-picture").click();
  };

  const handleSkip = () => navigate("/address");
  const handleBack = () => navigate("/numberverification");

  return (
    <Card>
      <BackButton onClick={handleBack} />
      <Header
        title="Foto Profil"
        subtitle="Kustomisasi foto profil. Anda dapat melewati langkah ini dan menggantinya nanti."
      />
      <div className="flex justify-center mt-20 mb-20">
        <label htmlFor="profile-picture" className="cursor-pointer relative">
          <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <img src="/pp-icon.png" alt="Profile Picture" />
            )}
          </div>
          <div className="absolute bottom-0 right-0 bg-black rounded-full p-2">
            <img src="/pen-icon.png" className="w-8 h-8" />
          </div>
        </label>
        <input
          id="profile-picture"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <SubmitButton onClick={handleSubmit}>
        {profilePicture ? "Lanjutkan" : "Unggah Foto"}
      </SubmitButton>
      <div className="custom-daftar-button mt-4">
        <SubmitButton
          onClick={handleSkip}
          className="bg-white border border-gray-300 shadow-md hover:border-gray-400"
        >
          Lewati
        </SubmitButton>
      </div>
    </Card>
  );
}
