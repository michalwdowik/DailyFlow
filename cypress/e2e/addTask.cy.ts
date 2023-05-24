
describe('Add Tasks with 3 different dates, importance, deadline, name, category', () => {
    beforeEach(() => {
        cy.viewport(1280, 800)
        cy.visit('http://localhost:8000/')
    })

    it('should create task with deadline for 28th day of the month', () => {
        cy.get('#taskInput').click().type('Test-deadline-28th')
        cy.get('#allCategories').click()
        cy.contains('label', 'hobby').click()
        cy.get('.star-rating button').eq(1).click()
        cy.get('#set-deadline-button').click()
        cy.get('#date').click()
        cy.contains('span', '28').click();
        cy.get('#addTaskButton').click()
        cy.get('#showModalButton').click()
        cy.get('.backdrop-blur-md').click({force: true})
    })

    it('should create task with deadline for 1st day of the month', () => {
        cy.get('#taskInput').click().type('Test-deadline-1st')
        cy.get('#allCategories').click()
        cy.contains('label', 'work').click()
        cy.get('.star-rating button').eq(2).click()
        cy.get('#set-deadline-button').click()
        cy.get('#date').click()
        cy.contains('span', '1').click();
        cy.get('#addTaskButton').click()
        cy.get('#showModalButton').click()
        cy.get('.backdrop-blur-md').click({force: true})
    })

    it('should create task with deadline for today', () => {
        cy.get('#taskInput').click().type('Test-deadline-today')
        cy.get('#allCategories').click()
        cy.contains('label', 'work').click()
        cy.get('.star-rating button').eq(0).click()
        cy.get('#set-deadline-button').click()
        cy.get('#date').click()
        cy.contains('button', 'Today').click();
        cy.get('#addTaskButton').click()
        cy.get('#showModalButton').click()
        cy.get('.backdrop-blur-md').click({force: true})
    })
})
export {}


