import Item from "../utils/Item";
import userImgUrl from "../../assets/user.png";

class ProfilePane {
    private items: Map<number, Item>;
    private name: string;
    private gender: string;
    private profession: string;
    private userImgUrl: string;
    
    constructor(items: Map<number, Item>) {
        this.name = "nil";
        this.gender = "nil";
        this.profession = "nil";
        this.items = items;
        this.userImgUrl = userImgUrl;
    }

    public getHtml(): string {
        return `<div class="flex-grow flex flex-col">  
            <div class="flex flex-row">
                <div id="profile-box" class="flex flex-col border-[1px] 
                        border-[rgba(235,146,91,0.8)] w-[320px] h-[300px] 
                        mt-[10px] ml-[7px] rounded-md bg-gradient-to-r 
                        from-[rgba(245,182,105,0.2)] to-[rgba(245,182,105,0.5)]
                        drop-shadow-md">
                    <div class="relative mt-[8px] mb-[30px] rounded-full h-[70px]">
                        <img src=${this.userImgUrl} class="absolute left-[50%] -translate-x-1/2
                            z-0 w-[70px] h-[70px] rounded-full">
                        </img>
                        <div class="absolute left-[50%] -translate-x-1/2 w-[70px] h-[70px] 
                                rounded-full overflow-clip z-10">
                            <div id="file-chooser" class="absolute bg-[rgba(245,182,105,1)] 
                                    bottom-0 inset-x-0 h-[18px] w-[70px] flex 
                                    justify-center items-center cursor-pointer drop-shadow-2xl">
                                <i class="fas fa-camera text-[#ffffff]">
                                </i>
                            </div>
                        </div>
                        <input type="file" class="hidden" accept=".png,.jpg">
                        </input>
                    </div>
                    <div class="flex flex-row ml-[10px] mb-[6px] text-[0.95em] font-semibold
                            font-['Fira Sans Condensed'] text-[#454444]">
                        <div class="flex-shrink-0">Your name:</div>
                        <div id="name-field-root" class="flex-grow ml-[5px] mr-[5px]">
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
                    <div class="flex flex-row ml-[10px] mb-[6px] text-[0.95em] font-['Fira Sans Condensed']
                            font-semibold text-[#454444] ">
                        <div class="flex-shrink-0">Your gender:</div>
                        <div id="gender-field-root" class="flex-grow ml-[5px] mr-[5px]">
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
                    <div class="flex flex-row ml-[10px] text-[0.95em] font-semibold font-['Fira Sans Condensed']
                            text-[#454444]">
                        <div class="flex-shrink-0">Your profession:</div>
                        <div id="profession-field-root" class="flex-grow ml-[5px] mr-[5px]">
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
                <div class="bg-emerald-300 rounded-md 
                        w-[115px] h-[85px] mt-[10px] mr-[7px] text-emerald-800 flex flex-col 
                        items-center font-['Poppins'] border-[1px] border-green-500 
                        drop-shadow-md">
                    <div class="p-[1px] text-[0.99em] font-semibold">Items</div>
                    <div id="item-count" class="text-[1.5em] pt-[4px] font-bold">${this.items.size}</div>
                </div>
            </div>   
            <div class="flex-grow">
            </div>
            <div id="inventory" class="flex flex-col mr-[7px] ml-[7px] rounded-md 
                    mb-[16px] h-[210px] bg-transparent border-[1px] border-[rgba(41,61,144,0.6)]">
                <div class="bg-gradient-to-r from-blue-500 from-30% to-indigo-400 flex flex-row 
                        text-white font-['Poppins'] justify-center font-[600]">
                    INVENTORY
                </div>
                <div class="shadow-[inset_0px_0px_4px_1px_rgba(0,0,255,0.2)] 
                        flex-grow overflow-y-scroll overflow-x-hidden relative bg-gray-100">
                    ${this.items.size === 0 ? 
                        `<div class="absolute font-['Poppins'] font-bold text-indigo-400 left-[50%]
                                top-[50%] -translate-x-1/2 -translate-y-1/2 text-[1.88em]">
                            No items!
                        </div>` : `${this.invChildren()}`
                    }
                    <div class="mt-[5px]"></div>
                </div>
            </div>  
        </div>`;
    }

    public attachListeners() {  
        const input: HTMLInputElement = document.querySelector("input") as HTMLInputElement;
        const fileChooser: HTMLElement = document.querySelector("#file-chooser") as HTMLElement;
        
        const nameEditBtnRoot: HTMLElement = document.querySelector("#name-edit-btn-root") as HTMLElement;
        const nameFieldRoot: HTMLElement = document.querySelector("#name-field-root") as HTMLElement;
        const genderEditBtnRoot: HTMLElement = document.querySelector("#gender-edit-btn-root") as HTMLElement;
        const genderFieldRoot: HTMLElement = document.querySelector("#gender-field-root") as HTMLElement;
        const professionEditBtnRoot: HTMLElement = document.querySelector("#profession-edit-btn-root") as HTMLElement;
        const professionFieldRoot: HTMLElement = document.querySelector("#profession-field-root") as HTMLElement;

        fileChooser.addEventListener("click", () => {
            input.click();
        });
        input.addEventListener("change", () => {
            const reader: FileReader = new FileReader();
            const img: HTMLImageElement = document.querySelector("img") as HTMLImageElement;
            const file: File | null = input.files![0];
            reader.addEventListener("load", () => {
                img.src = reader.result as string;
                this.userImgUrl = img.src;
            });
            if (file) {
                reader.readAsDataURL(file);
            }
        });
        
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
                        <div class="ml-[10px] font-semibold text-[0.9em] text-[#454444]">
                            Name:
                        </div>
                        <div class="ml-[3px] font-semibold italic 
                                text-[#0AB458] text-[0.83em]">
                            ${this.items.get(key)!.getItemName()}
                        </div>
                        <div class="ml-[10px] mr-[10px] text-[0.9em] text-[#454444]">
                            |
                        </div>
                        <div class="font-semibold text-[0.9em] text-[#454444]">
                            Cost:
                        </div>
                        <div class="ml-[3px] font-semibold italic text-[#0AB458] text-[0.83em]">
                            ${this.items.get(key)!.getItemCost()}
                        </div>
                        <div class="ml-[10px] mr-[10px] text-[0.9em] text-[#454444]">
                            |
                        </div>
                        <div class="font-semibold text-[0.9em] text-[#454444]">
                            Rating:
                        </div>
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
                self.items.delete(key);
                deleteBtn.parentElement!.outerHTML = `${self.items.size === 0 ?`
                    <div class="absolute font-['Poppins'] font-bold text-indigo-400 left-[50%]
                            top-[50%] -translate-x-1/2 -translate-y-1/2 text-[1.88em]">
                        No items!
                    </div>` : ""
                }`;
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
            <button class="bg-cyan-600 text-cyan-50 text-[0.66em]
                    w-[33px] h-[20px] rounded-md hover:bg-cyan-700">
                <i class="fas fa-check"></i>
            </button>
            
        `;
        fieldRoot.innerHTML = `
            <textarea rows="1" class="resize-none w-[100%]"></textarea>
        `;

        btnRoot.firstElementChild!.addEventListener("click", () => this.profileFinalize(btnRoot, fieldRoot));
    }

    private profileFinalize(btnRoot: HTMLElement, fieldRoot: HTMLElement) {
        btnRoot.innerHTML = `
            <button class="bg-transparent border-[1px] border-cyan-600 text-cyan-600 font-medium
                    w-[33px] h-[20px] text-[0.66em] hover:bg-cyan-600 rounded-md 
                    hover:text-cyan-50 flex items-center justify-center">
                Edit
            </button>
        `;
        switch (fieldRoot.id) {
            case "name-field-root":
                this.name = (fieldRoot.firstElementChild as HTMLInputElement).value;
                fieldRoot.innerHTML = `<div>${this.name}</div`;           
                break;
            case "gender-field-root":
                this.gender = (fieldRoot.firstElementChild as HTMLInputElement).value;
                fieldRoot.innerHTML = `<div>${this.gender}</div`;           
                break;
            case "profession-field-root":
                this.profession = (fieldRoot.firstElementChild as HTMLInputElement).value;
                fieldRoot.innerHTML = `<div>${this.profession}</div`;           
                break;
            default:
                break;
        }
        btnRoot.firstElementChild!.addEventListener("click", () => this.profileEdit(btnRoot, fieldRoot));
    }
}

export default ProfilePane;