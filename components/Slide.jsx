"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

export function Slide({ slides }) {
  if (!slides?.length) {
    return (
      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Nenhum slide disponível</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="w-full h-full rounded-lg"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link href={`/posts/${slide.slug}`}>
              <div className="relative w-full h-full">
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold line-clamp-2">
                      {slide.title}
                    </h2>
                    {slide.subtitle && (
                      <p className="mt-2 text-sm md:text-base line-clamp-2 text-gray-200">
                        {slide.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
