import { test, expect } from '@playwright/test';
import { loginPage } from './pages/login.page';
import { homepage } from './pages/Home.page';
import { espaceclientpage } from './pages/EspaceClient.page';
import { addeventpage } from './pages/AddEventPage.page';

const imagePath = './tests/assets/img.jpg';

let lp: loginPage;
let hp: homepage;
let ecp: espaceclientpage;
let evp: addeventpage;

test.beforeEach(async ({ page }) => {
  lp = new loginPage(page);
  hp = new homepage(page);
  ecp = new espaceclientpage(page);
  evp = new addeventpage(page);
  await page.goto("https://preprod.thrundrz.fr/");
});

test("parcours event - présentiel, payant, tout oui, billetterie externe", async ({ page }) => {
  // ~22 questions x 1,8 s de bot + login + API → bien plus que 30 s
  test.setTimeout(180_000);

  // ── Login ──────────────────────────────────────────────
  await hp.GotoCreatorEspace();
  await lp.Login(process.env.EMAIL!, process.env.PASSWORD!);
  await expect(page).toHaveURL(/EspaceClient$/, { timeout: 15000 });

  await ecp.AddEvent();

  // ── Images ─────────────────────────────────────────────
  await evp.AddPng(imagePath);
  await expect(evp.reponse(1)).toHaveText('✅ Image ajoutée');

  await evp.PasserImagesSecondaires();
  await expect(evp.reponse(2)).toHaveText("C'est bon pour les images 👍");

  // ── Catégorie ──────────────────────────────────────────
  await evp.ChooseCategory("14");
  await expect(evp.reponse(3)).toHaveText("Concert");

  // ── Nom / sous-titre / date / durée ────────────────────
  const eventName = 'eventname';
  await evp.repondreTexte(4, eventName);
  await expect(evp.reponse(4)).toHaveText(eventName);

  const sousNom = 'sous';
  await evp.repondreTexte(5, sousNom);
  await expect(evp.reponse(5)).toHaveText(sousNom);

  await evp.repondreTexte(6, '2027-11-11T10:10');
  await expect(evp.reponse(6)).toHaveText("11 novembre 2027 à 10:10");

  await evp.repondreTexte(7, "2h30");
  await expect(evp.reponse(7)).toHaveText("2h30");

  // ── Payant + tarifs ────────────────────────────────────
  await evp.choisir(8, "non");
  await expect(evp.reponse(8)).toHaveText("Non, c'est payant");

  await evp.AjouterTarif("Etudiant", "5");
  await expect(evp.reponse(9)).toHaveText("Etudiant");
  await expect(evp.reponse(10)).toHaveText("5.00 €");

  // Ajouter un 2e tarif (Adulte)
  await evp.choisir(11, "oui");
  await evp.AjouterTarif("Adulte", "10");
  await expect(evp.reponse(9)).toHaveText("Adulte");      // .last() = le dernier tarif
  await expect(evp.reponse(10)).toHaveText("10.00 €");

  await evp.choisir(11, "non");
  await expect(evp.reponse(11)).toHaveText("C'est tout pour les tarifs");

  // ── Présentiel + adresse ───────────────────────────────
  await evp.choisir(12, "presentiel");
  await expect(evp.reponse(12)).toHaveText("Présentiel 📍");

  await evp.EnterLocation("12 Rue Lecourbe 75015 Paris");
  await expect(evp.reponse(13)).toContainText("12 Rue Lecourbe");

  // ── Restaurant / Parking / Auditive / Handicap : OUI ───
  for (const n of [15, 16, 17, 18]) {
    await evp.choisir(n, "oui");
    await expect(evp.reponse(n)).toHaveText("Oui");
  }

  // ── Billetterie externe ────────────────────────────────
  await evp.choisir(19, "externe");
  await expect(evp.reponse(19)).toHaveText("Lien externe");

  const link = 'https://preprod.thrundrz.fr/EspaceClient/mesevents/ajouter';
  await evp.repondreTexte(20, link);
  await expect(evp.reponse(20)).toHaveText(link);

  // ── Description ────────────────────────────────────────
  await evp.EnterDescription("Un super événement de test créé par Playwright en préprod.");
  await expect(evp.reponse(21)).toContainText("super événement");

  // ── Publication ────────────────────────────────────────
  await evp.Publier();
  await expect(page.getByText("Événement ajouté !")).toBeVisible({ timeout: 20000 });
  await expect(page).toHaveURL(/EspaceClient$/, { timeout: 20000 });
});