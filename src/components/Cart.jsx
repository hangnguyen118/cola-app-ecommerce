import { useState, useEffect} from "react";
import { Link } from 'react-router-dom'

const Cart = ({userCart, removeInCart}) => {

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let price = 0;
      userCart.forEach(item => {
        price += item.product.price * item.quantity;
      });
      setTotalPrice(price);
    };
    calculateTotalPrice();
  }, [userCart]);

  return (
    <div className='cart-wrap'>
      <div className='cart-content'>
        <ul>
          {userCart.map( item =>  (
              <li key={item.product.id}>
                <div className="product">
                  <img src={item.product.image} alt="img" />
                  <div className="info">
                    <p className="name">{item.product.name}</p>
                    <p className="price">{item.quantity} x {item.product.price}</p>
                    
                  </div>  
                </div>
                <i className="fa-solid fa-xmark" onClick={() =>removeInCart(item.product.id)} style={{ color: 'black' }}></i>
              </li>
            ))
          }
        </ul>
      </div>
      <div className='cart-footer'>
          <div className='footer-content'><p>Tổng tiền: </p><p>{`$${totalPrice}`}</p></div>  
          <Link to="/cart" className="cart-btn">Xem thêm</Link>
          <Link to="/checkout" className="cart-btn">Thanh toán</Link>
      </div>
    </div>

  )
}

export default Cart