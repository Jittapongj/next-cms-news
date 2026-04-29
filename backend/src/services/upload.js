import multer from 'multer';
import path from 'path';

// ตั้งค่าที่เก็บไฟล์และชื่อไฟล์
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // เก็บไฟล์ไว้ที่โฟลเดอร์ uploads/
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // ตั้งชื่อไฟล์ใหม่: วันเวลาปัจจุบัน + สุ่มตัวเลข + นามสกุลไฟล์เดิม (ป้องกันชื่อซ้ำ)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// กำหนดเงื่อนไข (รับเฉพาะไฟล์รูปภาพ)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('กรุณาอัปโหลดเฉพาะไฟล์รูปภาพเท่านั้น!'), false);
  }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });