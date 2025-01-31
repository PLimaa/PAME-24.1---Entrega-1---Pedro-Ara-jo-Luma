"use client"

import { useState } from 'react';
import Sidebar from '@/app/componentes/Sidebar';
import LollipopCard from '@/app/componentes/LollipopCard';
import SearchBar from '@/app/componentes/SearchBar';

// Lista de pirulitos disponíveis na loja
const lollipops = [
  { id: 1, name: "Cereja", flavor: "Cereja", price: 4.58, pricebag: 68.68,  description:"Doce e levemente ácido, com um toque refrescante.", ingredients: "eritritol, isomalte, acidulante: ácido cítrico, aromatizante natural sabor cereja e corante carmim", image: "/imagens/cereja.php", available: true},
  { id: 2, name: 'Uva', flavor: 'Uva', price: 4.58, pricebag: 68.68, description: 'Sabor marcante de uva.', ingredients: 'Açúcar, corante natural, aroma de uva.', image: '/imagens/uva.php' },
  { id: 3, name: 'Limão', flavor: 'Limão', price: 4.58, pricebag: 68.68, description: 'Refrescante e cítrico.', ingredients: 'Açúcar, corante natural, aroma de limão.', image: '/imagens/limao.jpeg' },
  { id: 4, name: "Mirtilo", flavor: "Mirtilo", price: 4.58, pricebag: 68.68, description: "Frutado e levemente adocicado.", ingredients: "Corante natural, aroma de mirtilo.", image: "/imagens/mirtilo.jpeg", available: true },
  { id: 5, name: 'Morango', flavor: 'Morango', price: 4.58, pricebag: 68.68, description: 'Doce e saboroso.', ingredients: 'Açúcar, corante natural, aroma de morango.', image: '/imagens/morango.jpeg' },
];

export default function Home() {
  const [search, setSearch] = useState(''); // Estado para armazenar o termo de busca

  // Filtra os pirulitos de acordo com a busca do usuário
  const filteredLollipops = lollipops.filter(lollipop => 
    lollipop.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Componente da barra lateral de navegação */}
      <div className="flex flex-col w-full p-6 overflow-y-auto h-screen bg-gradient-to-br from-blue-100 to-green-200">
        <h1 className="text-4xl font-bold text-center text-black mb-6 drop-shadow-md">ZeroLito</h1>
        <SearchBar search={search} setSearch={setSearch} /> {/* Barra de pesquisa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {filteredLollipops.map(lollipop => (
            <LollipopCard key={lollipop.id} lollipop={lollipop} /> // Renderiza cada pirulito como um card
          ))}
        </div>
      </div>
    </div>
  );
}
