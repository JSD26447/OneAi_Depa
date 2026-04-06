export interface Category {
  type: string;
  category_id: string;
  name: string;
  icon?: string;
  db_id?: number;
}

export const initialCategories: Category[] = [
    { type: 'prompt', category_id: 'meeting', name: 'หมวดการประชุมและสรุปผล', icon: 'Users' },
    { type: 'prompt', category_id: 'planning', name: 'หมวดวางแผนและกลยุทธ์ (Planning)', icon: 'Map' },
    { type: 'prompt', category_id: 'creative', name: 'หมวดสื่อสร้างสรรค์ (Creative)', icon: 'Palette' },
    { type: 'prompt', category_id: 'coding', name: 'หมวดเขียนโค้ด', icon: 'Code' },
    { type: 'prompt', category_id: 'document', name: 'หมวดเอกสาร', icon: 'FileText' },
    
    // AI Tool Categories (Common ones seen in aiTools.ts)
    // If some AI Tools use different categories, we'll make sure they display somewhat okay.
    { type: 'ai', category_id: 'Chatbot', name: 'Chatbot', icon: 'MessageSquare' },
    { type: 'ai', category_id: 'Generative', name: 'Generative AI', icon: 'Sparkles' },
    { type: 'ai', category_id: 'Utility', name: 'Utility', icon: 'Wand2' },
    { type: 'ai', category_id: 'Development', name: 'Development', icon: 'Code' },
    { type: 'ai', category_id: 'Design', name: 'Design', icon: 'Palette' },
    { type: 'ai', category_id: 'Audio', name: 'Audio & Speech', icon: 'Code' },
    { type: 'ai', category_id: 'Writing', name: 'Writing', icon: 'FileText' },
    { type: 'ai', category_id: 'Video', name: 'Video', icon: 'Video' },
    { type: 'ai', category_id: 'Productivity', name: 'Productivity', icon: 'Briefcase' }
];
