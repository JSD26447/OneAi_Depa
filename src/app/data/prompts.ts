
export interface AIPrompt {
    id: string;
    title: string;
    prompt: string;
    category: string;
    tags: string[];
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
        tags: ['Midjourney', 'Stable Diffusion'],
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
        title: 'เขียน Caption ขายของสายบิวตี้',
        prompt: 'เขียนแคปชั่นขายรองพื้นตัวใหม่ เน้นจุดเด่นที่คุมมัน 24 ชม. และบำรุงผิวไปในตัว น้ำเสียงดูเป็นกันเองแต่ก็น่าเชื่อถือ พร้อมใส่อีโมจิที่น่ารักสะดุดตา',
        category: 'marketing',
        tags: ['ChatGPT', 'Claude'],
    },
    {
        id: 'p4',
        title: 'ให้ AI ช่วยแก้โค้ด React',
        prompt: 'ช่วยตรวจสอบโค้ด React ส่วนนี้หน่อยว่าทำไม useEffect ถึงทำงานวนลูปไม่จบ และช่วยแนะนำวิธีแก้ไขที่ถูกต้องตามหลักการที่ดีที่สุด [ใส่โค้ดของคุณ]',
        category: 'coding',
        tags: ['ChatGPT', 'GitHub Copilot'],
    },
    {
        id: 'p5',
        title: 'สร้างไอเดียพอดแคสต์เทคโนโลยี',
        prompt: 'ลองเสนอหัวข้อพอดแคสต์เกี่ยวกับ AI ที่กำลังเป็นกระแสในสัปดาห์นี้มา 5 หัวข้อ พร้อมโครงเรื่องคร่าวๆ ในแต่ละหัวข้อให้น่าสนใจสำหรับผู้ฟังวัยทำงาน',
        category: 'education',
        tags: ['Gemini', 'Perplexity'],
    },
];
