// Copyright 2021, Anderson R. Livramento. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ==============================================================================

// This lib was strongly based on:
// https://github.com/mrafiqk/html-pdf-node
const puppeteer = require('puppeteer');

let asyncGeneratePDF = async function (file, options) {
    // we are using headless mode
    let args = [
        '--no-sandbox',
        '--disable-setuid-sandbox',
    ];
    const puppeteerOptions = {}
    if (options.args) {
        args = options.args;
        delete options.args;
    }
    puppeteerOptions.args = args;
    if (process.env.CHROME_PATH) {
        puppeteerOptions.executablePath = process.env.CHROME_PATH;
    }
    const browser = await puppeteer.launch(puppeteerOptions);
    const page = await browser.newPage();

    if(file.content) {
        await page.setContent(file.content);
    }
    else {
        await page.goto(
            file.url,
            {
                waitUntil: 'networkidle0', // wait for page to load completely
            }
        );
    }
    const pdfBuffer = await page.pdf(options);
    await browser.close();
    return pdfBuffer;
};

module.exports = {
    generatePdf: asyncGeneratePDF,
}
