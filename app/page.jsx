import HorizontalNewsCard from "components/HorinzontalNewsCard";
import { NewsCard } from "components/NewsCard";
import { Slide } from "components/Slide";
import { VerticalNewsCard } from "components/VerticalNewsCard";

const slides = [
  {
    title: "Notícia 1",
    description: "Descrição da primeira notícia",
    image:
      "https://www.ograndenews.com.br/arquivos/noticias/20748/palmeiras-x-botafogo-o-jogo-que-pode-decretar-o-rumo-do-brasileirao.png", // Substitua pelo link da imagem
  },
  {
    title: "Notícia 2",
    description: "Descrição da segunda notícia",
    image:
      "https://www.ograndenews.com.br/arquivos/noticias/20717/bulgari-e-cartier-empresario-morto-pelo-pcc-levava-r-1-mi-em-joias.png",
  },
  {
    title: "Notícia 3",
    description: "Descrição da terceira notícia",
    image:
      "https://www.ograndenews.com.br/arquivos/noticias/20756/premio-multishow-veja-os-paraenses-que-ganharam-na-edicao-de-2024.png",
  },
];

const news = [
  {
    title: "Eleições de 2024: os principais acontecimentos",
    category: "Política",
    image:
      "https://www.ograndenews.com.br/arquivos/noticias/20753/menino-atingido-por-pedra-de-caminhao-morreu-ao-salvar-primo-de-2-anos.png",
    link: "/post",
  },
  {
    title: "Descoberta científica revolucionária",
    category: "Ciência",
    image:
      "https://www.ograndenews.com.br/arquivos/noticias/20752/quem-era-casal-de-enfermeiros-achado-morto-em-carro.png",
    link: "/post",
  },
  {
    title: "Como economizar nas compras de fim de ano",
    category: "Economia",
    image:
      "https://www.ograndenews.com.br/arquivos/noticias/20751/cpi-das-bets-convoca-gusttavo-lima-para-depor-nesta-terca.png",
    link: "/post",
  },
];

export default function HomePage() {
  return (
    <main className="container mx-auto p-4">
      {/* PUBLICIDADE */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Publicidade</h2>
        <div className="bg-gray-200 h-32 flex items-center justify-center rounded">
          <p>Espaço para banners publicitários</p>
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Destaques</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-gray-200 h-[600px] rounded flex items-center justify-center">
            <Slide slides={slides} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-200 h-full rounded grid grid-cols-1 gap-2">
              {news.map((item, index) => (
                <NewsCard
                  key={index}
                  title={item.title}
                  category={item.category}
                  image={item.image}
                  link={item.link}
                />
              ))}
            </div>
            <div className="bg-gray-200 h-full rounded">
              <VerticalNewsCard
                category="Ciência e Saúde"
                image="https://www.ograndenews.com.br/arquivos/noticias/20647/azeite-de-oliva-sua-saude-pode-estar-em-risco.png"
                title="Azeite de Oliva sua saude pode estar em risco"
                link="/post"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      {[
        "Cidades",
        "Política",
        "Brasil",
        "Economia",
        "Mundo",
        "Diversão e Arte",
        "Ciência e Saúde",
        "Eu Estudante",
        "Concursos",
        "Direitos e Justiça",
        "Publicidade Legal",
        "Classificados",
        "Polícia",
      ].map((category) => (
        <section key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Slide com 3 destaques */}
            <div className="bg-gray-200 h-[600px] rounded flex items-center justify-center">
              <Slide slides={slides} />
            </div>
            {/* Lista vertical com outros 3 destaques */}
            <div className="h-full rounded flex items-center justify-between">
              <div className="bg-gray-200 w-full h-full rounded grid grid-cols-1 gap-2">
                {news.map((item, index) => (
                  <HorizontalNewsCard
                    key={index}
                    title={item.title}
                    category={category}
                    image={item.image}
                    link={item.link}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
