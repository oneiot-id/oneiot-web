export default function Product() {
  const products = [
    {
      image: "/produk.png",
      title: "Alat Monitoring Listrik",
      price: "Rp. 1.300.500",
      rating: "4.2",
    },
    {
      image:
        "https://eu-images.contentstack.com/v3/assets/blt31d6b0704ba96e9d/blt62263bd789102182/65b2794064cf57040aaf9182/Screenshot_(1243).png?width=1280&auto=webp&quality=95&format=jpg&disable=upscale",
      title: "Robot Humanoid",
      price: "Rp. 500.000.000",
      rating: "4.7",
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-1">Produk</h1>
      <div className="flex space-x-4 p-4">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            title={product.title}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </div>
    </>
  );
}

function ProductCard({ image, title, price, rating }) {
  return (
    <div className="flex-1 transition-transform transform hover:scale-105 hover:shadow-lg">
      <div className="flex mb-2">
        <img
          src={image}
          alt={title}
          className="w-48 h-40 object-cover rounded-lg transition-opacity hover:opacity-90"
        />
      </div>

      <div className="transition-colors hover:text-blue-600">
        <h2 className="text-sm font-bold">{title}</h2>
        <p className="text-gray-600">
          {price} ⭐ {rating}
        </p>
      </div>
    </div>
  );
}
