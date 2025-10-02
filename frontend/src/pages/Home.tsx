import { Link } from "react-router-dom";
import type { User } from "../App";

interface HomeProps {
  user: User | null;
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ user, onLogout }) => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Trang chủ</h1>
      {user ? (
        <div>
          <p>Xin chào, {user.username}</p>
          <button onClick={onLogout}>Đăng xuất</button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button>Đăng nhập</button>
          </Link>
          <Link to="/register">
            <button>Đăng ký</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
