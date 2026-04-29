import express from 'express';
import { getNews } from '../controllers/newsController.js';
import { upload } from '../services/upload.js';

const router = express.Router();

// เมื่อมี HTTP GET request มาที่ URL เริ่มต้นของ Route นี้ ให้เรียกใช้ฟังก์ชัน getNews
router.get('/', getNews);
router.post('/', upload.single('image'), createNews);

export default router;