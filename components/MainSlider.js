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
    { id: 1, title: "베스트 레고 상품 1", img: "/lego1.jpg" },
    { id: 2, title: "베스트 레고 상품 2", img: "/lego2.jpg" },
    { id: 3, title: "베스트 레고 상품 3", img: "/lego3.jpg" },
  ];

  return (
    <div className="container mx-auto mt-8">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="p-4">
            <div className="bg-blue-100 rounded-lg shadow-md p-6 text-center">
              {/* <h2 className="text-xl font-bold mb-2">{slide.title}</h2> */}
              <img src={slide.img} alt={slide.title} className="mx-auto max-h-60 object-contain" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
