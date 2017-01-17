import { Item } from './item.mode';

export class Compra {

    private total: number = 0;
    private totalComprado: number = 0;

    constructor(private id: string, private nome: string, 
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
    getID(): string { return this.id; }
    setID(id: string) { this.id = id; }
    getNome(): string { return this.nome; }
    getItensDisponiveis(): Item[] { return this.itensDisponiveis }
    getItensComprados(): Item[] { return this.itensComprados; }
    getTotalComprado(): number { return this.totalComprado; }
    getTotal(): number { return this.total; }
}