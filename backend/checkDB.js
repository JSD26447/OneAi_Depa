const db = require('./db');
require('dotenv').config();

async function check() {
    try {
        const [cats] = await db.query('SELECT * FROM categories LIMIT 20');
        console.log('\n=== CATEGORIES ===');
        cats.forEach(c => console.log(c));

        const [ais] = await db.query('SELECT id, name, category_id, logo_url FROM ais LIMIT 10');
        console.log('\n=== AI TOOLS (first 10) ===');
        ais.forEach(a => console.log(a));

        const [prompts] = await db.query('SELECT id, title, category_id FROM prompts LIMIT 5');
        console.log('\n=== PROMPTS (first 5) ===');
        prompts.forEach(p => console.log(p));
    } catch(err) {
        console.error('Error:', err.message);
    }
    process.exit();
}

check();
