import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import '../../component'

import App from "../../../../src/App";

Given("I render the component", () => {
  //@ts-ignore
  cy.mount(<App />);
});

Then("I should see the text {string}", (text: string) => {
  // cy.contains(text).should("exist");
});