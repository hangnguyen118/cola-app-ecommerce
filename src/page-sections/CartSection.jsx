import { Link } from 'react-router-dom'
import { useState, useEffect} from "react";

function CartSection({ userCart, removeInCart }) {
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
        <div style={{backgroundColor:'white', padding:30, height:'1600px'}}>
            <div className='cart-content' style={{ marginLeft: 300, width: 800, height: '100%', overflow: 'unset', marginBottom:50}}>
                <h1>Giỏ hàng</h1>
                <ul>
                    {userCart.map(item => (
                        <li key={item.product.id}>
                            <div className="product">
                                <img src={item.product.image} alt="img" />
                                <div className="info">
                                    <p className="name">{item.product.name}</p>
                                    <p className="price">{item.quantity} x {item.product.price}</p>

                                </div>
                            </div>
                            <i className="fa-solid fa-xmark" onClick={() => removeInCart(item.product.id)} style={{ color: 'black' }}></i>
                        </li>
                    ))
                    }
                </ul>
                <hr/>
                <div className='cart-footer'>
                    <div className='footer-content'>
                    <p>Total: {`$${totalPrice}`}</p></div>
                    <Link to="/checkout" className="checkout-btn">Checkout</Link>
                </div>
            </div>
        </div>
    )
}

export default CartSection