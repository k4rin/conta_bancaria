import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../util/Colors";

export class ContaController implements ContaRepository {
    public transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        
        let contaOrigem = this.buscarNoArray(numeroOrigem);
        let contaDestino = this.buscarNoArray(numeroDestino);
        
        if (contaOrigem != null && contaDestino != null) {
            if (contaOrigem.sacar(valor) == true) {
                contaDestino.depositar(valor);
                console.log(colors.fg.green, "Transferência de R$ " + valor.toFixed(2) + " da conta " + numeroOrigem + " para a conta " + numeroDestino + " realizado com sucesso!", colors.reset);
            } else {
                console.log(colors.fg.red, "Saldo insuficiente na conta " + numeroOrigem + "!", colors.reset);
            }
    
            }
        }


private listaContas: Array<Conta> = new Array<Conta>();
    numero: number = 0;

    procurarPorNumero(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);
        if (buscaConta != null) {
            buscaConta.visualizar();
        } else {
            console.log("Conta não encontrada!");
        }
    }
    listarTodas(): void {
        for (let conta of this.listaContas) {
            conta.visualizar();
        };
    }
    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(colors.fg.green, "Conta " + conta.numero + " cadastrada com sucesso!", colors.reset);   
        
    }
    atualizar(conta: Conta): void {
        let buscaConta = this.buscarNoArray(conta.numero);

        if (buscaConta != null) {
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log(colors.fg.green, "Conta " + conta.numero + " atualizada com sucesso!", colors.reset);

        } else {
            console.log(colors.fg.red, "Conta " + conta.numero + " não encontrada!", colors.reset);
        }
    }
    deletar(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if (buscaConta != null) {
            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            console.log(colors.fg.green, "Conta " + numero + " excluída com sucesso!", colors.reset);
        } else {
            console.log(colors.fg.red, "Conta " + numero + " não encontrada!", colors.reset);
        }  
        
    }
        // Métodos auxiliares
        // Gera número da conta
    public gerarNumero(): number {
        return ++this.numero;
    }

    // Checa se a conta existe
    public buscarNoArray(numero: number): Conta | null {
        for (let conta of this.listaContas) {
            if (conta.numero === numero) {
                return conta;
            }
        }
        return null;
    }


   public sacar(numero: number, valor: number): void {

        let conta = this.buscarNoArray(numero);

        if (conta != null) {
            if (conta.sacar(valor) ==true) {
                console.log(colors.fg.green, "Saque de R$ " + valor.toFixed(2) + " da conta " + numero + " realizado com sucesso!", colors.reset);
            } else {
                console.log(colors.fg.red, "A conta " + numero + " não foi encontrada!", colors.reset);
            }
        }
   }
    public depositar(numero: number, valor: number): void {
        let conta = this.buscarNoArray(numero);

        if (conta != null) {
             conta.depositar(valor); 
                console.log(colors.fg.green, "Depósito de R$ " + valor.toFixed(2) + " na conta " + numero + " realizado com sucesso!", colors.reset);
            } else {
                console.log(colors.fg.red, "A conta " + numero + " não foi encontrada!", colors.reset);
            }
        }
 }
    


