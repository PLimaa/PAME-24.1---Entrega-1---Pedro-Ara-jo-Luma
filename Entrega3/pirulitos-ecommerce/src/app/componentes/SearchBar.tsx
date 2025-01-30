interface SearchBarProps {
    search: string;
    setSearch: (value: string) => void;
  }
  
  export default function SearchBar({ search, setSearch }: SearchBarProps) {
    return (
      <input
        type="text"
        placeholder="Buscar pirulito..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full"
      />
    );
  }