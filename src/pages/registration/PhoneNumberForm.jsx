import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import SubmitButton from "../../components/SubmitButton";

export default function PhoneNumberForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/biodata");
  };

  const handleSubmit = () => {
    let formattedNumber = phoneNumber;

    if (phoneNumber && !formattedNumber.startsWith("62") && !formattedNumber.startsWith("0")) {
      formattedNumber = `62${formattedNumber}`;
    }

    localStorage.setItem("phoneNumber", formattedNumber);
    navigate("/numberverification");
  };

  return (
    <Card>
      <BackButton onClick={handleBack} />
      <Header
        title="Isi Data"
        subtitle="Lanjutkan pengisian data untuk pendaftaran akun ke OneIoT Link"
      />
      <form onSubmit={handleSubmit}>
        <div className="mb-4 mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Nomor Whatsapp
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img
                src="https://flagcdn.com/id.svg"
                alt="Indonesia Flag"
                className="h-5 w-5 rounded-full shadow-md"
              />
              <span className="ml-2 text-gray-700">+62</span>
            </div>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="block w-full pl-20 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <SubmitButton>Lanjutkan</SubmitButton>
      </form>
    </Card>
  );
}
