clientes = [{id:1 , nome : "Pedro", nascimento : "26/10/2004", cpf:13329035595 ,email: "pedro@email",senha:"oi" } , 
    {id:2 , nome : "Andre", nascimento : "20/05/2003", cpf:18834509877 ,email: "pedro@email",senha:"oi" }]

const cliente = clientes.find((cliente) => cliente.email == "pedro@email" && cliente.senha == "oi")

console.log(cliente)

oi="26"


console.log(oi)

lista=[]
a=clientes.length

for(let i=0;i<a;i++){
    if(clientes[i].email=="pedro@email"){
        lista.push(clientes[i])
    }
}

console.log(lista)

const array = [1, 2, 3, 4, 5];

array.splice(2, 2);

console.log(array); 

console.log(oi.length)