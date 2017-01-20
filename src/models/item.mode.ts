export class Item {

    constructor(private id: number, private nome: string, private quantidade: number, private preco: number) {

    }

    /************** GETTERS e SETTERS *******************/
    get ID(): number { return this.id; }
    get Nome(): string { return this.nome; }
    set Nome(nome: string) { this.nome = nome; } 
    get Quantidade(): number { return this.quantidade; }
    set Quantidade(quantidade: number) { this.quantidade = quantidade }
    get Preco(): number { return this.preco; }
    set Preco(preco: number) { this.preco = preco; }
    get Total(): number { return this.preco * this.quantidade; }

}