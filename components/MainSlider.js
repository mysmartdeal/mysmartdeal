import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const slides = [
    { id: 1, title: "", img: "/lego1.jpg" },
    { id: 2, title: "", img: "/lego2.jpg" },
    { id: 3, title: "", img: "/lego3.jpg" },
  ];

  return (
    <div className="container mx-auto mt-8">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="p-4">
            <div className="bg-blue-100 rounded-lg shadow-md p-6 text-center">
              <img
                src={slide.img}
                alt={slide.title}
                className="h-[320px] w-full object-contain bg-white"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
