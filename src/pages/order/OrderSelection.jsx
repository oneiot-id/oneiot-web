export default function OrderSelection({ onProductSelect, orderDetails }) {
    const products = [
      { id: 1, name: "Internet of Things", icon: "📡" },
      { id: 2, name: "AI/Machine Learning", icon: "🤖" },
      { id: 3, name: "Robotic", icon: "🦾" },
      { id: 4, name: "Mechatronics", icon: "⚙️" },
      { id: 5, name: "Web Development", icon: "🌐" },
    ];
  
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
  
    return (
      <div className="flex flex-col p-4 mb-20">
        <h1 className="text-xl font-bold mb-4">Pilih Layanan</h1>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onProductSelect("")}
            className="flex flex-col items-center p-2 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <span className="text-2xl">➕</span>
            <span className="text-l font-semibold mt-2">Pesan</span>
          </button>
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => onProductSelect(product.name)}
              className="flex flex-col items-center p-2 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <span className="text-2xl">{product.icon}</span>
              <span className="text-l font-semibold mt-2">{product.name}</span>
            </button>
          ))}
        </div>
        {/* <button
          onClick={() => onProductSelect("")}
          className="mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          + Buat Pemesanan Baru
        </button> */}
  
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
              className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow"
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