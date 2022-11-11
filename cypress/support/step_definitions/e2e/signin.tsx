import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

type elementType = [key: string, value: string]

Given("I am a registered userr",()=>{
    cy.visit("http://localhost:3000")
    cy.contains("Signin").should("exist");
})

When("I log in with the following detailss",(datatable: any)=>{
    datatable.hashes().map((element : elementType) => (
        Object.entries(element).map(([key, value])=>(
            cy.get(`[name= "${key}"]`).type(value as string || '{backspace}',  {force: true} )
        ))   
    ))
    //@ts-ignore
    cy.findByRole('button', {name: 'Signin'}).click({force: true})
})

Then("I will not be logged in to my account", ()=>{
    //@ts-ignore
    cy.findByRole('button').should('be.disabled');
})

Given("the system should display message", (datatable: any)=>{
    datatable.hashes().map((message: any) =>(
        Object.keys(message).map((element: any) =>(
            cy.get(`#${element}-helper-text`).should('exist')
        ))
       ))
})


Given("I am a registered user",()=>{
    cy.visit("http://localhost:3000")
    cy.contains("Signin").should("exist");
})

When("I log in with the following details",(datatable: any)=>{
    datatable.hashes().map(element =>{
        Object.entries(element).map(([key, value])=>(
            cy.get(`[name= "${key}"]`).type(value as string, {force: true})
        ))  
        //@ts-ignore
        cy.findByRole('button', {name: 'Signin'}).click({force: true})
    })
})

Then("I will be logged in securely to my account", ()=>{

})