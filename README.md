# HTML to PDF

**html-to-pdf** is a simple node.js server that accept an HTML text as request body and returns a rendered PDF file.

# Install

Clone this repository, and in **html-to-pdf** folder:
```bash
$ npm install
```

# Running

Create a *.env* file (see *.env.example*) and configure a port, then run:

```bash
$ npm start
```

# Test

Assuming that you configure the service on port *6543*:
```bash
curl --request POST --url http://localhost:6543/v1/topdf  --output html-pdf-test.pdf --header 'Content-Type: text/html' --data '<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>HTML to PDF</title>
        <style type="text/css">
            @page {
                size: A4 portrait;
                margin: 0.5cm;
            }
        </style>
    </head>
    <body>
        <div style="text-align: center">
            <h1>HTML to PDF Test</h1>
        </div>
        <div style="margin: 4px; padding: 6px; background-color: #0a5c20; color: white; border-radius: 10px; font-size: 14pt;">
            <p>This is a test</p>
        </div>
    </body>
</html>'
```
Will result:

![Results](html-pdf-test.png)

[html-pdf-test.pdf](html-pdf-test.pdf)

# Acknowledge

The code to convert **HTML** to **PDF** was **strongly** based on [html-to-pdf-node](https://github.com/mrafiqk/html-pdf-node).