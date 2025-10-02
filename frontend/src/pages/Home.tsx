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
      <header className="home-header">
        <h1>MyApp</h1>
      </header>

      <main className="home-content">
        <div className="welcome-section">
          <h2>Chào mừng đến với MyApp</h2>
          <p>Nền tảng quản lý và kết nối hiện đại cho mọi nhu cầu của bạn</p>
        </div>

        {user ? (
          <div className="user-card">
            <div className="user-header">
              <Link
                to="/me"
                className="user-avatar-link"
                aria-label="Xem hồ sơ của tôi"
                title="Hồ sơ của tôi"
              >
                <div className="user-avatar" role="img" aria-hidden="true">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </Link>

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
              <div className="auth-icon" />
              <h3>Bắt đầu ngay</h3>
              <p>Đăng nhập hoặc tạo tài khoản mới để tiếp tục</p>
            </div>

            <div className="auth-buttons">
              <Link to="/login" className="btn btn-primary">
                Đăng nhập
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Đăng ký
              </Link>
            </div>
          </div>
        )}

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

      <footer className="home-footer">
        <p>© 2025 MyApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
