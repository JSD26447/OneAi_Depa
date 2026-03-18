const db = require('./db');
require('dotenv').config();

// bestFor and whoItsFor data from aiTools.ts
const extraData = [
  { name: 'Gemini (Google)', tagline: 'ผู้ช่วยด้านงานเอกสารอัจฉริยะ', bestFor: ['พนักงาน','ผู้บริหาร','หน่วยงานราชการ','นิติกร'], whoItsFor: ['หน่วยงานราชการหรือองค์กร','ฝ่ายกฎหมาย / จัดซื้อ'] },
  { name: 'Claude', tagline: 'วิเคราะห์และร่างโครงสร้างภาษา', bestFor: ['พนักงาน','นักเขียน','นิติกร','ทีมกฎหมาย'], whoItsFor: ['องค์กรเอกชนและรัฐ','ทีมกฎหมาย','ฝ่ายโปรเจกต์'] },
  { name: 'ChatGPT', tagline: 'ร่างเนื้อหาในอีเมล', bestFor: ['พนักงานออฟฟิศ','ทุกคน'], whoItsFor: ['ทุกคนที่ต้องติดต่อสื่อสารผ่านอีเมล'] },
  { name: 'Microsoft Copilot', tagline: 'ร่างเนื้อหาในอีเมล', bestFor: ['พนักงานออฟฟิศ','ผู้ใช้ Microsoft 365'], whoItsFor: ['ผู้ที่ใช้ Outlook ในการทำงานเป็นหลัก'] },
  { name: 'Grammarly', tagline: 'ตรวจเช็คความถูกต้อง', bestFor: ['นักเรียน','พนักงานออฟฟิศ','นักเขียน'], whoItsFor: ['ผู้ที่เขียนเอกสารหรืออีเมลเป็นภาษาอังกฤษ'] },
  { name: 'DeepL Write', tagline: 'ตรวจเช็คความถูกต้อง', bestFor: ['นักแปล','พนักงานออฟฟิศ','นักสื่อสาร'], whoItsFor: ['ผู้ที่ต้องการปรับระดับภาษาการเขียนให้ลื่นไหลเหมือนเจ้าของภาษา'] },
  { name: 'Microsoft Copilot', tagline: 'ร่างเนื้อหาการประชุม (Agenda)', bestFor: ['ผู้จัดการ','แอดมิน'], whoItsFor: ['องค์กรที่ใช้ระบบ Microsoft 365'] },
  { name: 'Notion AI', tagline: 'ร่างเนื้อหาการประชุม (Agenda)', bestFor: ['ทีมโปรเจกต์','สตาร์ทอัพ'], whoItsFor: ['คนใช้งาน Notion สำหรับทำ Knowledge Management'] },
  { name: 'Fireflies.ai', tagline: 'บันทึกการประชุม (Recording/Minutes)', bestFor: ['เลขานุการ','ทีมเซลส์'], whoItsFor: ['ผู้ที่ใช้ประชุมผ่าน Google Meet, Zoom'] },
  { name: 'Otter.ai', tagline: 'บันทึกการประชุม (Recording/Minutes)', bestFor: ['นักเรียนนักศึกษา','ทีมจัดการประชุม'], whoItsFor: ['ผู้ที่ต้องการหลักฐานถอดความทันที'] },
  { name: 'Gemini', tagline: 'สรุปประเด็น/รายงาน', bestFor: ['พนักงานธุรการ','ผู้จัดการ'], whoItsFor: ['ทีมที่ใช้ Google Workspace ในการวิเคราะห์สถิติเนื้อหาประชุม'] },
  { name: 'ChatGPT', tagline: 'ผู้ช่วยสรุปโน้ตและเขียนข่าว', bestFor: ['ผู้ช่วยส่วนตัว','นักวิเคราะห์ข้อมูล','ฝ่ายประชาสัมพันธ์ (PR)'], whoItsFor: ['ผู้ดูแลสื่อประชาสัมพันธ์องค์กร','พนักงานออฟฟิศทั่วไป'] },
  { name: 'Claude', tagline: 'เขียนข่าว', bestFor: ['นักการตลาด','นักข่าว'], whoItsFor: ['สื่อสิ่งพิมพ์อิเล็กทรอนิกส์','ผู้ต้องการเผยแพร่ข่าวที่มีขนาดยาว'] },
  { name: 'Copy.ai', tagline: 'เขียนข่าว', bestFor: ['นักโฆษณา','ฝ่าย PR ที่ต้องทำหลายโปรเจกต์'], whoItsFor: ['เอเจนซี่ฝ่ายสื่อสารการตลาด'] },
  { name: 'Midjourney', tagline: 'สร้างรูปภาพ', bestFor: ['นักออกแบบ','นักการตลาด','ผู้ดูแลโซเชียล'], whoItsFor: ['ฝ่ายกราฟิก','ผู้ที่ต้องการภาพโดดเด่น'] },
  { name: 'Nano Banana (Gemini)', tagline: 'สร้างรูปภาพ', bestFor: ['นักการตลาด','ผู้ดูแลโซเชียล','บุคคลทั่วไป'], whoItsFor: ['ครีเอเตอร์','คอนเทนต์ครีเอเตอร์'] },
  { name: 'Veo (Google)', tagline: 'สร้างคลิปวีดิโอ', bestFor: ['นักทำวิดีโอ','คอนเทนต์ครีเอเตอร์','ฝ่ายผลิตสื่อ'], whoItsFor: ['โปรดักชั่นเฮาส์','ยูทูบเบอร์'] },
  { name: 'Sora (OpenAI)', tagline: 'สร้างคลิปวีดิโอ', bestFor: ['นักทำวิดีโอ','คอนเทนต์ครีเอเตอร์','อุตสาหกรรมโฆษณา'], whoItsFor: ['ผู้กำกับหนังที่ต้องการทดสอบฉาก','ครีเอทีฟโฆษณา'] },
  { name: 'Runway', tagline: 'สร้างคลิปวีดิโอ', bestFor: ['นักครีเอเตอร์วิดีโอ','ฝ่ายสื่อสารองค์กร'], whoItsFor: ['นักตัดต่อ','ครีเอทีฟโฆษณาโซเชียล'] },
  { name: 'Gamma', tagline: 'สร้าง Presentation', bestFor: ['พนักงาน','นักเรียนนักศึกษา','วิทยากร'], whoItsFor: ['ผู้ที่ไม่มีเวลาทำสไลด์เอง','ผู้ที่ต้องทำพรีเซนต์ด่วน'] },
  { name: 'Canva Magic Design', tagline: 'สร้าง Presentation', bestFor: ['พนักงาน','วิทยากร','ผู้ทำคอนเทนต์'], whoItsFor: ['ผู้ที่ชอบใช้ Canva อยู่แล้ว','นักเรียนและพนักงาน'] },
  { name: 'Suno', tagline: 'สร้างเพลงประกอบ', bestFor: ['ครีเอเตอร์','ผู้ใช้งานทั่วไป','ผู้สร้างความบันเทิง'], whoItsFor: ['คนทำคลิปที่ต้องการเพลงสนุก','คนรักเสียงเพลง'] },
  { name: 'Udio', tagline: 'สร้างเพลงประกอบ', bestFor: ['ครีเอเตอร์','งานโฆษณา','นักเรียบเรียง'], whoItsFor: ['คนที่จัดทำโฆษณา','ค่ายนักพัฒนาแพลตฟอร์มที่ต้องการ BGM'] },
  { name: 'Gemini', tagline: 'ร่างแผนการดำเนินการ', bestFor: ['ผู้จัดการ','ทีมงานเริ่มต้น'], whoItsFor: ['หัวหน้าโปรเจกต์'] },
  { name: 'ChatGPT', tagline: 'ร่างแผนการดำเนินการ', bestFor: ['ผู้ประกอบการ','ทีมกลยุทธ์'], whoItsFor: ['ผู้นำองค์กร','ทีมงานขับเคลื่อนนโยบาย'] },
  { name: 'Notion AI', tagline: 'จัดทำ Timeline เบื้องต้น', bestFor: ['Project Manager','ทีมปฏิบัติการ'], whoItsFor: ['ทีมที่จดงานใน Notion เป็นหลัก'] },
  { name: 'Asana Intelligence', tagline: 'จัดทำ Timeline เบื้องต้น', bestFor: ['Project Manager','ทีม Operation','องค์กรขนาดใหญ่'], whoItsFor: ['ทีมที่ใช้แพลตฟอร์มจัดการขององค์กร (Enterprise)'] },
  { name: 'NotebookLM (Google)', tagline: 'ผู้ช่วยวิจัยและสรุปเอกสารอัจฉริยะ', bestFor: ['นักเรียน','นักวิจัย','ครู','ผู้เชี่ยวชาญ'], whoItsFor: ['นักศึกษา','นักวิชาการ','คนที่ต้องจัดการเอกสารจำนวนมาก'] },
  { name: 'Imagen 3 (Google)', tagline: 'โมเดลสร้างภาพคุณภาพสูงจาก Google', bestFor: ['นักออกแบบ','กราฟิกดีไซเนอร์','คอนเทนต์ครีเอเตอร์'], whoItsFor: ['ศิลปินดิจิทัล','นักการตลาด','ผู้ที่ต้องการภาพประกอบคุณภาพสูง'] },
  { name: 'Project IDX (Google)', tagline: 'เครื่องมือเขียนโค้ดบน Cloud พร้อมพลัง AI', bestFor: ['นักพัฒนาซอฟต์แวร์','โปรแกรมเมอร์','ทีม Tech'], whoItsFor: ['Full-stack Developers','Mobile App Developers'] },
  { name: 'DeepSeek', tagline: 'โมเดลภาษาขั้นสูงเพื่อการวางแผนและจัดการเอกสาร', bestFor: ['นักวางแผน','นักเขียน','นักพัฒนาซอฟต์แวร์'], whoItsFor: ['องค์กรที่ต้องการประสิทธิภาพสูง','ฟรีแลนซ์','นักศึกษา'] },
  { name: 'Perplexity AI', tagline: 'AI ค้นคว้าข้อมูลพร้อมแหล่งอ้างอิงที่เชื่อถือได้', bestFor: ['นักวิจัย','นักศึกษา','คนหาข้อมูล'], whoItsFor: ['คนที่เน้นความถูกต้องของข้อมูล','นักเขียนที่ต้องการ Fact-check'] },
  { name: 'Google AI Studio', tagline: 'เครื่องมือพัฒนาและทดสอบโมเดล AI สำหรับสายโค้ด', bestFor: ['นักพัฒนา','AI Engineers','Tech Enthusiasts'], whoItsFor: ['คนที่ต้องการสร้างแอปด้วย AI','นักพัฒนาซอฟต์แวร์'] },
  { name: 'Opal', tagline: 'ผู้ช่วยวางแผนและจัดการชีวิตดิจิทัลอย่างปลอดภัย', bestFor: ['คนทำงาน','นักบริหารเวลา','ผู้บริโภคสาย Tech'], whoItsFor: ['คนที่ต้องการโฟกัสงาน','คนที่มีงานรัดตัว'] },
  { name: 'GitHub Copilot', tagline: 'คู่หู AI สำหรับการเขียนโค้ดที่นักพัฒนาทั่วโลกไว้วางใจ', bestFor: ['นักพัฒนาซอฟต์แวร์','โปรแกรมเมอร์','นักศึกษาวิศวกรรมคอมพิวเตอร์'], whoItsFor: ['Developers','Tech Leads'] },
  { name: 'Microsoft Designer', tagline: 'ออกแบบกราฟิกสุดโปรด้วยพลัง AI', bestFor: ['Content Creators','Social Media Managers','พ่อค้าแม่ค้าออนไลน์'], whoItsFor: ['คนทำเพจ','นักการตลาด','คนทั่วไปที่อยากทำรูปสวยๆ'] },
  { name: 'Azure AI Studio', tagline: 'แพลตฟอร์มพัฒนา AI ระดับองค์กรจาก Microsoft', bestFor: ['AI Engineers','Software Architects','Enterprise Teams'], whoItsFor: ['องค์กรที่ต้องการปรับใช้ AI','นักพัฒนาแอปพลิเคชันขั้นสูง'] },
];

async function migrate() {
  try {
    const [rows] = await db.query('SELECT id, name, description FROM ais');
    console.log(`Found ${rows.length} tools in DB`);

    let updated = 0;
    for (const row of rows) {
      let existing = {};
      try { existing = JSON.parse(row.description); } catch(e) { existing = {}; }

      const match = extraData.find(d => 
        d.name === (existing.name || row.name) && d.tagline === (existing.tagline || '')
      );

      if (!match) {
        console.log(`⚠️  No match for ID ${row.id}: "${row.name}"`);
        continue;
      }

      existing.bestFor = match.bestFor;
      existing.whoItsFor = match.whoItsFor;

      const newDesc = JSON.stringify(existing);
      await db.query('UPDATE ais SET description = ? WHERE id = ?', [newDesc, row.id]);
      updated++;
      console.log(`✅ Updated ID ${row.id}: ${row.name}`);
    }

    console.log(`\nDone! Updated ${updated}/${rows.length} tools with bestFor & whoItsFor.`);
  } catch (err) {
    console.error('Migration failed:', err.message);
  }
  process.exit();
}

migrate();
