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
    { id: 1, img: "" }, // 이미지 넣고 싶을 때 여기만 채워주면 돼 예 /lego1.jpg
    { id: 2, img: "" },
    { id: 3, img: "" }
  ];

  return (
    <div className="container mx-auto mt-8">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="p-4">
            <div className="bg-blue-100 rounded-lg shadow-md text-center h-[200px] flex items-center justify-center p-0">
              {slide.img && (
                <img
                  src={slide.img}
                  alt={`슬라이드 ${slide.id}`}
                  className="h-[180px] object-contain"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
