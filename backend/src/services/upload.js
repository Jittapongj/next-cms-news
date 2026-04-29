import multer from 'multer';
import path from 'path';
import fs from 'fs';

// ตั้งค่าที่เก็บไฟล์และชื่อไฟล์
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 1. กำหนดโฟลเดอร์ให้ลึกลงไปที่ uploads/images
    const dir = 'uploads/images';

    // 2. ตรวจสอบว่ามีโฟลเดอร์ไหม ถ้าไม่มีให้สร้างอัตโนมัติ (recursive: true)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // ตั้งชื่อไฟล์ใหม่: วันเวลา + สุ่มเลข (ป้องกันชื่อซ้ำ)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// กำหนดเงื่อนไข (รับเฉพาะไฟล์รูปภาพ)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    // ส่ง Error กลับไปถ้าไม่ใช่รูปภาพ
    cb(new Error('กรุณาอัปโหลดเฉพาะไฟล์รูปภาพเท่านั้น!'), false);
  }
};

export const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // จำกัดขนาดไฟล์ไว้ที่ 5MB
  }
});