//------------------------//
// Sistema Hotel F - Luxo //
//------------------------//

var requisicao = require('readline-sync') // pacote para permitir os inputs para o usuario

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
        console.log("Bem-Vindo ao login, por favor, insira as informacoes abaixo.")
        let email = requisicao.question("Insira o email da conta por favor.\n")
        let senha = requisicao.question("Insira a senha por favor.\n")
        const cliente = this.clientes.find((client) => client.email == email && client.senha == senha)  //procura email e senha na lista de clientes
        if(cliente){ //achou email e senha correspondentes a um cliente, login bem sucedido
            this.usuarioLogado = {tipo: "cliente", dados: cliente} //dados = dados do cliente que possui email e senha achados no find
            console.log("Login bem sucedido!")
            return
        }
        const funcionario = this.funcionarios.find((worker) => worker.email == email && worker.senha == senha) // procura email e senha na lista de funcionarios
        if(funcionario){ // achou email e senha correspondentes a um funcionario, login bem sucedido
            this.usuarioLogado = {tipo: "funcionario" , dados: funcionario} //dados = dados do funcionario que possui email e senha achados no find
            console.log("Login bem sucedido!")
            return
        }
        this.usuarioLogado = "erro" // caso nao tenha achado nenhuma correspondecia, o atributo e definido como erro, para que possa voltar ao menu inicial
        
        console.log("Erro, email ou senha incorretos. Retornando ao Menu principal.")
        
    }

//metodo para realizar cadastro, recolhe os dados e insere na lista de clientes ou funcionarios, a depender da escolha do usuario.
    fazerCadastroCliente(){ //cadastro como cliente, serao recolhidos dados especificos para um cliente
        console.log("Bem-Vindo ao Cadastro como Cliente, por favor, insira as informacoes abaixo.")
        let id = this.clientes.length + 1 //cria sempre uma nova id unica, ja que a lenght de this.clientes é o numero de clientes, logo a nova id sera a id do ultimo cliente (==lenght) +1.
        let nome = requisicao.question("Por favor, insira o seu nome.\n")
        let dia = requisicao.question("Por favor, insira o seu dia de nascimento.\n")
        let mes = requisicao.question("Por favor, insira o seu mes de nascimento.\n")
        let ano = requisicao.question("Por favor, insira o seu ano de nascimento.\n")
        let cpf = ""
        let verificaCPF=true
        while(verificaCPF){ //verifica se o CPF esta correto, permitindo inserir novamente em caso de erro
            cpf = requisicao.question("Por favor, insira o seu CPF (Apenas numeros por favor).\n")
            if(cpf.length==11){
                verificaCPF = false   
            }
            else{
                console.log("CPF inválido. Verifique se ha 11 numeros. Tente novamente")
            }
        }
        let email = "" 
        let verificaEmail= true
        while(verificaEmail){ //verifica se o email esta correto, permitindo inserir novamente em caso de erro
            email = requisicao.question("Por favor, insira o E-mail a ser registrado.\n")
            if(email.includes("@")){
                verificaEmail= false
            }
            else{
                console.log("E-mail invalido. Garanta que o @ seja inserido. Tente novamente.")
            }
        }       
        let senha = requisicao.question("Por favor, insira a senha.\n")
        let data = `${dia}/${mes}/${ano}`
        let novoCliente = new Cliente(id,nome,data,cpf,email,senha)
        this.clientes.push(novoCliente) // insere o novo cliente na lista de clientes
        console.log("Cadastro de cliente realizado!")
        return

    }

    fazerCadastroFuncionario(){
        console.log("Bem-Vindo ao Cadastro como Funcionario, por favor, insira as informacoes abaixo.")
        let id = this.funcionarios.length + 1 //cria sempre uma nova id unica, ja que a lenght de this.funcionarios é o numero de funcionarios, logo a nova id sera a id do ultimo funcionario (==lenght) +1.
        let usuario = requisicao.question("Por favor, insira nome de Usuario a ser registrado.\n")
        let cpf = ""
        let verificaCPF=true
        while(verificaCPF){ //verifica se o CPF esta correto, permitindo inserir novamente em caso de erro
            cpf = requisicao.question("Por favor, insira o seu CPF (Apenas numeros por favor)\n")
            if(cpf.length==11){
                verificaCPF = false   
            }
            else{
                console.log("CPF inválido. Verifique se ha 11 numeros. Tente novamente")
            }
        }
        let email = "" 
        let verificaEmail= true
        while(verificaEmail){ //verifica se o email esta correto, permitindo inserir novamente em caso de erro
            email = requisicao.question("Por favor, insira o E-mail a ser registrado.\n")
            if(email.includes("@")){
                verificaEmail= false
            }
            else{
                console.log("E-mail invalido. Garanta que o @ seja inserido. Tente novamente.")
            }
        }
        let senha = requisicao.question("Por favor insira a senha.\n")
        let novoFuncionario = new Funcionário(id,usuario,cpf,email,senha)
        this.funcionarios.push(novoFuncionario) // insere o novo funcionario na lista de funcionarios
        console.log("Cadastro de funcionario realizado!")
        return
    }

// metodo para visualizacao dos dados do usuario
    verMeusDados(){
        console.log(this.usuarioLogado.dados)
    }

// metodo para visualizacao da lista de reservas. Exclusivo para funcionarios
    VerListaReservas(){
        if(this.reservas.length == 0){ //lista de reservas esta vazia
            console.log("No momento não há nenhuma reserva realizada.")
        }
        else {
            console.log(this.reservas)
        }
    }
// metodo para visualizacao da lista de quartos.
    verListaQuartos(){ //lista de quartos esta vazia
        if(this.quartos.length == 0){
            console.log("No momento não há nenhum quarto adicionado.")
        }
        else {
            console.log(this.quartos)
        }
    }

// metodo para visualizacao da lista de clientes. Exclusivo para funcionarios
    verListaClientes(){
        if(this.clientes.length == 0){ //lista de clientes esta vazia
            console.log("No momento não há nenhum cliente cadastrado.")
        }
        else {
            console.log(this.clientes)
        }
    }

// metodo destinado a funcionarios. Altera status da reserva a partir do id da mesma, id essa única.
    mudarStatusReserva(){
        if(this.reservas.length==0){ //lista de reservas esta vazia
            console.log("No momento não há nenhuma reserva realizada.")
        }
        else{
            let id = requisicao.question("Por favor, insira o id da reserva cujo status sera alterado.\n")
            let reserva = this.reservas.find((numero) => numero.id == id) //procura reserva com o id correspondente ao inserido pelo usuario
            if(reserva){//achou
                let status = requisicao.question("Por favor, insira o novo status a ser definido. (pendente, adiada, realizada, cancelada) \n")
                reserva.status = status
                console.log("Status da reserva alterado.")
            }
            else{ //nao tem reserva com a id inserida
                console.log("Nenhuma reserva com a id inserida encontrada.")
            }
        }
    }

// metodo destinado a funcionarios. Recolhe os dados e insere um novo quarto na lista de quartos. 
    adicionarQuarto(){
        let camas = requisicao.question("Por favor, insira a quantidade de camas do quarto.\n")
        let preco_noite = requisicao.question("Por favor, insira o preco por noite do quarto.\n")
        let disponivel = requisicao.question("Por favor, insira a situacao de disponibilidade do quarto. (disponivel ou indisponivel)\n")
        let nome = requisicao.question("Por favor, insira o nome do quarto a ser registrado.\n")
        let descricao = requisicao.question("Por favor, insira a descricao do quarto.\n")
        let quarto = new Quartos(camas,preco_noite,disponivel,nome,descricao)
        this.quartos.push(quarto) //adiciona o novo quarto na lista de quartos
        console.log("Quarto adicionado com sucesso!")
    }

// metodo destinado a clientes. Recolhe os dados e insere uma  nova reserva na lista de reservas
// status inicialmente pendente ja que precisa ser alterado como realizada por algum funcionario
// avaliacao inicialmente pendente ja que a reserva ainda sera avaliada pelo clinte 
    fazerReserva(){
        if(this.quartos.length != 0){
            let disponibilidadeQuarto = this.quartos.find((quarto) => quarto.disponivel == "disponivel") //verifica se ha quarto disponivel
            if(disponibilidadeQuarto){ // achou quarto disponivel
                console.log(this.quartosDisponiveis())
                console.log("Dos quartos acima, insira o nome daquele que deseja reservar.")
                let nome = requisicao.question()
                let quarto = this.quartos.find((ocupado) => ocupado.nome == nome)
                quarto.disponivel = "indisponivel"
                let id = this.reservas.length + 1 //cria sempre uma nova id unica, ja que a lenght de this.reservas é o numero de reservas, logo a nova id sera a id da ultima reserva (==lenght) +1.
                let idCliente = this.usuarioLogado.dados.id
                let status = "pendente"
                let dia_checkin = requisicao.question("Por favor, insira o dia de checkin.\n")
                let mes_checkin = requisicao.question("Por favor, insira o mes de checkin.\n")
                let ano_checkin = requisicao.question("Por favor, insira o ano de checkin.\n")
                let dia_checkout = requisicao.question("Por favor, insira o dia de checkout.\n")
                let mes_checkout = requisicao.question("Por favor, insira o mes de checkout.\n")
                let ano_checkout = requisicao.question("Por favor, insira o ano de checkout.\n")
                let datasValidas = this.verificarDatas(dia_checkin,mes_checkin,ano_checkin,dia_checkout,mes_checkout,ano_checkout) // verifica se as dtas de check in e check out sao validas
                if(datasValidas){ // datas validas
                    let avaliacao = "pendente"
                    let data_checkin = `${dia_checkin}/${mes_checkin}/${ano_checkin}`
                    let data_checkout = `${dia_checkout}/${mes_checkout}/${ano_checkout}`
                    let reserva = new Reserva (id,idCliente,status,data_checkin,data_checkout,avaliacao)
                    this.reservas.push(reserva) //nova reserva inserida na lista de reservas 
                    console.log("Reserva feita com sucesso!")
                }
                else{ // datas nao validas
                    quarto.disponivel = "disponivel"
                    console.log("Data de checkin ou checkout invalida. Tente novamente")
                }
            }
            else{ // nao achou quarto disponivel
                console.log("Infelizmente nao possuimos quarto disponivel no momento. Volte depois e verifique a disponibilidade!")
            }
        }
        else{ // lista de quartos vazia
            console.log("No momento nao ha nenhum quarto para realizar reserva. Volte mais tarde!")
        }

    }

// metodo destinado a clientes. Procura a reserva feita por um cliente a partir de sua id e cancela tal reserva
    cancelarReserva(){
        if(this.reservas.length==0){ // lista de reservas vazia
            console.log("Nenhuma reserva adicionada.")
        }
        else{
            let idCliente = this.usuarioLogado.dados.id
            let reserva = this.reservas.find((r) => r.idCliente == idCliente) 
            if(reserva){ //achou
                reserva.status = "cancelada"
                console.log("Reserva cancelada!")
            }
            else{ // cliente nao tem reserva
                console.log("Nenhuma reserva encontrada com a id fornecida.")
            }
        }
    }

// metodo destinado a clientes. Procura reservas feitas por um cliente a partir de sua id e as retorna para o usuario
    verReservas(){
        let reservas = []
        let idCliente = this.usuarioLogado.dados.id
        for (let i = 0; i<this.reservas.length;i++){
            if (this.reservas[i].idCliente == idCliente){
                reservas.push(this.reservas[i]) //adiciona as reservas que possuem a id do cliente dentro a lista reservas
            }
        }
        if(reservas.length==0){ //cliente nao possui reserva
            console.log("Nenhuma reserva encontrada.")
        }
        else{
            console.log(reservas)
        }
    }

//metodo destinado a clientes. Permite o cliente avaliar a estadia atraves da sua reserva, avaliando de zero a dez
    avaliarEstadia(){
        let idReserva = requisicao.question("Por favor, insira o id da reserva utilizada durante sua estadia.\n")
        let reserva = this.reservas.find((r) => r.id == idReserva) //procura a reserva a ser avaliada a partir da id da reserva fornecida pelo cliente
        if(reserva){ //achou
            let avaliacao = requisicao.question("De zero a dez, sendo dez Perfeita e zero Insatisfatorio, como voce avaliaria sua estadia conosco?\n")
            reserva.avaliacao = avaliacao
            console.log("Obrigado pela atencao e por sua estadia conosco. Volte sempre!")
        }
        else{
            console.log("Nenhuma reserva encontrada.")
        }
    }

//metodo destinado a funcionarios. Permite o funcionario visualizar as avaliacoes das reservas realizadas
    visualizarAvaliacoes(){
        let avaliacoes = []
        for (let i=0; i<this.reservas.length;i++){
            let idReserva = this.reservas[i].id
            let avaliacao = this.reservas[i].avaliacao
            avaliacoes.push({idReserva: idReserva,avaliacao : avaliacao}) //a partir das listas de reservas, adiciona o id de cada e a avaliacao correspondente na lista de avaliacoes

        }
        if(avaliacoes.length==0){ //lista de reservas por enquanto vazia
            console.log("No nomento nenhuma avaliacao fora realizada.")
        }
        else{
            console.log(avaliacoes)
        }
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
                let newEmail = requisicao.question("Por favor, digite o novo email a ser inserido.\n")
                this.usuarioLogado.dados.email = newEmail
                console.log("Email alterado com sucesso!")
            }
            
            else if(n==2){
                let newSenha = requisicao.question("Por favor, digite a nova senha a ser inserida.\n")
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
                let newEmail = requisicao.question("Por favor, digite o novo email a ser inserido.\n")
                this.usuarioLogado.dados.email = newEmail
                console.log("Email alterado com sucesso!")
            }
            
            else if(n==3){
                let newSenha = requisicao.question("Por favor, digite a nova senha a ser inserida.\n")
                this.usuarioLogado.dados.senha = newSenha
                console.log("Senha alterada com sucesso!")
            }

            else if(n==1){
                let newName = requisicao.question("Por favor, digite o novo Nome de Usuario a ser inserido.\n")
                this.usuarioLogado.dados.nomeUsuario = newName
                console.log("Nome de Usuario alterado com sucesso!")
            }

        }
    }

//metodo destinado a funcionarios. 
//Permite editar os dados de um quarto especifico, utilizando o nome como forma de procura ja que tem que ser unico
    editarQuarto(){
        if(this.quartos.length==0){ //lita de quartos vazia
            console.log("Nnehum quarto adicionado no momento.")
        }
        else{
            let nomeQuarto = requisicao.question("Por favor, insira o nome do quarto a ser editado.\n")
            let quarto = this.quartos.find((room) => room.nome == nomeQuarto) //procura o quarto a ser editado a partir do nome fornecido
            if(quarto){ // achou um quarto com o nome fornecido
                console.log("Qual tipo de dado gostaria de realizar uma alteração? (Insira o numero por favor)")
                console.log("1. Quantidade de camas")
                console.log("2. Preco por noite")
                console.log("3. Disponibilidade")
                console.log("4. Nome")
                console.log("5. Descricao")
                const n = requisicao.question()
                if(n==1){
                    let newQuantidadeCamas = requisicao.question("Por favor, digite a nova quantidade de camas a ser inserida.\n")
                    quarto.camas = newQuantidadeCamas
                    console.log("Quantidade de camas alterada com sucesso!")
                }
        
                else if(n==2){
                    let newPreco = requisicao.question("Por favor, digite o novo novo valor a ser inserido.\n")
                    quarto.preco_noite = newPreco
                    console.log("Preco por noite alterado com sucesso!")
                }

                else if(n==3){
                    let newDisponibilidade = requisicao.question("Por favor, digite a nova Disponibilidade a ser inserida.\n")
                    quarto.disponivel = newDisponibilidade
                 console.log("Disponibilidade alterada com sucesso!")
                }

                else if(n==4){
                    let newName = requisicao.question("Por favor, digite o novo Nome do quarto a ser inserido.\n")
                    quarto.nome = newName
                    console.log("Nome do quarto alterado com sucesso!")
                }

                else if(n==5){
                    let newDescricao = requisicao.question("Por favor, digite a nova Descricao a ser inserida.\n")
                    quarto.descricao = newDescricao
                    console.log("Descricao alterada com sucesso!")
                }
            }
            else{ // nao achou nenhum quarto com o nome fornecido
            console.log("Nenhum quarto com o nome inserido adicionado no momento.")
            }
        }
    }
//metodo destinado a funcionarios. Permite a exclusao de um quarto a partir do seu nome
    excluirQuarto(){
        if(this.quartos.length==0){ //lista de quartos vazia
            console.log("Nenhum quarto adicionado no momento.")
        }
        else{
            let nomeQuarto = requisicao.question("Por favor, insira o nome do quarto a ser excluido.\n")
            let nome = this.quartos.find((room) => room.nome == nomeQuarto) //procura o quarto a ser excluido a partir do nome fornecido
            if(nome){ // achou
                this.quartos = this.quartos.filter((quarto) => quarto.nome != nomeQuarto)
                console.log("Quarto excluido com sucesso!")
            }
            else{ // nao ha quarto com o nome fornecido
                console.log("Nenhum quarto com o nome inserido adicionado no momento.")
            }
        }
        
    }

//funcao auxiliar com o intuito de filtrar os quartos disponiveis
    quartosDisponiveis(){
        let quartosLivres=[]
        for(let i=0;i<this.quartos.length;i++){
            if(this.quartos[i].disponivel=="disponivel"){ // realiza um for na lista de quartos e caso a disponibilidade do quarto seja "disponivel", tal quarto é adicionado na lista de possiveis quartos
                quartosLivres.push(this.quartos[i])
            }
        }
        return quartosLivres
    }

//funcao auxiliar para verificar se as datas de check in e checkout sao validas 
//di - dia checkin, mi - mes checkin, ai - ano checkin
//dc - dia checkout, mc - mes checkout, ac - ano checkout
    verificarDatas(dI,mI,aI,dC,mC,aC){ 
        let di = Number(dI)
        let mi = Number(mI)
        let ai = Number(aI)
        let dc = Number(dC)
        let mc = Number(mC)
        let ac = Number(aC)
        let dataValida=false
        if(ac>ai){
            dataValida = true
            return dataValida
        }
        else if(ac==ai){
            if(mc>mi){
                dataValida = true
                return dataValida
            }
            else if(mc==mi){
                if(dc>=di){
                    dataValida =true
                    return dataValida
                }
                else{
                    return dataValida
                }

            }
            else{
                return dataValida
            }
        }
        else{
            return dataValida
        }
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
                console.log(`Bem-vindo ${sessao.usuarioLogado.dados.nome}, qual funcionalidade gostaria de utilizar? (Insira o numero por favor)`)
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
                        sessao.verMeusDados()
                        break
                    case "2":
                        sessao.verListaQuartos()
                        break
                    case "3":
                        sessao.fazerReserva()
                        break
                    case "4":
                        sessao.cancelarReserva()
                        break
                    case "5":
                        sessao.verReservas()
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
                        console.log("Opcao invalida. Garanta que o numero inserido esteja entre as opcoes disponiveis. Tente novamente.")

            }
        }
    }

        else if (sessao.usuarioLogado.tipo == "funcionario"){ //usuario é um funcionario, logo, metodos destinados a um funcionario serao oferecidos
            let continuar = true
            while(continuar){ //while com o intuito de permitir que o usuario, enquanto logado, possa realizar outra acao depois de realizar uma.
            console.log(`Bem-vindo ${sessao.usuarioLogado.dados.nomeUsuario}, qual funcionalidade gostaria de utilizar? (Insira o numero por favor)`)
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
                    sessao.verMeusDados()
                    break
                case "2":
                    sessao.VerListaReservas()
                    break
                case "3":
                    sessao.verListaQuartos()
                    break
                case "4":
                    sessao.verListaClientes()
                    break
                case "5":
                    sessao.mudarStatusReserva()
                    break
                case "6":
                    sessao.adicionarQuarto()
                    break
                case "7":
                    sessao.visualizarAvaliacoes()
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
                    console.log("Opcao invalida. Garanta que o numero inserido esteja entre as opcoes disponiveis. Tente novamente.")

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
    else{ //inseriu alguma opcao nao correspondente as disponiveis, permite que usuario tente novamente
        console.log("Opcao invalida. Garanta que o numero inserido esteja entre as opcoes disponiveis. Tente novamente.")
    }
}

//funcao main para guiar o programa
//inicia uma nova sessao do programa que so termina apos o usuario decidir sair do programa depois de deslogar
//os dados de clientes , funcionarios, quartos e etc sao iniciados como vazios. Ou seja, apenas serao alterados durante uma sessao, sendo esvaziados ao fim da mesma.
function main(){
    const sessao = new Sistema 
    while(true){ //while para permitir com que um usario possa realizar outras acoes do menu inicial (ex: realizar login apos cadastro)
        const n = introducao() // n igual a opcao escolhida no menu inicial
        controle(sessao,n) 
        if(n=="4"){ //usuario decide encerrar sessao
            break
        }
    }
}



main()
