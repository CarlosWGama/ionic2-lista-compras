import { Item } from './item.mode';

export class Compra {

    private total: number = 0;
    private totalComprado: number = 0;

    constructor(private id: string = null, private nome: string = null, 
        private itensDisponiveis: Item[] = [], private itensComprados: Item[] = [], private itemID: number = 0
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
    setNome(nome: string): void { this.nome = nome; }
    getItensDisponiveis(): Item[] { return this.itensDisponiveis }
    getItensComprados(): Item[] { return this.itensComprados; }
    getTotalComprado(): number { return this.totalComprado; }
    getTotal(): number { return this.total; }

    /**
     * Cria um objeto do tipo Compra a partir de um JSON
     */
    public static parseJSON(object: any): Compra {
    
        //Itens disponiveis
        let itensDisponiveis: Item[] = [];
        if (object.itensDisponiveis) {
            object.itensDisponiveis.forEach(item => {
                itensDisponiveis.push(new Item(item.id, item.nome, item.quantidade, item.preco));  
            });
        }

        //Itens comprados
        let itensComprados: Item[] = [];
        if (object.itensComprados) {
            object.itensComprados.forEach(item => {
                itensComprados.push(new Item(item.id, item.nome, item.quantidade, item.preco)); 
            });
        }

        return new Compra(object.id, object.nome, itensDisponiveis, itensComprados, object.itemID);
    }

    /**
     * Retorna um novo ID para o item
     */
    public pushItemID(): number { 
        return ++this.itemID; 
    }

     /**
     * Reordena as listas
     */
    public ordenaListas() {
        this.itensComprados.sort((a: Item, b: Item) => a.getNome() > b.getNome() ? 1 : -1);
        this.itensDisponiveis.sort((a: Item, b: Item) => a.getNome() > b.getNome() ? 1 : -1);
        this.atualizarTotais();
    }

    /**
     * Preço gasto na compra
     */
    public atualizarTotais() {
        this.totalComprado = 0;
        this.total = 0;

        //Itens comprados
        this.itensComprados.forEach((item: Item) => {
        this.totalComprado += item.getTotal();
        });

        this.total = this.totalComprado;

        //Itens ainda na lista
        this.itensDisponiveis.forEach((item: Item) => {
        this.total += item.getTotal();
        });
    }

    /**
     * Remove item da lista de itens disponiveis
     */
    public removeListaDisponivel(item: Item) {
        this.itensDisponiveis = this.itensDisponiveis.filter((value: Item) => value.getID() != item.getID());
    }

    /**
     * Remove item da lista de itens comprados
     */
    public removeListaComprados(item: Item) {
        this.itensComprados = this.itensComprados.filter((value: Item) => value.getID() != item.getID());
    }
}