// app/categoria/[slug]/error.jsx
"use client";

export default function ErrorPage({ error, reset }) {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Ops! Algo deu errado
        </h1>
        <p className="text-gray-600 mb-8">
          Não foi possível carregar as notícias desta categoria. Por favor,
          tente novamente mais tarde.
        </p>
        <button
          onClick={() => reset()}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
