import { Page } from "@playwright/test";




export default class Home {

    page: Page;
    constructor(page: Page) {
        this.page = page
    }
    elements = {
        btn_espace_createur: () => this.page.getByRole("link", { name: "Espace Créateur" }),
    }

    async clickEspaceCreateur() {
        await this.elements.btn_espace_createur().nth(0).click()
    }

}
