const db = require('./db.js');

const authors = [
    "ศุภชัย ใจรักดิจิทัล",
    "นภัสวรรณ แก้วประเสริฐ",
    "อารยา เทพทอง",
    "วัชรินทร์ วิริยะกุล",
    "ดร. พงศกร",
    "TechGuru Thailand",
    "AI Master CH",
    "สุชาดา แสงเงิน",
    "Kittinan Promdee",
    "PromptNinja"
];

async function updatePrompts() {
    try {
        const [rows] = await db.query('SELECT * FROM prompts');
        console.log(`Found ${rows.length} prompts.`);
        
        let count = 0;
        for (let row of rows) {
            let data = {};
            try {
                data = JSON.parse(row.content);
            } catch (e) {
                // Ignore if it's not JSON
                data = { title: row.title, prompt: row.content };
            }
            
            // Assign random author
            const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
            data.author = randomAuthor;
            
            const updatedContent = JSON.stringify(data);
            await db.query('UPDATE prompts SET content = ? WHERE id = ?', [updatedContent, row.id]);
            count++;
        }
        console.log(`Successfully updated ${count} prompts with random authors.`);
        process.exit(0);
    } catch (error) {
        console.error("Error updating prompts:", error);
        process.exit(1);
    }
}

updatePrompts();
