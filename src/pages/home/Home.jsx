import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeHeader from "../../components/HomeHeader";
import Hero from "../../components/Hero";
import Product from "../../components/Product"
import FeatureColumns from "../../components/FeatureColumns";
import BottomNav from "../../components/BottomNav"


export default function Home() {
  const [activeItem, setActiveItem] = useState("beranda");
  const navigate = useNavigate();

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
      <HomeHeader title="Beranda" />
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
