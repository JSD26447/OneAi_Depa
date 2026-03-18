require('dotenv').config();
const db = require('./db.js');

const categories = [
    { type: 'prompt', category_id: 'meeting', name: 'หมวดการประชุมและสรุปผล', icon: 'Users' },
    { type: 'prompt', category_id: 'planning', name: 'หมวดวางแผนและกลยุทธ์ (Planning)', icon: 'Map' },
    { type: 'prompt', category_id: 'creative', name: 'หมวดสื่อสร้างสรรค์ (Creative)', icon: 'Palette' },
    { type: 'prompt', category_id: 'coding', name: 'หมวดเขียนโค้ด', icon: 'Code' },
    { type: 'prompt', category_id: 'document', name: 'หมวดเอกสาร', icon: 'FileText' },
];

const prompts = [
    {
        title: 'สร้างภาพแนว Cinematic',
        prompt: 'Cinematic shot of a futuristic Bangkok city, neon lights, rain, hyper-realistic, 8k resolution --ar 16:9',
        category: 'creative',
        tags: ['Gpt', 'Midjourney']
    },
    {
        title: 'สรุปบทความยาวๆ',
        prompt: 'ช่วยสรุปเนื้อหาสำคัญจากบทความนี้เป็นข้อๆ ให้เข้าใจง่ายที่สุด โดยเน้นเฉพาะประเด็นที่คนทั่วไปนำไปใช้ได้จริง [ใส่ลิงก์หรือข้อความ]',
        category: 'document',
        tags: ['ChatGPT', 'Gemini'],
    },
    {
        title: 'เขียน Caption ขายของทางแอปส้ม',
        prompt: 'เขียนแคปชั่นขายรองพื้นตัวใหม่ เน้นจุดเด่นที่คุมมัน 24 ชม. และบำรุงผิวไปในตัว น้ำเสียงดูเป็นกันเองแต่ก็น่าเชื่อถือ พร้อมใส่อีโมจิที่น่ารักสะดุดตา',
        category: 'creative',
        tags: ['ChatGPT', 'Claude'],
    },
    {
        title: 'ให้ AI ช่วยแก้โค้ด React',
        prompt: 'ช่วยตรวจสอบโค้ด React ส่วนนี้หน่อยว่าทำไม useEffect ถึงทำงานวนลูปไม่จบ และช่วยแนะนำวิธีแก้ไขที่ถูกต้องตามหลักการที่ดีที่สุด [ใส่โค้ดของคุณ]',
        category: 'coding',
        tags: ['ChatGPT', 'Gemini'],
    },
    {
        title: 'สร้างไอเดียพอดแคสต์เทคโนโลยี',
        prompt: 'ลองเสนอหัวข้อพอดแคสต์เกี่ยวกับ AI ที่กำลังเป็นกระแสในสัปดาห์นี้มา 5 หัวข้อ พร้อมโครงเรื่องคร่าวๆ ในแต่ละหัวข้อให้น่าสนใจสำหรับผู้ฟังวัยทำงาน',
        category: 'creative',
        tags: ['Gemini', 'Perplexity'],
    },
    {
        title: 'ช่วยสรุปรายงานการประชุม',
        prompt: 'สรุปประเด็นสำคัญจากการจดบันทึกการประชุมนี้ โดยแยกเป็น หัวข้อที่คุย, สิ่งที่ตัดสินใจ, และสิ่งที่ต้องทำต่อ (Action Items) พร้อมระบุผู้รับผิดชอบถ้ามี',
        category: 'meeting',
        tags: ['ChatGPT', 'Claude'],
        author: 'ทีมงาน OneAi'
    },
    {
        title: 'ช่วยคิดไอเดียทำ Content TikTok',
        prompt: 'ช่วยคิดไอเดียทำคลิป TikTok สำหรับโปรโมทแอปพลิเคชันใหม่ที่ช่วยจัดการเวลาทำงาน เน้นความสนุกสนานและเข้าถึงง่ายสำหรับวัยรุ่นสร้างตัว',
        category: 'creative',
        tags: ['Gpt', 'Gemini'],
        author: 'ทีมงาน OneAi'
    },
    {
        title: 'ช่วยตรวจสอบ Logic โปรแกรม',
        prompt: 'ช่วยตรวจสอบ Code Python ส่วนนี้หน่อยว่ามีโอกาสเกิด Error ตรงไหนบ้าง และช่วยแนะนำวิธีเขียนให้กระชับขึ้นโดยใช้ List Comprehension [ใส่โค้ดของคุณ]',
        category: 'coding',
        tags: ['Claude', 'DeepSeek'],
        author: 'ทีมงาน OneAi'
    },
    {
        title: 'สร้างตัวอย่างข้อมูล (Mock Data) สำหรับเทสระบบ',
        prompt: 'สร้างไฟล์ JSON จำลองข้อมูลผู้ใช้ 10 คน ประกอบด้วย id, name, email, และ address โดยให้ชื่อและที่อยู่เป็นชื่อภาษาไทยที่ดูสมจริง',
        category: 'coding',
        tags: ['ChatGPT', 'Claude'],
    },
    {
        title: 'ช่วยเขียนอีเมลขอลางานเป็นภาษาอังกฤษ',
        prompt: 'เขียนอีเมลลางานภาษาอังกฤษแบบทางการ เนื่องจากมีธุระด่วนทางครอบครัว ลาตั้งแต่วันที่ [วันที่] ถึง [วันที่] และจะกลับมาทำงานในวันที่ [วันที่]',
        category: 'document',
        tags: ['ChatGPT', 'Gemini'],
    },
    {
        title: 'วางแผนการใช้ AI ในองค์กร',
        prompt: 'ช่วยจัดทำแผนกลยุทธ์การนำ AI มาใช้ในองค์กรภายใน 30 วัน เพื่อเพิ่มประสิทธิภาพในการทำงานของพนักงานแต่ละแผนก',
        category: 'planning',
        tags: ['Gemini', 'Claude'],
    },
    {
        title: 'เขียนสคริปต์วิดีโอ YouTube รีวิว Gadget',
        prompt: 'เขียนโครงร่างสคริปต์รีวิวหูฟังบลูทูธราคาประหยัด เน้นการเปิดคลิปให้น่าสนใจ (Hook), การเปรียบเทียบสเปก, และสรุปว่าเหมาะกับใครในตอนจบ',
        category: 'creative',
        tags: ['ChatGPT', 'DeepSeek'],
    },
    {
        title: 'ช่วยคิดหัวข้อบทความให้น่าดึงดูด',
        prompt: 'ลองเสนอหัวข้อบทความเกี่ยวกับ "การทำงานในอนาคต" มา 10 หัวข้อ ที่ทำให้คนอยากคลิกเข้ามาอ่านจากหน้าฟีด Facebook',
        category: 'creative',
        tags: ['Gpt', 'Claude'],
    },
    {
        title: 'สร้างภาพวาดสไตล์ Cyberpunk',
        prompt: 'Cyberpunk street market in a rainy night, glowing neon signs, diverse characters, hyper-realistic, high detail --v 6.0',
        category: 'creative',
        tags: ['Gpt', 'Midjourney'],
    },
    {
        title: 'ช่วยแก้ปัญหา SQL Query',
        prompt: 'เขียน SQL สำหรับดึงข้อมูลยอดขายรวมแยกตามหมวดหมู่สินค้าในเดือนที่ผ่านมา โดยเรียงจากยอดขายมากไปหาน้อย',
        category: 'coding',
        tags: ['ChatGPT', 'DeepSeek'],
    },
    {
        title: 'ร่างรายงานวิชาการภาษาอังกฤษ',
        prompt: 'ช่วยสรุปและร่างโครงสร้างรายงานวิชาการในหัวข้อ "Impact of AI on Modern Business" โดยใช้คำศัพท์เป็นทางการและมีแหล่งอ้างอิงที่เหมาะสม',
        category: 'document',
        tags: ['ChatGPT', 'Claude'],
    },
    {
        title: 'สร้างไอเดียชื่อแบรนด์ใหม่',
        prompt: 'ช่วยคิดชื่อแบรนด์ร้านกาแฟสไตล์มินิมอล 10 ชื่อ ที่สื่อถึงความเรียบง่าย เป็นธรรมชาติ และจำง่าย',
        category: 'creative',
        tags: ['Gpt', 'Gemini'],
    },
    {
        title: 'ช่วยแปลเอกสารทางราชการ',
        prompt: 'แปลข้อความในย่อหน้านี้จากภาษาไทยเป็นภาษาอังกฤษ โดยใช้คำศัพท์ที่เป็นทางการและถูกต้องตามสำนวนกฎหมาย [ใส่ข้อความ]',
        category: 'document',
        tags: ['ChatGPT', 'Gemini'],
    },
    {
        title: 'ช่วยวางโครงสร้างพื้นฐานแอป Flutter',
        prompt: 'ขอหน้าตาโค้ดเริ่มต้นสำหรับแอป Flutter ที่มีระบบล็อกอินเข้าสู่ระบบ ลิงก์กับ Firebase และมีหน้า Home เป็นแบบ Bottom Navigation Bar',
        category: 'coding',
        tags: ['Claude', 'Gpt'],
    },
    {
        title: 'สอนทำ Excel สูตรยากๆ',
        prompt: 'ช่วยอธิบายวิธีใช้ฟังก์ชัน XLOOKUP แบบละเอียด พร้อมตัวอย่างกรณีที่ต้องค้นหาข้อมูลจากหลายตารางเชื่อมกัน',
        category: 'document',
        tags: ['ChatGPT', 'Gemini'],
    },
    {
        title: 'คิดคอนเทนต์โพสต์ไอจีวันหยุด',
        prompt: 'เขียนแคปชั่นไอจีสำหรับโพสต์รูปคาเฟ่ในวันหยุด น้ำเสียงขี้เล่น สั้นๆ พร้อมแฮชแท็กที่กำลังเป็นเทรนด์',
        category: 'creative',
        tags: ['ChatGPT', 'Claude'],
    },
    {
        title: 'สรุปพอดแคสต์จากไฟล์เสียง',
        prompt: 'ช่วยสรุปใจความสำคัญจากสรุปเนื้อหาพอดแคสต์ที่แนบมานี้ ว่ามีประเด็นอะไรที่น่าสนใจบ้าง และแนะนำสิ่งที่ผู้ฟังควรนำไปปรับใช้ [ใส่สรุป]',
        category: 'meeting',
        tags: ['ChatGPT', 'Claude'],
    },
    {
        title: 'เขียนคิวรี่ Mongo DB สำหรับ Aggregate',
        prompt: 'เขียน MongoDB Aggregation pipeline เพื่อหาค่าเฉลี่ยของราคาสินค้าในแต่ละ Store และกรองเฉพาะ Store ที่มียอดขายมากกว่า 100 รายการ',
        category: 'coding',
        tags: ['Gpt', 'DeepSeek'],
    },
    {
        title: 'ช่วยเตรียมตัวสัมภาษณ์งาน',
        prompt: 'ลองสมมติว่าคุณเป็นผู้สัมภาษณ์งานตำแหน่งที่ฉันสมัคร และช่วยถามคำถามทดสอบไหวพริบฉัน 5 ข้อ พร้อมแนะนำแนวทางคำตอบที่ดูเป็นมืออาชีพ',
        category: 'planning',
        tags: ['ChatGPT', 'Gemini'],
    },
    {
        title: 'คิดสโลแกนสินค้าบำรุงผิว',
        prompt: 'คิดสโลแกนสั้นๆ 3-5 คำ สำหรับเซรั่มหน้าใส ที่เน้นจุดเด่นเรื่องความรวดเร็วในการเห็นผลและปลอดภัยจากธรรมชาติ',
        category: 'creative',
        tags: ['Gpt', 'Claude'],
    },
    {
        title: 'ปรับปรุงบทความให้ดีขึ้น (Edit)',
        prompt: 'ช่วยปรับปรุงบทความส่วนนี้ให้น่าสนใจขึ้น โดยเปลี่ยนโทนเสียงให้ดูเป็นมืออาชีพมากขึ้น และใช้คำเชื่อมในประโยคให้ดูสละสลวย [ใส่บทความ]',
        category: 'document',
        tags: ['Claude', 'Gemini'],
    },
    {
        title: 'แปลงโค้ดจาก Python เป็น JavaScript',
        prompt: 'ช่วยแปลงโค้ดฟังก์ชันคำนวณภาษีตัวนี้จากภาษา Python ไปเป็นภาษา JavaScript โดยรักษาความสามารถในการจัดการ error ไว้เหมือนเดิม [ใส่โค้ด]',
        category: 'coding',
        tags: ['Claude', 'Gpt'],
    },
    {
        title: 'ช่วยอธิบายเนื้อหาทางเทคนิคให้เข้าใจง่าย',
        prompt: 'ช่วยสรุปและอธิบายข้อตกลงระดับบริการ (SLA) ที่แนบมานี้ให้เข้าใจง่าย สำหรับพนักงานที่ไม่ใช่สายเทคนิค [ใส่ข้อความ]',
        category: 'document',
        tags: ['Gemini', 'Gpt'],
    },
    {
        title: 'สร้างตารางเวลาทำคอนเทนต์ 1 สัปดาห์',
        prompt: 'ช่วยวางแผนตารางโพสต์ Social Media (FB, IG, TikTok) ตลอดทั้งสัปดาห์สำหรับธุรกิจ โดยเน้นเป้าหมายหลักในการเพิ่มยอดขายและการมีส่วนร่วม',
        category: 'planning',
        tags: ['ChatGPT', 'Claude'],
    },
    {
        title: 'เขียนสรุปข่าวสั้นๆ สำหรับ Social Media',
        prompt: 'จงสรุปข่าวเศรษฐกิจนี้ให้เหลือความยาวที่เหมาะสมสำหรับลงโพสต์ และดึงประเด็นสำคัญที่สุดมา 1 ประเด็น [ใส่ข่าว]',
        category: 'creative',
        tags: ['Gpt', 'DeepSeek'],
    },
    {
        title: 'ช่วยแก้ไข Bug ใน CSS Layout',
        prompt: 'ทำไมกล่อง Div สองกล่องนี้ถึงไม่ยอมเรียงต่อกันในแนวนอนทั้งๆ ที่เขียน display: flex; แล้ว? ช่วยดูโค้ดและแนะนำวิธีแก้ด้วย [ใส่โค้ด]',
        category: 'coding',
        tags: ['ChatGPT', 'Gemini'],
    },
    {
        title: 'จัดทำ Timeline แผนงาน 7 วัน',
        prompt: 'ช่วยออกแบบ Timeline การทำงานสำหรับโปรเจกต์ใหม่ภายใน 1 สัปดาห์ เพื่อให้มั่นใจว่างานจะเสร็จทันเวลาและครอบคลุมทุกขั้นตอน',
        category: 'planning',
        tags: ['Gemini', 'Claude'],
    },
    {
        title: 'เขียนข้อความโปรโมทกิจกรรมบริษัท',
        prompt: 'เขียนอีเมลเชิญชวนพนักงานในบริษัทมาร่วมงานกิจกรรมองค์กร โทนสนิทสนมแต่สุภาพ และเน้นย้ำถึงความสำคัญของการรวมตัวกัน',
        category: 'planning',
        tags: ['Gpt', 'Claude'],
    },
    {
        title: 'สรุปหัวใจสำคัญจากแหล่งข้อมูล',
        prompt: 'จงสรุปบทเรียนสำคัญ 5 ข้อจากข้อมูลที่แนบมา และอธิบายแนวทางการนำไปประยุกต์ใช้ในการทำงานจริง',
        category: 'meeting',
        tags: ['Claude', 'Gemini'],
    },
    {
        title: 'อธิบายเทคโนโลยีที่ซับซ้อนแบบสั้นๆ',
        prompt: 'ช่วยอธิบายว่า Generative AI คืออะไรใน 1 ย่อหน้า โดยไม่ใช้ศัพท์เทคนิคที่ยากเกินไป และสรุปเหตุผลที่มันสำคัญต่อธุรกิจ',
        category: 'document',
        tags: ['Gemini', 'Gpt'],
    },
    {
        title: 'ตั้งชื่อหัวข้อคอนเทนต์ออนไลน์',
        prompt: 'ช่วยคิดชื่อหัวข้อคอนเทนต์ 10 ชื่อ สำหรับกลุ่มเป้าหมายวัยทำงาน ที่จะช่วยกระตุ้นความสนใจในแพลตฟอร์มต่างๆ',
        category: 'creative',
        tags: ['ChatGPT', 'Claude'],
    },
    {
        title: 'เขียนจดหมายทางการสื่อสารลูกค้า',
        prompt: 'เขียนจดหมายขออภัยลูกค้าเนื่องจากความล่าช้าในการให้บริการ แสดงความเสียใจและเสนอแนวทางแก้ไขเพื่อรักษาความสัมพันธ์',
        category: 'document',
        tags: ['Claude', 'Gemini'],
    },
    {
        title: 'แต่งโครงสร้าง Class ในภาษา Java',
        prompt: 'ช่วยเขียนคลาส Java สำหรับระบบสมาชิก (User Profile) ที่มีฟิลด์ เก็บข้อมูลส่วนตัว และเมธอดสำหรับคำนวณคะแนนสะสม',
        category: 'coding',
        tags: ['Gpt', 'DeepSeek'],
    },
    {
        title: 'กลยุทธ์การป้อนคำสั่ง AI (Prompt Engineering)',
        prompt: 'บอกเทคนิค 3 ข้อในการป้อนคำสั่งให้ AI เพื่อให้ได้ผลลัพธ์ที่แม่นยำและตรงกับความต้องการในเชิงธุรกิจมากที่สุด',
        category: 'planning',
        tags: ['ChatGPT', 'Gemini'],
    },
    {
        title: 'ช่วยคิดคอนเทนต์โพสต์ขายสินค้า',
        prompt: 'เขียนโพสต์ขายสินค้าผ่านโซเชียลมีเดีย เน้นจุดเด่นที่น่าสนใจ ปลอดภัย และราคาที่คุ้มค่า พร้อมแคปชั่นสะดุดตา',
        category: 'creative',
        tags: ['Gpt', 'Claude'],
    },
];

async function seed() {
    try {
        // Seed categories
        for (const cat of categories) {
            await db.query('INSERT INTO categories (type, category_id, name, icon) VALUES (?, ?, ?, ?)',
                [cat.type, cat.category_id, cat.name, cat.icon]);
        }
        console.log('Seeded categories');

        // Seed prompts
        for (const p of prompts) {
            const content = JSON.stringify(p);
            await db.query('INSERT INTO prompts (title, content, category_id) VALUES (?, ?, ?)',
                [p.title, content, p.category]);
        }
        console.log('Seeded prompts');

    } catch (err) {
        console.error(err);
    }
    process.exit();
}

seed();
