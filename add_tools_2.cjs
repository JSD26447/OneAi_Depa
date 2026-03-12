const db = require('./backend/db');

const tools = [
  {
    id: 'doc-deepseek',
    name: 'DeepSeek',
    tagline: 'โมเดลภาษาขั้นสูงเพื่อการวางแผนและจัดการเอกสาร',
    description: 'AI ที่มีความสามารถสูงในการคิดวิเคราะห์เชิงตรรกะ ช่วยร่างเอกสารและวางแผนโปรเจกต์ได้อย่างแม่นยำและรวดเร็ว',
    category: 'document',
    bestFor: ['นักวางแผน', 'นักเขียน', 'นักพัฒนาซอฟต์แวร์'],
    difficulty: 'Beginner',
    price: 'Free + Paid',
    whatItDoes: ['ร่างเนื้อหาเอกสารและบทความ', 'ช่วยวางแผนกลยุทธ์และลำดับงาน', 'วิเคราะห์โค้ดและข้อมูลเชิงลึก'],
    whoItsFor: ['องค์กรที่ต้องการประสิทธิภาพสูง', 'ฟรีแลนซ์', 'นักศึกษา'],
    howToUse: [{ step: 1, text: 'พิมพ์คำถามหรือโจทย์ที่ต้องการวางแผน แล้วให้ DeepSeek วิเคราะห์และเสนอแนวทาง' }],
    useCases: ['ร่างแผนการดำเนินการ', 'สรุปรายงานการประชุม', 'ช่วยคิดไอเดียธุรกิจใหม่'],
    difficultyExplanation: 'ใช้งานง่ายผ่านอินเทอร์เฟซแบบแชทที่เป็นมิตรกับผู้ใช้',
    pricingDetails: 'มีทั้งเวอร์ชันฟรีและ API สำหรับการใช้งานระดับสูง',
    officialWebsite: 'https://www.deepseek.com/',
    logo: 'Zap',
    imageUrl: '',
    provider: 'DeepSeek'
  },
  {
    id: 'doc-perplexity',
    name: 'Perplexity AI',
    tagline: 'AI ค้นคว้าข้อมูลพร้อมแหล่งอ้างอิงที่เชื่อถือได้',
    description: 'ผู้ช่วยค้นคว้าวิจัยที่ทำงานเหมือน Search Engine ผสมแชทบอท โดยจะให้คำตอบพร้อมระบุแหล่งที่มาของข้อมูลอย่างชัดเจน',
    category: 'document',
    bestFor: ['นักวิจัย', 'นักศึกษา', 'คนหาข้อมูล'],
    difficulty: 'Beginner',
    price: 'Free + Paid',
     whatItDoes: ['ค้นหาข้อมูลแบบตอบคำถามทันที', 'ระบุแหล่งอ้างอิงและลิงก์ที่เกี่ยวข้อง', 'สรุปเนื้อหาจากเว็บหลายแหล่งในที่เดียว'],
    whoItsFor: ['คนที่เน้นความถูกต้องของข้อมูล', 'นักเขียนที่ต้องการ Fact-check'],
    howToUse: [{ step: 1, text: 'พิมพ์หัวเรื่องที่ต้องการศึกษาหรือค้นหาข้อมูลในช่องค้นหา' }],
    useCases: ['หาข้อมูลวิชาการ', 'ศึกษาข้อมูลคู่แข่ง', 'สรุปข่าวสารประจำวัน'],
    difficultyExplanation: 'เหมือนการใช้ Google แต่ได้รับคำตอบที่สรุปมาให้แล้วพร้อมอ้างอิง',
    pricingDetails: 'เวอร์ชันฟรีใช้งานได้ดี มี Pro สำหรับโมเดลที่ฉลาดขึ้นและเข้าถึงไฟล์ได้มากขึ้น',
    officialWebsite: 'https://www.perplexity.ai/',
    logo: 'Search',
    imageUrl: '',
    provider: 'Perplexity'
  },
  {
    id: 'coding-aistudio',
    name: 'Google AI Studio',
    tagline: 'เครื่องมือพัฒนาและทดสอบโมเดล AI สำหรับสายโค้ด',
    description: 'แพลตฟอร์มสำหรับนักพัฒนาในการสร้างและทดสอบ Prompt (Prompt Engineering) รวมถึงการทดลองใช้งานโมเดล Gemini ล่าสุด',
    category: 'coding',
    bestFor: ['นักพัฒนา', 'AI Engineers', 'Tech Enthusiasts'],
    difficulty: 'Advanced',
    price: 'Free',
    whatItDoes: ['ทดสอบและปรับแต่ง Prompt สำหรับโมเดล Gemini', 'ตั้งค่า Parameter ของโมเดลได้อย่างละเอียด', 'ส่งออกโค้ดเพื่อนำไปใช้ในแอปพลิเคชัน'],
    whoItsFor: ['คนที่ต้องการสร้างแอปด้วย AI', 'นักพัฒนาซอฟต์แวร์'],
    howToUse: [{ step: 1, text: 'ล็อกอินเข้าใช้งานและเลือกโมเดล Gemini ที่ต้องการทดสอบใน Studio' }],
    useCases: ['ออกแบบระบบ Chatbot', 'สร้างระบบวิเคราะห์ข้อความอัตโนมัติ', 'ทดลองความสามารถใหม่ๆ ของ AI'],
    difficultyExplanation: 'เน้นกลุ่มนักพัฒนาที่เข้าใจการทำงานของโมเดล AI เป็นหลัก',
    pricingDetails: 'เปิดให้ใช้งานฟรีตามโควตาที่กำหนด (Free of charge in certain limits)',
    officialWebsite: 'https://aistudio.google.com/',
    logo: 'Layout',
    imageUrl: '',
    provider: 'Google'
  },
  {
    id: 'plan-opal',
    name: 'Opal',
    tagline: 'ผู้ช่วยวางแผนและจัดการชีวิตดิจิทัลอย่างปลอดภัย',
    description: 'AI ที่เน้นการวางแผนและเพิ่มสมาธิในการทำงาน โดยช่วยจำกัดการเข้าถึงแอปที่ไม่จำเป็นและเน้นความปลอดภัยของข้อมูล',
    category: 'planning',
    bestFor: ['คนทำงาน', 'นักบริหารเวลา', 'ผู้บริโภคสาย Tech'],
    difficulty: 'Beginner',
    price: 'Free + Paid',
    whatItDoes: ['วางแผนตารางเวลาทำงาน (Focus sessions)', 'บล็อกสิ่งรบกวนสมาธิอัตโนมัติ', 'วิเคราะห์พฤติกรรมการใช้งานเพื่อเพิ่ม Productivity'],
    whoItsFor: ['คนที่ต้องการโฟกัสงาน', 'คนที่มีงานรัดตัว'],
    howToUse: [{ step: 1, text: 'ตั้งค่าช่วงเวลาเลาที่ต้องการโฟกัสในแอปเพื่อให้ระบบช่วยจัดการสิ่งรบกวน' }],
    useCases: ['จัดตารางเวลาทำงานสำคัญ', 'ลดการใช้งานโซเชียลมีเดียระหว่างงาน', 'วิเคราะห์สถิติความจำกัดในการทำงาน'],
    difficultyExplanation: 'ตัวแอปออกแบบมาให้ใช้งานง่าย เห็นผลลัพธ์ผ่านกราฟสถิติ',
    pricingDetails: 'มีเวอร์ชันฟรี และแบบพรีเมียมเพื่อฟีเจอร์การปรับแต่งที่ลึกขึ้น',
    officialWebsite: 'https://www.opal.so/',
    logo: 'ShieldCheck',
    imageUrl: '',
    provider: 'Opal'
  }
];

async function insertTools() {
  for (const tool of tools) {
    const name = tool.name;
    const link = tool.officialWebsite;
    const provider = tool.provider;
    const description = JSON.stringify(tool);
    const category_id = tool.category;
    const category_ids = JSON.stringify([tool.category]);
    const logo_url = tool.imageUrl;
    const is_depa_recommended = 0;

    try {
      await db.query(
        'INSERT INTO ais (name, description, link, category_id, category_ids, provider, logo_url, is_depa_recommended) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, description, link, category_id, category_ids, provider, logo_url, is_depa_recommended]
      );
      console.log(`✅ Added ${name}`);
    } catch (err) {
      console.error(`❌ Error adding ${name}:`, err.message);
    }
  }
  process.exit();
}

insertTools();
