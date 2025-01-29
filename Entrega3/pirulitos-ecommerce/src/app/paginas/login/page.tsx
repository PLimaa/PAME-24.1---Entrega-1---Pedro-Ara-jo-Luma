// src/pages/login.tsx
"use client"
import { useState } from 'react';

export default function Login() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Cadastro'}</h1>
      <form>
        {!isLogin && <input type="text" placeholder="Nome" required />}
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Senha" required />
        <button type="submit">{isLogin ? 'Entrar' : 'Cadastrar'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Criar uma conta' : 'Já tenho uma conta'}
      </button>
    </div>
  );
}