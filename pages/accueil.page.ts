import { Page } from "@playwright/test"

export class AccueilPage {
    page:Page
    constructor(page:Page){
        this.page = page
    }
    elements = {
        espaceBtn:()=> this.page.locator('[href="/devenir-partenaire"]').nth(1)
    }
    async clickBtn(){
        await this.elements.espaceBtn().click()
         }

}