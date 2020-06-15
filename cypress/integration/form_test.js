describe("Form - testing Pizza form inputs", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000/pizza");
  });

  it("Add text to inputs and submit form", function () {
    cy.get('[data-cy="name"]')
      .type("Shomari Roberts")
      .should("have.value", "Shomari Roberts");
    cy.pause();
    cy.get('[data-cy="size"]').select("Medium").should("have.value", "Medium");
    cy.get('[data-cy="sauce"]').select("Garlic").should("have.value", "Garlic");
    cy.get('[data-cy="Pepperoni"]').check({force: true}).should("be.checked");
    cy.get('[data-cy="Sausage"]').check({force: true}).should("be.checked");
    cy.get('[data-cy="Bacon"]').check({force: true}).should("be.checked");
    cy.get('[data-cy="Chicken"]').check({force: true}).should("be.checked");
    cy.get('[data-cy="Onions"]').check({force: true}).should("be.checked");
    cy.get('[data-cy="Pepper"]').check({force: true}).should("be.checked");
    cy.get('[data-cy="Tomato"]').check({force: true}).should("be.checked");
    cy.get('[data-cy="instructions"]')
      .type("No Cheese")
      .should("have.value", "No Cheese");
    cy.get('[data-cy="submit"]').click();
  });
});

// "Pepperoni",
//     "Sausage",
//     "Bacon",
//     "Chicken",
//     "Onions",
//     "Pepper",
//     "Tomato",
//     "Olives",
//     "Garlic",
//     "Pineapple",
