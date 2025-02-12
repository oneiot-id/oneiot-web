import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PulseLoader } from "react-spinners";

export default function HomeHeader({ title, className = "" }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");
        // console.log('Getting user', [email, password]);
        

        if (!email || !password) {
          setLoading(false)
          return;
        }

        const requestBody = { user: { email: email, password: password } };

        const response = await axios.post(
          "http://localhost:8000/api/user",
          requestBody
        );

        // console.log(response.data);

        if (response.status === 200) {
          const pictureUrl = response.data.data.picture?.replace(
            "127.0.0.1:8080",
            ""
          );

          // console.log(pictureUrl);
          
          setUserData({ ...response.data.data, picture: pictureUrl });
        } else {
          console.error("Failed to fetching user data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PulseLoader size={20} color="#005FFE" margin={4} speedMultiplier={3}/>
      </div>
    );
  }

  const handleProfileClick = () => {
    navigate("/profile"); // Navigate to the profile page
  };

  return (
    <nav className="pt-4 px-2 flex justify-between items-center">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className={`text-black text-3xl font-bold ${className}`}>
          {title}
        </h1>
        <button onClick={handleProfileClick} className="focus:outline-none">
          <div className="w-12 h-12 rounded-full overflow-hidden border-">
            {userData ? (
              <img
                src={`http://localhost:8000${userData?.picture}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-person-circle text-gray-500"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            )}
          </div>
        </button>
      </div>
    </nav>
  );
}