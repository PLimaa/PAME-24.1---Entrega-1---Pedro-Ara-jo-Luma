"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from '@/app/componentes/Sidebar';

interface Lollipop {
  id: number;
  name: string;
  flavor: string;
  price: number;
  description: string;
  ingredients: string;
  image: string;
}

export default function Favoritos() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Lollipop[]>([]);

  const loadFavorites = () => {
    const storedFavorites = localStorage.getItem("favorites");
    setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
  };

  useEffect(() => {
    loadFavorites();
    const handleStorageChange = () => loadFavorites();
    window.addEventListener("favoritesUpdated", handleStorageChange);
    return () => {
      window.removeEventListener("favoritesUpdated", handleStorageChange);
    };
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 p-6">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
          <h1 className="text-4xl font-bold text-center text-purple-700 mb-6 drop-shadow-md">Favoritos</h1>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
              {favorites.map((lollipop) => (
                <div
                  key={lollipop.id}
                  className="border p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-white"
                  style={{
                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2), 0px -8px 15px rgba(0, 0, 0, 0.1)"
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
                  <button
                    onClick={() => router.push(`/paginas/lollipop/${lollipop.id}`)}
                    className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
                  >
                    Ver mais
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-4">Nenhum pirulito favoritado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
