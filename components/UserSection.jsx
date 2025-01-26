// components/Header.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LogOut } from "lucide-react";

export function UserSection() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/autenticacao/login");
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-orange-500 hover:text-orange-700"
        >
          <LogOut size={20} />
          <span className="hidden md:inline">Sair</span>
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/autenticacao/login"
      className="bg-white text-orange-700 px-3 py-1 rounded text-sm hover:bg-orange-50 transition-colors"
    >
      Login
    </Link>
  );
}
