import { useRouter } from "next/router";

export default function LollipopDetail() {
  const router = useRouter();
  const { id } = router.query;

  const pirulitos = {
    1: { name: "Pirulito de Morango", flavor: "Morango", price: 2.5, desc: "Doce e saboroso" },
    2: { name: "Pirulito de Uva", flavor: "Uva", price: 2.8, desc: "Sabor intenso de uva" },
  };

  const pirulito = pirulitos[Number(id) as keyof typeof pirulitos];

  if (!pirulito) return <p>Carregando...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{pirulito.name}</h1>
      <p>Sabor: {pirulito.flavor}</p>
      <p>Preço: R$ {pirulito.price.toFixed(2)}</p>
      <p>{pirulito.desc}</p>
      <button className="bg-green-500 text-white p-2 rounded mt-2">Comprar Pirulito</button>
    </div>
  );
}
