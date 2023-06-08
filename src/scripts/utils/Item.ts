class Item {
    private itemName: string;
    private itemCost: number;
    private itemRating: number;

    constructor(itemName: string, itemCost: number, itemRating: number) {
        this.itemName = itemName;
        this.itemCost = itemCost;
        this.itemRating = itemRating;
    }

    public getItemName(): string {
        return this.itemName;
    }

    public getItemCost(): number {
        return this.itemCost;
    }

    public getItemRating(): number {
        return this.itemRating;
    }
}

export default Item;