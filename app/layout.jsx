export const metadata = {
  title: "Blogs",
  description: "Uma aplicação para gerenciar blogs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
