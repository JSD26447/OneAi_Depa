export interface AITool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  bestFor: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  price: 'Free' | 'Paid' | 'Free + Paid';
  whatItDoes: string[];
  whoItsFor: string[];
  howToUse: { step: number; text: string }[];
  useCases: string[];
  difficultyExplanation: string;
  pricingDetails: string;
  officialWebsite: string;
  logo?: string; // Icon name from lucide-react
  imageUrl?: string; // URL or local path to the image
}

export const categories = [
  { id: 'create-images', name: 'สร้างภาพ', icon: 'Image' },
  { id: 'write-content', name: 'เขียนเนื้อหา', icon: 'FileText' },
  { id: 'make-videos', name: 'สร้างวิดีโอ', icon: 'Video' },
  { id: 'business-documents', name: 'ธุรกิจและเอกสาร', icon: 'Briefcase' },
  { id: 'coding-automation', name: 'เขียนโค้ดและระบบอัตโนมัติ', icon: 'Code' },
  { id: 'brainstorm-ideas', name: 'ระดมความคิด', icon: 'Lightbulb' },
];

export const aiTools: AITool[] = [
  // Write Content Category
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    logo: 'MessageSquare',
    imageUrl: 'https://th.bing.com/th?q=GPT+4+Icon&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=en-WW&cc=TH&setlang=th&adlt=strict&t=1&mw=247',
    tagline: 'ผู้ช่วย AI สำหรับเขียนและตอบคำถาม',
    description: 'ช่วยเขียนอีเมล รายงาน และระดมไอเดียได้ในไม่กี่วินาที',
    category: 'write-content',
    bestFor: ['พนักงานออฟฟิศ', 'นักการตลาด', 'เจ้าของธุรกิจ'],
    difficulty: 'Beginner',
    price: 'Free + Paid',
    whatItDoes: [
      'เขียนอีเมลและข้อความอย่างมืออาชีพ',
      'สร้างบทความบล็อกและโพสต์โซเชียลมีเดีย',
      'สรุปเอกสารหรือบทความที่ยาว',
      'ระดมไอเดียสำหรับโปรเจกต์',
      'ตอบคำถามเกี่ยวกับหัวข้อต่างๆ',
    ],
    whoItsFor: [
      'พนักงานออฟฟิศที่ต้องเขียนอีเมลอย่างรวดเร็ว',
      'นักการตลาดที่สร้างคอนเทนต์สำหรับโซเชียลมีเดีย',
      'เจ้าของธุรกิจที่ร่างข้อเสนอ',
      'ทุกคนที่ต้องการความช่วยเหลือในการเขียน',
    ],
    howToUse: [
      { step: 1, text: 'ไปที่ chat.openai.com และสร้างบัญชีฟรี' },
      { step: 2, text: 'พิมพ์คำถามหรือคำขอของคุณในกล่องแชท' },
      { step: 3, text: 'ChatGPT จะตอบกลับด้วยข้อความที่เป็นประโยชน์' },
      { step: 4, text: 'คุณสามารถถามคำถามติดตามเพื่อปรับแต่งคำตอบได้' },
      { step: 5, text: 'คัดลอกและวางผลลัพธ์ลงในเอกสารของคุณ' },
    ],
    useCases: [
      'เขียนอีเมลที่สุภาพให้กับลูกค้า',
      'สร้างโพสต์โซเชียลมีเดียหนึ่งสัปดาห์สำหรับธุรกิจของคุณ',
      'สรุปบันทึกการประชุมเป็นประเด็นสำคัญ',
      'รับความช่วยเหลือในการร่างงานนำเสนอ',
    ],
    difficultyExplanation:
      'ChatGPT เป็นมิตรกับผู้เริ่มต้นมาก คุณแค่พิมพ์สิ่งที่คุณต้องการเป็นภาษาไทยธรรมดา แล้วมันจะตอบกลับ ไม่ต้องฝึกอบรมพิเศษ',
    pricingDetails:
      'เวอร์ชันฟรีให้ทุกอย่างที่คุณต้องการเพื่อเริ่มต้น เวอร์ชันแบบจ่ายเงิน (ChatGPT Plus) เร็วกว่าและมีฟีเจอร์พิเศษเพิ่มเติม',
    officialWebsite: 'https://chat.openai.com',
  },
  {
    id: 'grammarly',
    name: 'Grammarly',
    logo: 'CheckCircle2',
    imageUrl: '/images/grammarly.png',
    tagline: 'ตรวจสอบการเขียนของคุณเพื่อหาข้อผิดพลาดและปรับปรุงให้ดีขึ้น',
    description: 'แก้ไขไวยากรณ์ การสะกด และน้ำเสียงในการเขียนของคุณ',
    category: 'write-content',
    bestFor: ['พนักงานออฟฟิศ', 'นักการตลาด', 'เจ้าของธุรกิจ'],
    difficulty: 'Beginner',
    price: 'Free + Paid',
    whatItDoes: [
      'แก้ไขข้อผิดพลาดการสะกดและไวยากรณ์ทันที',
      'แนะนำคำที่ดีกว่าเพื่อปรับปรุงความชัดเจน',
      'ตรวจสอบว่าน้ำเสียงของคุณฟังดูเป็นมืออาชีพหรือเป็นกันเอง',
      'จับข้อผิดพลาดเครื่องหมายวรรคตอน',
      'เขียนประโยคใหม่ให้ฟังดูเป็นธรรมชาติมากขึ้น',
    ],
    whoItsFor: [
      'ทุกคนที่เขียนอีเมลในที่ทำงาน',
      'นักการตลาดที่เขียนบล็อกโพสต์หรือโฆษณา',
      'เจ้าของธุรกิจที่ส่งข้อความสำคัญ',
      'ผู้ที่ต้องการให้การเขียนของตนฟังดูสวยงามขึ้น',
    ],
    howToUse: [
      { step: 1, text: 'ติดตั้ง Grammarly เป็นส่วนขยายเบราว์เซอร์หรือแอปเดสก์ท็อป' },
      { step: 2, text: 'เริ่มพิมพ์ในแอปใดก็ได้ (อีเมล, Google Docs ฯลฯ)' },
      { step: 3, text: 'Grammarly จะขีดเส้นใต้ข้อผิดพลาดขณะที่คุณพิมพ์' },
      { step: 4, text: 'คลิกที่คำที่ขีดเส้นใต้เพื่อดูคำแนะนำ' },
      { step: 5, text: 'ยอมรับการแก้ไขหรือละเว้น' },
    ],
    useCases: [
      'ตรวจทานอีเมลสำคัญก่อนส่ง',
      'ตรวจสอบให้แน่ใจว่าใบสมัครงานไม่มีข้อผิดพลาด',
      'ปรับปรุงน้ำเสียงของข้อความบริการลูกค้า',
      'ตรวจสอบบล็อกโพสต์เพื่อหาปัญหาไวยากรณ์',
    ],
    difficultyExplanation:
      'Grammarly ใช้งานง่ายมาก มันทำงานในพื้นหลังขณะที่คุณพิมพ์ ดังนั้นคุณไม่จำเป็นต้องทำอะไรพิเศษ',
    pricingDetails:
      'เวอร์ชันฟรีจับข้อผิดพลาดไวยากรณ์และการสะกดส่วนใหญ่ เวอร์ชันพรีเมียมมีคำแนะนำขั้นสูงสำหรับน้ำเสียงและความชัดเจน',
    officialWebsite: 'https://www.grammarly.com',
  },
  {
    id: 'jasper',
    name: 'Jasper AI',
    logo: 'Sparkles',
    imageUrl: 'https://www.saashub.com/images/app/logo/jasper-ai.png',
    tagline: 'สร้างคอนเทนต์การตลาดได้เร็วขึ้นด้วยการเขียน AI',
    description: 'สร้างบล็อกโพสต์ โฆษณา และอีเมลที่ออกแบบมาสำหรับธุรกิจ',
    category: 'write-content',
    bestFor: ['นักการตลาด', 'เจ้าของธุรกิจ'],
    difficulty: 'Intermediate',
    price: 'Paid',
    whatItDoes: [
      'เขียนบล็อกโพสต์แบบเต็มจากหัวข้อไอเดีย',
      'สร้างคำโฆษณาสำหรับ Google และ Facebook',
      'สร้างแคมเปญอีเมล',
      'เขียนคำอธิบายผลิตภัณฑ์สำหรับร้านค้าออนไลน์',
      'สร้างแคปชั่นโซเชียลมีเดีย',
    ],
    whoItsFor: [
      'นักการตลาดที่ต้องสร้างคอนเทนต์อย่างรวดเร็ว',
      'เจ้าของธุรกิจที่บริหารบัญชีโซเชียลมีเดีย',
      'ผู้ขายอีคอมเมิร์ซที่เขียนคำอธิบายผลิตภัณฑ์',
      'ผู้สร้างคอนเทนต์ที่วางแผนหลายโพสต์พร้อมกัน',
    ],
    howToUse: [
      { step: 1, text: 'สมัครบัญชี Jasper (ต้องชำระเงิน)' },
      { step: 2, text: 'เลือกเทมเพลต (บล็อกโพสต์ โฆษณา อีเมล ฯลฯ)' },
      { step: 3, text: 'กรอกแบบฟอร์มด้วยหัวข้อและรายละเอียดสำคัญของคุณ' },
      { step: 4, text: 'คลิก "สร้าง" และ Jasper จะสร้างคอนเทนต์' },
      { step: 5, text: 'แก้ไขผลลัพธ์ให้ตรงกับเสียงแบรนด์ของคุณ' },
    ],
    useCases: [
      'เขียนบล็อกโพสต์ที่สมบูรณ์ใน 10 นาที',
      'สร้างโฆษณา Facebook แบบแปรผัน 20 รูปแบบเพื่อทดสอบ',
      'สร้างคำอธิบายผลิตภัณฑ์ 100 รายการ',
      'ร่างซีรีส์อีเมลต้อนรับสำหรับลูกค้าใหม่',
    ],
    difficultyExplanation:
      'Jasper ค่อนข้างขั้นสูงเพราะมีเทมเพลตและการตั้งค่ามากมาย ต้องใช้การฝึกฝนเพื่อให้ได้ผลลัพธ์ที่ตรงกับสไตล์แบรนด์ของคุณ',
    pricingDetails:
      'Jasper ต้องการการสมัครสมาชิกแบบจ่ายเงิน แผนเริ่มต้นประมาณ 1,400 บาท/เดือน ซึ่งเหมาะที่สุดสำหรับธุรกิจที่สร้างคอนเทนต์จำนวนมาก',
    officialWebsite: 'https://www.jasper.ai',
  },
  // Create Images Category
  {
    id: 'canva',
    name: 'Canva',
    logo: 'Palette',
    imageUrl: 'https://www.vectorlogo.zone/logos/canva/canva-icon.svg',
    tagline: 'ออกแบบกราฟิกและการนำเสนอโดยไม่ต้องเป็นนักออกแบบ',
    description: 'สร้างโพสต์โซเชียล ใบปลิว และการนำเสนอได้อย่างง่ายดาย',
    category: 'create-images',
    bestFor: ['นักการตลาด', 'เจ้าของธุรกิจ', 'พนักงานออฟฟิศ'],
    difficulty: 'Beginner',
    price: 'Free + Paid',
    whatItDoes: [
      'ออกแบบโพสต์โซเชียลมีเดียด้วยเทมเพลต',
      'สร้างการนำเสนอและสไลด์',
      'ทำโลโก้และนามบัตร',
      'ออกแบบใบปลิวและโปสเตอร์',
      'ใช้ AI สร้างภาพจากคำอธิบายข้อความ',
    ],
    whoItsFor: [
      'นักการตลาดที่สร้างกราฟิกโซเชียลมีเดีย',
      'เจ้าของธุรกิจที่ทำสื่อโปรโมชัน',
      'พนักงานออฟฟิศที่สร้างการนำเสนอ',
      'ทุกคนที่ต้องการการออกแบบที่รวดเร็วและเป็นมืออาชีพ',
    ],
    howToUse: [
      { step: 1, text: 'สมัครบัญชี Canva ฟรี' },
      { step: 2, text: 'เลือกเทมเพลต (โพสต์ Instagram, การนำเสนอ ฯลฯ)' },
      { step: 3, text: 'ปรับแต่งข้อความ สี และภาพ' },
      { step: 4, text: 'ใช้ตัวสร้างภาพ AI หากคุณต้องการกราฟิกที่กำหนดเอง' },
      { step: 5, text: 'ดาวน์โหลดการออกแบบของคุณเป็นภาพหรือ PDF' },
    ],
    useCases: [
      'สร้างโพสต์ Instagram สำหรับธุรกิจของคุณ',
      'ออกแบบใบปลิวสำหรับงานอีเวนต์',
      'ทำการนำเสนอสำหรับการประชุม',
      'สร้างโลโก้สำหรับโครงการใหม่',
    ],
    difficultyExplanation:
      'Canva ออกแบบมาสำหรับผู้เริ่มต้น ตัวแก้ไขแบบลากและวางเข้าใจง่าย และเทมเพลตทำงานส่วนใหญ่ให้คุณแล้ว',
    pricingDetails:
      'เวอร์ชันฟรีมีเทมเพลตหลายพันและฟีเจอร์พื้นฐาน Canva Pro ปลดล็อกเทมเพลตเพิ่มเติม เครื่องมือ AI และลบลายน้ำ',
    officialWebsite: 'https://www.canva.com',
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    logo: 'Wand2',
    imageUrl: 'https://static.cdnlogo.com/logos/m/38/midjourney_800.png',
    tagline: 'สร้างภาพศิลปะที่สวยงามจากคำอธิบายข้อความ',
    description: 'สร้างงานศิลปะและภาพที่ไม่เหมือนใครโดยใช้ AI',
    category: 'create-images',
    bestFor: ['นักออกแบบ', 'นักการตลาด', 'เจ้าของธุรกิจ'],
    difficulty: 'Intermediate',
    price: 'Paid',
    whatItDoes: [
      'สร้างภาพศิลปะที่สวยงามจากข้อความ',
      'สร้างภาพที่ไม่เหมือนใครสำหรับแบรนด์',
      'ออกแบบศิลปะแนวคิดและโมเดล',
      'สร้างภาพประกอบสำหรับการนำเสนอ',
      'ทดลองสไตล์ศิลปะที่แตกต่างกัน',
    ],
    whoItsFor: [
      'นักออกแบบที่มองหาแรงบันดาลใจเชิงสร้างสรรค์',
      'นักการตลาดที่ต้องการภาพที่กำหนดเองสำหรับแคมเปญ',
      'เจ้าของธุรกิจที่สร้างแบรนด์ที่ไม่เหมือนใคร',
      'ผู้สร้างคอนเทนต์ที่ทำกราฟิกที่สะดุดตา',
    ],
    howToUse: [
      { step: 1, text: 'เข้าร่วมเซิร์ฟเวอร์ Discord ของ Midjourney' },
      { step: 2, text: 'พิมพ์ "/imagine" ตามด้วยคำอธิบายภาพของคุณ' },
      { step: 3, text: 'รอ 60 วินาทีสำหรับ Midjourney เพื่อสร้างตัวเลือก 4 ตัวเลือก' },
      { step: 4, text: 'คลิกปุ่มเพื่อขยายภาพโปรดของคุณหรือสร้างรูปแบบ' },
      { step: 5, text: 'ดาวน์โหลดภาพสุดท้าย' },
    ],
    useCases: [
      'สร้างภาพส่วนหัวโซเชียลมีเดียที่ไม่เหมือนใคร',
      'สร้างศิลปะแนวคิดสำหรับผลิตภัณฑ์ใหม่',
      'ออกแบบภาพประกอบที่กำหนดเองสำหรับบล็อก',
      'สร้างพื้นหลังศิลปะสำหรับการนำเสนอ',
    ],
    difficultyExplanation:
      'Midjourney ต้องใช้ Discord ซึ่งอาจสับสนในตอนแรก นอกจากนี้ยังต้องฝึกฝนเขียนคำสั่งที่ให้ผลลัพธ์ที่คุณต้องการ',
    pricingDetails:
      'Midjourney ต้องการการสมัครสมาชิกแบบจ่ายเงินเริ่มต้นที่ 350 บาท/เดือน ไม่มีเวอร์ชันฟรี',
    officialWebsite: 'https://www.midjourney.com',
  },
  // Business & Documents Category
  {
    id: 'notion-ai',
    name: 'Notion AI',
    logo: 'FileStack',
    imageUrl: 'https://www.vectorlogo.zone/logos/notionso/notionso-icon.svg',
    tagline: 'เขียน จัดระเบียบ และระดมความคิดภายในพื้นที่ทำงานของคุณ',
    description: 'เพิ่มการเขียน AI และการจัดระเบียบลงในเอกสาร Notion ของคุณ',
    category: 'business-documents',
    bestFor: ['พนักงานออฟฟิศ', 'เจ้าของธุรกิจ', 'นักการตลาด'],
    difficulty: 'Beginner',
    price: 'Free + Paid',
    whatItDoes: [
      'เขียนบันทึกการประชุมโดยอัตโนมัติ',
      'สรุปเอกสารยาว',
      'สร้างโครงร่างโปรเจกต์',
      'สร้างรายการสิ่งที่ต้องทำจากการระดมความคิด',
      'ร่างอีเมลและข้อความภายใน Notion',
    ],
    whoItsFor: [
      'ทีมที่ใช้ Notion สำหรับการจัดการโปรเจกต์',
      'พนักงานออฟฟิศที่จดบันทึกการประชุม',
      'เจ้าของธุรกิจที่จัดระเบียบแผนธุรกิจ',
      'ทุกคนที่ต้องการ AI ภายในเอกสารของตน',
    ],
    howToUse: [
      { step: 1, text: 'เปิด Notion และสร้างหรือเปิดเอกสาร' },
      { step: 2, text: 'กด Space หรือพิมพ์ "/ai" เพื่อเปิดใช้งาน Notion AI' },
      { step: 3, text: 'เลือกสิ่งที่คุณต้องการให้ AI ทำ (เขียน สรุป ฯลฯ)' },
      { step: 4, text: 'AI จะสร้างเนื้อหาโดยตรงในเอกสารของคุณ' },
      { step: 5, text: 'แก้ไขผลลัพธ์ตามต้องการ' },
    ],
    useCases: [
      'เปลี่ยนบันทึกการประชุมที่ยุ่งเหยิงให้เป็นสรุปที่สะอาด',
      'สร้างโครงร่างแผนโปรเจกต์',
      'สร้างรายการงานจากเซสชันระดมความคิด',
      'ร่างอีเมลให้กับลูกค้า',
    ],
    difficultyExplanation:
      'หากคุณใช้ Notion อยู่แล้ว การเพิ่ม AI นั้นง่าย หากคุณเป็นคนใหม่กับ Notion จะมีเส้นโค้งการเรียนรู้เล็กน้อยสำหรับแอปเอง',
    pricingDetails:
      'Notion AI เป็นส่วนเสริมของบัญชี Notion ของคุณ มีค่าใช้จ่ายเพิ่มเติมนอกเหนือจากแผน Notion ของคุณ แต่มีทดลองใช้ฟรี',
    officialWebsite: 'https://www.notion.so/product/ai',
  },
  {
    id: 'copilot',
    name: 'Microsoft Copilot',
    logo: 'MessageSquare',
    imageUrl: 'https://www.vectorlogo.zone/logos/microsoft_copilot/microsoft_copilot-icon.svg',
    tagline: 'ผู้ช่วย AI สำหรับเพิ่มประสิทธิภาพการทำงานใน Office และ Windows',
    description: 'ช่วยร่างเอกสาร วิเคราะห์ข้อมูลใน Excel และสร้างสไลด์ PowerPoint',
    category: 'business-documents',
    bestFor: ['พนักงานออฟฟิศ', 'นักเรียนนักศึกษา', 'ผู้ใช้ Windows'],
    difficulty: 'Beginner',
    price: 'Free + Paid',
    whatItDoes: [
      'ร่างและแก้ไขเอกสารใน Microsoft Word',
      'วิเคราะห์แนวโน้มข้อมูลและสร้างสูตรใน Excel',
      'สรุปการประชุมและจดบันทึกใน Teams',
      'สร้างงานนำเสนอที่สวยงามใน PowerPoint',
      'ช่วยเขียนอีเมลและสรุปหัวข้อใน Outlook',
    ],
    whoItsFor: [
      'คนที่ต้องใช้โปรแกรมตระกูล Microsoft Office เป็นประจำ',
      'พนักงานที่ต้องการสรุปการประชุมอย่างรวดเร็ว',
      'นักการตลาดที่ต้องการตัวช่วยร่างข้อความโฆษณา',
    ],
    howToUse: [
      { step: 1, text: 'เข้าใช้งานผ่าน copilot.microsoft.com หรือแอป Copilot' },
      { step: 2, text: 'สำหรับผู้ใช้ Office สามารถกดปุ่ม Copilot บน Ribbon' },
      { step: 3, text: 'พิมพ์ความต้องการของคุณลงในช่องแชทหรือแถบคำสั่ง' },
      { step: 4, text: 'ตรวจสอบและปรับแต่งผลลัพธ์ที่ AI สร้างให้' },
      { step: 5, text: 'คัดลอกไปใช้หรือบันทึกลงในเอกสารของคุณโดยตรง' },
    ],
    useCases: [
      'สรุปบันทึกการประชุมยาวๆ เป็นประเด็นสำคัญ',
      'สร้างกราฟและวิเคราะห์ข้อมูลจากตาราง Excel',
      'ร่างสไลด์นำเสนอจากบทความที่คุณเตรียมไว้',
    ],
    difficultyExplanation:
      'Copilot ใช้งานง่ายมากเพราะซ่อนอยู่ในโปรแกรมที่คุณใช้อยู่แล้ว แค่บอกสิ่งที่คุณต้องการเป็นภาษาคนปกติ',
    pricingDetails:
      'มีเวอร์ชันฟรีสำหรับทุกคน และเวอร์ชัน Pro (Copilot Pro) สำหรับใช้งานภายในแอป Office แบบเต็มรูปแบบ',
    officialWebsite: 'https://copilot.microsoft.com',
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    logo: 'Sparkles',
    imageUrl: 'https://www.vectorlogo.zone/logos/google_gemini/google_gemini-icon.svg',
    tagline: 'AI ที่ฉลาดและเชื่อมต่อกับทุกบริการของ Google',
    description: 'ค้นหาข้อมูลจาก Gmail, Drive และ Maps พร้อมช่วยเขียนโค้ดและสร้างภาพ',
    category: 'write-content',
    bestFor: ['ผู้ใช้ Google Workspace', 'นักวิจัย', 'โปรแกรมเมอร์'],
    difficulty: 'Beginner',
    price: 'Free + Paid',
    whatItDoes: [
      'หาข้อมูลจากอีเมล Gmail และไฟล์ใน Google Drive',
      'ช่วยเขียนและตรวจสอบโค้ดโปรแกรมหลายภาษา',
      'วางแผนการเดินทางโดยดึงข้อมูลจาก Google Maps และ Flights',
      'สร้างภาพประกอบ (Image Generation) จากคำบรรยาย',
      'สรุปวิดีโอ YouTube และบทความยาวๆ',
    ],
    whoItsFor: [
      'คนที่ใช้บริการของ Google เช่น Gmail และ Drive เป็นประจำ',
      'นักเรียนที่ต้องการตัวช่วยทำรายงานและวิจัยข้อมูล',
      'นักพัฒนาซอฟต์แวร์ที่ต้องการตัวช่วยเขียนโค้ด',
    ],
    howToUse: [
      { step: 1, text: 'ไปที่ gemini.google.com และเข้าสู่ระบบด้วยบัญชี Google' },
      { step: 2, text: 'พิมพ์คำถามหรือใส่รูปภาพเพื่อให้ AI วิเคราะห์' },
      { step: 3, text: 'ใช้คำสั่ง @ เพื่อเรียกใช้งานแอปอื่น เช่น @Gmail เพื่อหาอีเมล' },
      { step: 4, text: 'ปรับปรุงน้ำเสียงหรือให้ AI แก้ไขคำตอบให้สั้นลง/ยาวขึ้น' },
      { step: 5, text: 'แชร์ผลลัพธ์ลงใน Google Docs หรือ Gmail ได้ทันที' },
    ],
    useCases: [
      'ค้นหาตั๋วเครื่องบินและจัดตารางเที่ยวใน Google Maps',
      'สรุปอีเมลสำคัญที่กองอยู่ใน Inbox ของคุณ',
      'ช่วยอธิบายและแก้บั๊กในโค้ดโปรแกรม',
    ],
    difficultyExplanation:
      'ใช้งานง่ายเหมือนคุยโทรศัพท์ และสะดวกสุดๆ สำหรับคนที่มีข้อมูลอยู่ใน Google Drive อยู่แล้ว',
    pricingDetails:
      'เปิดให้ใช้ฟรีในรุ่นมาตรฐาน และมีรุ่น Gemini Advanced ที่ฉลาดกว่าสำหรับงานซับซ้อน (เสียค่าบริการรายเดือน)',
    officialWebsite: 'https://gemini.google.com',
  },
];