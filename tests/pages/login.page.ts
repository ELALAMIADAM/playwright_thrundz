import { Page } from "@playwright/test";

export class loginPage {
    page: Page;

    constructor(page: Page) {

        this.page = page;
    }
    elements = {
        username: () => this.page.getByPlaceholder("votre email"),
        password: () => this.page.getByPlaceholder("********"),
        btn_connexion: () => this.page.getByRole("button", { name: "Se connecter" }),
    }

    async saisirUsername(value: string) {
        await this.elements.username().fill(value)
    }
    async saisirPassword(value: string) {
        await this.elements.password().fill(value)
    }
    async ClickConnexion() {
        await this.elements.btn_connexion().click()
    }

    async Login(usr: string, pw: string) {
        await this.saisirUsername(usr)
        await this.saisirPassword(pw)
        await this.ClickConnexion()
    }

}

