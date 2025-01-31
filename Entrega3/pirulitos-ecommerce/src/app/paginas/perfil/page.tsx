"use client";

import Sidebar from '@/app/componentes/Sidebar'; // Importa o componente Sidebar
import Image from "next/image"; // Importa o componente Image do Next.js para otimização de imagens

export default function Perfil() {
  // Dados do usuário (simulados)
  const user = {
    name: "Pedro Araújo Lima",
    email: "pedro.lima.20231@poli.ufrj.br",
    phone: "+55 (21) 99434-5678",
    profilePicture: "/imagens/perfil.avif" // Caminho da imagem de perfil
  };

  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Renderiza o componente Sidebar */}
      <div className="flex-1 bg-gradient-to-br from-blue-100 to-green-200 p-8">
        {/* Container principal do perfil */}
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center space-x-6">
          {/* Imagem de perfil */}
          <div className="w-32 h-32 md:w-40 md:h-40 relative mb-6 md:mb-0">
            <Image
              src={user.profilePicture} // Caminho da imagem
              alt="Foto de Perfil" // Texto alternativo para acessibilidade
              layout="fill" // Faz a imagem preencher o contêiner
              className="rounded-full object-cover shadow-lg" // Estilização da imagem
            />
          </div>

          {/* Detalhes do perfil */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-3xl font-semibold text-gray-800">{user.name}</h1> {/* Nome do usuário */}
            <p className="text-lg text-gray-600">{user.email}</p> {/* Email do usuário */}
            <p className="text-md text-gray-500">{user.phone}</p> {/* Telefone do usuário */}

            {/* Botão para editar perfil */}
            <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
              Editar Perfil
            </button>
          </div>
        </div>

        {/* Seção de informações adicionais */}
        <div className="mt-10 max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Informações Adicionais</h2> {/* Título da seção */}
          <div className="space-y-3">
            {/* Endereço do usuário */}
            <div className="flex justify-between text-gray-700">
              <span><strong>Endereço:</strong></span>
              <span>Rua Maria, 333 - Fortaleza, CE</span>
            </div>
            {/* Data de nascimento do usuário */}
            <div className="flex justify-between text-gray-700">
              <span><strong>Data de nascimento:</strong></span>
              <span>26 de Outubro, 2004</span>
            </div>
            {/* Preferências do usuário */}
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