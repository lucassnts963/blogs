// SignupScreen.js
"use client";

import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function SignupScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar conta");
      }

      // Salvar token no localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirecionar para a página inicial
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 transition duration-300">
            ← Página Inicial
          </button>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Criar Conta
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nome de Usuário
            </label>
            <div className="flex items-center border rounded-md">
              <User className="ml-3 text-gray-400" size={20} />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Escolha seu nome de usuário"
                required
                disabled={isLoading}
                className="w-full p-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              E-mail
            </label>
            <div className="flex items-center border rounded-md">
              <Mail className="ml-3 text-gray-400" size={20} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                required
                disabled={isLoading}
                className="w-full p-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Senha
            </label>
            <div className="flex items-center border rounded-md">
              <Lock className="ml-3 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Crie sua senha"
                required
                minLength={6}
                disabled={isLoading}
                className="w-full p-2 pl-10 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Mínimo de 6 caracteres</p>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-400"
            >
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              Fazer Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupScreen;
