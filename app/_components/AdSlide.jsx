"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export function AdSlide({ blogId, width, height, type }) {
  const [index, setIndex] = useState(0);
  const [ads, setAds] = useState([]);

  async function fetchAds() {
    const response = await fetch("/api/v1/ads", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const adsResult = await response.json();

    const adsFetched = adsResult.map((a) => ({
      name: a.uuid,
      url: a.imageUrl,
      type: a.type,
    }));

    const filteredAds = adsFetched.filter((ad) => ad.type === type);

    setAds(filteredAds);
  }

  useEffect(() => {
    fetchAds();
  }, []);

  useEffect(() => {
    if (ads.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [ads]);

  return (
    <div
      className="relative mx-auto rounded-lg overflow-hidden shadow-md"
      style={{ maxWidth: width, height }}
    >
      {ads.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full bg-gray-200">
          <p className="text-gray-500">Espaço para banners publicitários</p>
        </div>
      ) : (
        ads.map((ad, i) => (
          <a
            key={ad.name}
            href={ad.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute inset-0 transition-opacity duration-500 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={ad.url}
              alt="Banner Publicitário"
              width={width}
              height={height}
              layout="responsive"
              className="rounded-lg object-cover"
            />
          </a>
        ))
      )}
    </div>
  );
}
