require('dotenv').config();
const db = require('./db.js');
async function clearAndExit() {
    try {
        await db.query('DELETE FROM ais');
        console.log('Cleared ais table');
    } catch (err) {
        console.error(err);
    }
    process.exit();
}
clearAndExit();
