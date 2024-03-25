import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import invoiceServices from '../services/invoice';
import cartService from '../services/cart';

const Checkout = ({
  name,
  phoneNumber,
  location,
  userId,
  userCart,
  setUserCart,
  removeInCart,
  shippingMethods,
  getInvoiceDetail,
  paymentMethods,
}) => {
  const [note, setNote] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(shippingMethods[0]);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);
  const [fee, setFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(-1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [prevIsSuccess, setPrevIsSuccess] = useState(false);
  const [invoiceId, setInvoiceId] = useState('')

  useEffect(() => {
    if (shippingMethods.length > 0) {
      setSelectedMethod(shippingMethods[0]);
      setFee(shippingMethods[0].price);
    }
  }, [shippingMethods]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let price = 0;
      userCart.forEach((item) => {
        price += item.product.price * item.quantity;
      });
      setTotalAmount(price + fee);
    };
    calculateTotalPrice();
  }, [userCart, fee]);

  useEffect(() => {
    if (isSuccess && !prevIsSuccess) {
      getInvoiceDetail(invoiceId);
    }
    setPrevIsSuccess(isSuccess);
  }, [isSuccess, prevIsSuccess, getInvoiceDetail, invoiceId]);


  const handleShippingMethodChange = (event) => {
    const selectedId = event.target.value;
    const selected = shippingMethods.find((method) => method.id === selectedId);
    setSelectedMethod(selected);
    setFee(selected.price);
  };

  const handlePayMethodChange = (event) => {
    const selectId = event.target.value;
    const selected = paymentMethods.find((method) => method.id === selectId);
    setSelectedPayment(selected);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (userCart.length <= 0) {
        alert('Vui lòng thêm sản phẩm!');
      } else {
        const newInvoice = {
          userId: userId,
          totalAmount: totalAmount,
          shippingMethod: selectedMethod.name,
          paymentMethod: selectedPayment.name,
          note: note,
        };
        const response = await invoiceServices.create(newInvoice);
        console.log(response);
        console.log(response.status);
        if (response.status !== 201) {
          document.getElementById('status').innerHTML = 'Đặt hàng không thành công';
        }
        setInvoiceId(response.data)
        setIsSuccess(true);
        await cartService.clearCart({ userId });
        setUserCart([]);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="checkout">
      <div className="checkout-left">
        <h3 style={{ margin: 0 }}>Đơn hàng</h3>
        <div className="cart-content">
          <ul>
            {userCart.map((item) => (
              <li key={item.product.id}>
                <div className="product">
                  <img src={item.product.image} alt="img" />
                  <div className="info">
                    <p className="name">{item.product.name}</p>
                    <p className="price">
                      {item.quantity} x {item.product.price}
                    </p>
                  </div>
                </div>
                <i
                  className="fa-solid fa-xmark"
                  onClick={() => removeInCart(item.product.id)}
                  style={{ color: 'black' }}
                ></i>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <form className="checkout-right">
        <div className="checkout-group">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <h3 style={{ margin: 0 }}>Thông tin nhận hàng</h3>
            <Link to="/updateProfile" className="btn-invoiceChange">
              Thay đổi
            </Link>
          </div>
          <p>Họ tên: {name}</p>
          <p>SĐT: {phoneNumber}</p>
          <p>Địa chỉ: {location}</p>
          <textarea
            name="postContent"
            rows={4}
            cols={50}
            placeholder="Ghi chú nếu có *"
            type="text"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </div>

        <div className="checkout-group">
          <h3>Hình thức vận chuyển</h3>
          {shippingMethods &&
            shippingMethods.map((method) => (
              <label key={method.id} style={{display:'block'}}>
                <input
                  type="radio"
                  value={method.id}
                  checked={selectedMethod.id === method.id}
                  onChange={handleShippingMethodChange}
                />
                {method.name}
              </label>
            ))}
        </div>

        <div className="checkout-group">
          <h3>Phương thức thanh toán</h3>
          {paymentMethods &&
            paymentMethods.map((method) => (
              <label key={method.id} style={{display:'block'}} >
                <input
                  type="radio"
                  value={method.id}
                  checked={selectedPayment.id === method.id}
                  onChange={handlePayMethodChange}
                />
                {method.name}
              </label>
            ))}        
          <br />
        </div>
        <hr />
        <div style={{ textAlign: 'end' }}>
          <p>Phí vận chuyển: {fee}</p>
          <p>Thành tiền: {totalAmount}</p>
        </div>
        <div id="status" style={{ color: 'red' }}></div>
        <button
          className="header-button"
          onClick={handleSubmit}
          style={{ width: 120, height: 40, marginLeft: 480 }}
        >
          Đặt hàng
        </button>
      </form>
    </div>
  );
};

export default Checkout;
