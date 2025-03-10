import fs from "fs";
import path from "path";

export function extractFirstImagefromMarkdown(markdownText) {
  const imagePattern = /!\[.*?\]\((.*?)\)/;
  const match = markdownText.match(imagePattern);
  if (match) {
    return match[1];
  }
  return null;
}

export function formatDate(stringDate) {
  const formattedDate = new Date(stringDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formattedDate;
}

export function createUUIDFile(uuid, filename = "uuid.txt") {
  const filePath = path.join(__dirname, filename);
  fs.writeFileSync(filePath, uuid, "utf8");
  console.log(`Arquivo ${filename} criado com UUID: ${uuid}`);
}

// Função para ler o arquivo TXT e retornar a UUID
export function readUUIDFile(filename = "uuid.txt") {
  try {
    const filePath = path.join(process.cwd(), "public", filename);
    const uuid = fs.readFileSync(filePath, "utf-8").trim();
    return uuid;
  } catch (error) {
    console.error("Erro ao ler o arquivo UUID:", error);
    return null;
  }
}
