// components/MobileMenu.jsx
"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function MobileMenu({ categories }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute left-4 top-1/2 -translate-y-1/2"
        aria-label="Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu Content */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-orange-600 shadow-lg z-50">
          <ul className="flex flex-col py-2">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/categoria/${category}`}
                  className="block px-4 py-2 hover:bg-orange-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
