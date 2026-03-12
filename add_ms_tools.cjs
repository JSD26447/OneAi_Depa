const db = require('./backend/db');

const tools = [
  {
    id: 'coding-github-copilot',
    name: 'GitHub Copilot',
    tagline: 'คู่หู AI สำหรับการเขียนโค้ดที่นักพัฒนาทั่วโลกไว้วางใจ',
    description: 'AI Programmer ที่ช่วยแนะนำโค้ดแบบเรียลไทม์ภายในหน้า IDE ของคุณ ช่วยให้เขียนฟังก์ชัน เขียนเทสต์ และแก้บัคได้เร็วขึ้นหลายเท่า',
    category: 'coding',
    bestFor: ['นักพัฒนาซอฟต์แวร์', 'โปรแกรมเมอร์', 'นักศึกษาวิศวกรรมคอมพิวเตอร์'],
    difficulty: 'Intermediate',
    price: 'Paid',
    whatItDoes: ['แนะนำโค้ดอัตโนมัติ (Autocomplete)', 'ช่วยเขียน Unit Test', 'อธิบายการทำงานของโค้ดที่ซับซ้อน'],
    whoItsFor: ['Developers', 'Tech Leads'],
    howToUse: [{ step: 1, text: 'ติดตั้ง Extension ใน VS Code หรือ IDE ที่ใช้ แล้วล็อกอินผ่าน GitHub' }],
    useCases: ['เขียนเว็บแอปพลิเคชัน', 'พัฒนาอัลกอริทึม', 'เรียนรู้ภาษาโปรแกรมใหม่ๆ'],
    difficultyExplanation: 'เหมาะสำหรับคนที่มีพื้นฐานการเขียนโค้ดอยู่แล้วเพื่อให้ตรวจสอบความถูกต้องของ AI ได้',
    pricingDetails: 'มีค่าบริการรายเดือน (Individual/Business) โดยนักศึกษาและเจ้าของโปรเจกต์ Open Source ใช้งานฟรี',
    officialWebsite: 'https://github.com/features/copilot',
    logo: 'Code',
    imageUrl: '',
    provider: 'Microsoft / GitHub'
  },
  {
    id: 'creative-ms-designer',
    name: 'Microsoft Designer',
    tagline: 'ออกแบบกราฟิกสุดโปรด้วยพลัง AI',
    description: 'เครื่องมือออกแบบที่รวมพลังของ DALL-E 3 เพื่อสร้างรูปภาพและงานดีไซน์ตามคำสั่งของคุณ ช่วยเพิ่มความสวยงามให้คอนเทนต์โซเชียลมีเดีย',
    category: 'creative',
    bestFor: ['Content Creators', 'Social Media Managers', 'พ่อค้าแม่ค้าออนไลน์'],
    difficulty: 'Beginner',
    price: 'Free',
    whatItDoes: ['สร้างภาพกราฟิกจากข้อความบรรยาย', 'ช่วยแนะนำ Layout การจัดวางอัตโนมัติ', 'ลบพื้นหลังและแก้ไของค์ประกอบภาพได้ง่าย'],
    whoItsFor: ['คนทำเพจ', 'นักการตลาด', 'คนทั่วไปที่อยากทำรูปสวยๆ'],
    howToUse: [{ step: 1, text: 'พิมพ์รายละเอียดที่ต้องการออกแบบ แล้วเลือกสไตล์ที่ระบบแนะนำ' }],
    useCases: ['ทำภาพหน้าปก Facebook', 'ออกแบบ Instagram Post', 'สร้างการ์ดอวยพรออนไลน์'],
    difficultyExplanation: 'ใช้งานง่ายมากผ่านหน้าเว็บและมือถือ เน้นการพิมพ์คุยกับ AI',
    pricingDetails: 'ปัจจุบันเปิดให้ใช้งานฟรีผ่านบัญชี Microsoft',
    officialWebsite: 'https://designer.microsoft.com/',
    logo: 'Palette',
    imageUrl: '',
    provider: 'Microsoft'
  },
  {
    id: 'coding-azure-studio',
    name: 'Azure AI Studio',
    tagline: 'แพลตฟอร์มพัฒนา AI ระดับองค์กรจาก Microsoft',
    description: 'ศูนย์รวมการสร้าง พัฒนา และทดสอบโซลูชัน Generative AI ที่มีความปลอดภัยและมาตรฐานระดับสูง เหมาะสำหรับการสร้างแอปพลิเคชัน AI ขนาดใหญ่',
    category: 'coding',
    bestFor: ['AI Engineers', 'Software Architects', 'Enterprise Teams'],
    difficulty: 'Advanced',
    price: 'Free + Paid',
    whatItDoes: ['จัดการ Life-cycle ของการพัฒนา AI', 'เข้าถึงและทดสอบโมเดลจากหลายค่าย (OpenAI, Meta)', 'เน้นการจัดการความปลอดภัยและธรรมาภิบาลข้อมูล'],
    whoItsFor: ['องค์กรที่ต้องการปรับใช้ AI', 'นักพัฒนาแอปพลิเคชันขั้นสูง'],
    howToUse: [{ step: 1, text: 'เข้าใช้งานผ่าน Azure Portal และสร้าง Resource สำหรับ AI Studio' }],
    useCases: ['สร้างระบบ Chatbot ระดับองค์กร', 'พัฒนา Copilot เฉพาะทาง', 'จัดการชุดข้อมูลขนาดใหญ่สำหรับ AI'],
    difficultyExplanation: 'เป็นเครื่องมือระดัน Professional ต้องมีความเข้าใจระบบ Cloud และ AI Development',
    pricingDetails: 'คิดค่าบริการตามการใช้งาน (Pay-as-you-go) โดยมี Free Trial ให้ทดสอบ',
    officialWebsite: 'https://ai.azure.com/',
    logo: 'Cpu',
    imageUrl: '',
    provider: 'Microsoft'
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
