"use client"

import { useState } from 'react';
import Sidebar from '@/app/componentes/Sidebar';
import LollipopCard from '@/app/componentes/LollipopCard';
import SearchBar from '@/app/componentes/SearchBar';

const lollipops = [
  { id: 1, name: 'Morango', flavor: 'Morango', price: 5.99, description: 'Doce e saboroso.', ingredients: 'Açúcar, corante natural, aroma de morango.', image: '/imagens/morango.jpeg' },
  { id: 2, name: 'Uva', flavor: 'Uva', price: 4.99, description: 'Sabor marcante de uva.', ingredients: 'Açúcar, corante natural, aroma de uva.', image: '/imagens/uva.php' },
  { id: 3, name: 'Limão', flavor: 'Limão', price: 5.49, description: 'Refrescante e cítrico.', ingredients: 'Açúcar, corante natural, aroma de limão.', image: '/imagens/limao.jpeg' },
  { id: 4, name: "Mirtilo", flavor: "Mirtilo", price: 5.79, description: "Frutado e levemente adocicado.", ingredients: "Corante natural, aroma de mirtilo.", image: "/imagens/mirtilo.jpeg", available: true }
];

export default function Home() {
  const [search, setSearch] = useState('');

  const filteredLollipops = lollipops.filter(lollipop => 
    lollipop.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-full p-6 overflow-y-auto h-screen bg-gradient-to-br from-pink-100 to-purple-200">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-6 drop-shadow-md">ZeroLito</h1>
        <SearchBar search={search} setSearch={setSearch} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {filteredLollipops.map(lollipop => (
            <LollipopCard key={lollipop.id} lollipop={lollipop} />
          ))}
        </div>
      </div>
    </div>
  );
}
