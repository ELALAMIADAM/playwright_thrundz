import { test, expect } from '@playwright/test';
import { loginPage } from './pages/login.page';
import { homepage } from './pages/Home.page';
import { espaceclientpage } from './pages/EspaceClient.page';
import { addeventpages } from './pages/AddEventPages.page';
// import { TIMEOUT } from 'node:dns';

const imagePath = './tests/assets/img.jpg';

let lp: loginPage
let hp: homepage
let ecp: espaceclientpage
let evp: addeventpages

test.beforeEach(async ({ page }) => {
  lp = new loginPage(page);
  hp = new homepage(page);
  ecp = new espaceclientpage(page);
  evp = new addeventpages(page);
  await page.goto("https://preprod.thrundrz.fr/");
})

test("parcours event", async ({ page }) => {
  test.setTimeout(180000)
  await hp.GotoCreatorEspace()
  await lp.Login(process.env.EMAIL!, process.env.PASSWORD!)
  await expect(page).toHaveURL(/EspaceClient$/)
  //
  await ecp.AddEvent()
  // add image
  await evp.AddPng(imagePath)
  await evp.ClickContinue()
  await expect(evp.getMessage1()).toHaveText('✅ Image ajoutée')
  // click continue
  await evp.ClickContinue()
  await expect(evp.getMessage2()).toHaveText("C'est bon pour les images 👍")
  // category
  await evp.ChooseCategory()
  await expect(evp.getMessage3()).toHaveText("Concert")
  // event Name
  const eventName = 'eventname'
  await evp.EnterEventName(eventName)
  await evp.ClickEnvoyer()
  await expect(evp.getMessage4()).toHaveText(eventName)
  // sous event name
  const SousEventName = 'sous'
  await evp.EnterSousEventName(SousEventName)
  await evp.ClickEnvoyer()
  await expect(evp.getMessage5()).toHaveText(SousEventName)
  // event date
  await evp.EnterDateEvent('2026-11-11T10:10')
  await evp.ClickEnvoyer()
  await expect(evp.getMessage6()).toHaveText("11 novembre 2026 à 10:10")
  // event duree
  const eventDuree = "2h30"
  await evp.EnterDureeEvent(eventDuree)
  await evp.ClickEnvoyer()
  await expect(evp.getMessage7()).toHaveText(eventDuree)
  // Is free
  await evp.IsFree()
  await expect(evp.getMessage8()).toHaveText("Non, c'est payant")
  // Etudiant

  await evp.Etudiant()
  await evp.ClickEnvoyer()
  await expect(evp.getMessage9()).toHaveText("Etudiant")
  const tarifet = "5"
  await evp.tarifEt(tarifet)
  await evp.ClickEnvoyer()
  await expect(evp.getMessage10()).toHaveText(tarifet + ".00 €")
  // Adulte
  // await evp.NewTarif()
  // await evp.Adulte()
  // await evp.ClickEnvoyer()
  // await expect(evp.getMessageadulte()).toHaveText("Adulte")
  // const tarifad = "10"
  // await evp.tarifAd(tarifad)
  // await evp.ClickEnvoyer()
  // await expect(evp.getMessageadultetr()).toHaveText(tarifad+".00 €")
  await evp.ClickContinue()
  //adresse
  await expect(evp.getMessage11()).toHaveText("C'est tout pour les tarifs")

  await evp.clickpresentiel()

  await evp.enterLocation("12 Rue Lecourbe 75015 Paris")
  await evp.ClickLocation()
  await expect(evp.getMessagelocation()).toHaveText("📍 12 Rue Lecourbe 75015 Paris")

  //restaurant
  await evp.ClickRestaurant()
  await expect(evp.getMessage15()).toHaveText("Oui")
  // parking
  await evp.ClickPark()
  await expect(evp.getMessage16()).toHaveText("Oui")
  // acc
  await evp.ClickAcc()
  await expect(evp.getMessage17()).toHaveText("Oui")
  // handicap
  await evp.Clickhandicap()
  await expect(evp.getMessage18()).toHaveText("Oui")
  //lien
  await evp.ClickLink()
  await expect(evp.getMessage19()).toHaveText("Lien externe")
  const link = 'https://preprod.thrundrz.fr/EspaceClient/mesevents/ajouter'
  await evp.EnterLink(link)
  await evp.ClickEnvoyer()
  await expect(evp.getMessage20()).toHaveText("https://preprod.thrundrz.fr/EspaceClient/mesevents/ajouter")
  // description
  const description = "Un super evenement de test pour la preprod"
  await evp.EnterDescription(description)
  await evp.ClickContinueDescription()
  await expect(evp.getMessage21()).toHaveText(description)
  // envoyer
  await evp.ClickPublier()
  await expect(page.getByText("Événement ajouté !")).toBeVisible({ timeout: 20000 })
  await expect(page).toHaveURL(/EspaceClient$/, { timeout: 20000 })
})