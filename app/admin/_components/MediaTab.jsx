import { useEffect } from "react";
import { FileText, Trash2, Upload } from "lucide-react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "infra/firebase";

export function MediaTab({ media, onUpload }) {
  async function fetchMedia(userId) {
    try {
      const storageImageRef = ref(storage, `images`);
      const dataImages = await listAll(storageImageRef);

      const images = [];
      const documents = [];

      for (const item of dataImages.items) {
        const imageUrl = await getDownloadURL(ref(storageImageRef, item.name));
        images.push({
          name: item.name,
          url: imageUrl,
        });
      }

      const storageDocumentRef = ref(storage, `documents`);
      const dataDocuments = await listAll(storageDocumentRef);

      for (const item of dataDocuments.items) {
        const documentUrl = await getDownloadURL(
          ref(storageDocumentRef, item.name)
        );
        documents.push({
          name: item.name,
          url: documentUrl,
        });
      }

      onUpload({
        images,
        documents,
      });
    } catch (error) {
      console.error("Erro ao buscar mídia:", error);
    }
  }

  async function handleMediaUpload(e, type) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      // Criar um nome único para o arquivo
      const fileExtension = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExtension}`;

      // Criar referência para o arquivo no Firebase Storage
      const storageRef = ref(storage, `${type}s/${fileName}`);

      // Fazer upload do arquivo
      const snapshot = await uploadBytes(storageRef, file);

      // Obter a URL do arquivo
      const downloadUrl = await getDownloadURL(snapshot.ref);

      if (type === "image") {
        setMedia((prev) => ({
          ...prev,
          images: [...prev.images, data],
        }));
      } else {
        setMedia((prev) => ({
          ...prev,
          documents: [...prev.documents, data],
        }));
      }
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    }
  }

  async function handleDeleteMedia(mediaId, type) {
    try {
      const response = await fetch(`/api/v1/blogs/media/${mediaId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Falha ao deletar mídia");

      if (type === "image") {
        setMedia((prev) => ({
          ...prev,
          images: prev.images.filter((img) => img.id !== mediaId),
        }));
      } else {
        setMedia((prev) => ({
          ...prev,
          documents: prev.documents.filter((doc) => doc.id !== mediaId),
        }));
      }
    } catch (error) {
      console.error("Erro ao deletar mídia:", error);
    }
  }

  useEffect(() => {
    function checkAuth() {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      const userData = JSON.parse(userStr);

      if (!token || !userStr) {
        window.location.href = "/autenticacao/login";
        return;
      }

      fetchMedia(userData.id);
    }

    checkAuth();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Image Upload */}
      <div className="bg-white rounded-lg p-6 border">
        <h2 className="text-xl font-semibold mb-4">Imagens</h2>
        <label className="block w-full cursor-pointer">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              Clique para fazer upload de imagens
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleMediaUpload(e, "image")}
          />
        </label>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {media.images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image.url}
                alt={image.name}
                className="rounded-lg object-cover w-full h-32"
              />
              <button className="absolute top-2 right-2 bg-red-500 p-1 rounded-full text-white opacity-0 group-hover:opacity-100">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Document Upload */}
      <div className="bg-white rounded-lg p-6 border">
        <h2 className="text-xl font-semibold mb-4">Documentos</h2>
        <label className="block w-full cursor-pointer">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              Clique para fazer upload de documentos
            </p>
          </div>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => handleMediaUpload(e, "document")}
          />
        </label>

        <div className="mt-4 space-y-2">
          {media.documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium">{doc.name}</span>
              </div>
              <button className="text-red-500 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
