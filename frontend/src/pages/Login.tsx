import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { User } from "../App";
import "../assets/css/Login.css";


interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        onLogin({ username: data.user.username, token: data.token });
        navigate("/");
      } else {
        setError(data.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      console.error(err);
      setError("Không thể kết nối đến server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Link to="/" className="back-home">
        Về trang chủ
      </Link>

      <div className="login-card">
        <div className="login-header">
          <div className="login-icon"></div>
          <h1>Đăng nhập</h1>
          <p>Chào mừng bạn quay trở lại!</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="forgot-password">
            <a href="#">Quên mật khẩu?</a>
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="divider">
          <span>hoặc</span>
        </div>

        <div className="social-login">
          <button className="social-btn google">
            🔍 Google
          </button>
          <button className="social-btn facebook">
            📘 Facebook
          </button>
        </div>

        <div className="signup-link">
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;