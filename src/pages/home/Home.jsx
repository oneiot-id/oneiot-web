import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HomeHeader from "../../components/HomeHeader";
import Hero from "../../components/Hero";
import Product from "../../components/Product";
import FeatureColumns from "../../components/FeatureColumns";
import BottomNav from "../../components/BottomNav";
import axios from "axios";

export default function Home() {
  const [activeItem, setActiveItem] = useState("beranda");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");
        console.log('Getting user', [email, password]);
        

        if (!email || !password) {
          return;
        }

        const requestBody = { user: { email: email, password: password } };

        const response = await axios.post(
          "http://localhost:8000/api/user",
          requestBody
        );

        console.log(response.data);

        if (response.status === 200) {
          const pictureUrl = response.data.data.picture?.replace(
            "127.0.0.1:8080",
            ""
          );

          console.log(pictureUrl);
          
          setUserData({ ...response.data.data, picture: pictureUrl });
        } else {
          console.error("Failed to fetching user data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // userData.picture && console.log(userData.picture);

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    console.log(`${itemId} clicked`);

    switch (itemId) {
      case "beranda":
        navigate("/home");
        break;
      case "order":
        navigate("/order");
        break;
      case "transaksi":
        navigate("/transaction");
        break;
      case "notifikasi":
        navigate("/notification");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <HomeHeader
        title="Beranda"
        picture={`http://localhost:8000${userData?.picture}`}
      />
      <div className="container mx-auto p-2">
        <Hero />
        <FeatureColumns />
        <div className="pb-20">
          <Product />
          <BottomNav activeItem={activeItem} onItemClick={handleItemClick} />
        </div>
      </div>
    </>
  );
}
