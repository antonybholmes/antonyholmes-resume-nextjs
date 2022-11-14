# Resume

Next.js project to make PDF version of my resume. 

Whilst this is a fully functional web app, it was designed specifically for creating a letter sized PDF and not to be responsive nor look particularly good on a monitor.

1. Run `yarn deploy` to create a running instance of the app on localhost:3000.
2. In a separate terminal, run `yarn pdf` to run create **antony_holmes_resume.pdf** using Puppeteer. You must have Google Chrome installed and accessible to Puppeteer otherwise you will need to change dependency `puppeteer-core` to `puppeteer`.
