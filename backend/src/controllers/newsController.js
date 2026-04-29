import pool from '../db.js';

// ฟังก์ชันสำหรับดึงข้อมูลข่าวทั้งหมด
export const getNews = async (req, res) => {
  try {
    // ใช้คำสั่ง SQL ดึงข้อมูล เรียงจากข่าวล่าสุด
    const sql = `SELECT * FROM news ORDER BY created_at DESC`;
    const [rows] = await pool.query(sql);

    res.json({
      success: true,
      data: rows,
      total: rows.length
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ 
      success: false, 
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลข่าวสาร' 
    });
  }
};