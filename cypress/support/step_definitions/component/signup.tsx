import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Signup from '../../../../src/pages/signup'
import '../../component'


Given('I am in registration page', () => {
    //@ts-ignore
    cy.mount(<Signup />)
    cy.contains("Signup").should("exist");
});
type elementType = [key: string, value: string]
const userRegister = (element: elementType)=>{
    Object.entries(element).map(([key, value])=>(
        cy.get(`[name= "${key}"]`).type(value as string, {force: true})
    ))
    cy.get('[name="terms"]').uncheck().check( {force: true})
    //@ts-ignore
    cy.findByRole('button', {name: 'Signup'}).click({force: true})
}

const userRegister1 = (element: any)=>{
    Object.entries(element).map(([key, value])=>(
        cy.get(`#${key}`).type(value as string || '{backspace}',  {force: true} )
    ))   
    cy.get('[name="terms"]').uncheck().check( {force: true}) 
    //@ts-ignore  
    cy.findByRole('button', {name: 'Signup'}).click({force: true})
}

When('I registered with the following details', (datatable: any) => {
    datatable.hashes().forEach((element) => {
        userRegister(element)
    });
});

Then('I will have a new account and a notice message displayed', () => {
    
})

Given('I am in registration pagee', () => {
    //@ts-ignore
    cy.mount(<Signup />)
    cy.contains("Signup").should("exist");
});

When('I registered with the following detailss', (datatable: any) => {
    datatable.hashes().forEach(element =>{
        userRegister1(element)
    })
});

Then('I will not have a new account', () => {
    //@ts-ignore
    cy.findByRole('button').should('be.disabled');
});

Given('a validation notice displayed', (datatable: any) => {
   datatable.hashes().map((message: any) =>(
    Object.keys(message).map((element: any) =>(
        cy.get(`#${element}-helper-text`).should('exist')
    ))
   ))
});