import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function HeroSection() {
  const images = [
    'https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg',
    'https://firebasestorage.googleapis.com/v0/b/e-commerce-d6aae.appspot.com/o/HeroImage1.png?alt=media&token=632e47b9-c0a3-4655-a531-386f6c7c69e2',
    'https://firebasestorage.googleapis.com/v0/b/e-commerce-d6aae.appspot.com/o/HeroImage2.png?alt=media&token=a95002f3-58f3-4079-894f-b679a044404a'
    // Add more image URLs as needed
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, 
    swipe:true,
    afterChange: (current) => setCurrentSlide(current),
  };



  return (
    <div className="relative overflow-hidden">
      <Slider {...settings} className="">
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className="w-full" />
          </div>
        ))}
      </Slider>
      <div className="absolute lg:bottom-8 sm:bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2" style={{ marginLeft: `-${(images.length - 1) * 8}px` }}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-gray-300' : 'bg-gray-400'
              } opacity-70 hover:opacity-100 focus:outline-none`}
              style={{ position: 'relative', zIndex: 1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );

}

export default HeroSection