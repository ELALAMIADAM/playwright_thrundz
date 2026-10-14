import { Page } from "@playwright/test";

export class AjoutEvent {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    elements = {
        // Étape 1 : image principale
        image: () => this.page.getByTestId("zone-saisie").locator('input[type="file"]'),
        continuer: () => this.page.getByRole("button", { name: "Continuer" }),
        mssg_image_ajoutee: () => this.page.getByTestId("R1"),

        // Étape 2 : images supplémentaires
        mssg_sans_ajout_image: () => this.page.getByTestId("R2"),

        // Étape 3 : catégorie
        activites: () => this.page.getByRole("button", { name: "Activités" }),
        mssg_categorie: () => this.page.getByTestId("R3"),

        // Étape 4 : nom
        nom_evenement: () => this.page.getByTestId("input-R4"),
        mssg_nom_evenement: () => this.page.getByTestId("R4"),

        // Étape 5 : sous-titre
        sousTitre_evenement: () => this.page.getByTestId("input-R5"),
        mssg_sousTitre_evenement: () => this.page.getByTestId("R5"),

        // Étape 6 : date
        date_evenement: () => this.page.getByTestId("input-R6"),
        mssg_date_evenement: () => this.page.getByTestId("R6"),

        // Étape 7 : durée
        duree_evenement: () => this.page.getByTestId("input-R7"),
        mssg_duree_evenement: () => this.page.getByTestId("R7"),

        // Étape 8 : gratuit
        btn_gratuit: () => this.page.getByTestId("btn-envoyer-R8-oui"),
        mssg_gratuit: () => this.page.getByTestId("R8"),

        // Étape 12 : présentiel
        btn_presentiel: () => this.page.getByTestId("btn-envoyer-R12-presentiel"),
        mssg_presentiel: () => this.page.getByTestId("R12"),

        // Étape 13 : adresse (autocomplétion)
        adresse: () => this.page.getByTestId("input-R13"),
        suggestion_adresse: (adresse: string) => this.page.getByText(adresse, { exact: true }),
        mssg_adresse: () => this.page.getByTestId("R13"),

        // Étape 15 : restaurant (non)
        btn_non_restaurant: () => this.page.getByTestId("btn-envoyer-R15-non"),
        mssg_non_restaurant: () => this.page.getByTestId("R15"),

        // Étape 16 : parking (non)
        btn_non_parking: () => this.page.getByTestId("btn-envoyer-R16-non"),
        mssg_non_parking: () => this.page.getByTestId("R16"),

        // Étape 17 : accessibilité auditive (oui)
        btn_oui_auditive: () => this.page.getByTestId("btn-envoyer-R17-oui"),
        mssg_oui_auditive: () => this.page.getByTestId("R17"),

        // Étape 18 : accessibilité handicap (oui)
        btn_oui_handicap: () => this.page.getByTestId("btn-envoyer-R18-oui"),
        mssg_oui_handicap: () => this.page.getByTestId("R18"),

        // Étape 19 : réservation (billetterie Thrundrz)
        btn_billetterie_thrundrz: () => this.page.getByRole("button", { name: "Billetterie Thrundrz" }),
        mssg_billetterie: () => this.page.getByTestId("R19"),

        // Étape 20 : description (20 caractères min)
        description_evenement: () => this.page.getByTestId("input-R20"),
        mssg_description: () => this.page.getByTestId("R20"),

        // Étape finale : publication
        mssg_pret_publier: () => this.page.getByText("C'est prêt ! Je publie ton événement ?"),
        btn_publier: () => this.page.getByRole("button", { name: /Envoyer/ }),

        // Commun
        btn_envoyer: () => this.page.getByRole("button", { name: "Envoyer" }),
    }

    // ---------- Actions communes ----------

    async click_envoyer() {
        await this.elements.btn_envoyer().click();
    }

    async click_continuer() {
        await this.elements.continuer().click();
    }

    // ---------- Étape 1 : image ----------

    async ajouter_image(cheminImage: string) {
        await this.elements.image().setInputFiles(cheminImage);
    }

    getMssg_image_ajoutee() {
        return this.elements.mssg_image_ajoutee();
    }

    // ---------- Étape 2 : images supplémentaires ----------

    getMssg_sans_ajout_image() {
        return this.elements.mssg_sans_ajout_image();
    }

    // ---------- Étape 3 : catégorie ----------

    async click_activites() {
        await this.elements.activites().click();
    }

    getMssg_categorie() {
        return this.elements.mssg_categorie();
    }

    // ---------- Étape 4 : nom ----------

    async saisir_nom_evenement(nom: string) {
        await this.elements.nom_evenement().fill(nom);
        await this.click_envoyer();
    }

    getMssg_nom_evenement() {
        return this.elements.mssg_nom_evenement();
    }

    // ---------- Étape 5 : sous-titre ----------

    async saisir_sousTitre_evenement(sousTitre: string) {
        await this.elements.sousTitre_evenement().fill(sousTitre);
        await this.click_envoyer();
    }

    getMssg_sousTitre_evenement() {
        return this.elements.mssg_sousTitre_evenement();
    }

    // ---------- Étape 6 : date (format ISO : "2026-12-12T22:00") ----------

    async remplir_date_evenement(dateISO: string) {
        await this.elements.date_evenement().fill(dateISO);
        await this.click_envoyer();
    }

    getMssg_date_evenement() {
        return this.elements.mssg_date_evenement();
    }

    // ---------- Étape 7 : durée ----------

    async remplir_duree_evenement(duree: string) {
        await this.elements.duree_evenement().fill(duree);
        await this.click_envoyer();
    }

    getMssg_duree_evenement() {
        return this.elements.mssg_duree_evenement();
    }

    // ---------- Étape 8 : gratuit ----------

    async click_oui_gratuit() {
        await this.elements.btn_gratuit().click();
    }

    getMssg_gratuit() {
        return this.elements.mssg_gratuit();
    }

    // ---------- Étape 12 : présentiel ----------

    async click_presentiel() {
        await this.elements.btn_presentiel().click();
    }

    getMssg_presentiel() {
        return this.elements.mssg_presentiel();
    }

    // ---------- Étape 13 : adresse ----------

    async choisir_adresse(recherche: string, adresseComplete: string) {
        await this.elements.adresse().pressSequentially(recherche, { delay: 100 });
        await this.elements.suggestion_adresse(adresseComplete).click();
    }

    getMssg_adresse() {
        return this.elements.mssg_adresse();
    }

    // ---------- Étape 15 : restaurant ----------

    async choisir_non_restaurant() {
        await this.elements.btn_non_restaurant().click();
    }

    getMssg_non_restaurant() {
        return this.elements.mssg_non_restaurant();
    }

    // ---------- Étape 16 : parking ----------

    async choisir_non_parking() {
        await this.elements.btn_non_parking().click();
    }

    getMssg_non_parking() {
        return this.elements.mssg_non_parking();
    }

    // ---------- Étape 17 : accessibilité auditive ----------

    async choisir_oui_auditive() {
        await this.elements.btn_oui_auditive().click();
    }

    getMssg_oui_auditive() {
        return this.elements.mssg_oui_auditive();
    }

    // ---------- Étape 18 : accessibilité handicap ----------

    async choisir_oui_handicap() {
        await this.elements.btn_oui_handicap().click();
    }

    getMssg_oui_handicap() {
        return this.elements.mssg_oui_handicap();
    }

    // ---------- Étape 19 : réservation ----------

    async choisir_billetterie_thrundrz() {
        await this.elements.btn_billetterie_thrundrz().click();
    }

    getMssg_billetterie() {
        return this.elements.mssg_billetterie();
    }

    // ---------- Étape 20 : description ----------

    async saisir_description(description: string) {
        await this.elements.description_evenement().fill(description);
        await this.click_envoyer();
    }

    getMssg_description() {
        return this.elements.mssg_description();
    }

    // ---------- Étape finale : publication ----------

    getMssg_pret_publier() {
        return this.elements.mssg_pret_publier();
    }

    async publier_evenement() {
        await this.elements.btn_publier().click();
    }
}