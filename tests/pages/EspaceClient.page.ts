import { Page } from "@playwright/test"

export class EspaceClient {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }


    elements = {
        cree_evenement: () => this.page.getByRole("button", { name: "Créer un événement", exact: true }),
    }


    async click_cree_evenement() {
        await this.elements.cree_evenement().click();
    }
}