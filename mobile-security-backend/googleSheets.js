const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./service-account.json'); // your service account JSON
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

async function accessSheet(sheetName) {
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    return doc.sheetsByTitle[sheetName];
}

async function addRow(sheetName, row) {
    const sheet = await accessSheet(sheetName);
    await sheet.addRow(row);
}

async function getRows(sheetName) {
    const sheet = await accessSheet(sheetName);
    const rows = await sheet.getRows();
    return rows;
}

module.exports = { addRow, getRows };
