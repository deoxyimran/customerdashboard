import AddItemsPane from "./ui/add_items_pane";
import Pane from "./ui/pane";
import ProfilePane from "./ui/profile_pane";
import Item from "./utils/Item";

const items: Map<number, Item> = new Map();  
// test
//items.set(1, new Item("Hello", 5, 5));

const profilePane: ProfilePane = new ProfilePane(items)
const itemsPane: AddItemsPane = new AddItemsPane(items)
const pane: Pane = new Pane();

const paneRoot: HTMLElement = document.querySelector("#pane-root") as HTMLElement;

pane.setChild(profilePane);
paneRoot.innerHTML = pane.getHtml(); 
pane.attachListeners();

// Event listeners for permanent elements 
const itemsPaneBtn: HTMLElement = document.querySelector("#items-pane-btn") as HTMLElement;
const profilePaneBtn: HTMLElement = document.querySelector("#profile-pane-btn") as HTMLElement;
const dialBtn: HTMLElement = document.querySelector("#dial-btn") as HTMLElement;

profilePaneBtn.addEventListener("click", () => {
    pane.setChild(profilePane);
    paneRoot.innerHTML = pane.getHtml();    
    pane.attachListeners();
    profileTabFocus();
    itemTabUnfocus();
})

itemsPaneBtn.addEventListener("click", () => {
    pane.setChild(itemsPane);
    paneRoot.innerHTML = pane.getHtml();
    pane.attachListeners();
    itemTabFocus();
    profileTabUnfocus();
});

dialBtn.addEventListener("click", () => {
    const dialog: HTMLDialogElement = document.querySelector("#dialog") as HTMLDialogElement;
    dialog.close();
})

profileTabFocus();

function profileTabFocus() {
    profilePaneBtn.classList.add(
        "bg-gradient-to-r",
        "from-[rgb(255,255,255,0.1)]",
        "to-[rgb(255,255,255,0.4)]"
    );
}

function profileTabUnfocus() {
    profilePaneBtn.classList.remove(
        "bg-gradient-to-r",
        "from-[rgb(255,255,255,0.1)]",
        "to-[rgb(255,255,255,0.4)]"
    )
}

function itemTabFocus() {
    itemsPaneBtn.classList.add(
        "bg-gradient-to-r",
        "from-[rgb(255,255,255,0.1)]",
        "to-[rgb(255,255,255,0.4)]"
    );
}

function itemTabUnfocus() {
    itemsPaneBtn.classList.remove(
        "bg-gradient-to-r",
        "from-[rgb(255,255,255,0.1)]",
        "to-[rgb(255,255,255,0.4)]"
    );
}


