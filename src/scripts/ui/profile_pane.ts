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
        return `<div class="flex-grow flex flex-col font-['Poppins']">  
            <div class="flex flex-row">
                <div id="profile-box" class="flex flex-col border-[2px] border-rose-500 w-[300px] 
                        h-[300px] mt-[10px] ml-[7px] pt-[22px]">
                    <div class="flex flex-row">
                        <div>Your name:</div>
                        <div id="name-field-root" class="flex-grow">
                            <div class=${this.name === "nil" ? "italic" : ""}>${this.name}</div>
                        </div>
                        <div id="name-edit-btn-root" class="mr-[10px]">
                            <button class="bg-transparent border-[2px] border-cyan-600 text-cyan-600
                                    w-[40px] h-[30px] rounded-md hover:bg-cyan-600 
                                    hover:text-cyan-50">
                                Edit
                            </button>
                        </div>
                    </div>
                    <div class="flex flex-row">
                        <div>Your gender:</div>
                        <div id="gender-field-root" class="flex-grow">
                            <div class=${this.name === "nil" ? "italic" : ""}>${this.gender}</div>
                        </div>
                        <div id="gender-edit-btn-root" class="mr-[10px]">
                            <button class="bg-transparent border-[2px] border-cyan-600 text-cyan-600
                                    w-[40px] h-[30px] rounded-md hover:bg-cyan-600 
                                    hover:text-cyan-50">
                                Edit
                            </button>
                        </div>     
                    </div>
                    <div class="flex flex-row flex-nowrap overflow-x-scroll">
                        <div class="whitespace-nowrap">Your profession:</div>
                        <div id="profession-field-root" class="flex-grow">
                            <div class=${this.name === "nil" ? "italic" : ""}>${this.profession}</div>
                        </div>
                        <div id="profession-edit-btn-root" class="mr-[10px]">
                            <button class="bg-transparent border-[2px] border-cyan-600 text-cyan-600
                                    w-[40px] h-[30px] rounded-md hover:bg-cyan-600 
                                    hover:text-cyan-50">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
                <div class="spacer flex-grow">
                </div>
                <div class="bg-gradient-to-r from-[#00ff80bc] from-[20%] to-[#50ccc0] rounded-md 
                        w-[115px] h-[85px] mt-[10px] mr-[7px] text-white flex flex-col 
                        items-center">
                    <div class="p-[1px] text-[1.03em] font-[600]">Items</div>
                    <div id="item-count" class="text-[1.4em] pt-[1px] font-[500] ">${this.items.size}</div>
                </div>
            </div>   
            <div class="flex-grow">
            </div>
            <div id="list-box" class="flex flex-col mr-[7px] ml-[7px] 
                    mb-[16px] h-[210px] overflow-y-scroll overflow-x-hidden 
                    bg-indigo-200 border-[1px] border-indigo-700">
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
                <div class="flex-shrink-0 flex flex-row items-center justify-between bg-slate-50
                        mt-[5px] mr-[7px] ml-[7px] h-[50px] rounded-lg drop-shadow-lg shadow-cyan-500 border-t 
                        border-t-cyan-50" id = ${"list-item" + key}>
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
            <textarea rows="1" class="resize-none w-[170px] ml-[8px]"></textarea>
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