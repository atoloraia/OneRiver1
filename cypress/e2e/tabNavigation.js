import { tabs } from "../support/selectors/tabs"

describe('Verify Tab Navigation', () => {
  beforeEach(() => {
    cy.authToOneriver()
  })

  it('should navigate to the Dashboard tab', () => {
    cy.clickDashboardTab()
    cy.get(tabs.DASHBOARD).should('be.visible')
    cy.get(tabs.DASHBOARD).should('contain.text', 'Dashboard')
    cy.clickApplicationsTab()
    cy.get(tabs.APPLICATIONS).should('contain.text', 'Applications')
    cy.clickCustomerTab()
    cy.get(tabs.CUSTOMER).should('contain.text', 'Customer')
    cy.clickBusinessesTab()
    cy.get(tabs.BUSINESSES).should('contain.text', 'Businesses')
  })
})