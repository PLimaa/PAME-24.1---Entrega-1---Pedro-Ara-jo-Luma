"use client";

import Sidebar from '@/app/componentes/Sidebar'; // Importa o componente Sidebar
import { useParams } from "next/navigation"; // Hook do Next.js para acessar parâmetros da URL
import { useEffect, useState } from "react"; // Hooks do React para gerenciar estado e efeitos

// Lista de pirulitos com detalhes como nome, sabor, preço, descrição, ingredientes e imagem
const lollipops = [
  { id: 1, name: "Cereja", flavor: "Cereja", price: 4.58, pricebag: 68.68,  description:"Doce e levemente ácido, com um toque refrescante.", ingredients: "Eritritol, Isomalte, Acidulante: Ácido cítrico, Aromatizante natural sabor cereja e Corante carmim", image: "/imagens/cereja.php", available: true},
  { id: 2, name: 'Uva', flavor: 'Uva', price: 4.58, pricebag: 68.68, description: 'Sabor marcante de uva.', ingredients: 'Eritritol, Isomalte, Acidulante: Ácido cítrico, Aromatizante natural sabor uva e Corante uva', image: '/imagens/uva.php' },
  { id: 3, name: 'Limão', flavor: 'Limão', price: 4.58, pricebag: 68.68, description: 'Refrescante e cítrico.', ingredients: 'Eritritol, Isomalte, Acidulante: Ácido cítrico, Aromatizante natural sabor limão e Corante verde', image: '/imagens/limao.jpeg' },
  { id: 4, name: "Mirtilo", flavor: "Mirtilo", price: 4.58, pricebag: 68.68, description: "Frutado e levemente adocicado.", ingredients: "Eritritol, Isomalte, Acidulante: Ácido cítrico, Aromatizante natural sabor mirtilo e Corante azul", image: "/imagens/mirtilo.jpeg", available: true },
  { id: 5, name: 'Morango', flavor: 'Morango', price: 4.58, pricebag: 68.68, description: 'Doce e saboroso.', ingredients: 'Eritritol, Isomalte, Acidulante: Ácido cítrico, Aromatizante natural sabor morango e Corante carmim', image: '/imagens/morango.jpeg' },
];

export default function LollipopDetails() {
  const { id } = useParams(); // Obtém o parâmetro `id` da URL
  const [lollipop, setLollipop] = useState<any>(null); // Estado para armazenar o pirulito selecionado

  // Efeito para buscar o pirulito correspondente ao `id` da URL
  useEffect(() => {
    const foundLollipop = lollipops.find(l => l.id === Number(id)); // Procura o pirulito pelo `id`
    setLollipop(foundLollipop || null); // Atualiza o estado com o pirulito encontrado ou `null` se não existir
  }, [id]);

  // Se o pirulito não for encontrado, exibe uma mensagem de erro
  if (!lollipop) {
    return <p className="text-center text-gray-500 mt-10">Pirulito não encontrado.</p>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Renderiza o componente Sidebar */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-200 p-6">
        {/* Card de detalhes do pirulito */}
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          {/* Imagem do pirulito */}
          <img src={lollipop.image} alt={lollipop.name} className="w-full h-72 object-cover rounded-md" />
          
          {/* Nome do pirulito */}
          <h1 className="text-2xl font-bold mt-4 text-gray-800">{lollipop.name}</h1>
          
          {/* Descrição do pirulito */}
          <p className="text-gray-600 mt-2">{lollipop.description}</p>
          
          {/* Preço unitário e por pacote */}
          <p className="text-lg font-semibold mt-4 text-gray-800">R$ {lollipop.price.toFixed(2)}</p>
          <p className="text-lg font-semibold mt-4 text-gray-800">R$ {lollipop.pricebag.toFixed(2)} (Preço por pacote)</p>
          
          {/* Sabor e ingredientes */}
          <p className="text-sm text-gray-500">Sabor: {lollipop.flavor}</p>
          <p className="text-sm text-gray-500">Ingredientes: {lollipop.ingredients}</p>
          
          {/* Disponibilidade */}
          <p className={`mt-2 text-sm ${lollipop.available ? "text-green-500" : "text-red-500"}`}>
            {lollipop.available ? "Disponível" : "Esgotado"}
          </p>

          {/* Botão de compra */}
          <button className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
            Comprar Pirulito
          </button>
        </div>
      </div>
    </div>
  );
}