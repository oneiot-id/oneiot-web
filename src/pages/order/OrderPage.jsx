import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HomeHeader from "../../components/HomeHeader";
import BottomNav from "../../components/BottomNav";
import StepNavigation from "../../components/StepNavigation";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";

export default function OrderPage() {
  const [activeItem, setActiveItem] = useState("order");
  const [step, setStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // User data state
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    additionalNotes: "",
  });

  // Order details state (including briefPoints)
  const [orderDetails, setOrderDetails] = useState({
    serviceName: "",
    product: "",
    deadline: "",
    workSpeed: "",
    briefTemplate: null,
    additionalNotes: "",
    briefPoints: [{ id: 1, text: "", isFocused: false }],
  });

  const orderSteps = [
    { id: 1, label: "Isi Data Diri" },
    { id: 2, label: "Pesan Order" },
    { id: 3, label: "Review" },
    { id: 4, label: "Konfirmasi" },
  ];

  // Handle step navigation
  const handleNextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleCancelOrder = () => {
    setStep(0);
    setOrderDetails({
      serviceName: "",
      product: "",
      deadline: "",
      workSpeed: "",
      briefTemplate: null,
      additionalNotes: "",
      briefPoints: [{ id: 1, text: "", isFocused: false }],
    });
    setUserData({
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      additionalNotes: "",
    });
  };
  const location = useLocation();
  const { product } = location.state || {};

  useEffect(() => {
    if (product) {
      handleProductSelect(product);
    }
  }, [product]);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setOrderDetails((prev) => ({ ...prev, product: product }));
    setStep(1);
  };

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneNumberChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      let number = value;

      if (number.startsWith("+62")) {
        number = number.slice(3);
      } else if (number.startsWith("0")) {
        number = number.slice(1);
      } else if (number.startsWith("62")) {
        number = number.slice(2);
      }

      setUserData((prev) => ({ ...prev, [name]: number }));
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleOrderDetailsChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBriefPoint = () => {
    const newBriefPoint = {
      id: orderDetails.briefPoints.length + 1,
      text: "",
      isFocused: false,
    };
    setOrderDetails((prev) => ({
      ...prev,
      briefPoints: [...prev.briefPoints, newBriefPoint],
    }));
  };

  const handleBriefPointChange = (id, text) => {
    const updatedBriefPoints = orderDetails.briefPoints.map((point) =>
      point.id === id ? { ...point, text } : point
    );
    setOrderDetails((prev) => ({ ...prev, briefPoints: updatedBriefPoints }));
  };

  const handleSaveBriefPoint = (id) => {
    const updatedBriefPoints = orderDetails.briefPoints.map((point) =>
      point.id === id ? { ...point, isFocused: false } : point
    );
    setOrderDetails((prev) => ({ ...prev, briefPoints: updatedBriefPoints }));
  };

  const handleDeleteBriefPoint = (id) => {
    const filteredBriefPoints = orderDetails.briefPoints.filter(
      (point) => point.id !== id
    );
    setOrderDetails((prev) => ({ ...prev, briefPoints: filteredBriefPoints }));
  };

  const handleFocusBriefPoint = (id) => {
    const updatedBriefPoints = orderDetails.briefPoints.map((point) =>
      point.id === id
        ? { ...point, isFocused: true }
        : { ...point, isFocused: false }
    );
    setOrderDetails((prev) => ({ ...prev, briefPoints: updatedBriefPoints }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Order submitted:", { userData, orderDetails });
    alert("Order confirmed!");
  };

  return (
    <>
      <HomeHeader title="Pemesanan" />
      <div className="container mx-auto p-2">
        {step === 0 && (
          <OrderSelection
            onProductSelect={() => setStep(1)}
            orderDetails={orderDetails}
          />
        )}
        {step > 0 && (
          <>
            {/* Step Navigation */}
            {step < 5 && <StepNavigation step={step} steps={orderSteps} />}

            {/* Step Content */}
            <div className="flex justify-center p-1 mb-20">
              <div className="bg-white border border-gray-300 p-7 rounded-lg shadow-md w-full max-w-md">
                {step === 1 && (
                  <OrderPersonalData
                    userData={userData}
                    handleUserDataChange={handleUserDataChange}
                    handlePhoneNumberChange={handlePhoneNumberChange}
                  />
                )}
                {step === 2 && (
                  <OrderDetails
                    orderDetails={orderDetails}
                    handleOrderDetailsChange={handleOrderDetailsChange}
                    handleAddBriefPoint={handleAddBriefPoint}
                    handleBriefPointChange={handleBriefPointChange}
                    handleSaveBriefPoint={handleSaveBriefPoint}
                    handleDeleteBriefPoint={handleDeleteBriefPoint}
                    handleFocusBriefPoint={handleFocusBriefPoint}
                  />
                )}
                {step === 3 && (
                  <OrderReview
                    userData={userData}
                    orderDetails={orderDetails}
                  />
                )}
                {step === 4 && (
                  <OrderConfirmation
                    handleSubmit={handleSubmit}
                    orderDetails={orderDetails}
                    orderConfirmed={orderConfirmed}
                  />
                )}
                {step === 5 && (
                  <OrderSummary
                    orderDetails={orderDetails}
                    userData={userData}
                  />
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  {step >= 1 && step !== 3 && step < 4 && (
                    <button
                      onClick={handlePreviousStep}
                      className="custom-daftar-button font-bold bg-white border border-gray-300 py-2 px-4 rounded-lg hover:border-gray-400 hover:shadow-md"
                    >
                      {step === 1 ? "Batalkan" : "Kembali"}
                    </button>
                  )}
                  {step < 3 && step !== 3 && (
                    <button
                      onClick={handleNextStep}
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                      Lanjutkan
                    </button>
                  )}

                  {step === 4 && (
                    <button
                      onClick={() => setStep(0)}
                      className="custom-daftar-button font-bold bg-white border border-gray-300 py-2 px-4 rounded-lg hover:border-gray-400 hover:shadow-md"
                    >
                      Kembali
                    </button>
                  )}

                  {/* Step 3 Buttons */}
                  {step === 3 && (
                    <>
                      <button
                        onClick={() => {
                          setStep(1); // Go back to the previous step for editing
                        }}
                        className="custom-daftar-button font-bold bg-white border border-gray-300 py-2 px-4 rounded-lg hover:border-gray-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      >
                        Ubah
                      </button>
                      <button
                        onClick={() => {
                          handleNextStep();
                        }}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Simpan & Order
                      </button>
                    </>
                  )}

                  {/* Step 4 Buttons */}
                  {step === 4 && (
                    <>
                      {orderConfirmed ? (
                        <button
                          onClick={() => {
                            handleNextStep();
                          }}
                          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          Lihat Transaksi
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            handleCancelOrder();
                          }}
                          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Batalkan Order
                        </button>
                      )}
                    </>
                  )}
                  {/* Step 5 Buttons */}
                  {step === 5 && (
                    <button
                      onClick={() => {
                        handleNextStep();
                      }}
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Lihat Transaksi
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <BottomNav activeItem={activeItem} onItemClick={setActiveItem} />
    </>
  );
}

function OrderSelection({ onProductSelect, orderDetails }) {
  const reviews = [
    {
      name: "Erlangga Satrya",
      time: "1 bulan",
      text: "WOII GESS 🔥🔥 ini sih bukan kaleng-kaleng, full power MAXIMUM OVERDRIVE!!! 🚀💨 Skibidi dop dop dop yes yes, AUTO S++ RANK 🏆💯!! Mata gw sampe kegeser liat keindahan ini, GGWP no debat!!! 😵✨",
      rating: 4.5,
    },
    {
      name: "Billie E.",
      time: "3 bulan",
      text: "Wah, pengiriman cepat banget ke Nganjuk! 😍 Sampai-sampai aku udah tua duluan nungguin. Internet di Mars aja mungkin lebih stabil daripada update tracking-nya. Tapi ya sudahlah, yang penting paketnya akhirnya sampai... dengan penuh drama dan ketegangan. 📦✨",
      rating: 3,
    },
  ];

  const productIcons = {
    "Internet of Things": {
      icon: <img src="/iot2-icon.png" className="w-9 h-9" alt="IoT icon" />,
      bgColor: "bg-[#005DD6]",
    },
    "AI/Machine Learning": {
      icon: <img src="/ai-ml-icon.png" className="w-9 h-9" alt="AI/ML icon" />,
      bgColor: "bg-[#553DE7]",
    },
    Robotic: {
      icon: (
        <img src="/robot-icon.png" className="w-10 h-10" alt="Robot icon" />
      ),
      bgColor: "bg-[#1BBE5B]",
    },
    Mechatronics: {
      icon: (
        <img
          src="/mechatronics-icon.png"
          className="w-10 h-10"
          alt="Mechatronics icon"
        />
      ),
      bgColor: "bg-[#E51825]",
    },
    "Web Development": {
      icon: (
        <img
          src="/iot-icon.png"
          className="w-9 h-9"
          alt="Web Development icon"
        />
      ),
      bgColor: "bg-[#E93DD2]",
    },
  };

  return (
    <div className="flex flex-col p-3 pt-0 mb-20">
      <p className="text-xl mb-4">Buat Pemesanan Baru</p>
      <div className="flex overflow-x-auto space-x-2 text-center">
        <button
          onClick={onProductSelect}
          className="flex flex-col items-center justify-center w-32 h-32 border border-gray-400 rounded-2xl shadow-md"
        >
          <img src="add-order.png" className="w-10 h-10" alt="Add Order" />
          <span className="mt-2 text-sm font-bold text-black">Pesan</span>
        </button>
        {orderDetails.product && (
          <div className="flex flex-col justify-center items-center bg-white w-32 h-32">
            <div
              className={`w-16 h-16 mb-2 flex items-center justify-center ${
                productIcons[orderDetails.product].bgColor
              } rounded-full`}
            >
              {productIcons[orderDetails.product].icon}
            </div>
            <h2 className="text-sm font-bold">{orderDetails.product}</h2>
          </div>
        )}
      </div>

      {orderDetails.serviceName && (
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold mb-4">Pesanan Aktif</h2>
          <div className="bg-white border border-gray-300 px-4 pt-3 pb-2 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">
              {orderDetails.serviceName}
              <span className="text-sm text-[#FBB214] absolute right-12 pt-3">
                Menunggu
              </span>
            </h3>
            <p className="text-sm text-gray-600">09:58 27/01/2025</p>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mt-8">Apa Kata Orang?</h2>
      <div className="mt-4 space-y-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="p-4 bg-white border border-gray-300 rounded-lg shadow"
          >
            <p className="font-semibold">
              {review.name}{" "}
              <span className="text-sm text-gray-500 absolute right-12">
                {review.time}
              </span>
            </p>
            <p className="mt-2">{review.text}</p>
            <p className="mt-2 text-yellow-500">
              {"⭐".repeat(Math.round(review.rating))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderPersonalData({
  userData,
  handleUserDataChange,
  handlePhoneNumberChange,
}) {
  return (
    <>
      <h1 className="text-2xl text-center font-bold mb-2">Isi Data Diri</h1>
      <p className="text-gray-800">
        Pastikan data yang tertera sesuai dengan kondisi yang sebenarnya.
      </p>

      <InputField
        label="Nama Lengkap"
        name="fullName"
        value={userData.fullName}
        onChange={handleUserDataChange}
      />

      <InputField
        label="Email"
        type="email"
        name="email"
        value={userData.email}
        onChange={handleUserDataChange}
      />

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nomor WhatsApp
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
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handlePhoneNumberChange}
            className="block w-full pl-20 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <InputField
        label="Alamat Lengkap"
        type="textarea"
        name="address"
        value={userData.address}
        onChange={handleUserDataChange}
        rows={3}
      />

      <InputField
        label="Catatan Tambahan Data Diri"
        type="textarea"
        name="additionalNotes"
        value={userData.additionalNotes}
        onChange={handleUserDataChange}
        rows={3}
      />
    </>
  );
}

function OrderDetails({
  orderDetails,
  handleOrderDetailsChange,
  handleAddBriefPoint,
  handleBriefPointChange,
  handleSaveBriefPoint,
  handleDeleteBriefPoint,
  handleFocusBriefPoint,
}) {
  const productOptions = [
    { value: "", label: "Pilih Produk/Layanan" },
    { value: "Internet of Things", label: "Internet of Things" },
    { value: "Robotic", label: "Robotic" },
    { value: "AI/Machine Learning", label: "AI/Machine Learning" },
    { value: "Mechatronics", label: "Mechatronics" },
    { value: "Web Development", label: "Web Development" },
  ];

  const workSpeedOptions = [
    { value: "Reguler", label: "Reguler" },
    { value: "Express", label: "Express" },
    { value: "FS", label: "FS" },
  ];

  return (
    <>
      <h1 className="text-2xl text-center font-bold mb-6">Data Order</h1>

      <InputField
        label="Nama Pemesanan Jasa/Layanan"
        name="serviceName"
        value={orderDetails.serviceName}
        onChange={handleOrderDetailsChange}
      />

      <SelectField
        label="Pilih Produk/Layanan"
        name="product"
        value={orderDetails.product}
        onChange={handleOrderDetailsChange}
        options={productOptions}
      />

      <InputField
        label="Tanggal Deadline / Jatuh Tempo"
        type="date"
        name="deadline"
        value={orderDetails.deadline}
        onChange={handleOrderDetailsChange}
      />

      <SelectField
        label="Kecepatan Pengerjaan"
        name="workSpeed"
        value={orderDetails.workSpeed}
        onChange={handleOrderDetailsChange}
        options={workSpeedOptions}
      />

      <div className="w-full max-w-md">
        <h2 className="text-lg font-semibold">Brief Pengerjaan</h2>
        <div className="flex items-center justify-between p-3 mt-2 border border-gray-300 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2">
            <img src="/doc-icon.png" alt="Document" className="w-6 h-6" />
            <span className="text-sm text-gray-700">
              [OneloT Brief Template].docx
            </span>
          </div>
          <a
            href="/OneIoT_Project_Template.docx"
            download
            className="text-blue-500"
          >
            <img src="/download-icon.png" className="w-6 h-6" />
          </a>
        </div>
        <div className="text-right">
          <a
            href="/OneIoT_Project_Template.docx"
            download
            className="text-sm text-blue-600 font-semibold no-underline"
          >
            Unduh Template
          </a>
        </div>
      </div>

      {/* Brief Point Penting */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Brief Point Penting
        </label>
        {orderDetails.briefPoints.map((point, index) => (
          <div key={point.id} className="mb-4">
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500 pointer-events-none">
                {index + 1}.
              </span>
              <textarea
                value={point.text}
                onChange={(e) =>
                  handleBriefPointChange(point.id, e.target.value)
                }
                onFocus={() => handleFocusBriefPoint(point.id)}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
            {point.isFocused && (
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => handleSaveBriefPoint(point.id)}
                  className="bg-blue-600 text-white px-3 rounded-2xl mr-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Simpan
                </button>
                {orderDetails.briefPoints.length > 1 && (
                  <button
                    onClick={() => handleDeleteBriefPoint(point.id)}
                    // className="bg-red-600 text-white py-1 px-3 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <img src="/trash-icon.png" className="w-8 h-8" />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        <button
          onClick={handleAddBriefPoint}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          + Tambah Brief Point
        </button>
      </div>

      <InputField
        label="Catatan Tambahan"
        type="textarea"
        name="additionalNotes"
        value={orderDetails.additionalNotes}
        onChange={handleOrderDetailsChange}
        rows={4}
      />
    </>
  );
}

function CheckIcon() {
  return (
    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

function DownloadIcon() {
  return (
    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className="bi bi-download fill-blue-600"
        viewBox="0 0 16 16"
      >
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
      </svg>
    </div>
  );
}

function ReviewSquare({ label, content, className = "" }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">{label}</h2>
      <div
        className={`bg-gray-100 pl-3 pr-7 py-3 rounded-lg relative ${className}`}
      >
        <p className="text-gray-700  transform translate-y-2">{content}</p>
        {label === "Rangkuman Pemesanan" ? <DownloadIcon /> : <CheckIcon />}
      </div>
    </div>
  );
}

function OrderReview({ userData, orderDetails }) {
  console.log(userData.phoneNumber);

  return (
    <>
      <h1 className="text-2xl text-center font-bold mb-6">Review Pemesanan</h1>
      <p className="text-gray-600 mb-6">
        Cek kembali data permintaan, jika belum sesuai Anda dapat mengubahnya
        kembali
      </p>

      <ReviewSquare
        label={"Rangkuman Pemesanan"}
        content={orderDetails.serviceName}
        className="bg-white border border-gray-300"
      />
      <ReviewSquare label={"Nama Lengkap"} content={userData.fullName} />
      <ReviewSquare label={"Email"} content={userData.email} />
      <ReviewSquare
        label={"Nomor WhatsApp"}
        content={userData.phoneNumber ? `+62${userData.phoneNumber}` : ""}
      />
      <ReviewSquare label={"Alamat Lengkap"} content={userData.address} />
    </>
  );
}

function OrderConfirmation({ handleSubmit, orderDetails, orderConfirmed }) {
  return (
    <>
      <h1 className="text-2xl text-center font-bold mb-12">Pesanan Dibuat</h1>
      <div className="flex justify-center mb-12">
        <div
          className={`w-32 h-32 bg-${
            orderConfirmed ? "green-500" : "[#FFCF66]"
          } rounded-full flex items-center justify-center`}
        >
          {orderConfirmed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-clock-history"
              viewBox="0 0 16 16"
            >
              <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
              <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
              <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
            </svg>
          )}
        </div>
      </div>
      <p className="text-xl text-center font-bold mb-6">
        {orderConfirmed ? "Pesanan Dikonfirmasi" : "Menunggu Konfirmasi"}
      </p>
      <div className="p-1 rounded-lg mb-6">
        {orderConfirmed ? (
          <p className="text-gray-700">
            Pesanan <strong>{orderDetails.serviceName}</strong> telah
            dikonfirmasi, lanjutkan dengan pembayaran melalui menu{" "}
            <strong>Transaksi</strong>.
          </p>
        ) : (
          <p className="text-gray-700 ">
            Pesanan <strong>{orderDetails.serviceName}</strong> telah dibuat,
            tunggu konfirmasi dari pihak OneIoT, selanjutnya Anda akan dihubungi
            melalui email atau WhatsApp yang aktif.
          </p>
        )}
      </div>
    </>
  );
}

function OrderSummary({ orderDetails, userData }) {
  return (
    <>
      <h1 className="text-center text-2xl font-bold mb-4">Rincian Pesanan</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="w-14 h-14" />{" "}
        </div>
        <div className="text-right">
          <h2 className="text-sm text-gray-500">Kode Pesanan</h2>
          <p className="text-lg font-semibold text-black">#29120</p>
        </div>
      </div>
      <SummaryRow label="Nama Pesanan" value={orderDetails.serviceName} />
      <SummaryRow
        label="Status"
        value="Selesai"
        className="text-sm text-[#2CA131] bg-[#C3FFC6] rounded-lg p-1"
      />
      <SummaryRow label="Waktu Dibuat" value="14:58 WIB" />
      <SummaryRow label="Tanggal Dibuat" value="02/11/2024" />
      <SummaryRow label="Pemesan" value={userData.fullName} />
      <SummaryRow label="Email" value={userData.email} />
      <SummaryRow label="WhatsApp" value={`+62${userData.phoneNumber}`} />
      <SummaryRow label="Alamat" value={userData.address} />
      <SummaryRow label="Total Harga" value="Rp475.000" />
    </>
  );
}

function SummaryRow({ label, value, className = "" }) {
  return (
    <div className="flex justify-between items-center mb-3">
      <h2 className="text-base text-[#686868]">{label}</h2>
      <p className={`text-base ${className}`}>{value}</p>
    </div>
  );
}
