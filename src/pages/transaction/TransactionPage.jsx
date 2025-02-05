import { useState } from "react";
import HomeHeader from "../../components/HomeHeader";
import StepNavigation from "../../components/StepNavigation";
import BottomNav from "../../components/BottomNav";
import { CheckCircle, Circle, Star } from "lucide-react";


export default function TransactionPage() {
  const [activeItem, setActiveItem] = useState("transaksi");
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const [paymentProof, setPaymentProof] = useState(null);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [ratingLabel, setRatingLabel] = useState("");

  const ratingLabels = [
    "Buruk",
    "Kurang",
    "Cukup",
    "Memuaskan",
    "Sangat Memuaskan",
  ];

  const fullName = "Erlangga Satrya";
  const address = "UNY";
  const shipmentStatus =
    "Pesanan sampai di sorting center KOTABANDUNG (MH BANDUNG)";

  const transactionSteps = [
    { id: 1, label: "Pembayaran" },
    { id: 2, label: "Produksi" },
    { id: 3, label: "Pengiriman" },
    { id: 4, label: "Review" },
  ];

  const orderDetails = {
    orderId: "#69420",
    status: "Unpaid",
    product: "Alat Monitoring Flow Air",
    date: "09:58 27/01/2025",
  };

  const paymentDetails = {
    basePrice: "Rp 120.000",
    serviceFee: "Rp 475.000",
    shippingFee: "Rp 175.000",
    tax: "Rp 84.700",
    additionalFee: "Rp 100.000",
    total: "Rp 954.700,00",
    qrisId: "6942032356816166",
    bcaAccount: "2501142524",
  };

  const productionStatus = {
    date: "28/01/2025",
    dateEstimation: "01/01/2025",
    status: "Quality Check",
    level: "Full Speed",
  };

  const shipmentDetails = {
    dateDelivery: "01/02/2025",
    dateArrival: "04/02/2025",
    courier: "JNE Reguler",
    receiptNumber: "TKP01-LK57GJV2",
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep(Math.round(step - 1));
  };

  const handlePaymentProofUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentProof(file.name);
      console.log("File uploaded:", file);
    }
  };

  const handleDeleteProof = () => {
    setPaymentProof(null);
  };

  if (step === 1) {
    orderDetails.status = "Unpaid";
  } else if (step === 1.5) {
    orderDetails.status = "Pending";
  } else if (step === 2) {
    orderDetails.status = "Proses";
  } else if (step === 3) {
    orderDetails.status = "Dikirim";
  } else if (step === 4 || step === 4.5) {
    orderDetails.status = "Selesai";
  }

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setStep(4.5);
  };

  const handleSkipReview = (e) => {
    e.preventDefault();
    setStep(4.5);
    setRating(0);
    setRatingLabel("");
    setComment("");
  };

  const handleStarClick = (value) => {
    setRating(value);
    setRatingLabel(ratingLabels[value - 1]);
  };

  return (
    <>
      <HomeHeader title="Transaksi" />
      <div className="container mx-auto p-2">
        <StepNavigation
          step={step === 4.5 ? Math.round(step) : Math.floor(step)}
          steps={transactionSteps}
        />
        <div className="p-2 mb-20">
          <TransactionOrderDetail
            orderDetails={orderDetails}
            className={`${step >= 4 ? "bg-[#C3FFC6]" : "bg-[#FFE085]"}`}
          />
          {step === 1 && (
            <>
              <PaymentDetails paymentDetails={paymentDetails} />
              <PaymentMethod
                paymentMethod={paymentMethod}
                handlePaymentMethodChange={handlePaymentMethodChange}
              />
            </>
          )}
          {step === 1.5 && (
            <>
              <PaymentDetails paymentDetails={paymentDetails} />
              <PaymentMethodAndProof
                paymentMethod={paymentMethod}
                paymentDetails={paymentDetails}
                paymentProof={paymentProof}
                handlePaymentProofUpload={handlePaymentProofUpload}
                handleDeleteProof={handleDeleteProof}
              />
            </>
          )}
          {step === 2 && (
            <>
              <ProductionStatus
                productionStatus={productionStatus}
                paymentMethod={paymentMethod}
                fullName={fullName}
              />
              <ProductionStatusTimeline productionStatus={productionStatus} />
            </>
          )}
          {step === 3 && (
            <>
              <Shipment
                shipmentDetails={shipmentDetails}
                fullName={fullName}
                address={address}
              />
              <ShipmentTracking shipmentStatus={shipmentStatus} />
            </>
          )}
          {(step === 4 || step === 4.5) && (
            <>
              <Shipment
                shipmentDetails={shipmentDetails}
                fullName={fullName}
                address={address}
              />
              <PaymentDetails paymentDetails={paymentDetails} />
              <ProductionStatus
                productionStatus={productionStatus}
                paymentMethod={paymentMethod}
                fullName={fullName}
              />
              {step === 4 ? (
                <ProductReviewForm
                  rating={rating}
                  setRating={setRating}
                  comment={comment}
                  setComment={setComment}
                  ratingLabel={ratingLabel}
                  onStarRating={handleStarClick}
                />
              ) : (
                <ProductReview
                  rating={rating}
                  comment={comment}
                  ratingLabel={ratingLabel}
                />
              )}
            </>
          )}
          <div
            className={`flex ${
              step === 1.5 && orderDetails.status === "Pending"
                ? "justify-center"
                : "justify-between"
            } mt-6`}
          >
            {step >= 1 && step !== 4 && (
              <BackButtonNavigation handleItemClick={handlePreviousStep} />
            )}

            {step === 1 && (
              <PositiveButtonNavigation
                handleItemClick={() => setStep(1.5)}
                label="Bayar"
              />
            )}

            {step === 1.5 && orderDetails.status === "proses"}

            {step === 2 && <PositiveButtonNavigation label="Hubungi" />}
            {step === 3 && (
              <PositiveButtonNavigation
                label="Pesanan Tiba"
                handleItemClick={handleNextStep}
              />
            )}
            {step === 4 && (
              <>
                <BackButtonNavigation
                  handleItemClick={handleSkipReview}
                  label="Tanpa Review"
                />
                <PositiveButtonNavigation
                  label="Kirim Ulasan"
                  handleItemClick={handleSubmitReview}
                  isDisabled={rating ? false : true}
                />
              </>
            )}
            {step === 4.5 && (
              <button className="text-white border border-gray-300 py-2 px-4 rounded-lg bg-[#D01F2B] hover:bg-red-700">
                Ajukan Komplain
              </button>
            )}
          </div>
        </div>
        <BottomNav activeItem={activeItem} onItemClick={setActiveItem} />
      </div>
    </>
  );
}

function PositiveButtonNavigation({
  handleItemClick,
  label = "Lanjutkan",
  className = "",
  isDisabled = false,
}) {
  console.log(isDisabled);

  return (
    <button
      disabled={isDisabled}
      onClick={handleItemClick}
      className={`px-4 py-2 rounded-lg ${
        !isDisabled
          ? "text-white bg-blue-600 hover:bg-blue-700"
          : "text-gray-700 bg-gray-300 cursor-not-allowed opacity-50"
      }`}
    >
      {label}
    </button>
  );
}

function BackButtonNavigation({ handleItemClick, label = "Kembali" }) {
  return (
    <button
      onClick={handleItemClick}
      className="custom-daftar-button font-bold bg-white border border-gray-300 py-2 px-4 rounded-lg hover:border-gray-400 hover:shadow-md ${className}"
    >
      {label}
    </button>
  );
}

function TransactionOrderDetail({ orderDetails, className = "" }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-3">Detail Pesanan</h2>

      <div className="bg-gray-200 rounded-xl">
        <div className="flex justify-between items-center px-4 py-2">
          <span className="font-bold text-black">#{orderDetails.orderId}</span>
          <span
            className={`text-sm font-semibold text-black px-3 py-1 rounded-lg ${className}`}
          >
            {orderDetails.status}
          </span>
        </div>

        <div className="bg-white border border-gray-300 p-3 rounded-xl shadow-md w-full max-w-md relative">
          <p className="text-base font-semibold">{orderDetails.product}</p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-bold">{orderDetails.time}</span>{" "}
            {orderDetails.date}
          </p>
          <a
            href="#"
            className="text-sm text-blue-600 font-semibold no-underline absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            Lihat Rincian
          </a>
        </div>
      </div>
    </div>
  );
}

function PaymentDetails({ paymentDetails }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Rincian Pembayaran</h2>

      <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md w-full max-w-md">
        <div className="space-y-2">
          <PaymentRow label="Harga Pokok" value={paymentDetails.basePrice} />
          <PaymentRow
            label="Biaya Jasa & Layanan"
            value={paymentDetails.serviceFee}
          />
          <PaymentRow
            label="Ongkos Pengiriman"
            value={paymentDetails.shippingFee}
          />
          <PaymentRow label="Pajak (PPN 11%)" value={paymentDetails.tax} />
          <PaymentRow
            label="Biaya Tambahan"
            value={paymentDetails.additionalFee}
          />
        </div>

        <div className="flex justify-between items-center font-bold mt-4">
          <span className="text-gray-700">Total Pembayaran</span>
          <span className="text-blue-600">{paymentDetails.total}</span>
        </div>
      </div>
      <div className="text-right mt-2">
        <a
          href="#"
          className="text-sm text-blue-600 font-semibold no-underline"
        >
          Lihat Invoice
        </a>
      </div>
    </div>
  );
}

function PaymentRow({ label, value, className = "" }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600 my-1">{label}</span>
      <span className={`my-1 ${className}`}>{value}</span>
    </div>
  );
}

function PaymentMethod({ paymentMethod, handlePaymentMethodChange }) {
  const paymentOptions = [
    {
      id: "QRIS",
      name: "QRIS OneIoT ID",
      account: "6942032356816166",
      logo: "/qris-logo.png",
    },
    {
      id: "BCA",
      name: "BCA Virtual Account",
      account: "2501142524",
      logo: "/bca-logo.png",
    },
  ];

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Opsi Pembayaran</h2>

      <div className="space-y-3">
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => handlePaymentMethodChange(option.id)}
            className={`flex items-center justify-between border rounded-lg px-3 py-2 shadow-md cursor-pointer transition-all 
                ${
                  paymentMethod === option.id
                    ? "border-blue-600 ring-2 ring-blue-400"
                    : "border-gray-300 bg-white"
                }`}
          >
            <div className="flex items-center space-x-8">
              <img src={option.logo} alt={option.name} className="w-12" />
              <div>
                <p className="text-base font-semibold mb-1">{option.name}</p>
                <p className="text-sm text-gray-600 mb-1">{option.account}</p>
              </div>
            </div>

            {/* {paymentMethod === option.id && <div className="w-2 h-full bg-blue-600 rounded-r-lg"></div>} */}
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentMethodAndProof({
  paymentMethod,
  paymentDetails,
  paymentProof,
  handlePaymentProofUpload,
  handleDeleteProof,
}) {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Metode Pembayaran Dipilih</h2>
        <p className="text-gray-600 font-semibold">
          Pembayaran diproses, tunggu konfirmasi selanjutnya, harap periksa
          secara berkala.
        </p>
        <div className="flex items-center justify-between border rounded-lg px-3 py-2 shadow-md bg-white">
          <div className="flex items-center space-x-8">
            <img
              src={
                paymentMethod === "QRIS" ? "/qris-logo.png" : "/bca-logo.png"
              }
              alt={paymentMethod === "QRIS" ? "QRIS" : "BCA"}
              className="w-12"
            />
            <div>
              <p className="text-base font-semibold mb-1">
                {paymentMethod === "QRIS"
                  ? "QRIS OneIoT ID"
                  : "BCA Virtual Account"}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                {paymentMethod === "QRIS"
                  ? paymentDetails.qrisId
                  : paymentDetails.bcaAccount}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Bukti Pembayaran (Opsional)</h2>
        <label
          htmlFor="proof"
          className="flex items-center space-x-2 border border-gray-300 rounded-full p-4 cursor-pointer bg-white shadow-sm transition hover:bg-gray-100"
        >
          <img
            src="/album-logo.png"
            alt="Payment Proof"
            className="text-blue-600 h-6 w-6"
          />
          <span className="text-gray-600">
            {paymentProof ? paymentProof : "Tambahkan bukti pembayaran"}
          </span>
          {paymentProof && (
            <button
              type="button"
              onClick={handleDeleteProof}
              className="text-red-500 hover:text-red-700 transition"
            >
              <img
                src="/trash-icon.png"
                alt="delete button"
                className="w-5 h-5"
              />
            </button>
          )}
          <input
            type="file"
            id="proof"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={handlePaymentProofUpload}
          />
        </label>
      </div>
    </>
  );
}

function ProductionStatus({ productionStatus, paymentMethod, fullName }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Status Produksi</h2>

      <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md w-full max-w-md">
        <div className="space-y-2">
          <PaymentRow label="Tanggal Produksi" value={productionStatus.date} />
          <PaymentRow
            label="Estimasi Selesai"
            value={productionStatus.dateEstimation}
          />
          <PaymentRow
            label="Status Terbaru"
            value={productionStatus.status}
            className="font-bold"
          />
          <PaymentRow label="Pemesan" value={fullName} />
          <PaymentRow
            label="Kecepatan Pengerjaan"
            value={productionStatus.level}
          />
          <PaymentRow label="Metode Pembayaran" value={paymentMethod} />
        </div>
      </div>
    </div>
  );
}

const ProductionStatusTimeline = ({ productionStatus }) => {
  const [showDetails, setShowDetails] = useState(true);

  const steps = [
    { id: 1, label: "Transaksi diterima", time: "09:25", date: "28/01/2025" },
    { id: 2, label: "Pembelian Komponen", time: "09:35", date: "28/01/2025" },
    { id: 3, label: "Desain PCB", time: "10:35", date: "29/01/2025" },
    { id: 4, label: "Assembly Elektronik", time: "12:35", date: "29/01/2025" },
    { id: 5, label: "Testing Elektronik", time: "16:35", date: "29/01/2025" },
    { id: 6, label: "Design 3D CAD", time: "08:35", date: "30/01/2025" },
    { id: 7, label: "Print 3D", time: "12:35", date: "30/01/2025" },
    { id: 8, label: "Assembly Casing", time: "15:35", date: "30/01/2025" },
    { id: 9, label: "Programming Micro", time: "09:40", date: "31/01/2025" },
    { id: 10, label: "Testing", time: "12:40", date: "31/01/2025" },
    { id: 11, label: "Quality Check", time: "16:40", date: "31/01/2025" },
  ];

  const currentStepIndex = steps.findIndex(
    (step) => step.label === productionStatus.status
  );

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Tahapan Produksi</h2>

      <div className="bg-white p-4 pb-2 border border-gray-300 rounded-lg shadow-md w-full max-w-md">
        <div className="relative">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-start space-x-3 relative ${
                !showDetails && index !== currentStepIndex ? "hidden" : ""
              }`}
            >
              <div className="flex flex-col items-center">
                {index < currentStepIndex ? (
                  <CheckCircle className="text-blue-500 h-6 w-6" />
                ) : (
                  <Circle
                    className={
                      index === currentStepIndex
                        ? "text-blue-500 h-6 w-6"
                        : "text-gray-300 h-6 w-6"
                    }
                  />
                )}
                {index < steps.length - 1 && (
                  <div
                    className={`h-7 w-0.5 ${
                      index < currentStepIndex ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1">
                <p
                  className={
                    index === currentStepIndex ? "font-bold" : "text-gray-700"
                  }
                >
                  {step.label}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-boldtext-gray-500 mb-0">
                  {step.time}
                </p>
                <p className="text-xs text-gray-500">{step.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-right mt-2">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-blue-600 font-semibold hover:text-blue-700 focus:outline-none"
        >
          {showDetails ? "Sembunyikan Detail" : "Tampilkan Detail"}
        </button>
      </div>
    </div>
  );
};

function Shipment({ shipmentDetails, fullName, address }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Rincian Pengiriman</h2>

      <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md w-full max-w-md">
        <div className="space-y-2">
          <PaymentRow
            label="Tanggal Pengiriman"
            value={shipmentDetails.dateDelivery}
          />
          <PaymentRow
            label="Estimasi Tiba"
            value={shipmentDetails.dateArrival}
          />
          <PaymentRow label="Penerima" value={fullName} />
          <PaymentRow label="Kurir" value={shipmentDetails.courier} />
          <PaymentRow label="Alamat Tujuan" value={address} />
          <PaymentRow label="No. Resi" value={shipmentDetails.receiptNumber} />
        </div>
      </div>
    </div>
  );
}

function ShipmentTracking({ shipmentStatus }) {
  const [showDetails, setShowDetails] = useState(true);

  const steps = [
    {
      id: 1,
      label: "Pesanan sudah di-pickup oleh kurir BANI RAMDANI",
      location: "Kurir JNE",
      time: "09:25",
      date: "28/01/2025",
    },
    {
      id: 2,
      label: "Paket telah drop off di TH PANYILEUKAN",
      location: "Kurir JNE",
      time: "09:25",
      date: "28/01/2025",
    },
    {
      id: 3,
      label: "Pesanan sampai di sorting center KOTABANDUNG (MH BANDUNG)",
      location: "Kota Bandung",
      time: "09:25",
      date: "28/01/2025",
    },
    {
      id: 4,
      label: "Pesanan sampai di sorting center KARAWANG (MH KARAWANG)",
      location: "Karawang",
      time: "09:25",
      date: "28/01/2025",
    },
  ];

  // Reverse the steps array to display the most recent update at the top
  const reversedSteps = [...steps].reverse();

  const currentStepIndex =
    steps.length - 1 - steps.findIndex((step) => step.label === shipmentStatus);

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Tracking Pengiriman</h2>

      <div className="bg-white pt-4 pb-2 px-3 border border-gray-300 rounded-lg shadow-md w-full max-w-md">
        <div className="relative">
          {reversedSteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-start space-x-3 ${
                !showDetails && index !== currentStepIndex ? "hidden" : ""
              }`}
            >
              {showDetails && (
                <div className="flex flex-col items-center">
                  {index > currentStepIndex ? (
                    <CheckCircle className="text-blue-500 h-6 w-6" />
                  ) : (
                    <Circle
                      className={
                        index === currentStepIndex
                          ? "text-blue-500 h-6 w-6"
                          : "text-gray-300 h-6 w-6"
                      }
                    />
                  )}
                  {index < reversedSteps.length - 1 && (
                    <div
                      className={`h-24 w-0.5 ${
                        index >= currentStepIndex
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              )}

              <div className="flex justify-between items-center w-full">
                <div className="flex-1 text-justify leading-tight mr-10">
                  <p
                    className={`mb-2 ${
                      index === currentStepIndex ? "font-bold" : "text-gray-700"
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.location && (
                    <p className="text-sm text-gray-500">{step.location}</p>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-gray-500 mb-0">
                    {step.time}
                  </p>
                  <p className="text-xs text-gray-500">{step.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-right mt-2">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-blue-600 font-semibold hover:text-blue-700 focus:outline-none"
        >
          {showDetails ? "Sembunyikan Detail" : "Tampilkan Detail"}
        </button>
      </div>
    </div>
  );
}

function ProductReviewForm({
  rating,
  setRating,
  comment,
  setComment,
  ratingLabel,
  onStarRating,
}) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Berikan Ulasan</h2>

      <div className="bg-white pb-2 px-1 w-full max-w-md">
        <p className="text-sm font-medium">Rating</p>
        <div className="flex items-center p-2 space-x-5 border border-gray-300 rounded-xl shadow-md w-full max-w-md">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-6 w-6 cursor-pointer ${
                star <= rating ? "text-[#FFB81E]" : "text-gray-300"
              }`}
              onClick={() => onStarRating(star)}
              fill={star <= rating ? "#FFB81E" : "none"}
              strokeWidth={1.5}
            />
          ))}
          {rating > 0 && (
            <span className="absolute right-7 text-sm font-semibold text-[#FFB81E]">
              {ratingLabel}
            </span>
          )}
        </div>
        {rating ? (
          <div className="text-right mt-2">
            <button
              type="button"
              onClick={() => setRating(0)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <img
                src="/trash-icon.png"
                alt="delete button"
                className="w-6 h-6"
              />
            </button>
          </div>
        ) : null}

        <p className="mt-3 text-sm font-medium">Tulis komentar</p>
        <textarea
          className="w-full py-3 px-3 border border-gray-300 rounded-lg shadow-md max-w-md text-sm"
          rows="4"
          placeholder="Bagikan pengalaman Anda..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}

function ProductReview({ rating, comment, ratingLabel }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Ulasan Anda</h2>
      {!rating ? (
        <p className="font-medium">Anda tidak memberikan ulasan produk</p>
      ) : (
        <div className="bg-white pb-2 px-1">
          <div className="flex flex-col p-3 space-y-2 mt-1 border border-gray-300 rounded-lg shadow-md w-full max-w-md">
            <div className="flex items-center space-x-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${
                    star <= rating ? "text-[#FFB81E]" : "text-gray-300"
                  }`}
                  fill={star <= rating ? "#FFB81E" : "none"}
                  strokeWidth={1.5}
                />
              ))}
              {rating > 0 && (
                <span className="absolute right-8 text-sm font-semibold text-[#FFB81E]">
                  {ratingLabel}
                </span>
              )}
            </div>
            {comment && (
              <p className="w-full pt-2 text-sm min-h-[50px]">{comment}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
