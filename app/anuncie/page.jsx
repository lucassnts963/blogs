// app/anuncie/page.jsx
"use client";

import { useState } from "react";
import {
  Phone as WhatsApp,
  Mail,
  Phone,
  Building2,
  User,
  FileSpreadsheet,
} from "lucide-react";
import Link from "next/link";

export default function AdvertiserContact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    adType: "banner",
    budget: "",
    message: "",
  });

  const formatPhone = (value) => {
    // Remove tudo exceto números
    const numbers = value.replace(/\D/g, "");

    // Formata o número conforme digitação
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 11)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
        7
      )}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
      7,
      11
    )}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData((prev) => ({
        ...prev,
        [name]: formatPhone(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  function handleWhatsAppClick() {
    // Número do WhatsApp do administrador (substitua pelo número real)
    const adminPhone = "5591999999999";

    // Cria a mensagem formatada
    const message =
      `Olá! Me chamo ${formData.name} da empresa ${formData.company}.\n\n` +
      `Estou interessado em anunciar no jornal.\n` +
      `Tipo de anúncio: ${formData.adType}\n` +
      `Orçamento previsto: R$ ${formData.budget}\n\n` +
      `${formData.message}\n\n` +
      `Meus contatos:\n` +
      `Email: ${formData.email}\n` +
      `Telefone: ${formData.phone}`;

    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message);

    // Cria o link do WhatsApp
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedMessage}`;

    // Abre o WhatsApp em uma nova aba
    window.open(whatsappUrl, "_blank");
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Anuncie Conosco
          </h1>
          <p className="text-lg text-gray-600">
            Aumente a visibilidade do seu negócio anunciando no Jornal o
            Nordeste Paraense
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Benefits Section */}
          <div className="bg-orange-600 text-white p-6">
            <h2 className="text-xl font-semibold mb-4">
              Por que anunciar conosco?
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Alcance qualificado na região
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Presença digital e impressa
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Valores competitivos
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Suporte personalizado
              </li>
            </ul>
          </div>

          {/* Form Section */}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-6">Preencha seus dados</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="inline-block w-4 h-4 mr-1" />
                    Nome completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Building2 className="inline-block w-4 h-4 mr-1" />
                    Empresa
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="inline-block w-4 h-4 mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="inline-block w-4 h-4 mr-1" />
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(99) 99999-9999"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FileSpreadsheet className="inline-block w-4 h-4 mr-1" />
                    Tipo de anúncio
                  </label>
                  <select
                    name="adType"
                    value={formData.adType}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="banner">Banner no site</option>
                    <option value="sponsored">Conteúdo patrocinado</option>
                    <option value="print">Anúncio impresso</option>
                    <option value="social">Redes sociais</option>
                    <option value="combo">Pacote completo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Orçamento previsto
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="R$ 1.000,00"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem adicional
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                ></textarea>
              </div>

              {/* Botões de ação */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="flex-1 bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 flex items-center justify-center gap-2"
                >
                  <WhatsApp size={20} />
                  Conversar via WhatsApp
                </button>

                <Link
                  href="mailto:contato@nordesteparaense.com.br"
                  className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-md hover:bg-orange-700 flex items-center justify-center gap-2"
                >
                  <Mail size={20} />
                  Enviar por Email
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center text-gray-600">
          <p>Prefere falar diretamente conosco?</p>
          <p className="font-semibold mt-2">
            Telefone: (91) 99999-9999 | Email: contato@nordesteparaense.com.br
          </p>
        </div>
      </div>
    </div>
  );
}
