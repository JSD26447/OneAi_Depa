const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const db = require('./db');
const verifyToken = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());
// เสิร์ฟไฟล์ในโฟลเดอร์ uploads ให้เข้าถึงได้สาธารณะ
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ==========================================
// Setup Multer File Upload
// ==========================================
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'img-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// API สำหรับอัปโหลดไฟล์
app.post('/api/upload', verifyToken, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

// ==========================================
// 1. AUTH (Admin Login)
// ==========================================
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) return res.status(404).json({ message: "ไม่พบผู้ใช้นี้ (User not found!)" });

        const user = rows[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password_hash);

        if (!passwordIsValid) return res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง (Invalid Password!)" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 }); // 24 ชั่วโมง
        res.status(200).json({ auth: true, token, username: user.username });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Setup admin ถอดออกแบบ API เปลี่ยนเป็นการสร้างอัตโนมัติเมื่อเริ่ม Server
const initializeAdmin = async () => {
    try {
        const adminUsername = 'Depa';
        const adminPassword = 'Depa@4321';

        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [adminUsername]);
        if (rows.length === 0) {
            const hashedPassword = bcrypt.hashSync(adminPassword, 8);
            await db.query('INSERT INTO users (username, password_hash) VALUES (?, ?)', [adminUsername, hashedPassword]);
            console.log(`✅ Default admin "${adminUsername}" created successfully.`);
        } else {
            console.log(`✅ Default admin "${adminUsername}" already exists.`);
        }
    } catch (err) {
        console.error('❌ Failed to initialize admin:', err.message);
    }
};

// ==========================================
// 2. AI endpoints
// ==========================================
// Public: ดึงข้อมูล AI ทั้งหมด
app.get('/api/ais', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM ais ORDER BY created_at DESC');
        const formattedRows = rows.map(row => {
            try {
                const parsed = JSON.parse(row.description);
                return { ...parsed, id: row.id.toString(), db_id: row.id, provider: row.provider || parsed.provider || parsed.developer || "", imageUrl: row.logo_url || parsed.imageUrl || "", isDepaRecommended: !!row.is_depa_recommended };
            } catch (e) {
                return { id: row.id.toString(), db_id: row.id, name: row.name, description: row.description, link: row.link, provider: row.provider || "", imageUrl: row.logo_url || "", isDepaRecommended: !!row.is_depa_recommended };
            }
        });
        res.status(200).json(formattedRows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin ONLY: เพิ่ม AI (ต้องมี token)
app.post('/api/ais', verifyToken, async (req, res) => {
    const data = req.body;
    const name = data.name || "Untitled";
    const link = data.officialWebsite || data.link || "";
    const provider = data.provider || data.developer || "";
    const description = JSON.stringify(data); // ห่อ Object เป็น JSON เก็บไว้ที่คอลัมน์ description
    const category_id = data.category || "";
    const category_ids = data.categoryIds ? JSON.stringify(data.categoryIds) : '[]';

    // หา category_name จากตาราง categories ถ้าเป็นไปได้ ก็จะสามารถเพิ่มให้ได้
    // สำหรับตอนนี้เราอาจจะใช้แค่วิธีเก็บ category_id แล้วเวลา fetch หน้าบ้านค่อยแมป หรือจะหาจาก DB ก็ได้
    let category_name = "";
    try {
        const [cats] = await db.query('SELECT name FROM categories WHERE category_id = ? AND type = "ai"', [category_id]);
        if (cats.length > 0) category_name = cats[0].name;
    } catch (e) { }

    const logo_url = data.imageUrl || "";
    const is_depa_recommended = data.isDepaRecommended ? 1 : 0;

    try {
        const [result] = await db.query('INSERT INTO ais (name, description, link, category_id, category_ids, provider, logo_url, is_depa_recommended) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, description, link, category_id, category_ids, provider, logo_url, is_depa_recommended]);
        res.status(201).json({ message: "AI created successfully!", id: result.insertId });
    } catch (err) {
        console.error("INSERT ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

// Admin ONLY: แก้ไข AI
app.put('/api/ais/:id', verifyToken, async (req, res) => {
    const data = req.body;
    const name = data.name || "Untitled";
    const link = data.officialWebsite || data.link || "";
    const provider = data.provider || data.developer || "";
    const description = JSON.stringify(data);
    const category_id = data.category || "";
    const category_ids = data.categoryIds ? JSON.stringify(data.categoryIds) : '[]';

    let category_name = "";
    try {
        const [cats] = await db.query('SELECT name FROM categories WHERE category_id = ? AND type = "ai"', [category_id]);
        if (cats.length > 0) category_name = cats[0].name;
    } catch (e) { }

    const logo_url = data.imageUrl || "";
    const is_depa_recommended = data.isDepaRecommended ? 1 : 0;

    try {
        await db.query('UPDATE ais SET name = ?, description = ?, link = ?, category_id = ?, category_ids = ?, provider = ?, logo_url = ?, is_depa_recommended = ? WHERE id = ?', [name, description, link, category_id, category_ids, provider, logo_url, is_depa_recommended, req.params.id]);
        res.status(200).json({ message: "AI updated successfully!" });
    } catch (err) {
        console.error("UPDATE ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

// Admin ONLY: ลบ AI
app.delete('/api/ais/:id', verifyToken, async (req, res) => {
    try {
        await db.query('DELETE FROM ais WHERE id = ?', [req.params.id]);
        res.status(200).json({ message: "AI deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ==========================================
// 2.5 Categories endpoints
// ==========================================
// Public: ดึงหมวดหมู่ทั้งหมด
app.get('/api/categories', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM categories ORDER BY type, name');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin ONLY: เพิ่มหมวดหมู่
app.post('/api/categories', verifyToken, async (req, res) => {
    const { type, category_id, name, icon } = req.body;
    try {
        const [result] = await db.query('INSERT INTO categories (type, category_id, name, icon) VALUES (?, ?, ?, ?)', [type || 'ai', category_id, name, icon || 'Menu']);
        res.status(201).json({ message: "Category created successfully!", id: result.insertId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin ONLY: แก้ไขหมวดหมู่
app.put('/api/categories/:id', verifyToken, async (req, res) => {
    const { type, category_id, name, icon } = req.body;
    try {
        await db.query('UPDATE categories SET type = ?, category_id = ?, name = ?, icon = ? WHERE id = ?', [type, category_id, name, icon, req.params.id]);
        res.status(200).json({ message: "Category updated successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin ONLY: ลบหมวดหมู่
app.delete('/api/categories/:id', verifyToken, async (req, res) => {
    try {
        await db.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
        res.status(200).json({ message: "Category deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ==========================================
// 3. Prompts endpoints
// ==========================================
// Public: ดึงข้อมูล Prompts (คำสั่ง) ทั้งหมด
app.get('/api/prompts', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT prompts.*, ais.name AS ai_name FROM prompts LEFT JOIN ais ON prompts.ai_id = ais.id ORDER BY prompts.created_at DESC');
        const formattedRows = rows.map(row => {
            try {
                const parsed = JSON.parse(row.content);
                return { ...parsed, db_id: row.id, id: row.id.toString(), ai_id: row.ai_id };
            } catch (e) {
                return { db_id: row.id, id: row.id.toString(), title: row.title, prompt: row.content, ai_id: row.ai_id, tags: [], category: "writing" };
            }
        });
        res.status(200).json(formattedRows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin ONLY: เพิ่ม Prompt
app.post('/api/prompts', verifyToken, async (req, res) => {
    const data = req.body;
    const title = data.title || "Untitled";
    const ai_id = data.ai_id || null;
    const content = JSON.stringify(data);
    const category_id = data.category || "";
    const category_ids = data.categoryIds ? JSON.stringify(data.categoryIds) : '[]';

    try {
        const [result] = await db.query('INSERT INTO prompts (title, content, ai_id, category_id, category_ids) VALUES (?, ?, ?, ?, ?)', [title, content, ai_id, category_id, category_ids]);
        res.status(201).json({ message: "Prompt created successfully!", id: result.insertId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin ONLY: แก้ไข Prompt
app.put('/api/prompts/:id', verifyToken, async (req, res) => {
    const data = req.body;
    const title = data.title || "Untitled";
    const ai_id = data.ai_id || null;
    const content = JSON.stringify(data);
    const category_id = data.category || "";
    const category_ids = data.categoryIds ? JSON.stringify(data.categoryIds) : '[]';

    try {
        await db.query('UPDATE prompts SET title = ?, content = ?, ai_id = ?, category_id = ?, category_ids = ? WHERE id = ?', [title, content, ai_id, category_id, category_ids, req.params.id]);
        res.status(200).json({ message: "Prompt updated successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin ONLY: ลบ Prompt
app.delete('/api/prompts/:id', verifyToken, async (req, res) => {
    try {
        await db.query('DELETE FROM prompts WHERE id = ?', [req.params.id]);
        res.status(200).json({ message: "Prompt deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ตัวแถมสำหรับ import ข้อมูลเริ่มต้นตอนว่างเปล่า
app.post('/api/seed', async (req, res) => {
    const { ais, prompts } = req.body;
    try {
        for (const ai of ais) {
            const description = JSON.stringify(ai);
            await db.query('INSERT INTO ais (name, description, link) VALUES (?, ?, ?)', [ai.name, description, ai.officialWebsite || ""]);
        }
        for (const prompt of prompts) {
            const content = JSON.stringify(prompt);
            await db.query('INSERT INTO prompts (title, content) VALUES (?, ?)', [prompt.title, content]);
        }
        res.json({ message: "Seeded" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    initializeAdmin();
});
