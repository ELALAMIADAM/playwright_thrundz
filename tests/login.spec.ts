import { test, expect } from "@playwright/test";
import path from "path";
import { home } from "./pages/home.page";
import { login } from "./pages/login.page";
import { EspaceClient } from "./pages/EspaceClient.page";
import { AjoutEvent } from "./pages/AjouteEvent.page";

let homePage: home;
let loginPage: login;
let espaceClientPage: EspaceClient;
let ajoutEventPage: AjoutEvent;

const imagePath = path.resolve(__dirname, "fixtures/event.jpg");

test.beforeEach(async ({ page }) => {
    homePage = new home(page);
    loginPage = new login(page);
    espaceClientPage = new EspaceClient(page);
    ajoutEventPage = new AjoutEvent(page);
    await page.goto("https://preprod.thrundrz.fr/", { waitUntil: "domcontentloaded" });
});

test("Login espace createur", async ({ page }) => {
    await homePage.click_espace_createur();
    await expect(page).toHaveURL(/\/devenir-partenaire/);

    await loginPage.se_connecter(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
    await expect(page).toHaveURL(/\/EspaceClient/);
});

test("Ajouter un Evenement avec une image", async ({ page }) => {
    test.setTimeout(180_000); // parcours long (21 étapes) : 3 min

    // Connexion
    await homePage.click_espace_createur();
    await loginPage.se_connecter(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);

    // Accès à la création d'événement
    await espaceClientPage.click_cree_evenement();
    await expect(page).toHaveURL(/\/mesevents\/ajouter/);

    // Étape 1 : image principale
    await ajoutEventPage.ajouter_image(imagePath);
    await expect(ajoutEventPage.elements.continuer()).toBeEnabled();
    await ajoutEventPage.click_continuer();
    await expect(ajoutEventPage.getMssg_image_ajoutee()).toBeVisible();

    // Étape 2 : pas d'images supplémentaires
    await ajoutEventPage.click_continuer();
    await expect(ajoutEventPage.getMssg_sans_ajout_image()).toBeVisible();

    // Étape 3 : catégorie
    await ajoutEventPage.click_activites();
    await expect(ajoutEventPage.getMssg_categorie()).toBeVisible();

    // Étape 4 : nom
    await ajoutEventPage.saisir_nom_evenement("GTAVI");
    await expect(ajoutEventPage.getMssg_nom_evenement()).toContainText("GTAVI");

    // Étape 5 : sous-titre
    await ajoutEventPage.saisir_sousTitre_evenement("Jeux");
    await expect(ajoutEventPage.getMssg_sousTitre_evenement()).toContainText("Jeux");

    // Étape 6 : date (format ISO)
    await ajoutEventPage.remplir_date_evenement("2026-12-12T22:00");
    await expect(ajoutEventPage.getMssg_date_evenement()).toBeVisible();

    // Étape 7 : durée
    await ajoutEventPage.remplir_duree_evenement("2h");
    await expect(ajoutEventPage.getMssg_duree_evenement()).toBeVisible();

    // Étape 8 : gratuit
    await ajoutEventPage.click_oui_gratuit();
    await expect(ajoutEventPage.getMssg_gratuit()).toBeVisible();

    // Étape 12 : présentiel
    await ajoutEventPage.click_presentiel();
    await expect(ajoutEventPage.getMssg_presentiel()).toBeVisible();

    // Étape 13 : adresse (autocomplétion)
    await ajoutEventPage.choisir_adresse(
        "4 av Laurent Cély",
        "4 Avenue Laurent-Cély 92600 Asnières-sur-Seine"
    );
    await expect(ajoutEventPage.getMssg_adresse()).toContainText("Asnières-sur-Seine");

    // Étape 15 : restaurant (non)
    await ajoutEventPage.choisir_non_restaurant();
    await expect(ajoutEventPage.getMssg_non_restaurant()).toBeVisible();

    // Étape 16 : parking (non)
    await ajoutEventPage.choisir_non_parking();
    await expect(ajoutEventPage.getMssg_non_parking()).toBeVisible();

    // Étape 17 : accessibilité auditive (oui)
    await ajoutEventPage.choisir_oui_auditive();
    await expect(ajoutEventPage.getMssg_oui_auditive()).toContainText("Oui");

    // Étape 18 : accessibilité handicap (oui)
    await ajoutEventPage.choisir_oui_handicap();
    await expect(ajoutEventPage.getMssg_oui_handicap()).toContainText("Oui");

    // Étape 19 : réservation via la billetterie Thrundrz
    await ajoutEventPage.choisir_billetterie_thrundrz();
    await expect(ajoutEventPage.getMssg_billetterie()).toContainText("Billetterie Thrundrz");

    // Étape 21 : description (20 caractères minimum)
    const description = "Soirée de lancement GTA VI avec tournois et animations.";
    await expect(ajoutEventPage.getMssg_question_description()).toContainText("Décris l'événement");
    await ajoutEventPage.saisir_description(description);
    await expect(ajoutEventPage.getMssg_description()).toContainText("Soirée de lancement");

    // Publication
    await expect(ajoutEventPage.getMssg_pret_publier()).toBeVisible();
    await ajoutEventPage.publier_evenement();
});