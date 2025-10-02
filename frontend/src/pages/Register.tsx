import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { User } from "../App";
import "../assets/css/Register.css";


interface RegisterProps {
  onRegister: (user: User) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return "";
    if (pass.length < 6) return "weak";
    if (pass.length < 10 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) return "medium";
    if (pass.length >= 10 && /[A-Z]/.test(pass) && /[0-9]/.test(pass) && /[!@#$%^&*]/.test(pass)) return "strong";
    return "medium";
  };

  const passwordStrength = getPasswordStrength(password);

  const passwordRequirements = [
    { text: "Ít nhất 6 ký tự", valid: password.length >= 6 },
    { text: "Chứa chữ hoa", valid: /[A-Z]/.test(password) },
    { text: "Chứa số", valid: /[0-9]/.test(password) },
    { text: "Chứa ký tự đặc biệt", valid: /[!@#$%^&*]/.test(password) },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!agreeTerms) {
      setError("Vui lòng đồng ý với điều khoản dịch vụ");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem("token", data.user.token);
        localStorage.setItem("username", data.user.username);
        onRegister({ username: data.user.username, token: data.user.token });
        navigate("/");
      } else {
        setError(data.message || "Đăng ký thất bại");
      }
    } catch (err) {
      console.error(err);
      setError("Không thể kết nối đến server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <Link to="/" className="back-home">
        Về trang chủ
      </Link>

      <div className="register-card">
        <div className="register-header">
          <div className="register-icon"></div>
          <h1>Đăng ký</h1>
          <p>Tạo tài khoản mới để bắt đầu hành trình của bạn</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username">Tên người dùng</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                id="username"
                type="text"
                placeholder="Nhập tên người dùng"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

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
                placeholder="Tạo mật khẩu mạnh"
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
            
            {password && (
              <>
                <div className="password-strength">
                  <div className={`password-strength-bar ${passwordStrength}`}></div>
                </div>
                <div className="password-strength-text">
                  Độ mạnh: {
                    passwordStrength === "weak" ? "Yếu" :
                    passwordStrength === "medium" ? "Trung bình" :
                    passwordStrength === "strong" ? "Mạnh" : ""
                  }
                </div>
                
                <div className="password-requirements">
                  <h4>Yêu cầu mật khẩu:</h4>
                  <ul>
                    {passwordRequirements.map((req, index) => (
                      <li key={index} className={req.valid ? "valid" : ""}>
                        {req.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

          <div className="terms-checkbox">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <label htmlFor="terms">
              Tôi đồng ý với <a href="#">Điều khoản dịch vụ</a> và{" "}
              <a href="#">Chính sách bảo mật</a>
            </label>
          </div>

          <button 
            type="submit" 
            className="register-btn"
            disabled={loading || !agreeTerms}
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <div className="divider">
          <span>hoặc đăng ký với</span>
        </div>

        <div className="social-register">
          <button className="social-btn google">
            🔍 Google
          </button>
          <button className="social-btn facebook">
            📘 Facebook
          </button>
        </div>

        <div className="login-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;