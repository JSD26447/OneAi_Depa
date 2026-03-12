const db = require('./backend/db');

const tools = [
  {
    id: 'doc-notebooklm',
    name: 'NotebookLM (Google)',
    tagline: 'ผู้ช่วยวิจัยและสรุปเอกสารอัจฉริยะ',
    description: 'ใช้ AI วิเคราะห์เอกสารที่คุณอัปโหลดเพื่อสร้างข้อสรุป ตอบคำถาม และสร้างไอเดียใหม่ๆ โดยอ้างอิงจากแหล่งข้อมูลที่คุณกำหนดไว้เท่านั้น',
    category: 'document',
    bestFor: ['นักเรียน', 'นักวิจัย', 'ครู', 'ผู้เชี่ยวชาญ'],
    difficulty: 'Beginner',
    price: 'Free',
    whatItDoes: ['วิเคราะห์และสรุปไฟล์ PDF/Text', 'สร้าง Podcast (Audio Overview) จากเนื้อหา', 'ตอบคำถามที่อ้างอิงจากแหล่งข้อมูลที่กำหนดเท่านั้น'],
    whoItsFor: ['นักศึกษา', 'นักวิชาการ', 'คนที่ต้องจัดการเอกสารจำนวนมาก'],
    howToUse: [{ step: 1, text: 'อัปโหลดไฟล์เอกสารหรือแหล่งข้อมูลที่ต้องการ แล้วเริ่มถามคำถามหรือให้ AI สรุปประเด็น' }],
    useCases: ['สรุปบทความวิจัย', 'เตรียมเนื้อหาสำหรับการเรียนการสอน', 'เปลี่ยนบันทึกข้อความให้เป็น Podcast'],
    difficultyExplanation: 'ใช้งานง่ายมาก เพียงแค่อัปโหลดไฟล์และพิมพ์คุยเหมือนแชทบอททั่วไป',
    pricingDetails: 'ปัจจุบันเปิดให้ใช้งานฟรี',
    officialWebsite: 'https://notebooklm.google.com/',
    logo: 'BookOpen',
    imageUrl: '',
    provider: 'Google'
  },
  {
    id: 'creative-imagen3',
    name: 'Imagen 3 (Google)',
    tagline: 'โมเดลสร้างภาพคุณภาพสูงจาก Google',
    description: 'เทคโนโลยีสร้างภาพจากข้อความระดับเรือธงที่ให้ความสมจริงสูง และเข้าใจรายละเอียดของพรอมต์ที่ซับซ้อนได้อย่างดีเยี่ยม',
    category: 'creative',
    bestFor: ['นักออกแบบ', 'กราฟิกดีไซเนอร์', 'คอนเทนต์ครีเอเตอร์'],
    difficulty: 'Beginner',
    price: 'Free',
    whatItDoes: ['สร้างภาพ Photorealistic ที่สมจริง', 'รองรับการใส่ข้อความในภาพได้อย่างแม่นยำ', 'เข้าใจบริบทภาษาที่เป็นธรรมชาติได้อย่างลึกซึ้ง'],
    whoItsFor: ['ศิลปินดิจิทัล', 'นักการตลาด', 'ผู้ที่ต้องการภาพประกอบคุณภาพสูง'],
    howToUse: [{ step: 1, text: 'พิมพ์คำบรรยายภาพที่ต้องการใน Gemini หรือ ImageFX แล้วเลือกสไตล์ที่ต้องการ' }],
    useCases: ['สร้างภาพประกอบบทความ', 'ออกแบบแนวคิดงานศิลปะ', 'สร้างภาพถ่ายจำลอง'],
    difficultyExplanation: 'เข้าใจคำสั่งภาษาธรรมชาติได้ดี ไม่ต้องใช้เทคนิคการเขียนพรอมต์ที่ซับซ้อนมาก',
    pricingDetails: 'ใช้งานได้ฟรีผ่านบริการของ Google เช่น Gemini และ ImageFX',
    officialWebsite: 'https://deepmind.google/technologies/imagen-3/',
    logo: 'Image',
    imageUrl: '',
    provider: 'Google'
  },
  {
    id: 'coding-idx',
    name: 'Project IDX (Google)',
    tagline: 'เครื่องมือเขียนโค้ดบน Cloud พร้อมพลัง AI',
    description: 'สภาพแวดล้อมการพัฒนาแอปพลิเคชัน (IDE) บนเว็บที่ผสานพลังของ Gemini เพื่อช่วยให้การเขียนโค้ดสะดวกและรวดเร็วขึ้น',
    category: 'coding',
    bestFor: ['นักพัฒนาซอฟต์แวร์', 'โปรแกรมเมอร์', 'ทีม Tech'],
    difficulty: 'Intermediate',
    price: 'Free',
    whatItDoes: ['ช่วยเขียนโค้ดและแนะนำโค้ดอัจฉริยะ', 'รองรับการรันแอปพลิเคชันผ่าน Browser', 'ช่วยแก้ Bug และอธิบายการทำงานของโค้ด'],
    whoItsFor: ['Full-stack Developers', 'Mobile App Developers'],
    howToUse: [{ step: 1, text: 'สร้างโปรเจกต์ใหม่บนเว็บ Project IDX และเลือกเทคโนโลยีที่ต้องการใช้งาน' }],
    useCases: ['เขียนเว็บแอปพลิเคชัน', 'พัฒนา Mobile App ด้วย Flutter', 'ทดสอบโค้ดบนสภาพแวดล้อมที่พร้อมใช้งานทันที'],
    difficultyExplanation: 'เหมาะสำหรับผู้ที่มีพื้นฐานการเขียนโค้ดอยู่แล้ว โดย AI จะช่วยลดภาระงานซ้ำซ้อน',
    pricingDetails: 'ปัจจุบันอยู่ในช่วง Preview และให้ใช้งานได้ฟรี',
    officialWebsite: 'https://idx.dev/',
    logo: 'Code2',
    imageUrl: '',
    provider: 'Google'
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
