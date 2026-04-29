const BASE_URL = 'http://localhost:5000'; // URL หลักของ Backend
const API_URL = `${BASE_URL}/api`;        // URL สำหรับเรียก API

export const fetchNews = async () => {
  try {
    const response = await fetch(`${API_URL}/news`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch news error:', error);
    return { success: false, data: [] };
  }
};

// ไว้สำหรับแสดงรูปภาพ
export const getImageUrl = (pathFromDb) => {
  if (!pathFromDb) return '/placeholder.png'; 
  
  // ใช้ BASE_URL (ไม่มี /api) เพื่อให้ได้ Path: http://localhost:5000/uploads/images/...
  return `${BASE_URL}/${pathFromDb}`;
};