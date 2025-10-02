import { Link } from "react-router-dom";
import type { User } from "../App";
import "../assets/css/Home.css";

interface HomeProps {
  user: User | null;
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ user, onLogout }) => {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <h1>MyApp</h1>
      </header>

      {/* Main Content */}
      <main className="home-content">
        <div className="welcome-section">
          <h2>Chào mừng đến với MyApp</h2>
          <p>Nền tảng quản lý và kết nối hiện đại cho mọi nhu cầu của bạn</p>
        </div>

        {user ? (
          <div className="user-card">
            <div className="user-header">
              <div className="user-avatar">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <h3>Xin chào, {user.username}!</h3>
                <p>Chúc bạn một ngày tốt lành</p>
              </div>
            </div>
            <button onClick={onLogout} className="logout-btn">
              Đăng xuất
            </button>
          </div>
        ) : (
          <div className="auth-card">
            <div className="auth-header">
              <div className="auth-icon"></div>
              <h3>Bắt đầu ngay</h3>
              <p>Đăng nhập hoặc tạo tài khoản mới để tiếp tục</p>
            </div>
            <div className="auth-buttons">
              <Link to="/login">
                <button className="btn btn-primary">Đăng nhập</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-secondary">Đăng ký</button>
              </Link>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h4>Nhanh chóng</h4>
            <p>Trải nghiệm mượt mà và hiệu suất cao</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h4>An toàn</h4>
            <p>Bảo mật thông tin tuyệt đối</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h4>Dễ sử dụng</h4>
            <p>Giao diện thân thiện, trực quan</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2025 MyApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;