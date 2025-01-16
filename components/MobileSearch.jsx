// components/MobileSearch.jsx
"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

export function MobileSearch() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center"
        aria-label="Buscar"
      >
        {isOpen ? <X size={20} /> : <Search size={20} />}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 px-4 pb-4">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full bg-white text-gray-900 px-4 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      )}
    </div>
  );
}
