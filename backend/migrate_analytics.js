const db = require('./db.js');

async function migrate() {
    try {
        // ลองเช็คดูก่อนว่ามี column อยู่แล้วหรือไม่ เพื่อป้องกัน error ซ้ำ
        try {
            await db.query('ALTER TABLE ais ADD COLUMN view_count INT DEFAULT 0');
            console.log('Added view_count to ais table.');
        } catch (e) {
            console.log('view_count already exists in ais or error:', e.message);
        }

        try {
            await db.query('ALTER TABLE prompts ADD COLUMN copy_count INT DEFAULT 0');
            console.log('Added copy_count to prompts table.');
        } catch (e) {
            console.log('copy_count already exists in prompts or error:', e.message);
        }

        console.log('Migration for analytics columns finished.');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed completely:', err);
        process.exit(1);
    }
}

migrate();
