interface SearchBarProps {
  search: string; // Estado que armazena o valor da busca
  setSearch: (value: string) => void; // Função para atualizar o estado da busca
}

export default function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <input
      type="text" // Campo de entrada de texto
      placeholder="Buscar pirulito..." // Placeholder exibido quando o campo está vazio
      value={search} // Valor do campo, ligado ao estado search
      onChange={(e) => setSearch(e.target.value)} // Atualiza o estado ao digitar
      className="p-2 border border-gray-300 rounded w-full text-black" // Estilização do input
    />
  );
}
