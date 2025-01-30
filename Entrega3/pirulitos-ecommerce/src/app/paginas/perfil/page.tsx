"use client";

import Sidebar from '@/app/componentes/Sidebar';
import Image from "next/image";

export default function Perfil() {
  const user = {
    name: "Pedro Araújo Lima",
    email: "pedro.lima.20231@poli.ufrj.br",
    phone: "+55 (21) 99434-5678",
    profilePicture: "/imagens/perfil.avif"
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gradient-to-br from-blue-100 to-green-200 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center space-x-6">
          {/* Profile Image */}
          <div className="w-32 h-32 md:w-40 md:h-40 relative mb-6 md:mb-0">
            <Image
              src={user.profilePicture}
              alt="Foto de Perfil"
              layout="fill"
              className="rounded-full object-cover shadow-lg"
            />
          </div>

          {/* Profile Details */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-3xl font-semibold text-gray-800">{user.name}</h1>
            <p className="text-lg text-gray-600">{user.email}</p>
            <p className="text-md text-gray-500">{user.phone}</p>

            {/* Edit Profile Button */}
            <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
              Editar Perfil
            </button>
          </div>
        </div>

        {/* Additional Profile Information (e.g., address, preferences) */}
        <div className="mt-10 max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Informações Adicionais</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-700">
              <span><strong>Endereço:</strong></span>
              <span>Rua Maria, 333 - Fortaleza, CE</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span><strong>Data de nascimento:</strong></span>
              <span>26 de Outubro, 2004</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span><strong>Preferências:</strong></span>
              <span>Sabor: Morango, Cor: Azul</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
