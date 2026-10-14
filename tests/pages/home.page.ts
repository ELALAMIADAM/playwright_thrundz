import { Page } from '@playwright/test';

export class home {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }


    elements = {
        espace_createur: () => this.page.getByRole("link", { name: "Espace Créateur", exact: true }),
    }

    async click_espace_createur() {
        await this.elements.espace_createur().click();
    }
}