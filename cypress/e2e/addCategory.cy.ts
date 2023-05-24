describe('Add Category', () => {
    beforeEach(() => {
      cy.viewport(1200, 1200);
      cy.visit('http://localhost:8000/');
    });
  
    it(`adds a 'gym' category with selected color and icon, then removes it`, () => {
      cy.get('#allCategories').click();
      cy.wait(500)
      cy.get('#addCategory').realClick();
      cy.get('#taskInput').should('be.visible');
      cy.get('#taskInput').realClick()
      cy.get('#taskInput').realType('gym')
      cy.get('div[title="#10b981"]').click();
      cy.get('input[type="checkbox"].peer').realClick();
      cy.get('.relative > .flex > :nth-child(5)').click()
            cy.get('#addCategoryButton').realClick()
      cy.get('body').trigger('keydown', { keyCode: 27, which: 27, key: 'Escape' });
      cy.get('#categoryDropdownMenu > :nth-child(6)').click()
      cy.get('#categoryDropdownMenu > :nth-child(6) > button').click()

    });
  });
