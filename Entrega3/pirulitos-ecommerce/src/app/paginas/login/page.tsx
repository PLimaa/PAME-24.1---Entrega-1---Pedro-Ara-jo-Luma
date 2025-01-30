// src/pages/login.tsx
"use client"
import { useState } from 'react'
import { useRouter } from "next/navigation"

export default function Login() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(e.currentTarget.checkValidity()){  
      router.push('/paginas/index'); 
    } 
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="max-w-md mx-auto mt-12 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800  ">
          {isLogin ? 'Login' : 'Cadastro'}
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Nome"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >  
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>
        <button
          className="w-full px-4 py-2 mt-4 text-blue-600 font-semibold bg-transparent hover:underline focus:outline-none"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Criar uma conta' : 'Já tenho uma conta'}
        </button>
      </div>
    </div>  
  );
}