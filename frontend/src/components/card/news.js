import { getImageUrl } from '@/services/api';
import '@/assets/scss/components/card.scss';

export default function NewsCard({ item }) {
  return (
    <div className="card card-news">
      <div className="card-image h-48">
        <img 
          src={getImageUrl(item.image)} 
          alt={item.title}
          onError={(e) => {
            e.currentTarget.onerror = null; // ป้องกัน infinite loop หากโหลดไฟล์รูป placeholder ไม่ได้
            e.currentTarget.src = '/placeholder.png'; // ชี้ไปยังไฟล์ placeholder.png ในโฟลเดอร์ public
          }}
        />
        <span className="news-tag">
          {item.category}
        </span>
      </div>
      
      <div className="card-body">
        <h3 className="news-title line-clamp-1">{item.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{item.content}</p>
        
        <div className="news-footer">
          <span>{new Date(item.created_at).toLocaleDateString('th-TH')}</span>
          <span>👁️ {item.views || 0} views</span>
        </div>
      </div>
    </div>
  );
}