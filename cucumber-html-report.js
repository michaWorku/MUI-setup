const report = require("multiple-cucumber-html-reporter");
report.generate({
    // jsonDir: "cypress/cucumber-json",  
    jsonDir: "jsonlogs",
    reportPath: "./reports/cucumber-htmlreport.html",
    metadata: {
        browser: {
            name: "chrome", 
            version: "81",
        },
        device: "Local test machine",
        platform: {
            name: "macOS",
            version: "Monterey",
        },
    },
});