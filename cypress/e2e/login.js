describe('Login Test', () => {

    it('should login successfully', () => {
        cy.authToOneriver()
        cy.url().should('include', '/dashboard') 
    })
})