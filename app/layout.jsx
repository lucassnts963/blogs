// app/layout.jsx
import "./global.css";

export const metadata = {
  title: "BlogService",
  description: "Seu espaço para compartilhar ideias",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-100 text-gray-900">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
