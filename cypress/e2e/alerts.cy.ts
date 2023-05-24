
describe('Alerts', () => {
    beforeEach(() => {
        cy.viewport(1280, 800)
        cy.visit('http://localhost:8000/')
        cy.get('#allCategories').click();

    })

    it('should not add new category if there is no input', () => {
        cy.wait(500)
        cy.get('#addCategory').realClick();
        cy.get('#taskInput').should('be.visible');
        cy.get('#addCategoryButton').realClick()
        cy.get('.alert').should('be.visible').contains('span', `You can't create a category with this name, try again!`)
    })

    it('should not add new category if same category is already added', () => {
        cy.wait(500)
        cy.get('#addCategory').realClick();
        cy.get('#taskInput').should('be.visible');
        cy.get('#taskInput').type('work');
        cy.get('#addCategoryButton').realClick()
        cy.get('.alert').should('be.visible').contains('span', `You can't create a category with this name, try again!`)
    })

    it('should show alert that informs category successfully added', () => {
        cy.wait(500)
        cy.get('#addCategory').realClick();
        cy.get('#taskInput').should('be.visible');
        cy.get('#taskInput').type('original category');
        cy.get('#addCategoryButton').realClick()
        cy.get('.alert').should('be.visible').contains('span', `New category has been added!`)
    })


    it('should not add new category if there is already 12 different categories', () => {
        cy.wait(500)
        cy.get('#addCategory').realClick();
        cy.get('#taskInput').should('be.visible');
        for (let i = 1; i <= 7; i++) {
            const categoryName = `category${i}`
            cy.get('#taskInput').type(categoryName)
            cy.get('#addCategoryButton').realClick()
        }
        cy.get('#taskInput').type('one too many');
        cy.get('#addCategoryButton').realClick()
        cy.get('.alert').should('be.visible').contains('span', `You can create up to 7 different categories`)
    })


    it('should not remove any tasks if no task is done and should show error alert', () => {
        cy.get('#allCategories').click()
        cy.get('#taskInput').click().type('Test')
        cy.get('#addTaskButton').click()
        cy.get('#taskInput').click().type('Test')
        cy.get('#addTaskButton').click()
        cy.get('#removeAllTasks').click()
        cy.get('.alert').should('be.visible').contains('span', `There are no completed tasks to be deleted`)
    })

    it('should remove done tasks', () => {
        cy.get('#allCategories').click()
        cy.get('#taskInput').click().type('Test')
        cy.get('#addTaskButton').click()
        cy.get('#taskInput').click().type('Test')
        cy.get('#addTaskButton').click()
        cy.get('#makeAllTasksDone').click()
        cy.get('#removeAllTasks').click()
        cy.get('.alert').should('be.visible').contains('span', `All done tasks has been removed successfully`)
    })

     it('should not add task with 8th different category', () => {
const categories = ['general', 'hobby', 'activities', 'work', 'school', 'newCat1', 'newCat2', 'newCat3']
    
     cy.wait(500)
     cy.get('#addCategory').realClick();
     cy.get('#taskInput').should('be.visible');
     cy.get('#taskInput').realClick()
     cy.get('#taskInput').realType('newCat1')
     cy.get('#addCategoryButton').realClick()
     cy.get('#taskInput').realClick()
     cy.get('#taskInput').realType('newCat2')
     cy.get('#addCategoryButton').realClick()
     cy.get('#taskInput').realClick()
     cy.get('#taskInput').realType('newCat3')
     cy.get('#addCategoryButton').realClick()
     cy.get('body').trigger('keydown', { keyCode: 27, which: 27, key: 'Escape' });

     cy.wrap(categories).each((category, index) => {
        const taskName = `Task ${index + 1}`
        cy.get('#taskInput').click().type(taskName)
        cy.contains(`label`, `${category}`).click()
        cy.get('#addTaskButton').click()
    })
    cy.get('.alert').should('be.visible').contains('span', `You can add tasks of 7 different categories at a time`)
    })

})

