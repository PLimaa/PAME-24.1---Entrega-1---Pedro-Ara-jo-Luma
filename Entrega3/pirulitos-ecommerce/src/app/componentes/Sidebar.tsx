import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  return (
    <div className='flex flex-col'>
      <div className="w-60 bg-gray-800 text-white p-10 h-full">
        <nav className='h-full'>
          <ul className='h-full flex flex-col items-center justify-between'>
            <li className="mb-4">
              <button onClick={() => router.push("/paginas/index")} className="text-white">Página Inicial</button></li>
            <li className="mb-4">
              <button onClick={() => router.push("/paginas/favoritos")} className="text-white">Favoritos</button></li>
            <li>
            <button onClick={() => router.push("/paginas/perfil")} className="text-white">Perfil</button></li>
          </ul>
        </nav>
      </div>
    </div>
    );
  }