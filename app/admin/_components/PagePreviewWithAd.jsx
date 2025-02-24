"use client";
import { useState, useEffect } from "react";

export function PagePreviewWithAd({ width, height }) {
  const [pageWidth, setPageWidth] = useState(1200);
  const [pageHeight, setPageHeight] = useState(800); // Simulação de uma página padrão

  useEffect(() => {
    function updateSize() {
      setPageWidth(window.innerWidth);
      setPageHeight(window.innerHeight);
    }

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Definir a escala para manter a miniatura proporcional
  const scale = 200 / pageWidth; // Reduz a largura para 200px na miniatura
  const bannerWidth = width * scale;
  const bannerHeight = height * scale;

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <h2 className="text-lg font-semibold">Proporção da Página vs. Anúncio</h2>
      <div
        className="relative border border-gray-400 rounded-md bg-gray-100"
        style={{
          width: `${200}px`, // Largura fixa da miniatura
          height: `${pageHeight * scale}px`, // Altura proporcional
        }}
      >
        {/* Simulação do banner */}
        <div
          className="bg-blue-500 text-white flex items-center justify-center text-xs rounded-md shadow-md absolute text-center"
          style={{
            width: `${bannerWidth}px`,
            height: `${bannerHeight}px`,
            top: "10%", // Posiciona dentro da "página"
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Anúncio {"\n"} ({width} x {height})
        </div>
      </div>
    </div>
  );
}
