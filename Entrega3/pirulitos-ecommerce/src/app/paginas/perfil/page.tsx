"use client"

import Sidebar from '@/app/componentes/Sidebar';


import { useEffect, useState } from "react";
import Link from "next/link";

interface UserProfile {
  name: string;
  email: string;
}

export default function Perfil() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex h-screen">
            <Sidebar />
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center">Perfil</h1>
        {user ? (
          <div className="mt-4">
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500">Nenhum usuário logado.</p>
        )}
      </div>
    </div>
    </div>

  );
}
