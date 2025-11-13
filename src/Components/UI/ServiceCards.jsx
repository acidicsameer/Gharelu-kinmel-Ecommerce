import React from "react";
import CardService from "/src/json/ServiceCards.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ServiceCards = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,

    slidesToScroll: 1,
    pauseOnHover: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 }, 
        dots:false
      },
    ],
  };

  return (
    <>
      <h1 className="text-center text-3xl p-4 text-black">Our Services</h1>
      <Slider {...settings} className="p-8 text-black bg-white">
        {CardService.map((data) => (
          <div key={data.id} className="px-3">
            <div className="h-[270px] flex flex-col justify-center bg-gray-100 rounded-2xl px-6 py-8 shadow-lg hover:shadow-red-500/40 transition duration-300 ease-in-out">
              <div className="w-16 h-16 bg-green-300 rounded-full m-auto flex items-center justify-center shadow-md">
                <img
                  src={data.icon}
                  alt={data.title}
                  className="w-10 h-10 object-contain"
                />
              </div>

              <div className="text-xl font-bold text-black text-center mb-2">
                {data.title}
              </div>

              <div className="text-sm text-black text-center leading-relaxed">
                {data.description}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default ServiceCards;
