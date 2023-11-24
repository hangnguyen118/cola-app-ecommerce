import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = `http://localhost:3001/api/users`;

const Userlist = () => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const response = await axios.get(baseUrl);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      setError('Lỗi khi tải danh sách tài khoản.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.patch(baseUrl, { username, isAdmin });
        if (response.status === 200) {
          setUsers(response.data);
          setError('');
        } else {
          setError('Không tìm thấy tài khoản!');
        }
      } catch (error) {
        console.error(error);
        setError('Lỗi khi thao tác với tài khoản.');
      }
    }
  };

  const validateForm = () => {
    if (!username.trim()) {
      setError('Vui lòng nhập username!');
      return false;
    }
    return true;
  };

  return (
    <div style={{ width: 1000, marginLeft: 50 }}>
      <form onSubmit={handleSubmit}>
        <h2>Thêm tài khoản admin</h2>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Nhập email *"
        />
        <p style={{ color: 'red' }}>{error}</p>
        <button type="submit" onClick={() => setIsAdmin(true)}>
          Thêm Admin
        </button>
        <button type="submit" onClick={() => setIsAdmin(false)}>
          Gỡ Admin
        </button>
      </form>

      <h2>Danh sách tài khoản</h2>
      <table>
        <tbody>
          <tr>
            <th>Họ tên</th>
            <th>Email</th>                        
            <th>Số điện thoại</th>
            <th>Loại tài khoản</th>
          </tr>
          {users.map((user) => {
            return (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.username}</td>                               
                <td>{user.phoneNumber}</td>
                <td>{user.isAdmin ? 'Admin' : 'User'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;