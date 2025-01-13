const cypressBrowserPermissionsPlugin = require('cypress-browser-permissions');

module.exports = {
    watchForFileChanges: false,
    video: true,
    experimentalStudio: true,
    apiUrl: 'https://api-qa.oneriver.link',
    defaultCommandTimeout: 25000,
    experimentalMemoryManagement: true,
    commandDelay: false,
    // retries: 1,
    setupNodeEvents(on, config) {
        require('cypress-high-resolution')(on, config)
        require('cypress-mochawesome-reporter/plugin')(on)
        require('cypress-terminal-report/src/installLogsPrinter')(on)
        config = cypressBrowserPermissionsPlugin(on, config)
        require("cypress-fail-fast/plugin")(on, config)
        // logs are shown in the terminal as well
        on('task', {
            print(s) {
                console.log(s)
                return null
            },
        })
    },
    e2e: {
        baseUrl: 'https://qa.oneriver.link',
        specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
        supportFile: 'cypress/support/e2e.js',
    }
}