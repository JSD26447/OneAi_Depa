const db = require('./db');
require('dotenv').config();

const aiCategoriesRaw = [
    { id: 'document', name: 'หมวดเอกสาร', icon: 'FileText' },
    { id: 'meeting', name: 'หมวดการประชุมและสรุปผล', icon: 'Users' },
    { id: 'creative', name: 'หมวดสื่อสร้างสรรค์ (Creative)', icon: 'Palette' },
    { id: 'planning', name: 'หมวดวางแผนและกลยุทธ์ (Planning)', icon: 'Map' },
    { id: 'coding', name: 'หมวดเขียนโค้ด', icon: 'Code' },
];

const promptCategoriesRaw = [
    { id: 'meeting', name: 'หมวดการประชุมและสรุปผล', icon: 'Users' },
    { id: 'planning', name: 'หมวดวางแผนและกลยุทธ์ (Planning)', icon: 'Map' },
    { id: 'creative', name: 'หมวดสื่อสร้างสรรค์ (Creative)', icon: 'Palette' },
    { id: 'coding', name: 'หมวดเขียนโค้ด', icon: 'Code' },
    { id: 'document', name: 'หมวดเอกสาร', icon: 'FileText' },
];

// Prefix IDs to ensure uniqueness in categories table
const aiCategories = aiCategoriesRaw.map(c => ({ ...c, id: `ai_${c.id}` }));
const promptCategories = promptCategoriesRaw.map(c => ({ ...c, id: `p_${c.id}` }));

const aiToolsRaw = [
    { id: 'doc-gemini', name: 'Gemini (Google)', tagline: 'ผู้ช่วยด้านงานเอกสารอัจฉริยะ', description: 'ช่วยร่างเนื้อหาหนังสือส่งออก รวมไปถึงร่างสัญญา TOR และบันทึกข้อตกลง (MOU) ได้อย่างเป็นมืออาชีพ', category: 'document', provider: 'Google', imageUrl: '/images/gemini.png', officialWebsite: 'https://gemini.google.com' },
    { id: 'doc-claude', name: 'Claude', tagline: 'วิเคราะห์และร่างโครงสร้างภาษา', description: 'ผู้ช่วย AI ที่โดดเด่นด้านภาษา ช่วยเขียนหนังสือส่งออกและวิเคราะห์เอกสารยาวเพื่อร่างสัญญา', category: 'document', provider: 'Anthropic', imageUrl: '/images/claude.jpg', officialWebsite: 'https://claude.ai' },
    { id: 'doc-email-chatgpt', name: 'ChatGPT', tagline: 'ร่างเนื้อหาในอีเมล', description: 'ช่วยร่างข้อความอีเมลได้อย่างคล่องแคล่ว พร้อมปรับเปลี่ยนน้ำเสียงที่ต้องการ', category: 'document', provider: 'OpenAI', imageUrl: '/images/chatGPT.png', officialWebsite: 'https://chat.openai.com' },
    { id: 'doc-email-copilot', name: 'Microsoft Copilot', tagline: 'ร่างเนื้อหาในอีเมล', description: 'AI ผู้ช่วยอัจฉริยะที่เชื่อมต่อ with Outlook เพื่อช่วยร่างอีเมลได้โดยตรง', category: 'document', provider: 'Microsoft', imageUrl: '/images/copilot.png', officialWebsite: 'https://copilot.microsoft.com' },
    { id: 'doc-check-grammarly', name: 'Grammarly', tagline: 'ตรวจเช็คความถูกต้อง', description: 'ตรวจสอบการสะกดคำ ไวยากรณ์ และเกลาประโยคภาษาอังกฤษ', category: 'document', provider: 'Other', imageUrl: '/images/grammarly.png', officialWebsite: 'https://www.grammarly.com' },
    { id: 'doc-check-deeplwrite', name: 'DeepL Write', tagline: 'ตรวจเช็คความถูกต้อง', description: 'AI ช่วยปรับปรุงโครงสร้างประโยคและเลือกคำศัพท์ได้สวยงามเป็นธรรมชาติ', category: 'document', provider: 'Other', imageUrl: '/images/DeepL Write.png', officialWebsite: 'https://www.deepl.com/write' },
    { id: 'meet-agenda-copilot', name: 'Microsoft Copilot', tagline: 'ร่างเนื้อหาการประชุม (Agenda)', description: 'ดึงข้อมูลจากเอกสารหรืออีเมลมาสร้างวาระการประชุม (Agenda) อัตโนมัติ', category: 'meeting', provider: 'Microsoft', imageUrl: '/images/copilot.png', officialWebsite: 'https://copilot.microsoft.com' },
    { id: 'meet-agenda-notion', name: 'Notion AI', tagline: 'ร่างเนื้อหาการประชุม (Agenda)', description: 'สร้างร่างวาระการประชุมเรียงลำดับล่วงหน้าในแฟ้ม Notion', category: 'meeting', provider: 'Notion', imageUrl: '/images/NotionAI.jpg', officialWebsite: 'https://www.notion.so/product/ai' },
    { id: 'meet-record-fireflies', name: 'Fireflies.ai', tagline: 'บันทึกการประชุม (Recording/Minutes)', description: 'ผู้ช่วยอัดเสียงและถอดความการประชุมอัตโนมัติ พร้อมสกัดเนื้อหาสรุป', category: 'meeting', provider: 'Other', imageUrl: '/images/Fireflies.png', officialWebsite: 'https://fireflies.ai' },
    { id: 'meet-record-otter', name: 'Otter.ai', tagline: 'บันทึกการประชุม (Recording/Minutes)', description: 'แอปถอดเสียงที่มีความแม่นยำสูงและสรุปประเด็นประชุมแบบเรียลไทม์', category: 'meeting', provider: 'Other', imageUrl: '/images/Otterai.jpg', officialWebsite: 'https://otter.ai' },
    { id: 'meet-summary-gemini', name: 'Gemini', tagline: 'สรุปประเด็น/รายงาน', description: 'AI ที่เก่งกาจด้านการวิเคราะห์เนื้อหาและย่อขนาดไฟล์รายงานอันซับซ้อน', category: 'meeting', provider: 'Google', imageUrl: '/images/gemini.png', officialWebsite: 'https://gemini.google.com' },
    { id: 'meet-chatgpt', name: 'ChatGPT', tagline: 'ผู้ช่วยสรุปโน้ตและเขียนข่าว', description: 'ตอบโจทย์เรื่องประชุม สรุปเนื้อหาจากการถอดเสียงและร่างบทความข่าวประชาสัมพันธ์อย่างมืออาชีพ', category: 'meeting', provider: 'OpenAI', imageUrl: '/images/chatGPT.png', officialWebsite: 'https://chat.openai.com' },
    { id: 'meet-news-claude', name: 'Claude', tagline: 'เขียนข่าว', description: 'สร้างอรรถรสในข่าวสารที่เน้นการบรรยายที่เป็นธรรมชาติ (Human-like)', category: 'meeting', provider: 'Anthropic', imageUrl: '/images/claude.jpg', officialWebsite: 'https://claude.ai' },
    { id: 'meet-news-copyai', name: 'Copy.ai', tagline: 'เขียนข่าว', description: 'เครื่องมือ AI ช่วยนักการตลาดและ PR เขียนโพสต์ข่าวสารได้อย่างรวดเร็วด้วย Template', category: 'meeting', provider: 'Other', imageUrl: '/images/copyai.png', officialWebsite: 'https://www.copy.ai' },
    { id: 'creative-img-midjourney', name: 'Midjourney', tagline: 'สร้างรูปภาพ', description: 'เครื่องมือสร้างภาพระดับมืออาชีพตามคำสั่ง Prompt', category: 'creative', provider: 'Other', imageUrl: '/images/mid-journey.png', officialWebsite: 'https://www.midjourney.com/' },
    { id: 'creative-img-nanobanana', name: 'Nano Banana (Gemini)', tagline: 'สร้างรูปภาพ', description: 'เครื่องมือสร้างภาพผ่าน Gemini ด้วยคำสั่ง Prompt', category: 'creative', provider: 'Google', imageUrl: '/images/Nano Banana (Gemini).png', officialWebsite: 'https://gemini.google.com/' },
    { id: 'creative-video-veo', name: 'Veo (Google)', tagline: 'สร้างคลิปวีดิโอ', description: 'AI ที่สร้างภาพยนตร์วิดีโอที่สมจริงจากคำอธิบาย (Text) ของ Google', category: 'creative', provider: 'Google', imageUrl: '/images/Veo (Google).png', officialWebsite: 'https://deepmind.google/technologies/veo/' },
    { id: 'creative-video-sora', name: 'Sora (OpenAI)', tagline: 'สร้างคลิปวีดิโอ', description: 'AI สร้างวิดีโอสมจริงที่มีความเป็นสามมิติสูง (OpenAI)', category: 'creative', provider: 'OpenAI', imageUrl: '/images/sora openai.png', officialWebsite: 'https://openai.com/sora' },
    { id: 'creative-video-runway', name: 'Runway', tagline: 'สร้างคลิปวีดิโอ', description: 'เครื่องมือสตูดิโอสร้างและตัดต่อวิดีโอโดยใช้โมเดล AI', category: 'creative', provider: 'Other', imageUrl: '/images/runway.png', officialWebsite: 'https://runwayml.com/' },
    { id: 'creative-pres-gamma', name: 'Gamma', tagline: 'สร้าง Presentation', description: 'AI ที่ช่วยสร้างและจัดเค้าโครงหน้าสไลด์งานนำเสนอแบบทันใจ', category: 'creative', provider: 'Other', imageUrl: '/images/Gamma.png', officialWebsite: 'https://gamma.app/' },
    { id: 'creative-pres-canvamagic', name: 'Canva Magic Design', tagline: 'สร้าง Presentation', description: 'สร้างงานนำเสนอและออกแบบหน้ากราฟิกด้วยเครื่องมือ AI ของ Canva', category: 'creative', provider: 'Canva', imageUrl: '/images/canva magic design.png', officialWebsite: 'https://www.canva.com/' },
    { id: 'creative-music-suno', name: 'Suno', tagline: 'สร้างเพลงประกอบ', description: 'แต่งเนื้อร้อง จังหวะ และเสียงร้องขับขานอย่างโดดเด่น', category: 'creative', provider: 'Other', imageUrl: '/images/Suno.png', officialWebsite: 'https://suno.com/' },
    { id: 'creative-music-udio', name: 'Udio', tagline: 'สร้างเพลงประกอบ', description: 'สร้างเสียงดนตรีประกอบที่สมจริง คุณภาพสูงและละเอียด', category: 'creative', provider: 'Other', imageUrl: '/images/Udio.png', officialWebsite: 'https://www.udio.com/' },
    { id: 'plan-act-gemini', name: 'Gemini', tagline: 'ร่างแผนการดำเนินการ', description: 'ใช้ Gemini วางโครงสร้างแผนงานล่วงหน้าและขยายไอเดียโปรเจกต์', category: 'planning', provider: 'Google', imageUrl: '/images/gemini.png', officialWebsite: 'https://gemini.google.com' },
    { id: 'plan-act-chatgpt', name: 'ChatGPT', tagline: 'ร่างแผนการดำเนินการ', description: 'สร้าง Action Plan อย่างละเอียด พร้อมกระบวนการทำที่รัดกุมด้วย ChatGPT', category: 'planning', provider: 'OpenAI', imageUrl: '/images/chatGPT.png', officialWebsite: 'https://chat.openai.com' },
    { id: 'plan-timeline-notion', name: 'Notion AI', tagline: 'จัดทำ Timeline เบื้องต้น', description: 'จัดทำตารางเวลาและสร้างโครงกำหนดการลงบน Workspace ตัวเอง', category: 'planning', provider: 'Notion', imageUrl: '/images/NotionAI.jpg', officialWebsite: 'https://www.notion.so/product/ai' },
    { id: 'plan-timeline-asana', name: 'Asana Intelligence', tagline: 'จัดทำ Timeline เบื้องต้น', description: 'ซอฟต์แวร์สายจัดการโครงการ ที่มี AI ประเมินสร้างตารางงานอัตโนมัติ', category: 'planning', provider: 'Asana', imageUrl: '/images/Logo-Asana.png', officialWebsite: 'https://asana.com' },
    { id: 'doc-notebooklm', name: 'NotebookLM (Google)', tagline: 'ผู้ช่วยวิจัยและสรุปเอกสารอัจฉริยะ', description: 'ใช้ AI วิเคราะห์เอกสารที่คุณอัปโหลดเพื่อสร้างข้อสรุป ตอบคำถาม และสร้างไอเดียใหม่ๆ โดยอ้างอิงจากแหล่งข้อมูลที่คุณกำหนดไว้เท่านั้น', category: 'document', provider: 'Google', imageUrl: '', officialWebsite: 'https://notebooklm.google.com/' },
    { id: 'creative-imagen3', name: 'Imagen 3 (Google)', tagline: 'โมเดลสร้างภาพคุณภาพสูงจาก Google', description: 'เทคโนโลยีสร้างภาพจากข้อความระดับเรือธงที่ให้ความสมจริงสูง และเข้าใจรายละเอียดของพรอมต์ที่ซับซ้อนได้อย่างดีเยี่ยม', category: 'creative', provider: 'Google', imageUrl: '', officialWebsite: 'https://deepmind.google/technologies/imagen-3/' },
    { id: 'coding-idx', name: 'Project IDX (Google)', tagline: 'เครื่องมือเขียนโค้ดบน Cloud พร้อมพลัง AI', description: 'สภาพแวดล้อมการพัฒนาแอปพลิเคชัน (IDE) บนเว็บที่ผสานพลังของ Gemini เพื่อช่วยให้การเขียนโค้ดสะดวกและรวดเร็วขึ้น', category: 'coding', provider: 'Google', imageUrl: '', officialWebsite: 'https://idx.dev/' },
    { id: 'doc-deepseek', name: 'DeepSeek', tagline: 'โมเดลภาษาขั้นสูงเพื่อการวางแผนและจัดการเอกสาร', description: 'AI ที่มีความสามารถสูงในการคิดวิเคราะห์เชิงตรรกะ ช่วยร่างเอกสารและวางแผนโปรเจกต์ได้อย่างแม่นยำและรวดเร็ว', category: 'document', provider: 'DeepSeek', imageUrl: '', officialWebsite: 'https://www.deepseek.com/' },
    { id: 'doc-perplexity', name: 'Perplexity AI', tagline: 'AI ค้นคว้าข้อมูลพร้อมแหล่งอ้างอิงที่เชื่อถือได้', description: 'ผู้ช่วยค้นคว้าวิจัยที่ทำงานเหมือน Search Engine ผสมแชทบอท โดยจะให้คำตอบพร้อมระบุแหล่งที่มาของข้อมูลอย่างชัดเจน', category: 'document', provider: 'Other', imageUrl: '', officialWebsite: 'https://www.perplexity.ai/' },
    { id: 'coding-aistudio', name: 'Google AI Studio', tagline: 'เครื่องมือพัฒนาและทดสอบโมเดล AI สำหรับสายโค้ด', description: 'แพลตฟอร์มสำหรับนักพัฒนาในการสร้างและทดสอบ Prompt (Prompt Engineering) รวมถึงการทดลองใช้งานโมเดล Gemini ล่าสุด', category: 'coding', provider: 'Google', imageUrl: '', officialWebsite: 'https://aistudio.google.com/' },
    { id: 'plan-opal', name: 'Opal', tagline: 'ผู้ช่วยวางแผนและจัดการชีวิตดิจิทัลอย่างปลอดภัย', description: 'AI ที่เน้นการวางแผนและเพิ่มสมาธิในการทำงาน โดยช่วยจำกัดการเข้าถึงแอปที่ไม่จำเป็นและเน้นความปลอดภัยของข้อมูล', category: 'planning', provider: 'Other', imageUrl: '', officialWebsite: 'https://www.opal.so/' },
    { id: 'coding-github-copilot', name: 'GitHub Copilot', tagline: 'คู่หู AI สำหรับการเขียนโค้ดที่นักพัฒนาทั่วโลกไว้วางใจ', description: 'AI Programmer ที่ช่วยแนะนำโค้ดแบบเรียลไทม์ภายในหน้า IDE ของคุณ ช่วยให้เขียนฟังก์ชัน เขียนเทสต์ และแก้บัคได้เร็วขึ้นหลายเท่า', category: 'coding', provider: 'Microsoft', imageUrl: '', officialWebsite: 'https://github.com/features/copilot' },
    { id: 'creative-ms-designer', name: 'Microsoft Designer', tagline: 'ออกแบบกราฟิกสุดโปรด้วยพลัง AI', description: 'เครื่องมือออกแบบที่รวมพลังของ DALL-E 3 เพื่อสร้างรูปภาพและงานดีไซน์ตามคำสั่งของคุณ ช่วยเพิ่มความสวยงามให้คอนเทนต์โซเชียลมีเดีย', category: 'creative', provider: 'Microsoft', imageUrl: '', officialWebsite: 'https://designer.microsoft.com/' },
    { id: 'coding-azure-studio', name: 'Azure AI Studio', tagline: 'แพลตฟอร์มพัฒนา AI ระดับองค์กรจาก Microsoft', description: 'ศูนย์รวมการสร้าง พัฒนา และทดสอบโซลูชัน Generative AI ที่มีความปลอดภัยและมาตรฐานระดับสูง เหมาะสำหรับการสร้างแอปพลิเคชัน AI ขนาดใหญ่', category: 'coding', provider: 'Microsoft', imageUrl: '', officialWebsite: 'https://ai.azure.com/' },
];

const promptsRaw = [
    { id: 'p1', title: 'สร้างภาพแนว Cinematic', prompt: 'Cinematic shot of a futuristic Bangkok city, neon lights, rain, hyper-realistic, 8k resolution --ar 16:9', category: 'creative', tags: ['Gpt', 'Midjourney'] },
    { id: 'p2', title: 'สรุปบทความยาวๆ', prompt: 'ช่วยสรุปเนื้อหาสำคัญจากบทความนี้เป็นข้อๆ ให้เข้าใจง่ายที่สุด โดยเน้นเฉพาะประเด็นที่คนทั่วไปนำไปใช้ได้จริง [ใส่ลิงก์หรือข้อความ]', category: 'document', tags: ['ChatGPT', 'Gemini'] },
    { id: 'p3', title: 'เขียน Caption ขายของทางแอปส้ม', prompt: 'เขียนแคปชั่นขายรองพื้นตัวใหม่ เน้นจุดเด่นที่คุมมัน 24 ชม. และบำรุงผิวไปในตัว น้ำเสียงดูเป็นกันเองแต่ก็น่าเชื่อถือ พร้อมใส่อีโมจิที่น่ารักสะดุดตา', category: 'creative', tags: ['ChatGPT', 'Claude'] },
    { id: 'p4', title: 'ให้ AI ช่วยแก้โค้ด React', prompt: 'ช่วยตรวจสอบโค้ด React ส่วนนี้หน่อยว่าทำไม useEffect ถึงทำงานวนลูปไม่จบ และช่วยแนะนำวิธีแก้ไขที่ถูกต้องตามหลักการที่ดีที่สุด [ใส่โค้ดของคุณ]', category: 'coding', tags: ['ChatGPT', 'Gemini'] },
    { id: 'p5', title: 'สร้างไอเดียพอดแคสต์เทคโนโลยี', prompt: 'ลองเสนอหัวข้อพอดแคสต์เกี่ยวกับ AI ที่กำลังเป็นกระแสในสัปดาห์นี้มา 5 หัวข้อ พร้อมโครงเรื่องคร่าวๆ ในแต่ละหัวข้อให้น่าสนใจสำหรับผู้ฟังวัยทำงาน', category: 'creative', tags: ['Gemini', 'Perplexity'] },
    { id: 'p6', title: 'ช่วยสรุปรายงานการประชุม', prompt: 'สรุปประเด็นสำคัญจากการจดบันทึกการประชุมนี้ โดยแยกเป็น หัวข้อที่คุย, สิ่งที่ตัดสินใจ, และสิ่งที่ต้องทำต่อ (Action Items) พร้อมระบุผู้รับผิดชอบถ้ามี', category: 'meeting', tags: ['ChatGPT', 'Claude'] },
    { id: 'p7', title: 'ช่วยคิดไอเดียทำ Content TikTok', prompt: 'ช่วยคิดไอเดียทำคลิป TikTok สำหรับโปรโมทแอปพลิเคชันใหม่ที่ช่วยจัดการเวลาทำงาน เน้นความสนุกสนานและเข้าถึงง่ายสำหรับวัยรุ่นสร้างตัว', category: 'creative', tags: ['Gpt', 'Gemini'] },
    { id: 'p8', title: 'ช่วยตรวจสอบ Logic โปรแกรม', prompt: 'ช่วยตรวจสอบ Code Python ส่วนนี้หน่อยว่ามีโอกาสเกิด Error ตรงไหนบ้าง และช่วยแนะนำวิธีเขียนให้กระชับขึ้นโดยใช้ List Comprehension [ใส่โค้ดของคุณ]', category: 'coding', tags: ['Claude', 'DeepSeek'] },
    { id: 'p9', title: 'สร้างตัวอย่างข้อมูล (Mock Data) สำหรับเทสระบบ', prompt: 'สร้างไฟล์ JSON จำลองข้อมูลผู้ใช้ 10 คน ประกอบด้วย id, name, email, และ address โดยให้ชื่อและที่อยู่เป็นชื่อภาษาไทยที่ดูสมจริง', category: 'coding', tags: ['ChatGPT', 'Claude'] },
    { id: 'p10', title: 'ช่วยเขียนอีเมลขอลางานเป็นภาษาอังกฤษ', prompt: 'เขียนอีเมลลางานภาษาอังกฤษแบบทางการ เนื่องจากมีธุระด่วนทางครอบครัว ลาตั้งแต่วันที่ [วันที่] ถึง [วันที่] และจะกลับมาทำงานในวันที่ [วันที่]', category: 'document', tags: ['ChatGPT', 'Gemini'] },
    { id: 'p11', title: 'วางแผนการใช้ AI ในองค์กร', prompt: 'ช่วยจัดทำแผนกลยุทธ์การนำ AI มาใช้ในองค์กรภายใน 30 วัน เพื่อเพิ่มประสิทธิภาพในการทำงานของพนักงานแต่ละแผนก', category: 'planning', tags: ['Gemini', 'Claude'] },
    { id: 'p12', title: 'เขียนสคริปต์วิดีโอ YouTube รีวิว Gadget', prompt: 'เขียนโครงร่างสคริปต์รีวิวหูฟังบลูทูธราคาประหยัด เน้นการเปิดคลิปให้น่าสนใจ (Hook), การเปรียบเทียบสเปก, และสรุปว่าเหมาะกับใครในตอนจบ', category: 'creative', tags: ['ChatGPT', 'DeepSeek'] },
    { id: 'p13', title: 'ช่วยคิดหัวข้อบทความให้น่าดึงดูด', prompt: 'ลองเสนอหัวข้อบทความเกี่ยวกับ "การทำงานในอนาคต" มา 10 หัวข้อ ที่ทำให้คนอยากคลิกเข้ามาอ่านจากหน้าฟีด Facebook', category: 'creative', tags: ['Gpt', 'Claude'] },
    { id: 'p14', title: 'สร้างภาพวาดสไตล์ Cyberpunk', prompt: 'Cyberpunk street market in a rainy night, glowing neon signs, diverse characters, hyper-realistic, high detail --v 6.0', category: 'creative', tags: ['Gpt', 'Midjourney'] },
    { id: 'p15', title: 'ช่วยแก้ปัญหา SQL Query', prompt: 'เขียน SQL สำหรับดึงข้อมูลยอดขายรวมแยกตามหมวดหมู่สินค้าในเดือนที่ผ่านมา โดยเรียงจากยอดขายมากไปหาน้อย', category: 'coding', tags: ['ChatGPT', 'DeepSeek'] },
    { id: 'p16', title: 'ร่างรายงานวิชาการภาษาอังกฤษ', prompt: 'ช่วยสรุปและร่างโครงสร้างรายงานวิชาการในหัวข้อ "Impact of AI on Modern Business" โดยใช้คำศัพท์เป็นทางการและมีแหล่งอ้างอิงที่เหมาะสม', category: 'document', tags: ['ChatGPT', 'Claude'] },
    { id: 'p17', title: 'สร้างไอเดียชื่อแบรนด์ใหม่', prompt: 'ช่วยคิดชื่อแบรนด์ร้านกาแฟสไตล์มินิมอล 10 ชื่อ ที่สื่อถึงความเรียบง่าย เป็นธรรมชาติ และจำง่าย', category: 'creative', tags: ['Gpt', 'Gemini'] },
    { id: 'p18', title: 'ช่วยแปลเอกสารทางราชการ', prompt: 'แปลข้อความในย่อหน้านี้จากภาษาไทยเป็นภาษาอังกฤษ โดยใช้คำศัพท์ที่เป็นทางการและถูกต้องตามสำนวนกฎหมาย [ใส่ข้อความ]', category: 'document', tags: ['ChatGPT', 'Gemini'] },
    { id: 'p19', title: 'ช่วยวางโครงสร้างพื้นฐานแอป Flutter', prompt: 'ขอหน้าตาโค้ดเริ่มต้นสำหรับแอป Flutter ที่มีระบบล็อกอินเข้าสู่ระบบ ลิงก์กับ Firebase และมีหน้า Home เป็นแบบ Bottom Navigation Bar', category: 'coding', tags: ['Claude', 'Gpt'] },
    { id: 'p20', title: 'สอนทำ Excel สูตรยากๆ', prompt: 'ช่วยอธิบายวิธีใช้ฟังก์ชัน XLOOKUP แบบละเอียด พร้อมตัวอย่างกรณีที่ต้องค้นหาข้อมูลจากหลายตารางเชื่อมกัน', category: 'document', tags: ['ChatGPT', 'Gemini'] },
    { id: 'p21', title: 'คิดคอนเทนต์โพสต์ไอจีวันหยุด', prompt: 'เขียนแคปชั่นไอจีสำหรับโพสต์รูปคาเฟ่ในวันหยุด น้ำเสียงขี้เล่น สั้นๆ พร้อมแฮชแท็กที่กำลังเป็นเทรนด์', category: 'creative', tags: ['ChatGPT', 'Claude'] },
    { id: 'p22', title: 'สรุปพอดแคสต์จากไฟล์เสียง', prompt: 'ช่วยสรุปใจความสำคัญจากสรุปเนื้อหาพอดแคสต์ที่แนบมานี้ ว่ามีประเด็นอะไรที่น่าสนใจบ้าง และแนะนำสิ่งที่ผู้ฟังควรนำไปปรับใช้ [ใส่สรุป]', category: 'meeting', tags: ['ChatGPT', 'Claude'] },
    { id: 'p23', title: 'เขียนคิวรี่ Mongo DB สำหรับ Aggregate', prompt: 'เขียน MongoDB Aggregation pipeline เพื่อหาค่าเฉลี่ยของราคาสินค้าในแต่ละ Store และกรองเฉพาะ Store ที่มียอดขายมากกว่า 100 รายการ', category: 'coding', tags: ['Gpt', 'DeepSeek'] },
    { id: 'p24', title: 'ช่วยเตรียมตัวสัมภาษณ์งาน', prompt: 'ลองสมมติว่าคุณเป็นผู้สัมภาษณ์งานตำแหน่งที่ฉันสมัคร และช่วยถามคำถามทดสอบไหวพริบฉัน 5 ข้อ พร้อมแนะนำแนวทางคำตอบที่ดูเป็นมืออาชีพ', category: 'planning', tags: ['ChatGPT', 'Gemini'] },
    { id: 'p25', title: 'คิดสโลแกนสินค้าบำรุงผิว', prompt: 'คิดสโลแกนสั้นๆ 3-5 คำ สำหรับเซรั่มหน้าใส ที่เน้นจุดเด่นเรื่องความรวดเร็วในการเห็นผลและปลอดภัยจากธรรมชาติ', category: 'creative', tags: ['Gpt', 'Claude'] },
    { id: 'p26', title: 'ปรับปรุงบทความให้ดีขึ้น (Edit)', prompt: 'ช่วยปรับปรุงบทความส่วนนี้ให้น่าสนใจขึ้น โดยเปลี่ยนโทนเสียงให้ดูเป็นมืออาชีพมากขึ้น และใช้คำเชื่อมในประโยคให้ดูสละสลวย [ใส่บทความ]', category: 'document', tags: ['Claude', 'Gemini'] },
    { id: 'p27', title: 'แปลงโค้ดจาก Python เป็น JavaScript', prompt: 'ช่วยแปลงโค้ดฟังก์ชันคำนวณภาษีตัวนี้จากภาษา Python ไปเป็นภาษา JavaScript โดยรักษาความสามารถในการจัดการ error ไว้เหมือนเดิม [ใส่โค้ด]', category: 'coding', tags: ['Claude', 'Gpt'] },
    { id: 'p28', title: 'ช่วยอธิบายเนื้อหาทางเทคนิคให้เข้าใจง่าย', prompt: 'ช่วยสรุปและอธิบายข้อตกลงระดับบริการ (SLA) ที่แนบมานี้ให้เข้าใจง่าย สำหรับพนักงานที่ไม่ใช่สายเทคนิค [ใส่ข้อความ]', category: 'document', tags: ['Gemini', 'Gpt'] },
    { id: 'p29', title: 'สร้างตารางเวลาทำคอนเทนต์ 1 สัปดาห์', prompt: 'ช่วยวางแผนตารางโพสต์ Social Media (FB, IG, TikTok) ตลอดทั้งสัปดาห์สำหรับธุรกิจ โดยเน้นเป้าหมายหลักในการเพิ่มยอดขายและการมีส่วนร่วม', category: 'planning', tags: ['ChatGPT', 'Claude'] },
    { id: 'p30', title: 'เขียนสรุปข่าวสั้นๆ สำหรับ Social Media', prompt: 'จงสรุปข่าวเศรษฐกิจนี้ให้เหลือความยาวที่เหมาะสมสำหรับลงโพสต์ และดึงประเด็นสำคัญที่สุดมา 1 ประเด็น [ใส่ข่าว]', category: 'creative', tags: ['Gpt', 'DeepSeek'] },
    { id: 'p31', title: 'ช่วยแก้ไข Bug ใน CSS Layout', prompt: 'ทำไมกล่อง Div สองกล่องนี้ถึงไม่ยอมเรียงต่อกันในแนวนอนทั้งๆ ที่เขียน display: flex; แล้ว? ช่วยดูโค้ดและแนะนำวิธีแก้ด้วย [ใส่โค้ด]', category: 'coding', tags: ['ChatGPT', 'Gemini'] },
    { id: 'p32', title: 'จัดทำ Timeline แผนงาน 7 วัน', prompt: 'ช่วยออกแบบ Timeline การทำงานสำหรับโปรเจกต์ใหม่ภายใน 1 สัปดาห์ เพื่อให้มั่นใจว่างานจะเสร็จทันเวลาและครอบคลุมทุกขั้นตอน', category: 'planning', tags: ['Gemini', 'Claude'] },
    { id: 'p33', title: 'เขียนข้อความโปรโมทกิจกรรมบริษัท', prompt: 'เขียนอีเมลเชิญชวนพนักงานในบริษัทมาร่วมงานกิจกรรมองค์กร โทนสนิทสนมแต่สุภาพ และเน้นย้ำถึงความสำคัญของการรวมตัวกัน', category: 'planning', tags: ['Gpt', 'Claude'] },
    { id: 'p34', title: 'สรุปหัวใจสำคัญจากแหล่งข้อมูล', prompt: 'จงสรุปบทเรียนสำคัญ 5 ข้อจากข้อมูลที่แนบมา และอธิบายแนวทางการนำไปประยุกต์ใช้ในการทำงานจริง', category: 'meeting', tags: ['Claude', 'Gemini'] },
    { id: 'p35', title: 'อธิบายเทคโนโลยีที่ซับซ้อนแบบสั้นๆ', prompt: 'ช่วยอธิบายว่า Generative AI คืออะไรใน 1 ย่อหน้า โดยไม่ใช้ศัพท์เทคนิคที่ยากเกินไป และสรุปเหตุผลที่มันสำคัญต่อธุรกิจ', category: 'document', tags: ['Gemini', 'Gpt'] },
    { id: 'p36', title: 'ตั้งชื่อหัวข้อคอนเทนต์ออนไลน์', prompt: 'ช่วยคิดชื่อหัวข้อคอนเทนต์ 10 ชื่อ สำหรับกลุ่มเป้าหมายวัยทำงาน ที่จะช่วยกระตุ้นความสนใจในแพลตฟอร์มต่างๆ', category: 'creative', tags: ['ChatGPT', 'Claude'] },
    { id: 'p37', title: 'เขียนจดหมายทางการสื่อสารลูกค้า', prompt: 'เขียนจดหมายขออภัยลูกค้าเนื่องจากความล่าช้าในการให้บริการ แสดงความเสียใจและเสนอแนวทางแก้ไขเพื่อรักษาความสัมพันธ์', category: 'document', tags: ['Claude', 'Gemini'] },
    { id: 'p38', title: 'แต่งโครงสร้าง Class ในภาษา Java', prompt: 'ช่วยเขียนคลาส Java สำหรับระบบสมาชิก (User Profile) ที่มีฟิลด์ เก็บข้อมูลส่วนตัว และเมธอดสำหรับคำนวณคะแนนสะสม', category: 'coding', tags: ['Gpt', 'DeepSeek'] },
    { id: 'p39', title: 'กลยุทธ์การป้อนคำสั่ง AI (Prompt Engineering)', prompt: 'บอกเทคนิค 3 ข้อในการป้อนคำสั่งให้ AI เพื่อให้ได้ผลลัพธ์ที่แม่นยำและตรงกับความต้องการในเชิงธุรกิจมากที่สุด', category: 'planning', tags: ['ChatGPT', 'Gemini'] },
    { id: 'p40', title: 'ช่วยคิดคอนเทนต์โพสต์ขายสินค้า', prompt: 'เขียนโพสต์ขายสินค้าผ่านโซเชียลมีเดีย เน้นจุดเด่นที่น่าสนใจ ปลอดภัย และราคาที่คุ้มค่า พร้อมแคปชั่นสะดุดตา', category: 'creative', tags: ['Gpt', 'Claude'] },
];


async function seed() {
    try {
        // Clear all tables
        await db.query('DELETE FROM prompts');
        await db.query('DELETE FROM ais');
        await db.query('DELETE FROM categories');
        console.log('Cleared tables');

        // Seed Categories
        for (const cat of aiCategories) {
            await db.query('INSERT INTO categories (type, category_id, name, icon) VALUES (?, ?, ?, ?)',
                ['ai', cat.id, cat.name, cat.icon]);
        }
        for (const cat of promptCategories) {
            await db.query('INSERT INTO categories (type, category_id, name, icon) VALUES (?, ?, ?, ?)',
                ['prompt', cat.id, cat.name, cat.icon]);
        }
        console.log('Seeded categories');

        // Seed AI Tools
        for (const tool of aiToolsRaw) {
            const prefixedCategory = `ai_${tool.category}`;
            const toolToStore = {
                ...tool,
                category: prefixedCategory,
                categoryIds: [prefixedCategory]
            };
            const description = JSON.stringify(toolToStore);
            const category_ids = JSON.stringify([prefixedCategory]);
            await db.query(
                'INSERT INTO ais (name, description, link, category_id, category_ids, provider, logo_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [tool.name, description, tool.officialWebsite, prefixedCategory, category_ids, tool.provider, tool.imageUrl]
            );
        }
        console.log('Seeded AI tools');

        // Seed Prompts
        for (const p of promptsRaw) {
            const prefixedCategory = `p_${p.category}`;
            const promptToStore = {
                ...p,
                category: prefixedCategory,
                categoryIds: [prefixedCategory]
            };
            const content = JSON.stringify(promptToStore);
            const category_ids = JSON.stringify([prefixedCategory]);
            await db.query(
                'INSERT INTO prompts (title, content, category_id, category_ids) VALUES (?, ?, ?, ?)',
                [p.title, content, prefixedCategory, category_ids]
            );
        }
        console.log('Seeded Prompts');

        console.log('Seed completed successfully!');
    } catch (err) {
        console.error('Seed failed:', err.message);
    }
    process.exit();
}

seed();
