// Sistema Hotel F - Luxo //

var requisicao = require('readline-sync')

class Sistema {
    constructor () {
        this.clientes = [] 
        this.funcionarios = [] 
        this.reservas = []
        this.quartos = [] 
        this.usuarioLogado = null // Status do Usuário
    }

    fazerLogin(){
        console.log("Bem-Vindo ao login, por favor, insira as informações abaixo")
        let email = requisicao.question("Insira o email da conta por favor\n")
        let senha = requisicao.question("Insira a senha por favor\n")
        const cliente = this.clientes.find((client) => client.email == email && client.senha == senha)
        if(cliente){
            this.usuarioLogado = {tipo: "cliente", dados: cliente}
            console.log("Login bem sucedido!")
            return
        }
        const funcionario = this.funcionarios.find((worker) => worker.email == email && worker.senha == senha)
        if(funcionario){
            this.usuarioLogado = {tipo: "funcionario" , dados: funcionario}
            console.log("Login bem sucedido!")
            return
        }
        
        console.log("Erro, email ou senha incorretos")
        
    }
    fazerCadastroCliente(){
        let id = this.clientes.length + 1
        let nome = requisicao.question("Qual o seu nome?\n")
        let dia = requisicao.question("Qual o seu dia de nascimento?\n")
        let mes = requisicao.question("Qual o seu mês de nascimento?\n")
        let ano = requisicao.question("Qual o seu ano de nascimento?\n")
        let cpf = requisicao.question("Qual o seu cpf?\n")
        let email = requisicao.question("Qual o seu e-mail?\n")
        let senha = requisicao.question("Por favor insira a senha\n")
        let data = `${dia}/${mes}/${ano}`
        let novoCliente = new Cliente(id,nome,data,cpf,email,senha)
        this.clientes.push(novoCliente)
        console.log("Cadastro de cliente realizado!")
        return

    }

    fazerCadastroFuncionario(){
        let id = this.funcionarios.length + 1
        let usuario = requisicao.question("Qual será o nome do Usuário?\n")
        let cpf = requisicao.question("Qual o seu cpf?\n")
        let email = requisicao.question("Qual o seu e-mail?\n")
        let senha = requisicao.question("Por favor insira a senha\n")
        let novoFuncionario = new Funcionário(id,usuario,cpf,email,senha)
        this.funcionarios.push(novoFuncionario)
        console.log("Cadastro de funcionário realizado!")
        return
    }

    verMeusDados(){
        return this.usuarioLogado.dados
    }

    VerListaReservas(){
        return this.reservas
    }

    verListaQuartos(){
        return this.quartos
    }

    verListaClientes(){
        return this.clientes
    }

    mudarStatusReserva(){
        let id = requisicao.question("Qual o id da Reserva que gostaria de alterar o status?\n")
        let reserva = this.reservas.find((numero) => numero.id == id)
        let status = requisicao.question("Qual seria o novo status da reserva? (pendente, adiada, realizada, cancelada) \n")
        reserva.status = status
    }

    adicionarQuarto(){
        let camas = requisicao.question("Quantas camas terá o quarto?\n")
        let preco_noite = requisicao.question("Quak será o preco por noite do quarto?\n")
        let disponivel = requisicao.question("Qual será a disponibilidade do quarto?\n")
        let nome = requisicao.question("Qual será o nome do quarto?\n")
        let descricao = requisicao.question("Qual será a descrição do quarto?\n")
        let quarto = new Quartos(camas,preco_noite,disponivel,nome,descricao)
        this.quartos.push(quarto)
    }

    fazerReserva(){
        let id = this.reservas.length() + 1
        let idCliente = this.usuarioLogado.dados.id
        let status = "pendente"
        let dia_checkin = requisicao.question("Qual será o dia de checkin?\n")
        let mes_checkin = requisicao.question("Qual será o mês de checkin?\n")
        let ano_checkin = requisicao.question("Qual será o ano de checkin?\n")
        let dia_checkout = requisicao.question("Qual será o dia de checkout?\n")
        let mes_checkout = requisicao.question("Qual será o mês de checkout?\n")
        let ano_checkout = requisicao.question("Qual será o ano de checkout?\n")
        let data_checkin = `${dia_checkin}/${mes_checkin}/${ano_checkin}`
        let data_checkout = `${dia_checkout}/${mes_checkout}/${ano_checkout}`
        let reserva = new Reserva (id,idCliente,status,data_checkin,data_checkout)
        this.reservas.push(reserva)

    }
    
    cancelarReserva(){
        let idCliente = this.usuarioLogado.dados.idCliente
        let reserva = this.reservas.find((r) => r.idCliente == idCliente)
        reserva.status = "cancelada"
    }

    verReservas(){
        let reservas = []
        idCliente = this.usuarioLogado.dados.idCliente
        for (let i = 0; i<this.reservas.length;i++){
            if (this.reservas[i].idCliente == idCliente){
                reservas.push(this.reservas[i])
            }
        }
        return reservas
    }

    sairPrograma(){
        console.log("Saindo do programa...")
    }


}

class Reserva {
    constructor (id,idCliente,status,check_in,check_out) {
        this.id = id
        this.idCliente = idCliente
        this.status = status
        this.check_in = check_in
        this.check_out = check_out
    }

}
class Funcionário {
    constructor (id,nomeUsuario,cpf,email,senha) {
        this.id = id
        this.nomeUsuario = nomeUsuario
        this.cpf = cpf
        this.email = email
        this.senha = senha
    }
}

class Cliente {
    constructor (id,nome,nascimento,cpf,email,senha) {
        this.id = id
        this.nome = nome
        this.nascimento = nascimento
        this.cpf = cpf
        this.email = email
        this.senha = senha
    }
}

class Quartos {
    constructor (camas,preco_noite,disponivel,nome,descricao) {
        this.camas = camas
        this.preco_noite = preco_noite
        this.disponivel = disponivel
        this.nome = nome
        this.descricao = descricao
    }
}

function introducao() {
    console.log("Seja Bem-Vindo à plataforma digital do Hotel F-Luxo");
    console.log("Qual das opções abaixo gostaria de realizar? (Insira o número por favor)");
    console.log("1. Fazer Login");
    console.log("2. Fazer Cadastro como Cliente");
    console.log("3. Fazer Cadastro como Funcionário");
    console.log("4. Sair do Programa");
    const n = requisicao.question();
    return n; 
}


function controle(sessao,n){
    if(n =="1"){
        sessao.fazerLogin()
        if (sessao.usuarioLogado.tipo == "cliente"){
            console.log(`Bem-vindo ${sessao.usuarioLogado.dados.nomeUsuario}, gostaria de realizar qual ação?`)
            console.log("1. Ver meus Dados")
            console.log("2. Ver Lista de Quartos")
            console.log("3. Fazer reserva")
            console.log("4. Cancelar reserva")
            console.log("5. Ver minhas reservas")
            x = requisicao.question()
            switch(x){
                case 1:
                    sessao.verMeusDados()
                    break
                case 2:
                    sessao.verListaQuartos()
                    break
                case 3:
                    sessao.fazerReserva()
                    break
                case 4:
                    sessao.cancelarReserva()
                    break
                case 5:
                    sessao.verReservas()
                    break

            }
        }

        else if (sessao.usuarioLogado.tipo == "funcionario"){
            console.log(`Bem-vindo ${sessao.usuarioLogado.dados.nomeUsuario}, gostaria de realizar qual ação?`)
            console.log("1. Ver meus Dados")
            console.log("2. Ver Lista de Reservas")
            console.log("3. Ver Lista de Quartos")
            console.log("4. Ver Lista de Clientes")
            console.log("5. Mudar status da reserva (pendente, adiada, realizada, cancelada)")
            console.log("6. Adicionar Quarto")
            x = requisicao.question()
            switch(x){
                case 1:
                    sessao.verMeusDados()
                    break
                case 2:
                    sessao.VerListaReservas()
                    break
                case 3:
                    sessao.verListaQuartos()
                    break
                case 4:
                    sessao.verListaClientes()
                    break
                case 5:
                    sessao.mudarStatusReserva()
                    break
                case 6:
                    sessao.adicionarQuarto()
                    break

            }
            

        }
    }
    else if(n == "2"){
        sessao.fazerCadastroCliente()
    }
    else if(n == "3"){
        sessao.fazerCadastroFuncionario()
    }
    else if(n == "4"){
        sessao.sairPrograma()
    }
}

function main(){
    const sessao = new Sistema
    while(true){
        const n = introducao()
        controle(sessao,n)
        if(n=="4"){
            break
        }
    }
}

main()
