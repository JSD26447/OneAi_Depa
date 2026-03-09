const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'data', 'aiTools.ts');
let content = fs.readFileSync(filePath, 'utf8');

const updates = {
    'doc-gemini': "plans: [\n      { name: 'Gemini (Free)', price: 'ฟรี', forOrg: 'no', features: 'ใช้งานแบบจำกัด' },\n      { name: 'Gemini Advanced', price: '~$20', forOrg: 'warning', features: 'มีความสามารถสูงขึ้น' }\n    ],\n    orgSuitability: 'องค์กรสามารถใช้เวอร์ชันฟรีได้ระดับหนึ่ง'",
    'doc-claude': "plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'no', features: 'รุ่นพื้นฐาน' },\n      { name: 'Pro', price: '~$20', forOrg: 'warning', features: 'รุ่นแรงขึ้น' },\n      { name: 'Team', price: '~$25–30+', forOrg: true, features: 'Workspace รวมทีม' },\n      { name: 'Enterprise', price: 'ติดต่อเซลส์', forOrg: true, features: 'Compliance, API scale' }\n    ],\n    orgSuitability: 'องค์กรสามารถใช้ Team หรือ Enterprise ได้'",
    'doc-email-chatgpt': "plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'no', features: 'GPT พื้นฐาน' },\n      { name: 'Plus', price: '~$20', forOrg: 'warning', features: 'ส่วนตัว, เร็วขึ้น' },\n      { name: 'Team', price: '~$25–30+', forOrg: true, features: 'แชร์ทีม, Admin control' }\n    ],\n    orgSuitability: 'ถ้าทำระบบองค์กร → ใช้ Team หรือ Enterprise'",
    'doc-email-copilot': "plans: [\n      { name: 'Copilot Pro', price: '~$20', forOrg: 'warning', features: 'ส่วนบุคคล' },\n      { name: 'Microsoft 365 Copilot', price: '~$30', forOrg: true, features: 'ใช้ใน Word, Excel, Teams' },\n      { name: 'Enterprise', price: 'รวมใน M365 E3/E5', forOrg: true, features: 'Security / Compliance' }\n    ],\n    orgSuitability: 'ถ้าองค์กรใช้ Microsoft 365 → Copilot ดีที่สุด'",
    'doc-check-grammarly': "plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'no', features: 'ใช้งานเบื้องต้น' },\n      { name: 'Premium', price: '~$12', forOrg: 'warning', features: 'ใช้งานส่วนบุคคล' },\n      { name: 'Business', price: '~$15–25', forOrg: true, features: 'แพ็กเกจสำหรับทีม' }\n    ],\n    orgSuitability: 'องค์กรใช้ Business ได้'",
    'doc-check-deeplwrite': "plans: [\n      { name: 'Free', price: 'ฟรี จำกัด', forOrg: 'no', features: 'จำกัดปริมาณคำ' },\n      { name: 'Pro', price: '~$8–15', forOrg: 'warning', features: 'ใช้งานไม่จำกัด' },\n      { name: 'Business', price: 'มีแพ็กเกจทีม', forOrg: true, features: 'แพ็กเกจสำหรับทีม' }\n    ],\n    orgSuitability: 'องค์กรใช้ได้ มีแพ็กเกจทีม'",
    'meet-agenda-copilot': "plans: [\n      { name: 'Copilot Pro', price: '~$20', forOrg: 'warning', features: 'ส่วนบุคคล' },\n      { name: 'Microsoft 365 Copilot', price: '~$30', forOrg: true, features: 'ใช้ใน Word, Excel, Teams' },\n      { name: 'Enterprise', price: 'รวมใน M365 E3/E5', forOrg: true, features: 'Security / Compliance' }\n    ],\n    orgSuitability: 'ถ้าองค์กรใช้ Microsoft 365 → Copilot ดีที่สุด'",
    'meet-agenda-notion': "plans: [\n      { name: 'Free', price: 'ฟรีจำกัด', forOrg: 'warning', features: 'แผนการใช้งานเบื้องต้น' },\n      { name: 'Paid', price: '~$8–10', forOrg: true, features: 'ทำงานร่วมกันในองค์กร' }\n    ],\n    orgSuitability: 'องค์กรใช้ได้ทั้งหมด'",
    'meet-record-fireflies': "plans: [\n      { name: 'Free', price: 'ฟรีจำกัด', forOrg: 'warning', features: 'การถอดเสียงจำกัด' },\n      { name: 'Paid', price: '~$10–19', forOrg: true, features: 'เครื่องมือสำหรับทีมเต็มรูปแบบ' }\n    ],\n    orgSuitability: 'องค์กรใช้ได้ทั้งหมด'",
    'meet-record-otter': "plans: [\n      { name: 'Free', price: 'ฟรีจำกัด', forOrg: 'warning', features: 'ปริมาณใช้งานจำกัด' },\n      { name: 'Paid', price: '~$16+', forOrg: true, features: 'เครื่องมือสำหรับทีมเต็มรูปแบบ' }\n    ],\n    orgSuitability: 'องค์กรใช้ได้ทั้งหมด'",
    'meet-summary-gemini': "plans: [\n      { name: 'Gemini (Free)', price: 'ฟรี', forOrg: 'no', features: 'โมเดลพื้นฐาน' },\n      { name: 'Gemini Advanced', price: 'เสียเงิน', forOrg: 'warning', features: 'โมเดลเก่งที่สุดจาก Google' }\n    ],\n    orgSuitability: 'ใช้ได้ทั้งบุคคลและองค์กร'",
    'meet-chatgpt': "plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'no', features: 'GPT พื้นฐาน' },\n      { name: 'Plus', price: '~$20', forOrg: 'warning', features: 'ส่วนตัว, เร็วขึ้น' },\n      { name: 'Team', price: '~$25–30+', forOrg: true, features: 'แชร์ทีม, Admin control' }\n    ],\n    orgSuitability: 'ถ้าทำระบบองค์กร → ใช้ Team หรือ Enterprise'",
    'meet-news-claude': "plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'no', features: 'รุ่นพื้นฐาน' },\n      { name: 'Pro', price: '~$20', forOrg: 'warning', features: 'รุ่นแรงขึ้น' },\n      { name: 'Team', price: '~$25–30+', forOrg: true, features: 'Workspace รวมทีม' },\n      { name: 'Enterprise', price: 'ติดต่อเซลส์', forOrg: true, features: 'Compliance, API scale' }\n    ]",
    'meet-news-copyai': "plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'warning', features: 'ใช้จำกัดคำ' },\n      { name: 'Pro', price: 'มีแพ็กเกจ', forOrg: true, features: 'เนื้อหาไม่จำกัด' }\n    ]",
    'creative-img-midjourney': "plans: [\n      { name: 'Basic', price: '~$10', forOrg: 'no', features: 'ไม่มีให้ลองฟรี' },\n      { name: 'Standard', price: '~$30', forOrg: 'warning', features: 'ระดับปานกลาง' },\n      { name: 'Pro', price: '~$60', forOrg: true, features: 'ระดับโปร' }\n    ],\n    orgSuitability: 'ใช้ทีมได้ แต่ไม่มี Enterprise เต็มรูปแบบ'",
    'creative-img-nanobanana': "plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'warning', features: 'ฟรีในระดับพื้นฐาน' }\n    ]",
    'creative-video-veo': "plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'warning', features: 'ผสานกับเครื่องมือ Google' }\n    ]",
    'creative-video-sora': "plans: [\n      { name: 'สถานะ', price: 'ยังจำกัด', forOrg: 'warning', features: 'เปิดให้กับผู้เข้าถึงส่วนหนึ่ง' },\n      { name: 'ราคา', price: 'รอประกาศ', forOrg: 'no', features: 'ยังไม่เปิด public เต็ม' }\n    ]",
    'creative-video-runway': "plans: [\n      { name: 'Free', price: 'มีจำกัด', forOrg: 'no', features: 'ให้เครดิตเบื้องต้น' },\n      { name: 'Standard', price: '~$15', forOrg: 'warning', features: 'วิดีโอทั่วไป' },\n      { name: 'Pro', price: '~$35', forOrg: 'warning', features: 'เน้นคุณภาพและสเกล' },\n      { name: 'Enterprise', price: 'ติดต่อเซลส์', forOrg: true, features: 'ระดับองค์กร' }\n    ],\n    orgSuitability: 'องค์กรใช้ได้'",
    'creative-pres-gamma': "plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'warning', features: 'ใช้ได้จำกัดเครดิต' },\n      { name: 'Plus/Pro', price: 'มีแพ็กเกจ', forOrg: true, features: 'สำหรับทีมและปลดล็อกลิมิต' }\n    ]",
    'creative-pres-canvamagic': "plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'no', features: 'ใช้งานทั่วไป' },\n      { name: 'Pro', price: '~$12', forOrg: 'warning', features: 'ฟีเจอร์พรีเมียม' },\n      { name: 'Teams', price: '~$15', forOrg: true, features: 'แชร์กับทีมงาน' }\n    ],\n    orgSuitability: 'องค์กรใช้ Teams'",
    'creative-music-suno': "plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'warning', features: 'เครดิตรายวัน' },\n      { name: 'Pro/Premier', price: 'มีแพ็กเกจ', forOrg: true, features: 'ใช้เพื่อการพาณิชย์ได้' }\n    ]",
    'creative-music-udio': "plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'warning', features: 'จำกัดจำนวนผลงาน' },\n      { name: 'Premium', price: 'มีแพ็กเกจ', forOrg: true, features: 'ไม่มีลายน้ำ สร้างได้เยอะขึ้น' }\n    ]",
    'plan-act-gemini': "plans: [\n      { name: 'Gemini (Free)', price: 'ฟรี', forOrg: 'no', features: 'โมเดลพื้นฐาน' },\n      { name: 'Gemini Advanced', price: 'เสียเงิน', forOrg: 'warning', features: 'วิเคราะห์ข้อมูลได้ดีขึ้น' }\n    ]",
    'plan-act-chatgpt': "plans: [\n      { name: 'Free', price: 'ฟรี', forOrg: 'no', features: 'GPT พื้นฐาน' },\n      { name: 'Plus', price: '~$20', forOrg: 'warning', features: 'ส่วนตัว, เร็วขึ้น' },\n      { name: 'Team', price: '~$25–30+', forOrg: true, features: 'แชร์ทีม, Admin control' }\n    ],\n    orgSuitability: 'ถ้าทำระบบองค์กร → ใช้ Team หรือ Enterprise'",
    'plan-timeline-notion': "plans: [\n      { name: 'Free', price: 'ฟรีจำกัด', forOrg: 'warning', features: 'ระดับบุคคล' },\n      { name: 'Paid', price: '~$8–10', forOrg: true, features: 'เพิ่ม Notion AI ไปใน Workspace' }\n    ],\n    orgSuitability: 'องค์กรใช้ได้ทั้งหมด'",
    'plan-timeline-asana': "plans: [\n      { name: 'Asana Business', price: '~$25+', forOrg: true, features: 'รวมในแพ็กเกจ Business แล้ว' }\n    ],\n    orgSuitability: 'องค์กรใช้ได้ทั้งหมด'"
};

for (const [id, additionalCode] of Object.entries(updates)) {
    // If the object already has a `plans:` property, we will replace it.
    const regexExistingPlans = new RegExp(\`id:\\\\s*'\${id}'[\\\\s\\\\S]*?(plans:\\\\s*\\\\[[\\\\s\\\\S]*?\\\\],?[\\\\s\\\\n]*(?:orgSuitability:\\\\s*'[^']*'|)?)\`);
  const existingPlansMatch = content.match(regexExistingPlans);

  if (existingPlansMatch && existingPlansMatch[1]) {
    content = content.replace(existingPlansMatch[1], additionalCode);
  } else {
    // Inject right after imageUrl
    const regexImageUrl = new RegExp(\`id:\\\\s*'\${id}'[\\\\s\\\\S]*?(imageUrl:[^\\\\n]+)\`);
    content = content.replace(regexImageUrl, (match, imageUrlStr) => {
      // Handle trailing comma scenario just in case
      let newImageUrlStr = imageUrlStr;
      if (!newImageUrlStr.endsWith(',')) {
        newImageUrlStr += ',';
      }
      return match.replace(imageUrlStr, \`\${newImageUrlStr}\\n    \${additionalCode}\`);
    });
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Update complete');
