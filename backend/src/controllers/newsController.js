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

// ฟังก์ชันสำหรับเพิ่มข่าวใหม่
export const createNews = async (req, res) => {
  try {
    const { title, content, category, status } = req.body;
    
    // แก้ไขตรงนี้: ต่อ String 'uploads/images/' เข้าไปข้างหน้าชื่อไฟล์
    // เพื่อให้ใน DB บันทึกว่า uploads/images/filename.png
    const image = req.file ? `uploads/images/${req.file.filename}` : null;

    const sql = `
      INSERT INTO news (title, content, image, category, status, created_at) 
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    
    const [result] = await pool.query(sql, [title, content, image, category, status || 'active']);

    res.status(201).json({
      success: true,
      message: 'เพิ่มข่าวสารสำเร็จ!',
      insertId: result.insertId 
    });
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ 
      success: false, 
      message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' 
    });
  }
};