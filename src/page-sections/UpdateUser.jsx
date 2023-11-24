import axios from 'axios';
import { useState } from 'react';

const UpdateUser = ({ userId, setUser, name, email, password, location, phoneNumber }) => {
    const baseUrl = 'http://localhost:3001/api/users/edit';

    const [userName, setUserName] = useState(name);
    const [userEmail, setUserEmail] = useState(email);
    const [userPassword, setUserPassword] = useState(password);
    const [userPhoneNumber, setUserPhoneNumber] = useState(phoneNumber);
    const [userLocation, setUserLocation] = useState(location);

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let validationErrors = {};

        if (!userEmail.trim()) {
            validationErrors.email = 'Vui lòng nhập email.';
        } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
            validationErrors.email = 'Email không hợp lệ.';
        }

        if (!userPassword) {
            validationErrors.password = 'Vui lòng nhập password.';
        } else if (userPassword.length < 6) {
            validationErrors.password = 'Password phải chứa ít nhất 6 ký tự.';
        }

        if (!userPhoneNumber) {
            validationErrors.phoneNumber = 'Vui lòng nhập số điện thoại.';
        } else if (userPhoneNumber.length < 10) {
            validationErrors.phoneNumber = 'Sai số điện thoại.';
        }

        if (!userName.trim()) {
            validationErrors.name = 'Vui lòng nhập tên người dùng.';
        }

        if (!userLocation.trim()) {
            validationErrors.location = 'Vui lòng nhập địa chỉ.';
        }

        return validationErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.patch(baseUrl, { userId, userName, userEmail, userPassword, userLocation, userPhoneNumber });
                if (response.status === 200) {
                    setUser(response.data);
                    alert("Cập nhật thông tin thành công!")
                }
            } catch (error) {
                console.error(error);
                setErrors('Lỗi khi thao tác với tài khoản.');
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className='wrap-center'>
            <div className='heading_s1'>
                <h1>Thông tin cá nhân</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <h3>Họ tên</h3>
                    <input type='text' value={userName} onChange={(event) => setUserName(event.target.value)}/>
                    {errors.name && <div>{errors.name}</div>}
                </div>
                <div className='form-group'>
                    <h3>Email/ Tên đăng nhập</h3>
                    <input type='text' value={userEmail} onChange={(event) => setUserEmail(event.target.value)} />
                    {errors.email && <div>{errors.email}</div>}
                </div>
                <div className='form-group'>
                    <h3>Mật khẩu</h3>
                    <input type='password' value={userPassword} onChange={(event) => setUserPassword(event.target.value)}/>
                    {errors.password && <div>{errors.password}</div>}
                </div>
                <div className='form-group'>
                    <h3>Địa chỉ</h3>
                    <input type='text' value={userLocation} onChange={(event) => setUserLocation(event.target.value)} />
                    {errors.location && <div>{errors.location}</div>}
                </div>
                <div className='form-group'>
                    <h3>Số điện thoại</h3>
                    <input type='text' value={userPhoneNumber} onChange={(event) => setUserPhoneNumber(event.target.value)} />
                    {errors.phoneNumber && <div>{errors.phoneNumber}</div>}
                </div>
                <div className='form-group'><button type='submit' className='btn-sign'>Lưu</button></div>
            </form>
        </div>
    );
}

export default UpdateUser;

