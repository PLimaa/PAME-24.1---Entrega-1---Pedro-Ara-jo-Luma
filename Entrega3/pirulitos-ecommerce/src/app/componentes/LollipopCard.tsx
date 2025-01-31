"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define a interface para as propriedades do componente
interface LollipopProps {
  lollipop: {
    id: number;
    name: string;
    flavor: string;
    price: number;
    pricebag: number;
    description: string;
    ingredients: string;
    image: string;
  };
}

export default function LollipopCard({ lollipop }: LollipopProps) {
  const router = useRouter(); // Hook para navegação
  const [isFavorited, setIsFavorited] = useState(false); // Estado para controlar se o pirulito está favoritado

  useEffect(() => {
    // Recupera os favoritos do localStorage
    const storedFavorites = localStorage.getItem("favorites");
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    
    // Verifica se o pirulito atual está na lista de favoritos
    setIsFavorited(favorites.some((fav: { id: number }) => fav.id == lollipop.id));
  }, [lollipop.id]);

  const handleToggleFavorite = () => {
    const storedFavorites = localStorage.getItem("favorites");
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (isFavorited) {
      // Remove o pirulito da lista de favoritos
      favorites = favorites.filter((fav: { id: number }) => fav.id != lollipop.id);
    } else {
      // Adiciona o pirulito à lista de favoritos
      favorites.push(lollipop);
    }
    
    // Atualiza o localStorage com a nova lista de favoritos
    localStorage.setItem("favorites", JSON.stringify(favorites));
    
    // Atualiza o estado para refletir a mudança
    setIsFavorited(!isFavorited);

    // Dispara um evento para notificar outras partes da aplicação sobre a mudança
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <div
      className="border p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
      style={{
        boxShadow: 
          "0px 8px 15px rgba(0, 0, 0, 0.2), 0px -8px 15px rgba(0, 0, 0, 0.1)" 
      }}
    >
      {/* Imagem do pirulito */}
      <img
        src={lollipop.image}
        alt={lollipop.name}
        className="w-full h-40 object-cover rounded-md"
      />
      
      {/* Nome do pirulito */}
      <h2 className="text-lg font-bold mt-2 text-black">{lollipop.name}</h2>
      
      {/* Descrição */}
      <p className="text-sm text-gray-600">{lollipop.description}</p>
      
      {/* Preços */}
      <p className="text-md font-semibold mt-1 text-black">R$ {lollipop.price.toFixed(2)}</p>
      <p className="text-md font-semibold mt-1 text-black">R$ {lollipop.pricebag.toFixed(2)} (Preço por pacote)</p>
      
      {/* Botões de ação */}
      <div className="flex gap-4 mt-2">
        <button
          onClick={() => router.push(`/paginas/lollipop/${lollipop.id}`)}
          className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
        >
          Ver mais
        </button>
        
        <button
          onClick={handleToggleFavorite}
          className={`mt-2 ${isFavorited ? "bg-gray-500" : "bg-red-500"} text-white px-4 py-1 rounded`}
        >
          {isFavorited ? "Desfavoritar" : "Favoritar"}
        </button>
      </div>
    </div>
  );
}
