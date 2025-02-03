import { useNavigate } from "react-router-dom";

export default function BottomNav({ activeItem, onItemClick }) {
  const navigate = useNavigate();

  const handleItemClick = (itemId) => {
    onItemClick(itemId); // Update active item state
    switch (itemId) {
      case "beranda":
        navigate("/home"); // Navigate to the Home page
        break;
      case "order":
        navigate("/order"); // Navigate to the Order page
        break;
      case "transaksi":
        navigate("/transaction"); // Navigate to the Transaction page
        break;
      case "notifikasi":
        navigate("/notification"); // Navigate to the Notification page
        break;
      default:
        break;
    }
  };

  const navItems = [
    {
      id: "beranda",
      label: "Beranda",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          className={`w-6 h-6 ${
            activeItem === "beranda"
              ? "text-blue-600 fill-blue-600"
              : "text-gray-500"
          }`}
          viewBox="0 0 18 16"
        >
          <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
        </svg>
      ),
    },
    {
      id: "order",
      label: "Order",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          className={`w-6 h-6 ${
            activeItem === "order"
              ? "text-blue-600 fill-blue-600 stroke-none"
              : "text-gray-500"
          }`}
          viewBox="0 0 18 16"
        >
          <path
            fillRule="evenodd"
            d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z"
          />
        </svg>
      ),
    },
    {
      id: "transaksi",
      label: "Transaksi",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          className={`w-6 h-6 ${
            activeItem === "transaksi"
              ? "text-blue-600 fill-blue-600"
              : "text-gray-500"
          }`}
          viewBox="0 0 18 16"
        >
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
        </svg>
      ),
    },
    {
      id: "notifikasi",
      label: "Notifikasi",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          className={`w-6 h-6 ${
            activeItem === "notifikasi"
              ? "text-blue-600 fill-blue-600"
              : "text-gray-500"
          }`}
          viewBox="0 0 18 16"
        >
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center py-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              className="flex flex-col items-center focus:outline-none"
              onClick={() => handleItemClick(item.id)}
            >
              {item.icon}
              <span
                className={`text-sm ${
                  activeItem === item.id ? "text-blue-600" : "text-gray-700"
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
