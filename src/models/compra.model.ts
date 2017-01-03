import { Item } from './item.mode';

export class Compra {

    private total;
    private totalComprado;

    constructor(private id: number, private nome: string, 
        private itensDisponiveis: Item[], private itensComprados: Item[]
    ) { 
        itensComprados.forEach((item: Item) => {
            this.totalComprado += item.getTotal(); 
        });

        this.total = this.totalComprado;

        itensDisponiveis.forEach((item: Item) => {
            this.total += item.getTotal();
        });
    }

    /********** GETTERS *******************/
    getID(): number { return this.id; }
    getNome(): string { return this.nome; }
    getItensDisponiveis(): Item[] { return this.itensDisponiveis }
    getItensComprados(): Item[] { return this.itensComprados; }
    getTotalComprado(): number { return this.totalComprado; }
    getTotal(): number { return this.total; }
}