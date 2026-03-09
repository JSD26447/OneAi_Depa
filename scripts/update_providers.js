const fs = require('fs');
const path = require('path');
const file = path.resolve('src/app/data/aiTools.ts');
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('provider?: string;')) {
    content = content.replace('category: string;', 'category: string;\n  provider?: string;');
}

const providerMap = {
    'Gemini (Google)': 'Google',
    'Claude': 'Claude',
    'ChatGPT': 'OpenAI',
    'Microsoft Copilot': 'Microsoft',
    'Grammarly': 'Other',
    'DeepL Write': 'Other',
    'Notion AI': 'Other',
    'Fireflies.ai': 'Other',
    'Otter.ai': 'Other',
    'Copy.ai': 'Other',
    'Midjourney': 'Other',
    'Nano Banana (Gemini)': 'Google',
    'Veo (Google)': 'Google',
    'Sora (OpenAI)': 'OpenAI',
    'Runway': 'Other',
    'Gamma': 'Other',
    'Canva Magic Design': 'Canva',
    'Suno': 'Other',
    'Udio': 'Other',
    'Asana Intelligence': 'Asana'
};

for (const [name, provider] of Object.entries(providerMap)) {
    const regex = new RegExp(`(name:\\s*['"]${name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}['"]\\s*,)`);
    if (!content.includes(`provider: '${provider}'`)) {
        content = content.replace(regex, `$1\n    provider: '${provider}',`);
    }
}

fs.writeFileSync(file, content);
console.log('Updated aiTools.ts successfully.');
