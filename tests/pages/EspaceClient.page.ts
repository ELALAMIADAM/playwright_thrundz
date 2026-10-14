import { Page } from "@playwright/test";

export class espaceclientpage {
    page: Page;

    constructor(page: Page) {
        
this.page = page;
    }
    elements = {
        add_event: () => this.page.getByRole("button" , {name : "Ajouter Évent" }),
    }
     
    async AddEvent(){
        await this.elements.add_event().click()
    }
    

} 

