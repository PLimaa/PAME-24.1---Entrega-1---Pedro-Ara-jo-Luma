import Link from "next/link";

export default function Sidebar() {
  return (
    <nav className="w-64 h-screen bg-gray-800 text-white p-4">
      <ul>
        <li><Link href="/">🏠 Início</Link></li>
        <li><Link href="/favoritos">⭐ Favoritos</Link></li>
        <li><Link href="/perfil">👤 Perfil</Link></li>
      </ul>
    </nav>
  );
}
