import { test, expect } from '@playwright/test';
import { AccueilPage } from '../pages/accueil.page';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
let hp : HomePage
let ap : AccueilPage
let lp : LoginPage

test('login', async ({ page }) => {
  await page.goto('https://preprod.thrundrz.fr/');
  ap = new AccueilPage(page)
  await ap.clickBtn()
  lp = new LoginPage(page)
  await lp.login(process.env.EMAIL_USER!, process.env.MDP_USER!)
  await expect(page).toHaveURL("https://preprod.thrundrz.fr/EspaceClient")

  hp = new HomePage(page)
  await hp.clickAjoutEvent()
  await hp.ajoutimage()
  await hp.clicjSurContinuer()
  await hp.clicjSurContinuer()
  await hp.clickSurMusique()
  await hp.saisirChamps("concert kabyle")
  await hp.clickBtnEnvoyer()
  await hp.saisirChamp2("soirée kabyle")
  await hp.clickBtnEnvoyer()
  await hp.insertDate("2026-10-22T14:30")
  await hp.clickBtnEnvoyer()
  await hp.ajouterDuree("2h")
  await hp.clickBtnEnvoyer()
  await hp.clickSUrPayant()
  await hp.ajouterCat("Adulte")
  await hp.clickBtnEnvoyer()
  await hp.saisitChampAjoutPrix('20.00')
  await hp.clickBtnEnvoyer()
  await hp.clicjSurContinuer()
  await hp.clickSurEnLigne()
  await hp.saisirLien("https://meet.google.com/xxx")
  await hp.clickBtnEnvoyer()
  await hp.clickLienExt()
  await hp.saisirLienExt("https://preprod.thrundrz.fr/EspaceClient/mesevents/ajouter")
  await hp.clickBtnEnvoyer()
  console.log("Nombre de Q21 :", await page.getByTestId("Q21").count());

  await expect(hp.getQst21()).toBeVisible({timeout:100000})
  /*await hp.saisirDesc('ceci une description , fete')
  await hp.clicjSurContinuer()
  await hp.clickSurBtnEnvoyer()
  await expect(page).toHaveURL("https://preprod.thrundrz.fr/EspaceClient")*/

 




  
  // Expect a title "to contain" a substring.
});

