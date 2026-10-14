import { test, expect } from '@playwright/test';
import { loginPage } from './pages/login.page';
import  { homepage } from './pages/Home.page';
import { espaceclientpage } from './pages/EspaceClient.page';
import { addeventpage } from './pages/AddEventPage.page';
import { TIMEOUT } from 'node:dns';

const imagePath = './tests/assets/img.jpg';

let lp: loginPage
let hp:homepage
let ecp: espaceclientpage
let evp: addeventpage

test.beforeEach(async ({ page }) => {
  lp = new loginPage(page);
  hp = new homepage(page);
  ecp = new espaceclientpage(page);
  evp = new addeventpage(page);
  await page.goto("https://preprod.thrundrz.fr/");
})

test("parcours event", async ({ page }) => {
    await hp.GotoCreatorEspace()
    await lp.Login(process.env.EMAIL!,process.env.PWD!)
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
    await expect(evp.getMessage10()).toHaveText(tarifet+".00 €")
    // Adulte
    await evp.Adulte()
    await evp.ClickEnvoyer()
    await expect(evp.getMessage11()).toHaveText("Adulte")
    const tarifad = "10"
    await evp.tarifAd(tarifad)
    await evp.ClickEnvoyer()
    await expect(evp.getMessage12()).toHaveText(tarifad+".00 €")

    
    

    


})