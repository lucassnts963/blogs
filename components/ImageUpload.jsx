import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "infra/firebase";
import { Image } from "lucide-react";

export function ImageUpload({ onUploadSuccess, onUploadError }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (event) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsUploading(true);

      // Criar um nome único para o arquivo
      const fileExtension = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExtension}`;

      // Criar referência para o arquivo no Firebase Storage
      const storageRef = ref(storage, `images/${fileName}`);

      // Fazer upload do arquivo
      const snapshot = await uploadBytes(storageRef, file);

      // Obter a URL do arquivo
      const downloadUrl = await getDownloadURL(snapshot.ref);

      // Chamar callback de sucesso com a URL
      onUploadSuccess?.(downloadUrl);
    } catch (error) {
      console.error("Erro no upload:", error);
      onUploadError?.(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <label
        htmlFor="image-button"
        className="p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer"
      >
        <Image size={20} />
      </label>
      <input
        type="file"
        id="image-button"
        accept="image/*"
        onChange={handleUpload}
        disabled={isUploading}
        className="invisible"
        title="Inserir Imagem"
      />
      {isUploading && (
        <p className="text-sm text-gray-500">Fazendo upload...</p>
      )}
    </>
  );
}

export default ImageUpload;
