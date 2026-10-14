import { Page } from "@playwright/test";

export class login {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }




    elements = {
        email: () => this.page.getByRole('textbox', { name: 'Votre email' }),
        password: () => this.page.getByRole('textbox', { name: '********' }),
        bouton_connexion: () => this.page.getByRole("button", { name: "Se connecter" })
    }

    async click_connexion() {
        await this.elements.bouton_connexion().click();
    }

    async se_connecter(email: string, password: string) {
        await this.elements.email().fill(email);
        await this.elements.password().fill(password);
        await this.click_connexion();
    }
}