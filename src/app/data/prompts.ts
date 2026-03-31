
export interface AIPrompt {
    id: string;
    title: string;
    prompt: string;
    category: string;
    categoryIds?: string[];
    tags: string[];
    author?: string;
    aiRecommendations?: { name: string; url: string; }[];
    copy_count?: number;
}

export const promptCategories = [
    { id: 'image-gen', name: 'สร้างภาพ (Image Gen)', icon: 'Image' },
    { id: 'marketing', name: 'การตลาด (Marketing)', icon: 'Briefcase' },
    { id: 'writing', name: 'งานเขียน (Writing)', icon: 'FileText' },
    { id: 'coding', name: 'เขียนโค้ด (Coding)', icon: 'Code' },
    { id: 'education', name: 'การศึกษา (Education)', icon: 'Lightbulb' },
];

export const aiPrompts: AIPrompt[] = [
    {
        id: 'p1',
        title: 'สร้างภาพแนว Cinematic',
        prompt: 'Cinematic shot of a futuristic Bangkok city, neon lights, rain, hyper-realistic, 8k resolution --ar 16:9',
        category: 'image-gen',
        tags: ['Gpt', 'Gemini'],
        author: 'สมชาย ครีเอเตอร์'
    },
    {
        id: 'p2',
        title: 'สรุปบทความยาวๆ',
        prompt: 'ช่วยสรุปเนื้อหาสำคัญจากบทความนี้เป็นข้อๆ ให้เข้าใจง่ายที่สุด โดยเน้นเฉพาะประเด็นที่คนทั่วไปนำไปใช้ได้จริง [ใส่ลิงก์หรือข้อความ]',
        category: 'writing',
        tags: ['ChatGPT', 'Gemini'],
    },
    {
        id: 'p3',
        title: 'เขียน Caption ขายของทางแอปส้ม',
        prompt: 'เขียนแคปชั่นขายรองพื้นตัวใหม่ เน้นจุดเด่นที่คุมมัน 24 ชม. และบำรุงผิวไปในตัว น้ำเสียงดูเป็นกันเองแต่ก็น่าเชื่อถือ พร้อมใส่อีโมจิที่น่ารักสะดุดตา',
        category: 'marketing',
        tags: ['ChatGPT', 'Claude'],
    },
    {
        id: 'p4',
        title: 'ให้ AI ช่วยแก้โค้ด React',
        prompt: 'ช่วยตรวจสอบโค้ด React ส่วนนี้หน่อยว่าทำไม useEffect ถึงทำงานวนลูปไม่จบ และช่วยแนะนำวิธีแก้ไขที่ถูกต้องตามหลักการที่ดีที่สุด [ใส่โค้ดของคุณ]',
        category: 'coding',
        tags: ['ChatGPT', 'Gemini'],
    },
    {
        id: 'p5',
        title: 'สร้างไอเดียพอดแคสต์เทคโนโลยี',
        prompt: 'ลองเสนอหัวข้อพอดแคสต์เกี่ยวกับ AI ที่กำลังเป็นกระแสในสัปดาห์นี้มา 5 หัวข้อ พร้อมโครงเรื่องคร่าวๆ ในแต่ละหัวข้อให้น่าสนใจสำหรับผู้ฟังวัยทำงาน',
        category: 'education',
        tags: ['Gemini', 'Perplexity'],
    },
    {
        id: 'p6',
        title: 'ช่วยสรุปรายงานการประชุม',
        prompt: 'สรุปประเด็นสำคัญจากการจดบันทึกการประชุมนี้ โดยแยกเป็น หัวข้อที่คุย, สิ่งที่ตัดสินใจ, และสิ่งที่ต้องทำต่อ (Action Items) พร้อมระบุผู้รับผิดชอบถ้ามี',
        category: 'writing',
        tags: ['ChatGPT', 'Claude'],
        author: 'ทีมงาน OneAi'
    },
    {
        id: 'p7',
        title: 'ช่วยคิดไอเดียทำ Content TikTok',
        prompt: 'ช่วยคิดไอเดียทำคลิป TikTok สำหรับโปรโมทแอปพลิเคชันใหม่ที่ช่วยจัดการเวลาทำงาน เน้นความสนุกสนานและเข้าถึงง่ายสำหรับวัยรุ่นสร้างตัว',
        category: 'marketing',
        tags: ['Gpt', 'Gemini'],
        author: 'ทีมงาน OneAi'
    },
    {
        id: 'p8',
        title: 'ช่วยตรวจสอบ Logic โปรแกรม',
        prompt: 'ช่วยตรวจสอบ Code Python ส่วนนี้หน่อยว่ามีโอกาสเกิด Error ตรงไหนบ้าง และช่วยแนะนำวิธีเขียนให้กระชับขึ้นโดยใช้ List Comprehension [ใส่โค้ดของคุณ]',
        category: 'coding',
        tags: ['Claud', 'DeepSix'],
        author: 'ทีมงาน OneAi'
    },
    {
        id: 'p9',
        title: 'สร้างตัวอย่างข้อมูล (Mock Data) สำหรับเทสระบบ',
        prompt: 'สร้างไฟล์ JSON จำลองข้อมูลผู้ใช้ 10 คน ประกอบด้วย id, name, email, และ address โดยให้ชื่อและที่อยู่เป็นชื่อภาษาไทยที่ดูสมจริง',
        category: 'coding',
        tags: ['ChatGPT', 'Claude'],
    },
    {
        id: 'p10',
        title: 'ช่วยเขียนอีเมลขอลางานเป็นภาษาอังกฤษ',
        prompt: 'เขียนอีเมลลางานภาษาอังกฤษแบบทางการ เนื่องจากมีธุระด่วนทางครอบครัว ลาตั้งแต่วันที่ [วันที่] ถึง [วันที่] และจะกลับมาทำงานในวันที่ [วันที่]',
        category: 'writing',
        tags: ['ChatGPT', 'Gemini'],
    },
    {
        id: 'p11',
        title: 'แนะนำแผนการเรียนรู้ AI สำหรับมือใหม่',
        prompt: 'ช่วยจัดตารางเรียนรู้วิธีการใช้ AI ขั้นพื้นฐานภายใน 30 วัน สำหรับคนที่ไม่มีพื้นฐานด้านนี้เลย โดยเน้นการนำไปใช้ในการทำงานออฟฟิศประจำวัน',
        category: 'education',
        tags: ['Gemini', 'Claude'],
    },
    {
        id: 'p12',
        title: 'เขียนสคริปต์วิดีโอ YouTube รีวิว Gadget',
        prompt: 'เขียนโครงร่างสคริปต์รีวิวหูฟังบลูทูธราคาประหยัด เน้นการเปิดคลิปให้น่าสนใจ (Hook), การเปรียบเทียบสเปก, และสรุปว่าเหมาะกับใครในตอนจบ',
        category: 'marketing',
        tags: ['ChatGPT', 'DeepSeek'],
    },
    {
        id: 'p13',
        title: 'ช่วยคิดหัวข้อบทความให้น่าดึงดูด',
        prompt: 'ลองเสนอหัวข้อบทความเกี่ยวกับ "สุขภาพจิตในวัยทำงาน" มา 10 หัวข้อ ที่ทำให้คนอยากคลิกเข้ามาอ่านจากหน้าฟีด Facebook',
        category: 'writing',
        tags: ['Gpt', 'Claude'],
    },
    {
        id: 'p14',
        title: 'สร้างภาพวาดสไตล์ Cyberpunk',
        prompt: 'Cyberpunk street market in a rainy night, glowing neon signs, diverse characters, hyper-realistic, high detail --v 6.0',
        category: 'image-gen',
        tags: ['Gpt', 'Midjourney'],
    },
    {
        id: 'p15',
        title: 'ช่วยแก้ปัญหา SQL Query',
        prompt: 'เขียน SQL สำหรับดึงข้อมูลยอดขายรวมแยกตามหมวดหมู่สินค้าในเดือนที่ผ่านมา โดยเรียงจากยอดขายมากไปหาน้อย',
        category: 'coding',
        tags: ['ChatGPT', 'DeepSeek'],
    },
    {
        id: 'p16',
        title: 'ให้ AI ช่วยติวสอบ IELTS Writing Task 2',
        prompt: 'ช่วยตรวจเรียงความภาษาอังกฤษหัวข้อเกี่ยวกับปัญหาโลกร้อนนี้ให้หน่อย พร้อมให้คะแนนตามเกณฑ์ IELTS และแนะนำวิธีปรับสำนวนให้สละสลวยขึ้น [ใส่เรียงความ]',
        category: 'education',
        tags: ['ChatGPT', 'Claude'],
    },
    {
        id: 'p17',
        title: 'สร้างไอเดียชื่อแบรนด์ใหม่',
        prompt: 'ช่วยคิดชื่อแบรนด์ร้านกาแฟสไตล์มินิมอล 10 ชื่อ ที่สื่อถึงความเรียบง่าย เป็นธรรมชาติ และจำง่าย',
        category: 'marketing',
        tags: ['Gpt', 'Gemini'],
    },
    {
        id: 'p18',
        title: 'ช่วยแปลเอกสารทางราชการ',
        prompt: 'แปลข้อความในย่อหน้านี้จากภาษาไทยเป็นภาษาอังกฤษ โดยใช้คำศัพท์ที่เป็นทางการและถูกต้องตามสำนวนกฎหมาย [ใส่ข้อความ]',
        category: 'writing',
        tags: ['ChatGPT', 'Gemini'],
    },
    {
        id: 'p19',
        title: 'ช่วยวางโครงสร้างพื้นฐานแอป Flutter',
        prompt: 'ขอหน้าตาโค้ดเริ่มต้นสำหรับแอป Flutter ที่มีระบบล็อกอินเข้าสู่ระบบ ลิงก์กับ Firebase และมีหน้า Home เป็นแบบ Bottom Navigation Bar',
        category: 'coding',
        tags: ['Claude', 'Gpt'],
    },
    {
        id: 'p20',
        title: 'สอนทำ Excel สูตรยากๆ',
        prompt: 'ช่วยอธิบายวิธีใช้ฟังก์ชัน XLOOKUP แบบละเอียด พร้อมตัวอย่างกรณีที่ต้องค้นหาข้อมูลจากหลายตารางเชื่อมกัน',
        category: 'education',
        tags: ['ChatGPT', 'Gemini'],
    },
    {
        id: 'p21',
        title: 'คิดคอนเทนต์โพสต์ไอจีวันหยุด',
        prompt: 'เขียนแคปชั่นไอจีสำหรับโพสต์รูปคาเฟ่ในวันหยุด น้ำเสียงขี้เล่น สั้นๆ พร้อมแฮชแท็กที่กำลังเป็นเทรนด์',
        category: 'marketing',
        tags: ['ChatGPT', 'Claude'],
    },
    {
        id: 'p22',
        title: 'สรุปพอดแคสต์จากไฟล์เสียง',
        prompt: 'ช่วยสรุปใจความสำคัญจากสรุปเนื้อหาพอดแคสต์ที่แนบมานี้ ว่ามีประเด็นอะไรที่น่าสนใจบ้าง และแนะนำสิ่งที่ผู้ฟังควรนำไปปรับใช้ [ใส่สรุป]',
        category: 'writing',
        tags: ['ChatGPT', 'Claude'],
    },
    {
        id: 'p23',
        title: 'เขียนคิวรี่ Mongo DB สำหรับ Aggregate',
        prompt: 'เขียน MongoDB Aggregation pipeline เพื่อหาค่าเฉลี่ยของราคาสินค้าในแต่ละ Store และกรองเฉพาะ Store ที่มียอดขายมากกว่า 100 รายการ',
        category: 'coding',
        tags: ['Gpt', 'DeepSeek'],
    },
    {
        id: 'p24',
        title: 'ช่วยเตรียมตัวสัมภาษณ์งานตำแหน่ง Marketing',
        prompt: 'ลองสมมติว่าคุณเป็นผู้สัมภาษณ์งานตำแหน่ง Senior Content Marketing และช่วยถามคำถามทดสอบไหวพริบฉัน 5 ข้อ พร้อมแนะนำแนวทางคำตอบที่ดูเป็นมืออาชีพ',
        category: 'education',
        tags: ['ChatGPT', 'Gemini'],
    },
    {
        id: 'p25',
        title: 'คิดสโลแกนสินค้าบำรุงผิว',
        prompt: 'คิดสโลแกนสั้นๆ 3-5 คำ สำหรับเซรั่มหน้าใส ที่เน้นจุดเด่นเรื่องความรวดเร็วในการเห็นผลและปลอดภัยจากธรรมชาติ',
        category: 'marketing',
        tags: ['Gpt', 'Claude'],
    },
    {
        id: 'p26',
        title: 'ปรับปรุงบทความให้ดีขึ้น (Edit)',
        prompt: 'ช่วยปรับปรุงบทความส่วนนี้ให้น่าสนใจขึ้น โดยเปลี่ยนโทนเสียงให้ดูเป็นมืออาชีพมากขึ้น และใช้คำเชื่อมในประโยคให้ดูสละสลวย [ใส่บทความ]',
        category: 'writing',
        tags: ['Claude', 'Gemini'],
    },
    {
        id: 'p27',
        title: 'แปลงโค้ดจาก Python เป็น JavaScript',
        prompt: 'ช่วยแปลงโค้ดฟังก์ชันคำนวณภาษีตัวนี้จากภาษา Python ไปเป็นภาษา JavaScript โดยรักษาความสามารถในการจัดการ error ไว้เหมือนเดิม [ใส่โค้ด]',
        category: 'coding',
        tags: ['Claude', 'Gpt'],
    },
    {
        id: 'p28',
        title: 'ช่วยสอนวิทยาศาตร์ระดับมัธยมให้เข้าใจง่าย',
        prompt: 'ช่วยอธิบายกฎการเคลื่อนที่ของนิวตัน 3 ข้อให้เด็กอายุ 12 ขวบฟัง โดยใช้อุปมาอุปไมยที่เกี่ยวข้องกับกีฬาหรือชีวิตประจำวัน',
        category: 'education',
        tags: ['Gemini', 'Gpt'],
    },
    {
        id: 'p29',
        title: 'สร้างตารางเวลาทำคอนเทนต์ 1 สัปดาห์',
        prompt: 'ช่วยวางแผนตารางโพสต์ Social Media (FB, IG, TikTok) ตลอดทั้งสัปดาห์สำหรับธุรกิจร้านทำผม โดยเน้นเป้าหมายเพื่อเพิ่มยอดจองในช่วงวันธรรมดา',
        category: 'marketing',
        tags: ['ChatGPT', 'Claude'],
    },
    {
        id: 'p30',
        title: 'เขียนสรุปข่าวสั้นๆ สำหรับลง Twitter',
        prompt: 'จงสรุปข่าวเศรษฐกิจนี้ให้เหลือความยาวไม่เกิน 280 ตัวอักษร โดยดึงประเด็นสำคัญที่สุดมา 1 ประเด็น และใช้ภาษาที่ตื่นเต้น [ใส่ข่าว]',
        category: 'writing',
        tags: ['Gpt', 'DeepSeek'],
    },
    {
        id: 'p31',
        title: 'ช่วยแก้ไข Bug ใน CSS Layout',
        prompt: 'ทำไมกล่อง Div สองกล่องนี้ถึงไม่ยอมเรียงต่อกันในแนวนอนทั้งๆ ที่เขียน display: flex; แล้ว? ช่วยดูโค้ดและแนะนำวิธีแก้ด้วย [ใส่โค้ด]',
        category: 'coding',
        tags: ['ChatGPT', 'Gemini'],
    },
    {
        id: 'p32',
        title: 'จัดตารางอาหารลดน้ำหนักภายใน 7 วัน',
        prompt: 'ช่วยออกแบบแผนการทานอาหาร (Meal Plan) สำหรับ 1 สัปดาห์ เพื่อเป้าหมายในการลดพุง โดยเน้นอาหารที่หาซื้อได้ง่ายในร้านสะดวกซื้อ',
        category: 'education',
        tags: ['Gemini', 'Claude'],
    },
    {
        id: 'p33',
        title: 'เขียนข้อความโปรโมทกิจกรรมบริษัท',
        prompt: 'เขียนอีเมลเชิญชวนพนักงานในบริษัทมาร่วมงานปาร์ตี้ขอบคุณลูกค้า (Thank You Party) โทนสนิทสนมแต่สุภาพ และย้ำเรื่องการแต่งกายธีม "Safari"',
        category: 'marketing',
        tags: ['Gpt', 'Claude'],
    },
    {
        id: 'p34',
        title: 'สรุปหัวใจสำคัญจากหนังสือยอดฮิต',
        prompt: 'จงสรุปบทเรียนสำคัญ 5 ข้อจากหนังสือเรื่อง "Atomic Habits" และอธิบายว่าพนักงานบริษัทจะสามารถเริ่มทำตามได้ยังไงในวันพรุ่งนี้',
        category: 'writing',
        tags: ['Claude', 'Gemini'],
    },
    {
        id: 'p35',
        title: 'อธิบายเทคโนโลยี Blockchain แบบสั้นๆ',
        prompt: 'ช่วยอธิบายว่า Blockchain คืออะไรใน 1 ย่อหน้า โดยไม่ใช้ศัพท์เทคนิคที่ยากเกินไป และสรุปเหตุผลที่มันสำคัญสำหรับอนาคตการเงิน',
        category: 'education',
        tags: ['Gemini', 'Gpt'],
    },
    {
        id: 'p36',
        title: 'ตั้งชื่อหัวข้อวล็อกพาเที่ยวไทย',
        prompt: 'ช่วยคิดชื่อคลิปเที่ยวเชียงใหม่ 10 ชื่อ ตัวอย่างแนว "10 พิกัดถ่ายรูปสวย" หรือ "ตามหาของอร่อยงบหลักร้อย"',
        category: 'marketing',
        tags: ['ChatGPT', 'Claude'],
    },
    {
        id: 'p37',
        title: 'เขียนจดหมายขออภัยลูกค้ากรณีสินค้าส่งช้า',
        prompt: 'เขียนจดหมายหรือข้อความตอบแชทลูกค้ากรณีการขนส่งล่าช้าเนื่องจากออเดอร์ล้น แสดงความเสียใจและเสนอคูปองส่วนลดเพื่อชดเชยการรอ',
        category: 'writing',
        tags: ['Claude', 'Gemini'],
    },
    {
        id: 'p38',
        title: 'แต่งโครงสร้าง Class ในภาษา Java',
        prompt: 'ช่วยเขียนคลาส Java สำหรับระบบสมาชิก (User Profile) ที่มีฟิลด์ เก็บข้อมูลส่วนตัว และเมธอดสำหรับคำนวณคะแนนสะสมย้อนหลัง',
        category: 'coding',
        tags: ['Gpt', 'DeepSeek'],
    },
    {
        id: 'p39',
        title: 'แนะนำวิธีใช้ ChatGPT ให้ได้งานดีขึ้น',
        prompt: 'บอกเทคนิค 3 ข้อในการป้อนคำสั่ง (Instruction) ให้กับ AI เพื่อให้มันผลิตไอเดียที่สร้างสรรค์และไม่ซ้ำซากจำเจเหมือนต้นฉบับมากเกินไป',
        category: 'education',
        tags: ['ChatGPT', 'Gemini'],
    },
    {
        id: 'p40',
        title: 'ช่วยคิดคอนเทนต์โพสต์ขายบ้านมือสอง',
        prompt: 'เขียนโพสต์ขายบ้านเดี่ยว 2 ชั้น ผ่านเฟซบุ๊ก เน้นทำเลใกล้รถไฟฟ้า ปลอดภัย และราคาถูกกว่าราคาประเมิน พร้อมแคปชั่นสะดุดตาและอีโมจิ',
        category: 'marketing',
        tags: ['Gpt', 'Claude'],
    },
];
