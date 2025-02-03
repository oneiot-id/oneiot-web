import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import SubmitButton from "../components/SubmitButton";

export default function Welcome() {
  const navigate = useNavigate();

  const handleToLogin = () => navigate("/login");
  const handleToRegister = () => navigate("/register");

  return (
      <Card>
        <div className="flex justify-center">
          <img src="/home.png" alt="Startup Logo" className="w-100 h-100" />
        </div>
        <div className="flex justify-center mt-4 mb-6">
          <img src="/logo_bw.png" alt="Profile" className="h-24" />
        </div>

        <div className="text-justify mt-4">
          <p className="mt-4 text-gray-600">
            OneIoT menyediakan jasa, layanan, dan produk yang berfokus di bidang
            robotika, AI/ML, Internet of Things dan prototyping!
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <SubmitButton onClick={handleToLogin}>Login</SubmitButton>
          <div className="custom-daftar-button">
            <SubmitButton
              onClick={handleToRegister}
              className="bg-white border border-gray-300 shadow-md hover:border-gray-400"
            >
              Daftar
            </SubmitButton>
          </div>
        </div>
      </Card>
  );
}