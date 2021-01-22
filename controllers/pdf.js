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

const htmlToPDF = require('../lib/html-to-pdf');
const stream = require('stream');

module.exports = {
    toPDF: async function(req, res) {
        const pdfOptions = {
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: true,
        };
        if (req.body) {
            const html = {
                content: req.body,
            };
            try {
                const pdfBuffer = await htmlToPDF.generatePdf(html, pdfOptions);
                // Converting Buffer to Stream
                const readStream = new stream.Readable();
                readStream._read = () => {};
                readStream.push(pdfBuffer);
                readStream.push(null);
                res.setHeader('Content-disposition', 'attachment; filename=out.pdf');
                res.setHeader('Content-Type', 'application/pdf');
                readStream.pipe(res);
            }
            catch (error) {
                res.sendStatus(500);
            }
        }
        else {
            res.sendStatus(500);
        }
    },
}