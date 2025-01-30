"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LollipopProps {
  lollipop: {
    id: number;
    name: string;
    flavor: string;
    price: number;
    description: string;
    ingredients: string;
    image: string;
  };
}

export default function LollipopCard({ lollipop }: LollipopProps) {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    setIsFavorited(favorites.some((fav: { id: number }) => fav.id == lollipop.id));
  }, [lollipop.id]);

  const handleToggleFavorite = () => {
    const storedFavorites = localStorage.getItem("favorites");
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (isFavorited) {
      favorites = favorites.filter((fav: { id: number }) => fav.id != lollipop.id);
    } else {
      favorites.push(lollipop);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorited(!isFavorited);

    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <div
      className="border p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
      style={{
        boxShadow: 
          "0px 8px 15px rgba(0, 0, 0, 0.2), 0px -8px 15px rgba(0, 0, 0, 0.1)" // sombra em cima e embaixo
      }}
    >
      <img
        src={lollipop.image}
        alt={lollipop.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-lg font-bold mt-2 text-black">{lollipop.name}</h2>
      <p className="text-sm text-gray-600">{lollipop.description}</p>
      <p className="text-md font-semibold mt-1 text-black">R$ {lollipop.price.toFixed(2)}</p>
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
