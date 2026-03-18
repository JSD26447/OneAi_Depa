require('dotenv').config();
const db = require('./db.js');
async function clearAndExit() {
    try {
        await db.query('DELETE FROM prompts');
        console.log('Cleared prompts table');
        await db.query('DELETE FROM ais');
        console.log('Cleared ais table');
        await db.query('DELETE FROM categories');
        console.log('Cleared categories table');
    } catch (err) {
        console.error(err);
    }
    process.exit();
}
clearAndExit();
