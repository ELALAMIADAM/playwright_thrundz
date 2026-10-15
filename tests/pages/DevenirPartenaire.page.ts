import { Page } from "@playwright/test";




export default class DevenirPartenaire {

    page: Page;
    constructor(page: Page) {
        this.page = page
    }
    elements = {
        Input_email: () => this.page.getByPlaceholder("Votre email"),
        Input_password: () => this.page.getByPlaceholder("********"),
        btn_se_connecter: () => this.page.getByRole("button", { name: "Se connecter" }),
        errorMessage: () => this.page.getByRole('alert'),

    }

    async saisirEmail(value: string) {
        await this.elements.Input_email().fill(value)
    }
    async saisirPassword(value: string) {
        await this.elements.Input_password().fill(value)
    }
    async clickSeConnecter() {
        await this.elements.btn_se_connecter().click()
    }
    async getErrorMessage() {
        return this.elements.errorMessage();
    }



}
