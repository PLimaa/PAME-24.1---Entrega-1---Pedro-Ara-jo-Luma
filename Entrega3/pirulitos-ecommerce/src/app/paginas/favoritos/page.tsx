"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
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
  const [favorites, setFavorites] = useState<Lollipop[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center">Favoritos</h1>
        {favorites.length > 0 ? (
          <ul className="mt-4">
            {favorites.map((lollipop) => (
              <li key={lollipop.id} className="border-b py-2">
                <p><strong>{lollipop.name}</strong> - R$ {lollipop.price.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Nenhum pirulito favoritado.</p>
        )}
      </div>
    </div>
    </div>
  );
}
