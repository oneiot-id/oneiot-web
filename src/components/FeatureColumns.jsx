import { useNavigate } from "react-router-dom";

export default function FeatureColumns() {
  const navigate = useNavigate();

  const features = [
    {
      title: "IoT",
      icon: <img src="/iot2-icon.png" className="w-9 h-9" alt="IoT icon" />,
      bgColor: "bg-[#005DD6]",
      product: "Internet of Things",
    },
    {
      title: "AI & ML",
      icon: <img src="/ai-ml-icon.png" className="w-9 h-9" alt="AI/ML icon" />,
      bgColor: "bg-[#553DE7]",
      product: "AI/Machine Learning",
    },
    {
      title: "Robotic",
      icon: (
        <img src="/robot-icon.png" className="w-10 h-10" alt="Robot icon" />
      ),
      bgColor: "bg-[#1BBE5B]",
      product: "Robotic",
    },
    {
      title: "Mechatronics",
      icon: (
        <img
          src="/mechatronics-icon.png"
          className="w-10 h-10"
          alt="Mechatronics icon"
        />
      ),
      bgColor: "bg-[#E51825]",
      product: "Mechatronics",
    },
    {
      title: "Web Development",
      icon: (
        <img
          src="/iot-icon.png"
          className="w-9 h-9"
          alt="Web Development icon"
        />
      ),
      bgColor: "bg-[#E93DD2]",
      product: "Web Development",
    },
  ];

  const handleFeatureClick = (product) => {
    navigate("/order", { state: { product } });
  };

  return (
    <>
      {/* Jasa dan Layanan Section */}
      <div className="mt-3">
        <h1 className="text-2xl font-bold mb-1">Jasa dan Layanan</h1>
        <div className="flex overflow-x-auto space-x-4 text-center">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              bgColor={feature.bgColor}
              onClick={() => handleFeatureClick(feature.product)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function FeatureCard({ icon, title, bgColor, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center bg-white pt-4 px-3 pb-2 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg focus:outline-none"
    >
      <div
        className={`w-16 h-16 mb-2 flex items-center justify-center ${bgColor} rounded-full transition-colors hover:bg-opacity-80`}
      >
        {icon}
      </div>
      <h2 className="text-sm font-semibold transition-colors hover:text-blue-600">
        {title}
      </h2>
    </button>
  );
}
