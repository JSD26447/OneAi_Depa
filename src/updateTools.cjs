const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'data', 'aiTools.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Update Interface
content = content.replace(
    /subCategories\?: string\[\];\n\}/g,
    `subCategories?: string[];\n  plans?: AIToolPlan[];\n  orgSuitability?: string;\n}\n\nexport interface AIToolPlan {\n  name: string;\n  price: string;\n  forOrg: boolean | 'warning' | 'no';\n  features: string;\n}`
);

// Map of updates
const updates = {
    'doc-email-chatgpt': `plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'no', features: 'GPT พื้นฐาน' },\n      { name: 'Plus', price: '~$20', forOrg: 'warning', features: 'ส่วนตัว, เร็วขึ้น' },\n      { name: 'Team', price: '~$25–30+', forOrg: true, features: 'แชร์ทีม, Admin control' }\n    ],\n    orgSuitability: 'ถ้าทำระบบองค์กร → ใช้ Team หรือ Enterprise'`,
    'doc-claude': `plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'no', features: 'รุ่นพื้นฐาน' },\n      { name: 'Pro', price: '~$20', forOrg: 'warning', features: 'รุ่นแรงขึ้น' },\n      { name: 'Team', price: '~$25–30+', forOrg: true, features: 'Workspace รวมทีม' },\n      { name: 'Enterprise', price: 'ติดต่อเซลส์', forOrg: true, features: 'Compliance, API scale' }\n    ],\n    orgSuitability: 'องค์กรสามารถใช้ Team หรือ Enterprise ได้'`,
    'doc-email-copilot': `plans: [\n      { name: 'Copilot Pro', price: '~$20', forOrg: 'warning', features: 'ส่วนบุคคล' },\n      { name: 'M365 Copilot', price: '~$30', forOrg: true, features: 'ใช้ใน Word, Excel, Teams' },\n      { name: 'Enterprise', price: 'สอบถามราคา', forOrg: true, features: 'Security / Compliance' }\n    ],\n    orgSuitability: 'ถ้าองค์กรใช้ Microsoft 365 → Copilot ดีที่สุด'`,
    'doc-check-grammarly': `plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'no', features: 'ใช้งานเบื้องต้น' },\n      { name: 'Premium', price: '~$12', forOrg: 'warning', features: 'ใช้งานส่วนบุคคล' },\n      { name: 'Business', price: '~$15–25', forOrg: true, features: 'แพ็กเกจสำหรับทีม' }\n    ],\n    orgSuitability: 'องค์กรใช้ Business ได้'`,
    'doc-check-deeplwrite': `plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'no', features: 'จำกัดปริมาณคำ' },\n      { name: 'Pro', price: '~$8–15', forOrg: 'warning', features: 'ใช้งานไม่จำกัด' },\n      { name: 'Business', price: 'ติดต่อเซลส์', forOrg: true, features: 'แพ็กเกจสำหรับทีม' }\n    ],\n    orgSuitability: 'องค์กรใช้ได้ มีแพ็กเกจทีม'`,
    'meet-agenda-copilot': `plans: [\n      { name: 'Copilot Pro', price: '~$20', forOrg: 'warning', features: 'ส่วนบุคคล' },\n      { name: 'M365 Copilot', price: '~$30', forOrg: true, features: 'ใช้ใน Word, Excel, Teams' },\n      { name: 'Enterprise', price: 'สอบถามราคา', forOrg: true, features: 'Security / Compliance' }\n    ],\n    orgSuitability: 'ถ้าองค์กรใช้ Microsoft 365 → Copilot ดีที่สุด'`,
    'meet-agenda-notion': `plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'warning', features: 'ใช้งานจำกัด' },\n      { name: 'Paid', price: '~$8–10', forOrg: true, features: 'ต้องมี Notion แพลนหลักด้วย' }\n    ],\n    orgSuitability: 'องค์กรใช้ได้ทั้งหมด'`,
    'meet-record-fireflies': `plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'warning', features: 'ใช้งานจำกัด' },\n      { name: 'Paid', price: '~$10–19', forOrg: true, features: 'ฟีเจอร์องค์กรเต็มรูปแบบ' }\n    ],\n    orgSuitability: 'องค์กรใช้ได้ทั้งหมด'`,
    'meet-record-otter': `plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'warning', features: 'ใช้งานจำกัด' },\n      { name: 'Paid', price: '~$16+', forOrg: true, features: 'สำหรับทีมและองค์กร' }\n    ],\n    orgSuitability: 'องค์กรใช้ได้ทั้งหมด'`,
    'meet-summary-gemini': `plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'no', features: 'Gemini พื้นฐาน' },\n      { name: 'Advanced', price: '~$20', forOrg: 'warning', features: 'ส่วนบุคคล รวดเร็ว' },\n      { name: 'Enterprise', price: 'ติดต่อเซลส์', forOrg: true, features: 'ระบบเพื่อองค์กร ปลอดภัย' }\n    ]`,
    'meet-chatgpt': `plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'no', features: 'GPT พื้นฐาน' },\n      { name: 'Plus', price: '~$20', forOrg: 'warning', features: 'ส่วนตัว, เร็วขึ้น' },\n      { name: 'Team', price: '~$25–30+', forOrg: true, features: 'แชร์ทีม, Admin control' }\n    ],\n    orgSuitability: 'ถ้าทำระบบองค์กร → ใช้ Team หรือ Enterprise'`,
    'meet-news-claude': `plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'no', features: 'รุ่นพื้นฐาน' },\n      { name: 'Pro', price: '~$20', forOrg: 'warning', features: 'รุ่นแรงขึ้น' },\n      { name: 'Team', price: '~$25–30+', forOrg: true, features: 'Workspace รวมทีม' },\n      { name: 'Enterprise', price: 'ติดต่อเซลส์', forOrg: true, features: 'Compliance, API scale' }\n    ]`,
    'creative-img-midjourney': `plans: [\n      { name: 'ไม่มีฟรี', price: '-', forOrg: 'no', features: 'ไม่มีให้ลองฟรี' },\n      { name: 'Basic', price: '~$10', forOrg: 'warning', features: 'ระดับเริ่มต้น' },\n      { name: 'Standard', price: '~$30', forOrg: 'warning', features: 'ระดับปานกลาง' },\n      { name: 'Pro', price: '~$60+', forOrg: true, features: 'ระดับโปร' }\n    ],\n    orgSuitability: 'ใช้ภาพในนามทีมได้ แต่ยังไม่มี Enterprise เต็มรูปแบบ'`,
    'creative-video-sora': `plans: [\n      { name: 'สถานะ', price: 'จำกัด', forOrg: 'warning', features: 'ยังจำกัดการเข้าถึง' },\n      { name: 'ราคา', price: '-', forOrg: 'no', features: 'ยังไม่เปิด public เต็ม' }\n    ]`,
    'creative-video-runway': `plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'no', features: 'แบบมีจำกัด' },\n      { name: 'Standard', price: '~$15', forOrg: 'warning', features: 'ใช้งานทั่วไป' },\n      { name: 'Pro', price: '~$35', forOrg: 'warning', features: 'ใช้งานระดับโปร' },\n      { name: 'Enterprise', price: 'ติดต่อเซลส์', forOrg: true, features: 'สเกลทีมและองค์กร' }\n    ],\n    orgSuitability: 'รองรับการใช้งานแบบองค์กร'`,
    'creative-pres-canvamagic': `plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'no', features: 'ใช้งานทั่วไป' },\n      { name: 'Pro', price: '~$12', forOrg: 'warning', features: 'ฟีเจอร์พรีเมียม' },\n      { name: 'Teams', price: '~$15+', forOrg: true, features: 'สำหรับทีมและองค์กร' }\n    ],\n    orgSuitability: 'องค์กรใช้ Teams'`,
    'plan-act-chatgpt': `plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'no', features: 'GPT พื้นฐาน' },\n      { name: 'Plus', price: '~$20', forOrg: 'warning', features: 'ส่วนตัว, เร็วขึ้น' },\n      { name: 'Team', price: '~$25–30+', forOrg: true, features: 'แชร์ทีม, Admin control' }\n    ],\n    orgSuitability: 'ถ้าทำระบบองค์กร → ใช้ Team หรือ Enterprise'`,
    'plan-timeline-notion': `plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'warning', features: 'ใช้งานจำกัด' },\n      { name: 'Paid', price: '~$8–10', forOrg: true, features: 'แพ็กเกจเสียเงิน' }\n    ],\n    orgSuitability: 'องค์กรใช้ได้ทั้งหมด'`,
    'plan-timeline-asana': `plans: [\n      { name: 'Business', price: '~$25+', forOrg: true, features: 'รวมในแพ็กเกจ Business' }\n    ],\n    orgSuitability: 'องค์กรใช้ได้ทั้งหมด'`
};

// find each object and inject the fields right after imageUrl
for (const [id, additionalCode] of Object.entries(updates)) {
    const regex = new RegExp(\`id:\\\\s*'\${id}'[\\\\s\\\\S]*?(imageUrl:[^\\\\n]+)\`);
  content = content.replace(regex, (match, imageUrlStr) => {
    return match.replace(imageUrlStr, \`\${imageUrlStr},\\n    \${additionalCode}\`);
  });
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Update complete');
