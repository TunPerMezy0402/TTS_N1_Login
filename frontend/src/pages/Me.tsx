import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Me.css";

interface MeProps {
  token: string;
}

const Me: React.FC<MeProps> = ({ token }) => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        // ❌ Token cũ không hợp lệ → đăng xuất
        localStorage.removeItem("user");
        window.location.href = "/login";
        return;
      }

      const data = await res.json();
      if (res.ok) {
        setUserInfo(data);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  fetchUser();
}, [token]);


  if (!userInfo) {
    return (
      <div className="loading-container">
        <div className="loading-card">
          <div className="loading-spinner"></div>
          <p className="loading-text">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  // Get first letter of username for avatar
  const avatarLetter = userInfo.username.charAt(0).toUpperCase();
  
  // Format date if available
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="me-container">
      <div className="me-wrapper">
        {/* Header */}
        <div className="me-header">
          <h1>Thông tin tài khoản</h1>
          <Link to="/" className="back-btn">
            Về trang chủ
          </Link>
        </div>

        {/* Main Content */}
        <div className="me-content">
          {/* Profile Card */}
          <div className="profile-card">
            <div className="profile-avatar">{avatarLetter}</div>
            <h2 className="profile-name">{userInfo.username}</h2>
            <p className="profile-email">{userInfo.email}</p>

            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-value">24</span>
                <span className="stat-label">Bài viết</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">156</span>
                <span className="stat-label">Theo dõi</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">89</span>
                <span className="stat-label">Đang theo dõi</span>
              </div>
            </div>

            <div className="profile-actions">
              <button className="action-btn primary">Chỉnh sửa hồ sơ</button>
              <button className="action-btn">Cài đặt</button>
              <button className="action-btn">Chia sẻ hồ sơ</button>
            </div>
          </div>

          {/* Info Section */}
          <div className="info-section">
            {/* Personal Info */}
            <div className="info-card">
              <div className="info-card-header">
                <div className="info-card-icon">👤</div>
                <h2>Thông tin cá nhân</h2>
              </div>
              
              <div className="info-row">
                <span className="info-label">Tên người dùng</span>
                <span className="info-value">{userInfo.username}</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">Email</span>
                <span className="info-value">{userInfo.email}</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">Trạng thái</span>
                <span className="info-value status">Đang hoạt động</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">Vai trò</span>
                <span className="info-value badge">
                  {userInfo.role || "Thành viên"}
                </span>
              </div>
            </div>

            {/* Account Info */}
            <div className="info-card">
              <div className="info-card-header">
                <div className="info-card-icon">🔐</div>
                <h2>Thông tin tài khoản</h2>
              </div>
              
              <div className="info-row">
                <span className="info-label">ID tài khoản</span>
                <span className="info-value">{userInfo.id || userInfo._id || "N/A"}</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">Ngày tạo</span>
                <span className="info-value">
                  {formatDate(userInfo.createdAt)}
                </span>
              </div>
              
              <div className="info-row">
                <span className="info-label">Cập nhật lần cuối</span>
                <span className="info-value">
                  {formatDate(userInfo.updatedAt)}
                </span>
              </div>
              
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Me;