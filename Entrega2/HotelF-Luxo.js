// Sistema Hotel F - Luxo //

var requisicao = require('readline-sync')

// classe Sistema. engloba os metodos de interacao para usuarios logados.
// possui atributos de controle, listas de clientes,funcionarios,reservas e quartos
// atributo usuarioLogado. atributo criado com a intencao de diferenciar um usuario logado de um nao logado, alem de conter a credencial do mesmo como cliente ou funcionario
class Sistema {
    constructor () {
        this.clientes = [] // lista contendo os clientes cadastrados, inicialmente vazia
        this.funcionarios = [] // lista contendo os funcionarios cadastrados, inicialmente vazia
        this.reservas = [] // lista contendo as reservas, inicialmente vazia
        this.quartos = []  //lista contendo os quartos, inicialmente vazia
        this.usuarioLogado = null // status do usuario, define o tipo, cliente e funcionario, alem dos dados do usuario
    }

//metodo para realizar o login, procura o email e senha tanto na lista de funcionarios, quanto na de clientes, definindo seu tipo de acordo.
//usuarioLogado = {tipo:"cliente ou funcionario", dados: dados do usuario}
    fazerLogin(){
        console.log("Bem-Vindo ao login, por favor, insira as informacoes abaixo")
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
        this.usuarioLogado = "erro"
        
        console.log("Erro, email ou senha incorretos. Retornando ao Menu principal.")
        
    }

//metodo para realizar cadastro, recolhe os dados e insere na lista de clientes ou funcionarios, a depender da escolha do usuario.
    fazerCadastroCliente(){
        console.log("Bem-Vindo ao Cadastro como Cliente, por favor, insira as informacoes abaixo")
        let id = this.clientes.length + 1
        let nome = requisicao.question("Qual o seu nome?\n")
        let dia = requisicao.question("Qual o seu dia de nascimento?\n")
        let mes = requisicao.question("Qual o seu mes de nascimento?\n")
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
        console.log("Bem-Vindo ao Cadastro como Funcionario, por favor, insira as informacoes abaixo")
        let id = this.funcionarios.length + 1
        let usuario = requisicao.question("Qual sera o nome do Usuario?\n")
        let cpf = requisicao.question("Qual o seu cpf?\n")
        let email = requisicao.question("Qual o seu e-mail?\n")
        let senha = requisicao.question("Por favor insira a senha\n")
        let novoFuncionario = new Funcionário(id,usuario,cpf,email,senha)
        this.funcionarios.push(novoFuncionario)
        console.log("Cadastro de funcionario realizado!")
        return
    }

// metodo para visualizacao dos dados do usuario
    verMeusDados(){
        return this.usuarioLogado.dados
    }

// metodo para visualizacao da lista de reservas
    VerListaReservas(){
        return this.reservas
    }
// metodo para visualizacao da lista de quartos
    verListaQuartos(){
        return this.quartos
    }

// metodo para visualizacao da lista de clientes
    verListaClientes(){
        return this.clientes
    }

// metodo destinado a funcionarios. Altera status da reserva a partir do id da mesma, id essa única.
    mudarStatusReserva(){
        let id = requisicao.question("Qual o id da Reserva que gostaria de alterar o status?\n")
        let reserva = this.reservas.find((numero) => numero.id == id)
        let status = requisicao.question("Qual seria o novo status da reserva? (pendente, adiada, realizada, cancelada) \n")
        reserva.status = status
        console.log("Status da reserva alterado.")
    }

// metodo destinado a funcionarios. Recolhe os dados e insere um novo quarto na lista de quartos. 
    adicionarQuarto(){
        let camas = requisicao.question("Quantas camas tera o quarto?\n")
        let preco_noite = requisicao.question("Quak sera o preco por noite do quarto?\n")
        let disponivel = requisicao.question("Qual sera a disponibilidade do quarto?\n")
        let nome = requisicao.question("Qual sera o nome do quarto?\n")
        let descricao = requisicao.question("Qual sera a descricao do quarto?\n")
        let quarto = new Quartos(camas,preco_noite,disponivel,nome,descricao)
        this.quartos.push(quarto)
        console.log("Quarto adicionado com sucesso!")
    }

// metodo destinado a clientes. Recolhe os dados e insere uma  nova reserva na lista de reservas
// status inicialmente pendente ja que precisa ser alterado como realizada por algum funcionario
    fazerReserva(){
        let id = this.reservas.length + 1
        let idCliente = this.usuarioLogado.dados.id
        let status = "pendente"
        let dia_checkin = requisicao.question("Qual sera o dia de checkin?\n")
        let mes_checkin = requisicao.question("Qual sera o mes de checkin?\n")
        let ano_checkin = requisicao.question("Qual sera o ano de checkin?\n")
        let dia_checkout = requisicao.question("Qual sera o dia de checkout?\n")
        let mes_checkout = requisicao.question("Qual sera o mes de checkout?\n")
        let ano_checkout = requisicao.question("Qual sera o ano de checkout?\n")
        let avaliacao = "pendente"
        let data_checkin = `${dia_checkin}/${mes_checkin}/${ano_checkin}`
        let data_checkout = `${dia_checkout}/${mes_checkout}/${ano_checkout}`
        let reserva = new Reserva (id,idCliente,status,data_checkin,data_checkout,avaliacao)
        this.reservas.push(reserva)
        console.log("Reserva feita com sucesso!")

    }

// metodo destinado a clientes. Procura a reserva feita por um cliente a partir de sua id e cancela tal reserva
    cancelarReserva(){
        let idCliente = this.usuarioLogado.dados.id
        let reserva = this.reservas.find((r) => r.idCliente == idCliente)
        reserva.status = "cancelada"
        console.log("Reserva cancelada!")
    }

// metodo destinado a clientes. Procura reservas feitas por um cliente a partir de sua id e as retorna para o usuario
    verReservas(){
        let reservas = []
        let idCliente = this.usuarioLogado.dados.id
        for (let i = 0; i<this.reservas.length;i++){
            if (this.reservas[i].idCliente == idCliente){
                reservas.push(this.reservas[i])
            }
        }
        return reservas
    }

//metodo destinado a clientes. Permite o cliente avliar a estadia atraves da sua reserva, avaliando de zero a dez
    avaliarEstadia(){
        let idReserva = requisicao.question("Qual o id da reserva utilizada em sua estadia?\n")
        let avaliacao = requisicao.question("De zero a dez, sendo dez Perfeita e zero Insatisfatorio, como voce avaliaria sua estadia conosco?\n")
        let reserva = this.reservas.find((r) => r.id == idReserva)
        reserva.avaliacao = avaliacao
        console.log("Obrigado pela atencao e por sua estadia conosco. Volte sempre!")
    }

//metodo destinado a funcionarios. Permite o funcionario visualizar as avaliacoes das reservas realizadas
    visualizarAvaliacoes(){
        let avaliacoes = []
        for (let i=0; i<this.reservas.length;i++){
            let idReserva = this.reservas[i].id
            let avaliacao = this.reservas[i].avaliacao
            avaliacoes.push({idReserva: idReserva,avaliacao : avaliacao})

        }
        return avaliacoes
    }
    
//metodo para realizar a modificacao de dados
//para cliente apenas passivel de alteracao email e senha. 
//para funcionario passivel de alteracao nome de usuario, email e senha
//id,nome,cpf e data de nascimento nao possuem a necessidade de possibilitar alteracao
    modificarDados(){
        if(this.usuarioLogado.tipo == "cliente"){
            console.log("Qual tipo de dado gostaria de realizar uma alteração? (Insira o numero por favor)")
            console.log("1. Email")
            console.log("2. Senha")
            const n = requisicao.question()
            if(n==1){
                let newEmail = requisicao.question("Por favor digite o novo email a ser inserido\n")
                this.usuarioLogado.dados.email = newEmail
                console.log("Email alterado com sucesso!")
            }
            
            else if(n==2){
                let newSenha = requisicao.question("Por favor digite a nova senha a ser inserida\n")
                this.usuarioLogado.dados.senha = newSenha
                console.log("Senha alterada com sucesso!")
            }
        }
        if(this.usuarioLogado.tipo == "funcionario"){
            console.log("Qual tipo de dado gostaria de realizar uma alteração? (Insira o numero por favor)")
            console.log("1. Nome de Usuario")
            console.log("2. Email")
            console.log("3. Senha")
            const n = requisicao.question()
            if(n==2){
                let newEmail = requisicao.question("Por favor digite o novo email a ser inserido\n")
                this.usuarioLogado.dados.email = newEmail
                console.log("Email alterado com sucesso!")
            }
            
            else if(n==3){
                let newSenha = requisicao.question("Por favor digite a nova senha a ser inserida\n")
                this.usuarioLogado.dados.senha = newSenha
                console.log("Senha alterada com sucesso!")
            }

            else if(n==1){
                let newName = requisicao.question("Por favor digite o novo Nome de Usuario a ser inserido\n")
                this.usuarioLogado.dados.nomeUsuario = newName
                console.log("Nome de Usuario alterado com sucesso!")
            }

        }
    }

//metodo destinado a funcionarios. 
//Permite editar os dados de um quarto especifico, utilizando o nome como forma de procura ja que tem que ser unico
    editarQuarto(){
        let nomeQuarto = requisicao.question("Por favor insira o nome do quarto a ser editado\n")
        let quarto = this.quartos.find((room) => room.nome == nomeQuarto)
        console.log("Qual tipo de dado gostaria de realizar uma alteração? (Insira o numero por favor)")
        console.log("1. Quantidade de camas")
        console.log("2. Preco por noite")
        console.log("3. Disponibilidade")
        console.log("4. Nome")
        console.log("5. Descricao")
        const n = requisicao.question()
        if(n==1){
            let newQuantidadeCamas = requisicao.question("Por favor digite a nova quantidade de camas a ser inserida\n")
            quarto.camas = newQuantidadeCamas
            console.log("Quantidade de camas alterada com sucesso!")
        }
        
        else if(n==2){
            let newPreco = requisicao.question("Por favor digite o novo novo valor a ser inserido\n")
            quarto.preco_noite = newPreco
            console.log("Preco por noite alterado com sucesso!")
        }

        else if(n==3){
            let newDisponibilidade = requisicao.question("Por favor digite a nova Disponibilidade a ser inserida\n")
            quarto.disponivel = newDisponibilidade
            console.log("Disponibilidade alterada com sucesso!")
        }

        else if(n==4){
            let newName = requisicao.question("Por favor digite o novo Nome do quarto a ser inserido\n")
            quarto.nome = newName
            console.log("Nome do quarto alterado com sucesso!")
        }

        else if(n==5){
            let newDescricao = requisicao.question("Por favor digite a nova Descricao a ser inserida\n")
            quarto.descricao = newDescricao
            console.log("Descricao alterada com sucesso!")
        }

    }

//metodo destinado a funcionarios. Permite a exclusao de um quarto a partir do seu nome
    excluirQuarto(){
        let nomeQuarto = requisicao.question("Por favor insira o nome do quarto a ser excluido\n")
        this.quartos = this.quartos.filter((quarto) => quarto.nome != nomeQuarto)
        console.log("Quarto excluido com sucesso!")
        
    }

// metodo para encerrar a sessao no programa
    sairPrograma(){
        console.log("Saindo do programa...")
    }
}

//classe Reserva. Define os atributos que caracterizam uma reserva
class Reserva {
    constructor (id,idCliente,status,check_in,check_out,avaliacao) {
        this.id = id
        this.idCliente = idCliente
        this.status = status
        this.check_in = check_in
        this.check_out = check_out
        this.avaliacao= avaliacao
    }

//classe Funcionario. Define os atributos que caracterizam um funcionario
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

//classe Cliente. Define os atributos que caracterizam um cliente
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

//classe Quartos. Define os atributos que caracterizam um quarto
class Quartos {
    constructor (camas,preco_noite,disponivel,nome,descricao) {
        this.camas = camas
        this.preco_noite = preco_noite
        this.disponivel = disponivel
        this.nome = nome
        this.descricao = descricao
    }
}


//funcao introducao. Menu inicial para um usuario nao logado, permitindo acoes de login, cadastro e sair do programa
//pergunta ao usuario qual acao deseja realizar, usuario este que deve inserir o numero correspondente
function introducao() {
    console.log("Seja Bem-Vindo a plataforma digital do Hotel F-Luxo");
    console.log("Qual das opcoes abaixo gostaria de realizar? (Insira o numero por favor)");
    console.log("1. Fazer Login");
    console.log("2. Fazer Cadastro como Cliente");
    console.log("3. Fazer Cadastro como Funcionario");
    console.log("4. Sair do Programa");
    const n = requisicao.question();
    return n; 
}

//funcao controle. Como o nome diz, funcao destinada ao controle geral do programa
//Primeiramente analisa o numero inserido pelo usuario em introducao() e a partir de tal define a proxima etapa
function controle(sessao,n){
    if(n =="1"){    //usuario decide fazer login
        sessao.fazerLogin()
        if(sessao.usuarioLogado == "erro"){  // erro de algum tipo, email ou senha incorretos. retorna usario ao menu principal
            return
        }
        if (sessao.usuarioLogado.tipo == "cliente"){ //usuario é um cliente ,logo, metodos disponiveis para um cliente serao oferecidos
            let continuar = true
            while(continuar){ //while com o intuito de permitir que o usuario, enquanto logado, possa realizar outra acao depois de realizar uma.
                console.log(`Bem-vindo ${sessao.usuarioLogado.dados.nome}, gostaria de realizar qual acao? (Insira o numero por favor)`)
                console.log("1. Ver meus Dados")
                console.log("2. Ver Lista de Quartos")
                console.log("3. Fazer reserva")
                console.log("4. Cancelar reserva")
                console.log("5. Ver minhas reservas")
                console.log("6. Avaliar estadia")
                console.log("7. Modificar meus dados")
                console.log("8. Deslogar")
                x = requisicao.question()
                switch(x){
                    case "1":
                        console.log(sessao.verMeusDados())
                        break
                    case "2":
                        console.log(sessao.verListaQuartos())
                        break
                    case "3":
                        sessao.fazerReserva()
                        break
                    case "4":
                        sessao.cancelarReserva()
                        break
                    case "5":
                        console.log(sessao.verReservas())
                        break
                    case "6":
                        sessao.avaliarEstadia()
                        break
                    case "7":
                        sessao.modificarDados()
                        break
                    case "8":
                        continuar=false
                        sessao.usuarioLogado = null
                        break
                    default:
                        console.log("Opcao invalida. Tente novamente.")

            }
        }
    }

        else if (sessao.usuarioLogado.tipo == "funcionario"){ //usuario é um funcionario, logo, metodos destinados a um funcionario serao oferecidos
            let continuar = true
            while(continuar){ //while com o intuito de permitir que o usuario, enquanto logado, possa realizar outra acao depois de realizar uma.
            console.log(`Bem-vindo ${sessao.usuarioLogado.dados.nomeUsuario}, gostaria de realizar qual acao?`)
            console.log("1. Ver meus Dados")
            console.log("2. Ver Lista de Reservas")
            console.log("3. Ver Lista de Quartos")
            console.log("4. Ver Lista de Clientes")
            console.log("5. Mudar status da reserva (pendente, adiada, realizada, cancelada)")
            console.log("6. Adicionar Quarto")
            console.log("7. Visualizar Avaliacoes")
            console.log("8. Modificar meus dados")
            console.log("9. Editar quarto")
            console.log("10. Excluir quarto")
            console.log("11. Deslogar")
            x = requisicao.question()
            switch(x){
                case "1":
                    console.log(sessao.verMeusDados())
                    break
                case "2":
                    console.log(sessao.VerListaReservas())
                    break
                case "3":
                    console.log(sessao.verListaQuartos())
                    break
                case "4":
                    console.log(sessao.verListaClientes())
                    break
                case "5":
                    sessao.mudarStatusReserva()
                    break
                case "6":
                    sessao.adicionarQuarto()
                    break
                case "7":
                    console.log(sessao.visualizarAvaliacoes())
                    break
                case "8":
                    sessao.modificarDados()
                    break
                case "9":
                    sessao.editarQuarto()
                    break
                case "10":
                    sessao.excluirQuarto()
                    break
                case "11":
                    continuar=false
                    sessao.usuarioLogado=null
                    break
                default:
                    console.log("Opcao invalida. Tente novamente.")

            }

        }
    }
    }
    else if(n == "2"){ //usuario decide realizar o cadastro como cliente (terá que realizar o login depois)
        sessao.fazerCadastroCliente()
    }
    else if(n == "3"){ //usuario decide realizar o cadastro como funcionario (terá que realizar o login depois)
        sessao.fazerCadastroFuncionario()
    }
    else if(n == "4"){ //usuario decide sair do programa
        sessao.sairPrograma()
    }
    else{
        console.log("Opção inválida. Tente Novamente")
    }
}

//funcao main para guiar o programa
//inicia uma nova sessao do programa que so termina apos o usuario decidir sair do programa depois de deslogar
//os dados de clientes , funcionarios, quartos e etc sao iniciados como vazios. Ou seja, apenas serao alterados durante uma sessao, sendo esvaziados ao fim da mesma.
function main(){
    const sessao = new Sistema 
    while(true){ //while para permitir com que um usario possa realizar outras acoes do menu inicial (ex: realizar login apos cadastro)
        const n = introducao()
        controle(sessao,n)
        if(n=="4"){
            break
        }
    }
}

main()
