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
                <div id="profile-box" class="flex flex-col border-[1px] 
                        border-[rgba(235,146,91,0.8)] w-[320px] h-[300px] 
                        mt-[10px] ml-[7px] rounded-md bg-gradient-to-r 
                        from-[rgba(245,182,105,0.2)] to-[rgba(245,182,105,0.5)]">
                    <div class="flex justify-center mt-[8px] mb-[30px]">
                        <img src="../assets/user.png" class="w-[70px] h-[70px]">
                        </img>
                    </div>
                    <div class="flex flex-row ml-[10px] mb-[6px] text-[0.95em] font-[600]
                            font-['Fira Sans Condensed']">
                        <div>Your name:</div>
                        <div class="w-[5px]"></div>
                        <div id="name-field-root" class="flex-grow">
                            <div class=${this.name === "nil" ? "italic" : ""}>${this.name}</div>
                        </div>
                        <div id="name-edit-btn-root" class="mr-[10px] font-['Poppins'] 
                                flex items-center">
                            <button class="bg-transparent border-[1px] border-cyan-600 text-cyan-600 font-[500]
                                    w-[33px] h-[20px] text-[0.66em] hover:bg-cyan-600 rounded-md 
                                    hover:text-cyan-50 flex items-center justify-center">
                                Edit
                            </button>
                        </div>
                    </div>
                    <div class="flex flex-row ml-[10px] mb-[6px] text-[0.95em] font-[600]">
                        <div>Your gender:</div>
                        <div class="w-[5px]"></div>
                        <div id="gender-field-root" class="flex-grow">
                            <div class=${this.name === "nil" ? "italic" : ""}>${this.gender}</div>
                        </div>
                        <div id="gender-edit-btn-root" class="mr-[10px] flex font-['Poppins']
                                items-center">
                            <button class="bg-transparent border-[1px] border-cyan-600 text-cyan-600 font-[500]
                                    w-[33px] h-[20px] text-[0.66em] hover:bg-cyan-600 rounded-md 
                                    hover:text-cyan-50 flex items-center justify-center">
                                Edit
                            </button>
                        </div>     
                    </div>
                    <div class="flex flex-row ml-[10px] text-[0.95em] font-[600]">
                        <div class="whitespace-nowrap">Your profession:</div>
                        <div class="w-[5px]"></div>
                        <div id="profession-field-root" class="flex-grow">
                            <div class=${this.name === "nil" ? "italic" : ""}>${this.profession}</div>
                        </div>
                        <div id="profession-edit-btn-root" class="mr-[10px] flex font-['Poppins'] 
                                items-center">
                            <button class="bg-transparent border-[1px] border-cyan-600 text-cyan-600 font-[500]
                                    w-[33px] h-[20px] text-[0.66em] hover:bg-cyan-600 rounded-md
                                    hover:text-cyan-50 flex items-center justify-center">
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
                    <div id="item-count" class="text-[1.4em] pt-[1px] font-[500]">${this.items.size}</div>
                </div>
            </div>   
            <div class="flex-grow">
            </div>
            <div id="inventory" class="flex flex-col mr-[7px] ml-[7px] rounded-md 
                    mb-[16px] h-[210px] overflow-y-scroll overflow-x-hidden 
                    bg-transparent border-[1px] border-[rgba(41,61,144,0.6)]">
                <div class="bg-gradient-to-r from-blue-500 from-30% to-indigo-400 flex flex-row 
                            text-white font-['Poppins'] justify-center font-[600]">
                    INVENTORY
                </div>
                <div class="shadow-[inset_0px_0px_4px_1px_rgba(0,0,255,0.5)] 
                        flex-grow">
                    ${this.invChildren()}
                </div>
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
        
        this.invChildrenListeners();
    }  
    
    private invChildren(): string {
        const children: string[] = [];
        this.items.forEach((val, key) => {
            children.push(`
                <div class="flex-shrink-0 flex flex-row items-center justify-between  
                        ml-[7px] h-[60px] rounded-lg drop-shadow-lg mt-[5px] mr-[7px]
                        font-['Poppins'] 
                        border-[#8660F0] border-[3px] bg-[#F1EDF6]"
                        id = ${"inventory-item" + key}>
                    <div class="flex items-baseline">
                        <div class="ml-[10px] font-bold text-[0.9em]">
                            Name:
                        </div>
                        <div class="ml-[3px] font-semibold italic 
                                text-[#0AB458] text-[0.83em]">
                            ${this.items.get(key)!.getItemName()}
                        </div>
                        <div class="ml-[10px] mr-[10px] text-[0.9em]">|</div>
                        <div class="font-bold text-[0.9em]">Cost:</div>
                        <div class="ml-[3px] font-semibold italic text-[#0AB458] text-[0.83em]">
                            ${this.items.get(key)!.getItemCost()}
                        </div>
                        <div class="ml-[10px] mr-[10px] text-[0.9em]">|</div>
                        <div class="font-bold text-[0.9em]">Rating:</div>
                        <div class="ml-[3px] font-semibold italic text-[#0AB458] text-[0.83em]">
                            ${this.items.get(key)!.getItemRating()}
                        </div>
                    </div>
                    <div class="delete-btn mr-[10px] bg-[#8660F0] w-[32px] h-[32px] rounded-full
                            flex justify-center items-center drop-shadow-sm cursor-pointer">
                        <i class="fas fa-trash-can text-white text-[0.88em]">
                        </i>
                    </div>
                </div>
            `);
        })
        return children.join(" ");
    }

    private invChildrenListeners() {
        const self = this;
        self.items.forEach((val, key) => {
            const deleteBtn: HTMLElement = document
                .querySelector("#inventory-item" + key + " .delete-btn") as HTMLElement;    
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