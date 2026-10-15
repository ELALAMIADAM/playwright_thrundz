import { Page } from "@playwright/test";

export class addeventpages {
    page: Page;

    constructor(page: Page) {

        this.page = page;
    }
    elements = {
        add_png: () => this.page.locator('[data-testid="input-R1"]'),
        btn_continue: () => this.page.getByRole('button', { name: "Continuer →" }),
        Msg1: () => this.page.locator('[data-testid="R1"]'),
        Msg2: () => this.page.locator('[data-testid="R2"]'),
        Msg3: () => this.page.locator('[data-testid="R3"]'),
        Msg4: () => this.page.locator('[data-testid="R4"]'),
        Msg5: () => this.page.locator('[data-testid="R5"]'),
        Msg6: () => this.page.locator('[data-testid="R6"]'),
        Msg7: () => this.page.locator('[data-testid="R7"]'),
        Msg8: () => this.page.locator('[data-testid="R8"]'),
        Msg9: () => this.page.locator('[data-testid="R9"]'),
        Msg10: () => this.page.locator('[data-testid="R10"]'),
        Msg11: () => this.page.locator('[data-testid="R11"]'),
        Msg12: () => this.page.locator('[data-testid="R12"]'),
        Msg13: () => this.page.locator('[data-testid="R13"]'),
        categorie: () => this.page.locator('[data-testid="btn-envoyer-R3-14"]'),
        event_nom: () => this.page.getByPlaceholder('Ex : Concert Jazz'),
        btn_envoyer: () => this.page.getByRole('button', { name: "Envoyer" }),
        sous_event_nom: () => this.page.getByPlaceholder('Ex : Soirée jazz'),
        event_date: () => this.page.locator('[data-testid="input-R6"]'),
        event_duree: () => this.page.locator('[data-testid="input-R7"]'),
        eventPrice: () => this.page.locator('[data-testid="btn-envoyer-R8-non"]'),
        tarifet: () => this.page.locator('[data-testid="input-R9"]'),
        tarifet2: () => this.page.locator('[data-testid="input-R10"]'),
        addnewtar: () => this.page.locator('[data-testid="btn-envoyer-R11-oui"]'),
        presentiel: () => this.page.locator('[data-testid="btn-envoyer-R12-presentiel"]'),
        location: () => this.page.locator('[data-testid="input-R13"]'),
        firstlocation: () => this.page.locator('[data-testid="btn-envoyer-R13-suggestion-0"]'),
        msg_location: () => this.page.locator('[data-testid="R13"]'),
        restaurantOK: () => this.page.locator('[data-testid="btn-envoyer-R15-oui"]'),
        Msg15: () => this.page.locator('[data-testid="R15"]'),
        parking: () => this.page.locator('[data-testid="btn-envoyer-R16-oui"]'),
        Msg16: () => this.page.locator('[data-testid="R16"]'),
        accessibilite: () => this.page.locator('[data-testid="btn-envoyer-R17-oui"]'),
        Msg17: () => this.page.locator('[data-testid="R17"]'),
        handicap: () => this.page.locator('[data-testid="btn-envoyer-R18-oui"]'),
        Msg18: () => this.page.locator('[data-testid="R18"]'),
        lien: () => this.page.locator('[data-testid="btn-envoyer-R19-externe"]'),
        Msg19: () => this.page.locator('[data-testid="R19"]'),
        Linkadresse: () => this.page.locator('[data-testid="input-R20"]'),
        Msg20: () => this.page.locator('[data-testid="R20"]'),
        accmsg: () => this.page.locator('[data-testid="Q17"]'),
        isRestaurant: () => this.page.locator('[data-testid="Q15"]'),
        isparking: () => this.page.locator('[data-testid="Q16"]'),
        isAcc: () => this.page.locator('[data-testid="Q17"]'),
        isLien: () => this.page.locator('[data-testid="Q19"]'),
        isHandicap: () => this.page.locator('[data-testid="Q18"]'),
        description: () => this.page.locator('[data-testid="input-R21"] .ql-editor'),
        btn_description: () => this.page.locator('[data-testid="btn-envoyer-R21"]'),
        Msg21: () => this.page.locator('[data-testid="R21"]'),
        btn_publier: () => this.page.locator('[data-testid="btn-envoyer-R22"]'),










    }

    async AddPng(img: string) {
        await this.elements.add_png().setInputFiles(img)
    }

    async ClickContinue() {
        await this.elements.btn_continue().waitFor({ state: 'visible', timeout: 10000 });
        await this.elements.btn_continue().click()
    }
    async ChooseCategory() {
        await this.elements.categorie().click()
    }
    async EnterEventName(s: string) {
        await this.elements.event_nom().fill(s)
    }
    async ClickEnvoyer() {
        await this.elements.btn_envoyer().click()
    }
    async EnterSousEventName(s: string) {
        await this.elements.sous_event_nom().fill(s)
    }
    async EnterDateEvent(s: string) {
        await this.elements.event_date().fill(s)
    }
    async EnterDureeEvent(s: string) {
        await this.elements.event_duree().fill(s)
    }
    async IsFree() {
        await this.elements.eventPrice().click()
    }
    async Etudiant() {
        await this.elements.tarifet().waitFor({ state: 'visible', timeout: 10000 });
        await this.elements.tarifet().fill("Etudiant")
    }
    async tarifEt(s: string) {
        await this.elements.tarifet2().fill(s)
    }
    async NewTarif() {
        await this.elements.addnewtar().click()
    }
    async Adulte() {
        await this.elements.tarifet().waitFor({ state: 'visible', timeout: 10000 });
        await this.elements.tarifet().fill("Adulte")
    }
    async tarifAd(s: string) {
        await this.elements.tarifet2().fill(s)
    }
    async clickpresentiel() {
        await this.elements.presentiel().waitFor({ state: 'visible', timeout: 10000 });
        await this.elements.presentiel().click()
    }

    async enterLocation(s: string) {
        await this.elements.location().waitFor({ state: 'visible', timeout: 10000 });
        await this.elements.location().fill(s)
    }
    async ClickLocation() {
        await this.elements.firstlocation().waitFor({ state: 'visible', timeout: 10000 })
        await this.elements.firstlocation().click()
    }
    getMessagelocation() {
        return this.elements.msg_location();
    }

    async ClickRestaurant() {
        await this.elements.isRestaurant().waitFor({ state: 'visible', timeout: 10000 })

        await this.elements.restaurantOK().waitFor({ state: 'visible', timeout: 10000 })
        await this.elements.restaurantOK().click()
    }
    getMessage15() {
        return this.elements.Msg15();
    }
    async ClickPark() {
        await this.elements.isparking().waitFor({ state: 'visible', timeout: 10000 })
        await this.elements.parking().waitFor({ state: 'visible', timeout: 10000 })
        await this.elements.parking().click()
    }
    getMessage16() {
        return this.elements.Msg16();
    }

    async ClickAcc() {
        await this.elements.isAcc().waitFor({ state: 'visible', timeout: 10000 })
        await this.elements.accessibilite().waitFor({ state: 'visible', timeout: 10000 })
        await this.elements.accessibilite().click()
    }
    getMessage17() {
        return this.elements.Msg17();
    }
    async Clickhandicap() {
        await this.elements.isHandicap().waitFor({ state: 'visible', timeout: 10000 })
        await this.elements.handicap().waitFor({ state: 'visible', timeout: 10000 })
        await this.elements.handicap().click()
    }
    getMessage18() {
        return this.elements.Msg18();
    }
    async ClickLink() {

        await this.elements.isLien().waitFor({ state: 'visible', timeout: 10000 })
        await this.elements.lien().waitFor({ state: 'visible', timeout: 10000 })
        await this.elements.lien().click()
    }
    getMessage19() {
        return this.elements.Msg19();
    }
    async EnterLink(s: string) {
        await this.elements.Linkadresse().waitFor({ state: 'visible', timeout: 10000 })
        await this.elements.Linkadresse().fill(s)
    }
    getMessage20() {
        return this.elements.Msg20();
    }
    async EnterDescription(s: string) {
        await this.elements.description().waitFor({ state: 'visible', timeout: 10000 })
        await this.elements.description().click()
        await this.elements.description().fill(s)
    }
    async ClickContinueDescription() {
        await this.elements.btn_description().click()
    }
    getMessage21() {
        return this.elements.Msg21();
    }
    async ClickPublier() {
        await this.elements.btn_publier().waitFor({ state: 'visible', timeout: 10000 })
        await this.elements.btn_publier().click()
    }

    getMessage1() {
        return this.elements.Msg1();
    }
    getMessage2() {
        return this.elements.Msg2();
    }
    getMessage3() {
        return this.elements.Msg3();
    }
    getMessage4() {
        return this.elements.Msg4();
    }
    getMessage5() {
        return this.elements.Msg5();
    }
    getMessage6() {
        return this.elements.Msg6();
    }
    getMessage7() {
        return this.elements.Msg7();
    }
    getMessage8() {
        return this.elements.Msg8();
    }
    getMessage9() {
        return this.elements.Msg9();
    }
    getMessageadulte() {
        return this.elements.Msg9().nth(1);
    }
    getMessage10() {
        return this.elements.Msg10();
    }
    getMessageadultetr() {
        return this.elements.Msg10().nth(1);
    }
    getMessage11() {
        return this.elements.Msg11();
    }
    getMessage12() {
        return this.elements.Msg12();
    }
}