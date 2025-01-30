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
      const storedFavorites = localStorage.getItem("favorites")
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : []
      const isAlreadyFavorited = favorites.some (
        (fav : {id : number}) => fav.id == lollipop.id
      )
      setIsFavorited(isAlreadyFavorited)
    }, [lollipop.id])

    const handleFavorite = () => {
      // Recupera os favoritos do localStorage
      const storedFavorites = localStorage.getItem("favorites");
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : []
      if (!favorites.some((fav: { id: number }) => fav.id === lollipop.id)) {
        favorites.push(lollipop);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFavorited(true);
      }
    };
    return (
      <div className="border p-4 rounded-lg shadow-md">
        <img src={lollipop.image} alt={lollipop.name} className="w-full h-40 object-cover rounded-md" />
        <h2 className="text-lg font-bold mt-2">{lollipop.name}</h2>
        <p className="text-sm text-gray-600">{lollipop.description}</p>
        <p className="text-md font-semibold mt-1">R$ {lollipop.price.toFixed(2)}</p>
        <button onClick={() => router.push(`/paginas/lollipop/${lollipop.id}`)} className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">Ver mais</button>
        <button
        onClick={handleFavorite}
        className={`mt-2 ${isFavorited ? "bg-gray-500" : "bg-red-500"} text-white px-4 py-1 rounded`}
        disabled={isFavorited}
      >
        {isFavorited ? "Favoritado" : "Favoritar"}
      </button>
      </div>
    );
  }