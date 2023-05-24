
describe('Functional buttons', () => {
    beforeEach(() => {
        cy.viewport(1280, 800)
        cy.visit('http://localhost:8000/')
    })

    it('should create tasks for all categories and test 3 buttons: makeAllTasksDone, makeAllTasksUndone and removeAllTasks', () => {
        const categories = ['general', 'hobby', 'activities', 'work', 'school']
        cy.get('#allCategories').click();
        cy.wrap(categories).each((category, index) => {
          const taskName = `Task ${index + 1}`
          cy.get('#taskInput').click().type(taskName)
          cy.contains(`label`, `${category}`).click()
          cy.get('#addTaskButton').click()
        })
        cy.get('#makeAllTasksDone').click()
        cy.get('#makeAllTasksUndone').click()
        cy.get('#makeAllTasksDone').click()
        cy.get('#removeAllTasks').click()

    })

})
export {}


