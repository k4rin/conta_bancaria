import { ContaPoupanca } from './src/model/ContaPoupanca';
import { ContaCorrente } from './src/model/ContaCorrente';
import { colors } from './src/util/Colors';
import leia = require('readline-sync');
import { ContaController } from './src/controller/ContaController';
import { Conta } from './src/model/Conta';



export function main(){

    // Intância da Classe ContaController
    let contas: ContaController = new ContaController();
    let opcao: number;
    let numero: number;
    let agencia: number;
    let tipo: number;
    let valor: number;
    let titular: string;
    let numeroOrigem: number;
    let numeroDestino: number;
    let saldo: number;
    let limite: number;
    let aniversario: number;
    let tiposContas = ["Conta Corrente", "Conta Poupanca"];

    while(true){
        console.log(colors.bg.black, colors.fg.yellow,
                    "*****************************************************");
        console.log("                                                     ");
        console.log("                  ORION BANK                         ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Criar Conta                          ");
        console.log("            2 - Listar todas as Contas               ");
        console.log("            3 - Buscar Conta por Numero              ");
        console.log("            4 - Atualizar Dados da Conta             ");
        console.log("            5 - Apagar Conta                         ");
        console.log("            6 - Sacar                                ");
        console.log("            7 - Depositar                            ");
        console.log("            8 - Transferir valores entre Contas      ");
        console.log("            9 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ", colors.reset);

        console.log("Entre com a opção desejada: ");
        opcao = leia.questionInt("");

        
        switch(opcao){
            case 1:
                console.log(colors.fg.whitestrong,'\n\nCriar conta\n\n', colors.reset);

                console.log("Digite o numero da agência: ");
                agencia = leia.questionInt("");

                console.log("Digite o nome do titular: ");
                titular = leia.question("");

                console.log("Digite o tipo de Conta: ");
                tipo = leia.keyInSelect(tiposContas, "", {cancel: false}) + 1;

                console.log("Digite o saldo da conta (R$): ");
                saldo = leia.questionFloat("");

                switch (tipo) {
                    case 1:
                        console.log("Digite o limite da conta (R$): ");
                        limite = leia.questionFloat("");
                        contas.cadastrar(
                            new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo, limite));
                        break;
                    case 2:
                        console.log("Digite o dia do aniversário da conta: ");
                        aniversario = leia.questionInt("");
                        contas.cadastrar(
                            new ContaPoupanca(contas.gerarNumero(), agencia, tipo, titular, saldo, aniversario));
                        break;
                }

                 keyPress()
            break;
            case 2:
                console.log(colors.fg.whitestrong,'\n\nAqui esta a lista das sua contas:\n\n',colors.reset);
                contas.listarTodas();

                 keyPress()
            break;
            case 3:
                console.log(colors.fg.whitestrong,'Consultar dados da conta - por numero.', colors.reset);
                console.log("Digite o numero da conta: ");
                numero = leia.questionInt("");
                contas.procurarPorNumero(numero);
                 keyPress()
            break;
            case 4:
                console.log(colors.fg.whitestrong,'\n\nAtualizar dados da conta.\n\n', colors.reset);
                 
                console.log("Digite o numero da conta: ");
                numero = leia.questionInt("");

                let conta = contas.buscarNoArray(numero);

                if (conta != null) {
                    console.log("Digite o numero da agência: ");
                    agencia = leia.questionInt("");

                    console.log("Digite o nome do titular: ");
                    titular = leia.question("");

                    tipo = conta.tipo;

                    console.log("Digite o saldo da conta (R$): ");
                    saldo = leia.questionFloat("");

                    switch (tipo) {
                        case 1:
                            console.log("Digite o limite de crédito (R$): ");   
                            limite = leia.questionFloat("");
                            contas.atualizar(
                                new ContaCorrente(numero, agencia, tipo, titular, saldo, limite));
                            break;
                        case 2:
                            console.log("Digite o dia do aniversário da conta: ");
                            aniversario = leia.questionInt("");
                            contas.atualizar(
                                new ContaPoupanca(numero, agencia, tipo, titular, saldo, aniversario));
                            break;
                    }
                    } else {
                        console.log(colors.fg.red, "Conta " + numero + " não encontrada!", colors.reset);
                    }
                    keyPress()
            break;
            case 5:
                console.log(colors.fg.whitestrong,'\n\nApagar uma conta.\n\n', colors.reset);
                 
                console.log("Digite o numero da conta: ");
                numero = leia.questionInt("");
                contas.deletar(numero);

                keyPress()
            break;
            case 6:
                console.log(colors.fg.whitestrong,'\n\nSaque\n\n', colors.reset);
                
                console.log("Digite o numero da conta: ");
                numero = leia.questionInt("");
                console.log("Digite o valor do saque (R$): ");
                valor = leia.questionFloat("");
                contas.sacar(numero, valor);
                keyPress()
            break;
            case 7:
                console.log(colors.fg.whitestrong,'\n\nDepósito\n\n', colors.reset);
                
                console.log("Digite o numero da conta: ");
                numero = leia.questionInt("");
                console.log("Digite o valor do depósito (R$): ");
                valor = leia.questionFloat("");
                contas.depositar(numero, valor);
                keyPress()
            break;
            case 8:
                console.log(colors.fg.whitestrong,'\n\nTranferencia entre contas\n\n', colors.reset);
                 
                console.log("Digite o numero da conta de origem: ");
                let numeroOrigem = leia.questionInt("");
                console.log("Digite o numero da conta de destino: "); 
                let numeroDestino = leia.questionInt("");
                console.log("Digite o valor da transferência (R$): ");
                valor = leia.questionFloat("");
                contas.transferir(numeroOrigem, numeroDestino, valor);
                keyPress()
            break;
             case 9:
            console.log(colors.fg.greenstrong,"\nOrion Bank - Inovação que ilumina o seu futuro.");
            sobre();
            console.log(colors.reset, "");
             process.exit(0);
            
            break;
            default:
                console.log(colors.fg.whitestrong,'\nOpção inválida!\n', colors.reset);
                 keyPress()
            break;
        }

    }
}

export function sobre(): void{
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: ");
    console.log("Karine Santos - karinecrislopes08@gmail.com");
    console.log("github.com/k4rin");
    console.log("*****************************************************");
}
function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    leia.prompt();
}
main();
