import { Page } from "@playwright/test";

export class homepage {
    page: Page;

    constructor(page: Page) {
        
this.page = page;
    }
    elements = {
        espaceCreateur: () => this.page.getByRole("link" , {name : /^Espace Créateur/ }),
    }
     
    async GotoCreatorEspace(){
        await this.elements.espaceCreateur().click()
    }
    

} 

