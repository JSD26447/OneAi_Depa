const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/app/data/aiTools.ts');
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/, \\n    plans/g, ',\n    plans');
fs.writeFileSync(file, content, 'utf8');
console.log('Fixed newlines');
