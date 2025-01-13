// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { login } from './selectors/login.js'

const credentials = require('../config/credentials.json');

Cypress.Commands.add(
    'authToOneriver',
    (name = credentials.login, password = credentials.password) => {
        // Handle uncaught exceptions during login
        cy.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('Login required')) {
                return false;
            }
        });

        cy.intercept('GET', '**/auth/login').as('pageLoad');
        cy.visit('/auth/login');
        cy.wait('@pageLoad');
        cy.get(login.LOGIN_BUTTON).click();
        cy.get(login.EMAIL_FIELD).type(name, { log: false });
        cy.get(login.PASSWORD_FIELD).type(password, { log: false });
        cy.get(login.CONTINUE_BUTTON).click();
    },
    {
        cacheAcrossSpecs: true,
    }
);


Cypress.Commands.add(
	'loginViaAPI',
	(login = Cypress.env('login'), password = Cypress.env('password')) => {
		cy.session(login, () => {
			cy.request('POST', `${Cypress.config('apiUrl')}/auth/login`, {
				login: login,
				password: password
			}).then(response => {
				expect(response.status).to.equal(200)
				cy.visit('/')
			})
		})
	}
)