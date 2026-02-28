const fs = require('fs');
const fp = './src/app/data/aiTools.ts';
let code = fs.readFileSync(fp, 'utf8');

const m = {
    'doc-gemini': '/images/gemini.png',
    'doc-claude': '/images/claude.jpg',
    'doc-email-copilot': '/images/copilot.png',
    'doc-check-grammarly': '/images/grammarly.png',
    'doc-check-deeplwrite': '/images/DeepL Write.png',
    'meet-agenda-copilot': '/images/copilot.png',
    'meet-agenda-notion': '/images/NotionAI.jpg',
    'meet-record-fireflies': '/images/Fireflies.png',
    'meet-record-otter': '/images/Otterai.jpg',
    'meet-summary-gemini': '/images/gemini.png',
    'meet-news-claude': '/images/claude.jpg',
    'meet-news-copyai': '/images/copyai.png',
    'creative-img-midjourney': '/images/mid-journey.png',
    'creative-img-nanobanana': '/images/Nano Banana (Gemini).png',
    'creative-video-veo': '/images/Veo (Google).png',
    'creative-video-sora': '/images/sora openai.png',
    'creative-video-runway': '/images/runway.png',
    'creative-pres-gamma': '/images/Gamma.png',
    'creative-pres-canvamagic': '/images/canva magic design.png',
    'creative-music-suno': '/images/Suno.png',
    'creative-music-udio': '/images/Udio.png',
    'plan-act-gemini': '/images/gemini.png',
    'plan-timeline-notion': '/images/NotionAI.jpg',
    'plan-timeline-asana': '/images/Logo-Asana.png'
};

for (const id in m) {
    const rs = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?logo:\\s*'[^']+')`);
    code = code.replace(rs, "$1,\n    imageUrl: '" + m[id] + "'");
}
fs.writeFileSync(fp, code);
console.log("Images applied to AI Tools successfully.");
