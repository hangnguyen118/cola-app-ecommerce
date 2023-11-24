import { useState } from 'react';

const SignIn = ({ handleLogin, setUsername, setPassword, username, password }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let validationErrors = {};

    // Kiểm tra username
    if (!username.trim()) {
      validationErrors.username = 'Vui lòng nhập email.';
    } else if (!/\S+@\S+\.\S+/.test(username)) {
      validationErrors.username = 'Email không hợp lệ.';
    }

    // Kiểm tra password
    if (!password) {
      validationErrors.password = 'Vui lòng nhập password.';
    } else if (password.length < 6) {
      validationErrors.password = 'Password phải chứa ít nhất 6 ký tự.';
    }

    return validationErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      handleLogin();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='signin_wrap'>
      <div className='heading_s1'>
        <h1>Đăng nhập</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input type="text" placeholder='Email *' value={username} name="Username" onChange={(event) => setUsername(event.target.value)} />
          {errors.username && <div>{errors.username}</div>}
        </div>
        <div className='form-group'>
          <input type="password" placeholder='Mật khẩu *' value={password} name="Password" onChange={(event) => setPassword(event.target.value)} />
          {errors.password && <div>{errors.password}</div>}
        </div>
        <div className='signin_footer form-group'>
          <div><a href="index.html">Quên mật khẩu?</a></div>
          <div><a href="/singup">Đăng ký tài khoản</a></div>
        </div>
        <div className='form-group'>
          <button className='btn-sign' type='submit'>Đăng nhập</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
