import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom'
import { Cart } from '../components'
import { useState, useEffect } from 'react'

function Header({ user, handleLogout, userCart, removeInCart, setSearchText, category, setCategory, handleSearch, searchText, categories, favorites, getProduct }) {
    const [sum, setSum] = useState(0);
    const [sumFavorite, setSumFavorite] = useState(0)
    const name = user ? user.name : ''
    const username = user ? user.username : ''
    useEffect(() => {
        let quantity = 0;
        if (userCart.length !== 0) {
            userCart.forEach(item => {
                quantity += item.quantity;
            });
        }
        setSum(quantity);
        setSumFavorite(favorites.length);

    }, [userCart, favorites]);

    return (
        <div className='header'>
            <div className='header-wrap'>
                <div className='logo' onClick={() => getProduct()}>
                    <Link to="/"><img src='/assets/images/logo.png' alt="logo"/>COLA</Link>
                </div>
                <div className='header-right'>
                    <div className='search-style-2'>
                        <form style={{ display: 'flex' }}>
                            <select value={category} onChange={(event) => setCategory(event.target.value)}>
                                {categories.length > 0 && categories.map(item => (
                                    <option key={item.id} value={item.name}>{item.name}</option>
                                ))}
                            </select>

                            <input type="text" value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder='Tìm kiếm sản phẩm...' />
                            <button onClick={handleSearch} style={{ border: 'none', width: 90 }}><span>Tìm kiếm</span></button>
                        </form>
                    </div>
                    <div className='header-action-right'>
                        <div className='header-action-icon'>                            
                            <Link to="/home" onClick={() => getProduct()}><i className="fa-solid fa-house"></i><span>Trang chủ</span></Link>
                        </div>
                        {
                            (user && user.isAdmin) && (
                                <div className='header-action-icon'>                                    
                                    <Link to="/admin/create"><i className="fa-solid fa-screwdriver-wrench"></i><span>Quản lý</span></Link>
                                </div>
                            )
                        }
                        {
                            (user && !user.isAdmin) && (
                                <div style={{ display: 'flex', alignItems:'center' }}>
                                    <div className='header-action-icon'>                                        
                                        <Link to="/favorite"><Badge badgeContent={sumFavorite} color="primary"><i className="fa-regular fa-heart"></i></Badge><span>Yêu thích</span></Link>
                                    </div>
                                    <div className='header-action-icon cart-icon'>                                        
                                        <Cart userCart={userCart} removeInCart={removeInCart} />
                                        <Link to="/cart"><Badge badgeContent={sum} color="primary"><i className="fa-solid fa-cart-shopping"></i></Badge><span>Giỏ hàng</span></Link>
                                    </div>
                                    <div className='header-action-icon'>                                        
                                        <Link to="/invoicelist"><i className="fa-regular fa-rectangle-list"></i><span>Đơn hàng</span></Link>
                                    </div>
                                </div>
                            )
                        }
                        {
                            username !== '' &&
                            <div className='header-action-icon'>
                                <Link to="/updateProfile"><i className="fa-regular fa-circle-user"></i><span>{name}</span></Link>                                
                                <button onClick={handleLogout} className='header-logout'><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                            </div>
                        }
                        {username === '' &&
                            <div style={{ display: 'flex', alignItems:'center' }}>
                                <Link to="/login" className='header-button' style={{ marginRight: 10 }}>Đăng nhập</Link>
                                <Link to="/signup" className='header-button' style={{ marginRight: 10 }}>Đăng ký</Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header