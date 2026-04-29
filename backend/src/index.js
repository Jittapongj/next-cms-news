import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js'; // ดึงตัวเชื่อมต่อ Database มาใช้งาน
import newsRoutes from './routes/newsRoutes.js';

dotenv.config();

const app = express();

// Middleware พื้นฐาน
app.use(cors()); // อนุญาตให้ Frontend ยิง API มาได้
app.use(express.json()); // รับข้อมูลแบบ JSON
app.use('/api/news', newsRoutes); // ใช้ Route สำหรับข่าว
app.use('/uploads', express.static('uploads'));

// API เส้นทางแรกสำหรับทดสอบระบบ
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) as total FROM news');
    
    res.json({
      success: true,
      message: 'เชื่อมต่อ Database สำเร็จ!',
      totalNews: rows[0].total
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้ กรุณาเช็คไฟล์ .env',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend Server is running on http://localhost:${PORT}`);
});