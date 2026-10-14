import { Page } from "@playwright/test";

export class HomePage {
    page:Page
    constructor(p:Page) {
    this.page = p   
    }
    elements = {
        ajouteventBtn:()=> this.page.getByRole("button",{name:"Ajouter Évent"}),
        imgFile:()=>this.page.getByTestId("input-R1"),
        btnCOntinuer:()=>this.page.getByRole("button",{name:"Continuer →"}),
        btnMusique:()=>this.page.getByRole("button",{name:"Musique"}),
        champSaisi:()=>this.page.getByPlaceholder('Ex : Concert Jazz'),
        champSaisi2:()=>this.page.getByPlaceholder('Ex : Soirée jazz'),
        btnENvoyer:()=>this.page.getByRole("button",{name:"Envoyer"}),
        dateInput:()=>this.page.getByTestId('input-R6'),
        dureeEnv:()=>this.page.getByPlaceholder("Ex : 2h30"),
        btnPayant:()=>this.page.getByTestId("btn-envoyer-R8-non"),
        champsaisiCat:()=> this.page.getByPlaceholder("Ex : Adulte"),
        champAjoutPrix:()=>this.page.getByPlaceholder("Ex : 20.00"),
        btnEnLigne:()=>this.page.getByTestId("btn-envoyer-R12-enligne"),
        champLien:()=>this.page.getByPlaceholder("https://meet.google.com/xxx"),
        btnLienExterne:()=> this.page.getByTestId("btn-envoyer-R19-externe"),
        champLienExterne:()=> this.page.getByTestId("input-R20"),
        desc:()=> this.page.locator('[data-placeholder="Écrivez votre description ici..."]'),
        btnEnvoyerDernier:()=>this.page.getByTestId("btn-envoyer-R22"),
        qst21:()=> this.page.getByTestId("Q21")  }
    async clickAjoutEvent(){
        await this.elements.ajouteventBtn().click()
       }
    async ajoutimage(){
        await this.elements.imgFile().setInputFiles('assets/image.png')
    }
    async clicjSurContinuer(){
        await this.elements.btnCOntinuer().click()
    }
    async clickSurMusique(){
        
        await this.elements.btnMusique().click()
    }
    async saisirChamps(s:string){
        await this.elements.champSaisi().fill(s)
    }
    async clickBtnEnvoyer(){
        await this.elements.btnENvoyer().waitFor({state:'visible'})
        await this.elements.btnENvoyer().click()
    }
    async saisirChamp2(s:string){
        await this.elements.champSaisi2().fill(s)
    }
    async insertDate(s:string){
        await this.elements.dateInput().fill(s)
    }
    async ajouterDuree(s:string){
        await this.elements.dureeEnv().fill(s)
    }
    async clickSUrPayant(){
        await this.elements.btnPayant().click()
}
    async ajouterCat(s:string){
        await this.elements.champsaisiCat().fill(s)
    }
    async saisitChampAjoutPrix(s:string){
        await this.elements.champAjoutPrix().fill(s)
    }
    async clickSurEnLigne(){
        await this.elements.btnEnLigne().click()
    }
    async saisirLien(s:string){
        await this.elements.champLien().fill(s)
    }
    async clickLienExt(){
        await this.elements.btnLienExterne().click()
    }
    async saisirLienExt(s:string){
        await this.elements.champLienExterne().fill(s)
    }
    async saisirDesc(s:string){
        await this.elements.desc().waitFor({state:'visible'})
        await this.elements.desc().fill(s)
    }
    async clickSurBtnEnvoyer(){
        await this.elements.btnEnvoyerDernier().click()
    }
    getQst21(){
        return  this.elements.qst21()
    }
}