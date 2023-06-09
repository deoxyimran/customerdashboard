import Item from "../utils/Item";

class AddItemsPane {
    private itemContainer: Map<number, Item>;

    constructor(itemContainer: Map<number, Item>) {
        this.itemContainer = itemContainer;
    }

    public getHtml(): string {
        return `<div class="flex flex-col ml-[10px] mt-[8px]">
            <div class="font-['Poppins'] font-[300] text-[0.96em]">
                Item Name:
            </div>
            <textarea class="resize-none" id="item-name-area" rows="1"></textarea>
            <div class="font-['Poppins'] font-[300] text-[0.96em]">
                Item Cost:
            </div>
            <textarea class="resize-none" id="item-cost-area" rows="1"></textarea>
            <div class="font-['Poppins'] font-[300] text-[0.96em]">
                Item Rating:
            </div>
            <textarea class="resize-none mb-[8px]" id="item-rating-area" rows="1"></textarea>
            <button class="bg-blue-500 text-blue-50 font-['Poppins'] font-[400]
                    w-[100px] h-[31px] active:bg-blue-700" id="save-btn">
                Save
            </button>
        </div>`;
    }

    public attachListeners() {
        const saveBtn: HTMLElement = document.querySelector("#save-btn") as HTMLElement;
        saveBtn.addEventListener("click", () => this.save());
    }

    private save() {
        const itemNameArea: HTMLInputElement = document.querySelector("#item-name-area") as 
            HTMLInputElement;
        const itemCostArea: HTMLInputElement = document.querySelector("#item-cost-area") as 
            HTMLInputElement;
        const itemRatingArea: HTMLInputElement = document.querySelector("#item-rating-area") as 
            HTMLInputElement;

        let tracker = -1;

        for (let i = 0; i <= this.itemContainer.size; i++) {
            if (!this.itemContainer.has(i)) {
                tracker = i;
                break;
            }
            tracker = i;
        }
        
        this.itemContainer.set(tracker, new Item(
            itemNameArea?.value, 
            Number(itemCostArea?.value),
            Number(itemRatingArea?.value)
        )); 

        itemNameArea.value = "";
        itemCostArea.value = "";
        itemRatingArea.value = "";
    }
}

export default AddItemsPane;