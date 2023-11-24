import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
    const baseUrl = 'http://localhost:3001/api/users';
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let validationErrors = {};

        if (!email.trim()) {
            validationErrors.email = 'Vui lòng nhập email.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            validationErrors.email = 'Email không hợp lệ.';
        }

        if (!password) {
            validationErrors.password = 'Vui lòng nhập password.';
        } else if (password.length < 6) {
            validationErrors.password = 'Password phải chứa ít nhất 6 ký tự.';
        }

        if (!phoneNumber) {
            validationErrors.phoneNumber = 'Vui lòng nhập số điện thoại.';
        } else if (phoneNumber.length < 10) {
            validationErrors.phoneNumber = 'Sai số điện thoại.';
        }

        if (!name.trim()) {
            validationErrors.name = 'Vui lòng nhập tên người dùng.';
        }

        if (!location.trim()) {
            validationErrors.location = 'Vui lòng nhập địa chỉ.';
        }

        return validationErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            handleSignUp();
        } else {
            setErrors(validationErrors);
        }
    };

    const handleSignUp = async () => {
        try {
            const username = await email
            if (name === '' || email === '' || password === '' || location === '' || phoneNumber === '') {
                document.getElementById('status').innerHTML = 'Nhập thiếu thông tin!';
            } else {
                const newAccount = {
                    username: username,
                    name: name,
                    email: email,
                    password: password,
                    location: location,
                    phoneNumber: phoneNumber
                };
                const response = await axios.post(baseUrl, newAccount);
                if(response.status === 201){
                    alert('Đăng ký thành công! Đăng nhập để sử dụng tài khoản.');
                    navigate('/login');
                }                
                
            }
        } catch (exeption) {
            alert('Email đã tồn tại!');
        }
    };

    return (
        <div className='signin_wrap'>
            <div className='heading_s1'>
                <h1>Đăng ký tài khoản</h1>
            </div>
            <form>
                <div className='form-group'>
                    <input type='text' value={name} onChange={(event) => setName(event.target.value)} placeholder='Họ tên *' />
                    {errors.name && <div>{errors.name}</div>}
                </div>
                <div className='form-group'>
                    <input type='text' value={email} onChange={(event) => setEmail(event.target.value)} placeholder='Email *' />
                    {errors.email && <div>{errors.email}</div>}
                </div>
                <div className='form-group'>
                    <input type='password' value={password} onChange={(event) => setPassword(event.target.value)} placeholder='Mật khẩu *' />
                    {errors.password && <div>{errors.password}</div>}
                </div>
                <div className='form-group'>
                    <input type='text' value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} placeholder='Số điện thoại *' />
                    {errors.phoneNumber && <div>{errors.phoneNumber}</div>}
                </div>
                <div className='form-group'>
                    <input type='text' value={location} onChange={(event) => setLocation(event.target.value)} placeholder='Địa chỉ *' />
                    {errors.location && <div>{errors.location}</div>}
                </div>
                <div className='signin_footer form-group'>
                    <div></div>
                    <div><a href='/login'>Đăng nhập tài khoản</a></div>
                </div>
                <div id='status' style={{ color: 'red' }}></div>
                <div className='form-group'><button className='btn-sign' onClick={handleSubmit}>Đăng ký</button></div>
            </form>
        </div>
    );
}

export default SignUp;
