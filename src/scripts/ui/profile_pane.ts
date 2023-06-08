import Item from "../utils/Item";

class ProfilePane {
    private items: Map<number, Item>;
    private name: string;
    private gender: string;
    private profession: string;
    
    constructor(items: Map<number, Item>) {
        this.name = "nil";
        this.gender = "nil";
        this.profession = "nil";
        this.items = items;
    }

    public getHtml(): string {
        return `<div class="flex-grow flex flex-col">  
            <div class="flex flex-row">
                <div class="flex flex-col">
                    <div class="flex flex-row">
                        <div>Your name:</div>
                        <div id="name-field-root">
                            <div>${this.name}</div>
                        </div>
                        <div id="name-edit-btn-root">
                            <button class="bg-transparent border-[2px] border-cyan-600 text-cyan-600
                                    w-[40px] h-[30px] rounded-md hover:bg-cyan-600 
                                    hover:text-cyan-50">
                                Edit
                            </button>
                        </div>
                    </div>
                    <div class="flex flex-row">
                        <div>Your gender:</div>
                        <div id="gender-field-root">
                            <div>${this.gender}</div>
                        </div>
                        <div id="gender-edit-btn-root">
                            <button class="bg-transparent border-[2px] border-cyan-600 text-cyan-600
                                    w-[40px] h-[30px] rounded-md hover:bg-cyan-600 
                                    hover:text-cyan-50">
                                Edit
                            </button>
                        </div>     
                    </div>
                    <div class="flex flex-row">
                        <div>Your profession:</div>
                        <div id="profession-field-root">
                            <div>${this.profession}</div>
                        </div>
                        <div id="profession-edit-btn-root">
                            <button class="bg-transparent border-[2px] border-cyan-600 text-cyan-600
                                    w-[40px] h-[30px] rounded-md hover:bg-cyan-600 
                                    hover:text-cyan-50">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
                <div class="bg-green-500 rounded-md w-[105px] h-[80px]  
                        text-green-50 flex flex-col items-center">
                    <div>Items</div>
                    <div id="item-count">${this.items.size}</div>
                </div>
            </div>   
            <div class="flex-grow">
            </div>
            <div id="list-box" class="bg-slate-400 flex flex-col mr-[5px] ml-[5px] 
                    mb-[20px] h-[210px] overflow-y-scroll overflow-x-hidden">
                ${this.listChildren()}
            </div>  
        </div>`;
    }

    public attachListeners() {  
        const nameEditBtnRoot: HTMLElement = document.querySelector("#name-edit-btn-root") as HTMLElement;
        const nameFieldRoot: HTMLElement = document.querySelector("#name-field-root") as HTMLElement;
        
        const genderEditBtnRoot: HTMLElement = document.querySelector("#gender-edit-btn-root") as HTMLElement;
        const genderFieldRoot: HTMLElement = document.querySelector("#gender-field-root") as HTMLElement;

        const professionEditBtnRoot: HTMLElement = document.querySelector("#profession-edit-btn-root") as HTMLElement;
        const professionFieldRoot: HTMLElement = document.querySelector("#profession-field-root") as HTMLElement;

        nameEditBtnRoot.firstElementChild!.addEventListener("click", () => 
            this.profileEdit(nameEditBtnRoot, nameFieldRoot));
        genderEditBtnRoot.firstElementChild!.addEventListener("click", () => 
            this.profileEdit(genderEditBtnRoot, genderFieldRoot));
        professionEditBtnRoot.firstElementChild!.addEventListener("click", () => 
            this.profileEdit(professionEditBtnRoot, professionFieldRoot));   
        
        this.listChildrenListeners();
    }  
    
    private listChildren(): string {
        const children: string[] = [];
        this.items.forEach((val, key) => {
            children.push(`
                <div class="flex flex-row justify-between bg-amber-200 mt-[2px] 
                        mr-[2px] ml-[2px]" id = ${"list-item" + key}>
                    <div class="flex flex-row">
                        <div>Name: ${this.items.get(key)!.getItemName()}</div>
                        <div>Cost: ${this.items.get(key)!.getItemCost()}</div>
                        <div>Rating: ${this.items.get(key)!.getItemRating()}</div>
                    </div>
                    <div class="delete-btn text-blue-500 mr-[2px]">
                        <i class="fas fa-trash-can"></i>
                    </div>
                </div>
            `);
        })
        return children.join(" ");
    }

    private listChildrenListeners() {
        const self = this;
        self.items.forEach((val, key) => {
            const deleteBtn: HTMLElement = document
                .querySelector("#list-item" + key + " .delete-btn") as HTMLElement;    
            deleteBtn.parentElement!.addEventListener("transitionend", function transitionEnd() {
                deleteBtn.parentElement!.removeEventListener("transitionend", transitionEnd);
                deleteBtn.parentElement!.outerHTML = "";
                self.items.delete(key);
                const itemCount: HTMLElement = document
                    .querySelector("#item-count") as HTMLElement;
                itemCount.innerHTML = self.items.size + "";
            });
            deleteBtn.addEventListener("click", () => {
                deleteBtn.parentElement!.classList.add(
                    "transition",
                    "duration-[540ms]",
                    "translate-x-[100px]",
                    "opacity-0"
                );
            });
        });
    } 

    private profileEdit(btnRoot: HTMLElement, fieldRoot: HTMLElement) {
        btnRoot.innerHTML = `
            <button class="bg-cyan-600 text-cyan-50
                    w-[40px] h-[30px] rounded-md hover:bg-cyan-700">
                <i class="fas fa-check"></i>
            </button>
        `;
        fieldRoot.innerHTML = `
            <textarea w-[85px] rows="1" class="resize-none"></textarea>
        `;

        btnRoot.firstElementChild!.addEventListener("click", () => this.profileFinalize(btnRoot, fieldRoot));
    }

    private profileFinalize(btnRoot: HTMLElement, fieldRoot: HTMLElement) {
        btnRoot.innerHTML = `
            <button class="bg-transparent border-2 border-cyan-600 text-cyan-600
                    w-[40px] h-[30px] rounded-md hover:bg-cyan-600 hover:text-cyan-50">
                Edit
            </button>
        `;
        this.name = (fieldRoot.firstElementChild as HTMLInputElement).value;
        fieldRoot.innerHTML = `<div>${this.name}</div`;
           
        btnRoot.firstElementChild!.addEventListener("click", () => this.profileEdit(btnRoot, fieldRoot));
    }
}

export default ProfilePane;