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
    
    // AI Tool Categories (Mirroring the 5 actual overarching categories)
    { type: 'ai', category_id: 'document', name: 'หมวดเอกสาร', icon: 'FileText' },
    { type: 'ai', category_id: 'meeting', name: 'หมวดการประชุมและสรุปผล', icon: 'Users' },
    { type: 'ai', category_id: 'creative', name: 'หมวดสื่อสร้างสรรค์ (Creative)', icon: 'Palette' },
    { type: 'ai', category_id: 'planning', name: 'หมวดวางแผนและกลยุทธ์ (Planning)', icon: 'Map' },
    { type: 'ai', category_id: 'coding', name: 'หมวดเขียนโค้ด', icon: 'Code' }
];
