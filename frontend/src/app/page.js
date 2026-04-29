'use client';
import { useEffect, useState } from 'react';
import { fetchNews } from '@/services/api';
import NewsCard from '@/components/card/news';
import Link from 'next/link'; // ใช้ Link สำหรับนำทางระหว่างหน้า
import '@/assets/scss/pages/home.scss';

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetchNews();
      if (response.success) {
        setNews(response.data);
      }
    } catch (error) {
      console.error("Failed to load news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <header className="main-header">
          <div className="title-section">
            <h1>News <span>Management</span></h1>
            <p>ระบบจัดการข่าวสารและคอนเทนต์หลังบ้าน</p>
          </div>
          
          <Link href="/create" className="btn-create">
            + เพิ่มข่าวใหม่
          </Link>
        </header>

        {loading ? (
          <div className="news-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton" />
            ))}
          </div>
        ) : (
          <>
            {news.length > 0 ? (
              <div className="news-grid">
                {news.map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>ไม่พบข้อมูลข่าวสารในระบบ กรุณาเพิ่มข่าวใหม่</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}