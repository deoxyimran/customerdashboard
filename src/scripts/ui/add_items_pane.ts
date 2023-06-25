import Item from "../utils/Item";

class AddItemsPane {
    private itemContainer: Map<number, Item>;

    constructor(itemContainer: Map<number, Item>) {
        this.itemContainer = itemContainer;
    }

    public getHtml(): string {
        return `<div class="flex flex-col ml-[10px] mt-[8px]">
            <div class="font-['Poppins'] font-medium text-[0.87em] text-[#454444] mb-[2px]">
                Item Name:
            </div>
            <textarea class="resize-none mb-[10px] mr-[70px] border-blue-500 border-[1px] outline-none 
                focus:border-[2px]" id="item-name-area" rows="1"></textarea>
            <div class="font-['Poppins'] font-medium text-[0.87em] text-[#454444] mb-[2px]">
                Item Cost:
            </div>
            <textarea class="resize-none mb-[10px] mr-[70px] border-blue-500 border-[1px] outline-none 
                focus:border-[2px]" id="item-cost-area" rows="1"></textarea>
            <div class="font-['Poppins'] font-medium text-[0.87em] text-[#454444] mb-[2px]">
                Item Rating:
            </div>
            <textarea class="resize-none mb-[20px] mr-[70px] border-blue-500 border-[1px] outline-none 
                focus:border-[2px]" id="item-rating-area" rows="1"></textarea>
            <button class="bg-blue-500 text-blue-50 font-['Poppins'] font-medium text-[0.92em]
                    w-[93px] h-[29px] active:bg-blue-700 rounded-sm" id="save-btn">
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

        if (Number.isNaN(Number(itemCostArea.value))) {
            this.showDialogFailed();
        } else if (Number.isNaN(Number(itemRatingArea.value))) {
            this.showDialogFailed();
        } else if (!Number.isNaN(Number(itemNameArea.value))) {
            this.showDialogFailed();
        } else {
            this.showDialogSuccess();
            let tracker = -1;
            for (let i = 0; i <= this.itemContainer.size; i++) {
                if (!this.itemContainer.has(i)) {
                    tracker = i;
                    break;
                }
                tracker = i;
            }
            this.itemContainer.set(tracker, new Item(
                itemNameArea.value, 
                Number(itemCostArea?.value),
                Number(itemRatingArea?.value)
            )); 
        }
        itemNameArea.value = "";
        itemCostArea.value = "";
        itemRatingArea.value = "";
    }

    private showDialogSuccess() {
        const dialog: HTMLDialogElement = document.querySelector("#dialog") as HTMLDialogElement;
        const dialIcon: HTMLElement = document.querySelector("#dial-icon") as HTMLElement;
        const dialText: HTMLElement = document.querySelector("#dial-text") as HTMLElement;     
        
        dialIcon.innerHTML = `<i class="fas fa-circle-check text-[2.3em] text-[#57e389]"></i>`;
        dialText.innerHTML = `Succesfully added 1 item!`;
    
        dialog.showModal();
    }
    
    private showDialogFailed() {
        const dialog: HTMLDialogElement = document.querySelector("#dialog") as HTMLDialogElement;
        const dialIcon: HTMLElement = document.querySelector("#dial-icon") as HTMLElement;
        const dialText: HTMLElement = document.querySelector("#dial-text") as HTMLElement;     
        
        dialIcon.innerHTML = `<i class="fas fa-circle-xmark text-[2.3em] text-[#ed333b]"></i>`;
        dialText.innerHTML = `Failed to add 1 item :(`;
        
        console.log(dialIcon.innerHTML);
        
        dialog.showModal();
    }
}

export default AddItemsPane;