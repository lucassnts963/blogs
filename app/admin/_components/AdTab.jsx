import { useState } from "react";
import { Upload, Trash2, Loader2 } from "lucide-react"; // Loader2 para indicar carregamento
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "infra/firebase";
import { PagePreviewWithAd } from "./PagePreviewWithAd";

export function AdTab({ ads, onUpload, userId }) {
  const [adType, setAdType] = useState("BANNER");
  const [uploading, setUploading] = useState(false); // Estado de carregamento
  const [errorMessage, setErrorMessage] = useState(""); // Estado de erro

  const adDimensions = {
    BANNER: { width: 1200, height: 400 },
    SIDEBAR: { width: 300, height: 600 },
    FOOTER: { width: 1200, height: 200 },
    POPUP: { width: 800, height: 600 },
    INLINE: { width: 600, height: 150 },
  };

  async function handleAdUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setErrorMessage(""); // Resetando erros anteriores

    try {
      const fileExtension = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExtension}`;
      const storageRef = ref(storage, `ads/${fileName}`);

      // Fazer upload do arquivo
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      // Enviar para a API para registrar no banco
      const response = await fetch("/api/v1/ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: downloadUrl,
          userId,
          type: adType,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar anúncio no banco de dados");
      }

      const newAd = await response.json();

      // Atualizar estado com o novo anúncio
      onUpload((prev) => ({
        ...prev,
        ads: [...prev.ads, { name: fileName, url: downloadUrl }],
      }));
    } catch (error) {
      setErrorMessage("Erro ao fazer upload do anúncio. Tente novamente.");
      console.error("Erro ao fazer upload:", error);
    } finally {
      setUploading(false);
    }
  }

  async function handleDeleteAd(adId) {
    try {
      const response = await fetch(`/api/v1/ads?id=${adId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Falha ao deletar anúncio");

      onUpload((prev) => ({
        ...prev,
        ads: prev.ads.filter((ad) => ad.uuid !== adId),
      }));
    } catch (error) {
      setErrorMessage("Erro ao deletar anúncio.");
      console.error("Erro ao deletar anúncio:", error);
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Tipo de Anúncio */}
      <div className="bg-white rounded-lg p-6 border">
        <h2 className="text-xl font-semibold mb-4">
          Escolha o Tipo de Anúncio
        </h2>
        <select
          value={adType}
          onChange={(e) => setAdType(e.target.value)}
          className="border p-2 rounded"
        >
          {Object.keys(adDimensions).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <div className="mt-4 text-gray-600">
          <p>Dimensões recomendadas:</p>
          <p>
            {`${adDimensions[adType].width}px`} x{" "}
            {`${adDimensions[adType].height}px`}
          </p>
        </div>
        <PagePreviewWithAd
          width={adDimensions[adType].width}
          height={adDimensions[adType].height}
        />
      </div>

      {/* Upload do Anúncio */}
      <div className="bg-white rounded-lg p-6 border">
        <h2 className="text-xl font-semibold mb-4">Anúncios</h2>

        <label className="block w-full cursor-pointer">
          <div
            className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {uploading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="animate-spin h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Enviando...</p>
              </div>
            ) : (
              <>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Clique para fazer upload de anúncios
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAdUpload}
            disabled={uploading} // Bloqueia input durante upload
          />
        </label>

        {/* Exibir mensagem de erro */}
        {errorMessage && (
          <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
        )}

        <div className="mt-4 grid grid-cols-2 gap-4">
          {ads
            .filter((ad) => ad.type === adType)
            .map((ad) => (
              <div key={ad.name} className="relative group">
                <img
                  src={ad.url}
                  alt="Anúncio"
                  className="rounded-lg object-cover w-full h-32"
                />
                <button
                  className="absolute top-2 right-2 bg-red-500 p-1 rounded-full text-white opacity-0 group-hover:opacity-100"
                  onClick={() => handleDeleteAd(ad.uuid)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="absolute top-2 left-2 bg-red-500 p-1 rounded-full text-white opacity-0 group-hover:opacity-100">
                  {ad.type}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
