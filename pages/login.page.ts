import { Page } from "@playwright/test";

export class LoginPage {
    page:Page
    constructor(page:Page) {
        this.page=page
    }
    elements={
        champEmail : ()=> this.page.getByRole("textbox",{name:"Votre email"}),
        champsMdp : () => this.page.getByRole("textbox",{name:"********"}),
        btnLogin: () => this.page.getByRole("button",{name:"Se connecter"})
    }
    async login(email:string,mdp:string){
        await this.elements.champEmail().fill(email)
        await this.elements.champsMdp().fill(mdp)
        await this.elements.btnLogin().click()
    }
}