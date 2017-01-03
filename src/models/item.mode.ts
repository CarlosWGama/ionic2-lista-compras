export class Item {

    constructor(private id: number, private nome: string, private quantidade: number, private preco: number) {

    }

    /************** GETTERS e SETTERS *******************/
    getID(): number { return this.id; }
    getNome(): string { return this.nome; }
    setNome(nome: string): void { this.nome = nome; }
    getQuantidade(): number { return this.quantidade; }
    setQuantidade(quantidade: number): void { this.quantidade = quantidade; }
    getPreco(): number { return this.preco; }
    setPreco(preco: number): void { this.preco = preco; }

    getTotal(): number { return this.preco * this.quantidade; }
}