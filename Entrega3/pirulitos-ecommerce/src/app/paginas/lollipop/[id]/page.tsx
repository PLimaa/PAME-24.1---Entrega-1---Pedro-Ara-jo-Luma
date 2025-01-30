"use client";

import Sidebar from '@/app/componentes/Sidebar';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const lollipops = [
  { id: 1, name: "Morango", flavor: "Morango", price: 5.99, description: "Doce e saboroso.", ingredients: "Corante natural, aroma de morango.", image: "/imagens/morango.jpeg", available: true },
  { id: 2, name: "Uva", flavor: "Uva", price: 4.99, description: "Sabor marcante de uva.", ingredients: "Corante natural, aroma de uva.", image: "/imagens/uva.php", available: false },
  { id: 3, name: "Limão", flavor: "Limão", price: 5.49, description: "Refrescante e cítrico.", ingredients: "Corante natural, aroma de limão.", image: "/imagens/limao.jpeg", available: true },
  { id: 4, name: "Mirtilo", flavor: "Mirtilo", price: 5.79, description: "Frutado e levemente adocicado.", ingredients: "Corante natural, aroma de mirtilo.", image: "/imagens/mirtilo.jpeg", available: true }
];

export default function LollipopDetails() {
  const { id } = useParams();
  const [lollipop, setLollipop] = useState<any>(null);

  useEffect(() => {
    const foundLollipop = lollipops.find(l => l.id === Number(id));
    setLollipop(foundLollipop || null);
  }, [id]);

  if (!lollipop) {
    return <p className="text-center text-gray-500 mt-10">Pirulito não encontrado.</p>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <img src={lollipop.image} alt={lollipop.name} className="w-full h-72 object-cover rounded-md" />
          <h1 className="text-2xl font-bold mt-4 text-gray-800">{lollipop.name}</h1>
          <p className="text-gray-600 mt-2">{lollipop.description}</p>
          <p className="text-lg font-semibold mt-4 text-gray-800">R$ {lollipop.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">Sabor: {lollipop.flavor}</p>
          <p className="text-sm text-gray-500">Ingredientes: {lollipop.ingredients}</p>
          <p className={`mt-2 text-sm ${lollipop.available ? "text-green-500" : "text-red-500"}`}>
            {lollipop.available ? "Disponível" : "Esgotado"}
          </p>

          <button className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
            Comprar Pirulito
          </button>
        </div>
      </div>
    </div>
  );
}
