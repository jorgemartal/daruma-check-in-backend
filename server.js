const path = require('path');
const express = require('express');

const fillee = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSRsGeLeNUoUjD1eaSrz-Jyfjniqah0quNBpWvVHGZYINm8hGAImPl5qFeqmgBFNQ/pubhtml"

const credentials = require(`./key.json`);
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
   console.log('Server is up!');
   loadSpreadsheet();
});

async function loadSpreadsheet() {
   const serviceAccountAuth = new JWT({
     email: credentials.client_email,
     key: credentials.private_key,
     scopes: ['https://www.googleapis.com/auth/spreadsheets'],
   });
   const doc = new GoogleSpreadsheet(`2PACX-1vSRsGeLeNUoUjD1eaSrz-Jyfjniqah0quNBpWvVHGZYINm8hGAImPl5qFeqmgBFNQ`, serviceAccountAuth);

   await doc.loadInfo();
   console.log(doc.title);
}
