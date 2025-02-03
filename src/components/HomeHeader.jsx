import { useNavigate } from "react-router-dom";

export default function HomeHeader({ title, className = "" }) {
  const navigate = useNavigate();
  const profilePicture = localStorage.getItem("profilePicture"); // Retrieve the uploaded profile picture from localStorage

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
            {profilePicture ? (
              <img
                src={profilePicture}
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