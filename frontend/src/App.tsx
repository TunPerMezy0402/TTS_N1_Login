import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Me from "./pages/Me";

export interface User {
  username: string;
  token: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");

      if (token && username) {
        try {
          // Gọi API /me để kiểm tra token còn hạn
          const res = await fetch("http://localhost:5000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (res.ok) {
            setUser({ username, token });
          } else {
            // ❌ Token hết hạn hoặc không hợp lệ
            handleLogout();
          }
        } catch (err) {
          console.error("Lỗi kiểm tra token:", err);
          handleLogout();
        }
      }

      setLoading(false);
    };

    checkToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
  };

  if (loading) {
    return <div>Đang tải...</div>; // tránh flicker trắng khi refresh
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
        <Route
          path="/login"
          element={!user ? <Login onLogin={setUser} /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register onRegister={setUser} /> : <Navigate to="/" />}
        />
        <Route
          path="/me"
          element={user ? <Me token={user.token} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
