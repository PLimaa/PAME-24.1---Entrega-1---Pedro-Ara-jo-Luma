"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { FaFacebookF, FaGoogle } from "react-icons/fa";  // Importando ícones

export default function Login() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) {
      router.push('/paginas/index');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-blue-200">
      <div className="max-w-md w-full p-8 border border-gray-300 rounded-2xl shadow-xl bg-white">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Conditionally Rendered Fields */}
          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="Nome completo"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
          )}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Senha"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        {/* Forgot Password & Toggle */}
        <div className="flex justify-between items-center mt-4">
          <button
            className="text-blue-500 font-semibold hover:underline focus:outline-none"
            onClick={() => alert("Redirecionar para recuperação de senha")}
          >
            Esqueceu a senha?
          </button>
          <button
            className="text-blue-500 font-semibold hover:underline focus:outline-none"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Criar uma conta' : 'Já tenho uma conta'}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mt-8 mb-4">
          <hr className="w-1/3 border-gray-300" />
          <span className="text-gray-500 mx-2">ou</span>
          <hr className="w-1/3 border-gray-300" />
        </div>

        {/* Social Media Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button className="flex items-center justify-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none">
            <FaFacebookF className="text-xl" />
          </button>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <button className="flex items-center justify-center px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none">
            <FaGoogle className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
