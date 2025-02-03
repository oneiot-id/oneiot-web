import Slider from "react-slick";
import CustomPrevArrow from "./CustomPrevArrow";
import CustomNextArrow from "./CustomNextArrow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    arrows: true, // Enable arrows
    prevArrow: <CustomPrevArrow />, // Use custom previous arrow
    nextArrow: <CustomNextArrow />, // Use custom next arrow
    responsive: [
      {
        breakpoint: 1024, // Adjust settings for screens smaller than 1024px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Adjust settings for screens smaller than 768px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const images = ["/home-hero.png", "/home-hero.png", "/home-hero.png"];

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            {/* Image Container */}
            <div
              className="h-60 bg-cover bg-center relative rounded-2xl"
              style={{ backgroundImage: `url(${image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>

              {/* Text at Bottom Right */}
              <div className="absolute bottom-4 left-4 z-10 text-white text-left">
                <h2 className="text-3xl font-bold">AI & Machine Learning</h2>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}