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
    // ดึงข้อมูลข้อความจาก req.body
    const { title, detail, category, status } = req.body;
    
    // ดึงชื่อไฟล์รูปภาพจาก req.file (ถ้ามีอัปโหลดมา)
    const image_cover = req.file ? req.file.filename : null;

    // คำสั่ง SQL สำหรับเพิ่มข้อมูล 
    const sql = `
      INSERT INTO news (title, detail, image_cover, category, status, created_at) 
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    
    // ส่งข้อมูลเข้าไปแทนที่เครื่องหมาย ? ตามลำดับ
    const [result] = await pool.query(sql, [title, detail, image_cover, category, status || 'active']);

    res.status(201).json({
      success: true,
      message: 'เพิ่มข่าวสารสำเร็จ!',
      insertId: result.insertId // ส่ง ID ของข่าวที่เพิ่งสร้างกลับไป
    });
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ 
      success: false, 
      message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' 
    });
  }
};