import ProfilePane from "./profile_pane";
import AddItemsPane from "./add_items_pane";

class Pane {
    private child?: AddItemsPane | ProfilePane;
    
    public setChild(child: AddItemsPane | ProfilePane) {
        this.child = child;
    }

    public getHtml(): string {
        return `<div class="flex-grow flex flex-col">
            ${this.child!.getHtml()}
        </div>`;
    }

    public attachListeners() {
        this.child!.attachListeners();
    }
}

export default Pane;