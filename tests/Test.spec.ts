import { test, expect } from '@playwright/test';
import Home from './pages/Home.page';
import DevenirPartenaire from './pages/DevenirPartenaire.page';

let homePage: Home;
let devenirPartenaire: DevenirPartenaire;

test.beforeEach(async ({ page }) => {
    homePage = new Home(page);
    devenirPartenaire = new DevenirPartenaire(page);

    await page.goto('https://preprod.thrundrz.fr/');

    await homePage.clickEspaceCreateur();

    await expect(page).toHaveURL(/\/devenir-partenaire$/);

    await devenirPartenaire.saisirEmail('createur@gmail.com');
    await devenirPartenaire.saisirPassword('Createur2025@');
    await devenirPartenaire.clickSeConnecter();

    await expect(page).toHaveURL(/\/EspaceClient$/);
});

test('login valide', async ({ page }) => {
    await expect(page).toHaveURL(/\/EspaceClient$/);
});