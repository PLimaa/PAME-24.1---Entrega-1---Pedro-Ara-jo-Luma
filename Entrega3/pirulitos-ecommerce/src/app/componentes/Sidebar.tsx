import { useRouter } from "next/navigation";
import { Home, Star, User, ShoppingCart, Package, Settings, HelpCircle, LogOut} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-6 flex flex-col justify-between shadow-lg">
      <nav>
        <ul className="space-y-6">
          <li>
            <button
              onClick={() => router.push("/paginas/index")}
              className="flex items-center gap-3 text-lg p-3 rounded-lg hover:bg-gray-700 transition-all w-full"
            >
              <Home size={20} /> Página Inicial
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/paginas/favoritos")}
              className="flex items-center gap-3 text-lg p-3 rounded-lg hover:bg-gray-700 transition-all w-full"
            >
              <Star size={20} /> Favoritos
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/paginas/perfil")}
              className="flex items-center gap-3 text-lg p-3 rounded-lg hover:bg-gray-700 transition-all w-full"
            >
              <User size={20} /> Perfil
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/paginas/carrinho")}
              className="flex items-center gap-3 text-lg p-3 rounded-lg hover:bg-gray-700 transition-all w-full"
            >
              <ShoppingCart size={20} /> Carrinho
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/paginas/pedidos")}
              className="flex items-center gap-3 text-lg p-3 rounded-lg hover:bg-gray-700 transition-all w-full"
            >
              <Package size={20} /> Meus Pedidos
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/paginas/configuracoes")}
              className="flex items-center gap-3 text-lg p-3 rounded-lg hover:bg-gray-700 transition-all w-full"
            >
              <Settings size={20} /> Configurações
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/paginas/ajuda")}
              className="flex items-center gap-3 text-lg p-3 rounded-lg hover:bg-gray-700 transition-all w-full"
            >
              <HelpCircle size={20} /> Suporte
            </button>
          </li>
        </ul>
      </nav>

      <div className="mt-6">
        <button
          onClick={() => router.push("/paginas/login")}
          className="flex items-center gap-3 text-lg p-3 rounded-lg hover:bg-red-700 transition-all w-full"
        >
          <LogOut size={20} /> Sair
        </button>
      </div>
    </div>
  );
}
