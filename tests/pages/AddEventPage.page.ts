import { Page } from "@playwright/test";

export class addeventpage {
    page: Page;

    constructor(page: Page) {
        
this.page = page;
    }
    elements = {
        add_png: () => this.page.locator('[data-testid="input-R1"]'),
        btn_continue: () => this.page.getByRole('button',{name:"Continuer →"}),
        Msg1:() => this.page.locator('[data-testid="R1"]'),
        Msg2:() => this.page.locator('[data-testid="R2"]'),
        Msg3:() => this.page.locator('[data-testid="R3"]'),
        Msg4:() => this.page.locator('[data-testid="R4"]'),
        Msg5:() => this.page.locator('[data-testid="R5"]'),
        Msg6:() => this.page.locator('[data-testid="R6"]'),
        Msg7:() => this.page.locator('[data-testid="R7"]'),
        Msg8:() => this.page.locator('[data-testid="R8"]'),
        Msg9:() => this.page.locator('[data-testid="R9"]'),
        Msg10:() => this.page.locator('[data-testid="R10"]'),
        Msg11:() => this.page.locator('[data-testid="R11"]'),
        Msg12:() => this.page.locator('[data-testid="R12"]'),
        Msg13:() => this.page.locator('[data-testid="R13"]'),
        categorie:() => this.page.locator('[data-testid="btn-envoyer-R3-14"]'),
        event_nom:() => this.page.getByPlaceholder('Ex : Concert Jazz'),
        btn_envoyer: () => this.page.getByRole('button',{name:"Envoyer"}),
        sous_event_nom:() => this.page.getByPlaceholder('Ex : Soirée jazz'),
        event_date:()=> this.page.locator('[data-testid="input-R6"]'),
        event_duree:()=> this.page.locator('[data-testid="input-R7"]'),
        eventPrice: () => this.page.locator('[data-testid="btn-envoyer-R8-non"]'),
        tarifet: () => this.page.locator('[data-testid="input-R7"]'),
        tarifet2: () => this.page.locator('[data-testid="input-R10"]'),
        addnewtar:() => this.page.locator('[data-testid="btn-envoyer-R11-oui"]'),
        tarifad: () => this.page.locator('[data-testid="input-R7"]'),
        tarifad2: () => this.page.locator('[data-testid="input-R10"]'),




    }
     
    async AddPng(img:string){
        await this.elements.add_png().setInputFiles(img)
    }

    async ClickContinue(){
        await this.elements.btn_continue().click()
    }
    async ChooseCategory(){
        await this.elements.categorie().click()
    }
    async EnterEventName(s:string){
        await this.elements.event_nom().fill(s)
    }
    async ClickEnvoyer(){
        await this.elements.btn_envoyer().click()
    }
    async EnterSousEventName(s:string){
        await this.elements.sous_event_nom().fill(s)
    }
    async EnterDateEvent(s:string){
        await this.elements.event_date().fill(s)
    }
    async EnterDureeEvent(s:string){
        await this.elements.event_duree().fill(s)
    }
    async IsFree(){
        await this.elements.eventPrice().click()
    }
    async Etudiant(){
        await this.elements.tarifet().waitFor({ state: 'visible', timeout: 10000 });
        await this.elements.tarifet().fill("Etudiant")
    }
    async tarifEt(s:string){
        await this.elements.tarifet2().fill(s)
    }
    async NewTarif(){
        await this.elements.addnewtar().click()
    }
    async Adulte(){
        await this.elements.tarifad().waitFor({ state: 'visible', timeout: 10000 });
        await this.elements.tarifad().fill("Adulte")
    }
    async tarifAd(s:string){
        await this.elements.tarifad2().fill(s)
    }


    getMessage1(){
        return this.elements.Msg1();
    }
    getMessage2(){
        return this.elements.Msg2();
    }
    getMessage3(){
        return this.elements.Msg3();
    }
    getMessage4(){
        return this.elements.Msg4();
    }
    getMessage5(){
        return this.elements.Msg5();
    }
    getMessage6(){
        return this.elements.Msg6();
    }        
    getMessage7(){
        return this.elements.Msg7();
    } 
    getMessage8(){
        return this.elements.Msg8();
    } 
    getMessage9(){
        return this.elements.Msg9();
    } 
    getMessage10(){
        return this.elements.Msg6();
    }
    getMessage11(){
        return this.elements.Msg6();
    }
    getMessage12(){
        return this.elements.Msg6();
    }
    // getMessage6(){
    //     return this.elements.Msg6();
    // }
    // getMessage6(){
    //     return this.elements.Msg6();
    // } 
} 

