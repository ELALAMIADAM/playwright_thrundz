import { Page, Locator, expect } from "@playwright/test";

// Le bot met 1,8 s à "écrire" avant chaque question :
// on attend toujours la question Q{n}, puis le bouton/input de R{n}.
const T = { timeout: 15000 };

export class addeventpage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // ── Helpers génériques ────────────────────────────────
    question(n: number): Locator {
        return this.page.getByTestId(`Q${n}`).last();
    }
    reponse(n: number): Locator {
        return this.page.getByTestId(`R${n}`).last();
    }
    input(n: number): Locator {
        return this.page.getByTestId(`input-R${n}`);
    }
    bouton(n: number, suffixe = ""): Locator {
        return this.page.getByTestId(`btn-envoyer-R${n}${suffixe ? "-" + suffixe : ""}`);
    }

    async attendreQuestion(n: number) {
        await expect(this.question(n)).toBeVisible(T);
    }

    // Saisie texte + clic Envoyer
    async repondreTexte(n: number, valeur: string) {
        await this.attendreQuestion(n);
        await expect(this.input(n)).toBeVisible(T);
        await this.input(n).fill(valeur);
        await this.bouton(n).click();
        await expect(this.reponse(n)).toBeVisible(T);
    }

    // Clic sur un bouton de choix (oui / non / externe / presentiel...)
    async choisir(n: number, suffixe: string) {
        await this.attendreQuestion(n);
        const btn = this.bouton(n, suffixe);
        await expect(btn).toBeVisible(T);
        await btn.click();
        await expect(this.reponse(n)).toBeVisible(T);
    }

    // ── Étapes ────────────────────────────────────────────
    async AddPng(img: string) {
        await this.attendreQuestion(1);
        await this.page.getByTestId("input-R1").setInputFiles(img);
        await expect(this.bouton(1)).toBeEnabled(T);
        await this.bouton(1).click();
        await expect(this.reponse(1)).toBeVisible(T);
    }

    async PasserImagesSecondaires() {
        await this.attendreQuestion(2);
        await this.bouton(2).click();
        await expect(this.reponse(2)).toBeVisible(T);
    }

    async ChooseCategory(id = "14") {
        await this.attendreQuestion(3);
        const btn = this.page.getByTestId(`btn-envoyer-R3-${id}`);
        await expect(btn).toBeVisible(T); // attend le chargement des catégories
        await btn.click();
        await expect(this.reponse(3)).toBeVisible(T);
    }

    async AjouterTarif(titre: string, prix: string) {
        await this.repondreTexte(9, titre);
        await this.repondreTexte(10, prix);
    }

    async EnterLocation(adresse: string) {
        await this.attendreQuestion(13);
        await expect(this.input(13)).toBeVisible(T);
        await this.input(13).fill(adresse);
        const sugg = this.page.getByTestId("btn-envoyer-R13-suggestion-0");
        await expect(sugg).toBeVisible(T); // debounce + API adresse
        await sugg.click();
        await expect(this.reponse(13)).toBeVisible(T);
    }

    
    async EnterDescription(texte: string) {
        await this.attendreQuestion(21);
        const editeur = this.page.locator('[data-testid="input-R21"] .ql-editor');
        await expect(editeur).toBeVisible(T);
        await editeur.click();
        await editeur.fill(texte);
        await this.bouton(21).click();
        await expect(this.reponse(21)).toBeVisible(T);
    }

    async Publier() {
        await this.attendreQuestion(22);
        await expect(this.bouton(22)).toBeEnabled(T);
        await this.bouton(22).click();
    }
}