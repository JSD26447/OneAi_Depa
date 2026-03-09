const mysql = require('mysql2/promise');
require('dotenv').config();

const known = {
    'chatgpt': 'OpenAI',
    'sora': 'OpenAI',
    'openai': 'OpenAI',
    'gemini': 'Google',
    'veo': 'Google',
    'google': 'Google',
    'copilot': 'Microsoft',
    'microsoft': 'Microsoft',
    'claude': 'Anthropic',
    'anthropic': 'Anthropic',
    'midjourney': 'Midjourney',
    'runway': 'Runway AI',
    'canva': 'Canva',
    'gamma': 'Gamma',
    'grammarly': 'Grammarly',
    'deepl write': 'DeepL',
    'notion ai': 'Notion Labs',
    'asana intelligence': 'Asana',
    'suno': 'Suno AI',
    'udio': 'Udio',
    'otter.ai': 'Otter.ai',
    'fireflies.ai': 'Fireflies.ai',
    'copy.ai': 'Copy.ai',
};

async function run() {
    try {
        const pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [rows] = await pool.query('SELECT id, name, description FROM ais');
        let updatedCount = 0;

        for (const row of rows) {
            let provider = null;

            // Try to get from JSON description first
            try {
                const desc = JSON.parse(row.description);
                provider = desc.provider || desc.developer;
            } catch (e) { }

            // Fallback: guess from name
            if (!provider) {
                const nameLower = row.name.toLowerCase();
                for (const [key, dev] of Object.entries(known)) {
                    if (nameLower.includes(key)) {
                        provider = dev;
                        break;
                    }
                }
            }

            // Final fallback
            if (!provider) {
                provider = 'อื่นๆ (Others)';
            }

            if (provider) {
                await pool.query('UPDATE ais SET provider = ? WHERE id = ?', [provider, row.id]);
                updatedCount++;
            }
        }
        console.log(`Successfully updated ${updatedCount} rows with provider data.`);
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}
run();
