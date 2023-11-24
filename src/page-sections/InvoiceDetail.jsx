import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const InVoiceDetail = ({user}) => {
    const { invoiceId } = useParams();
    const [invoice, setInvoice] = useState(null)
    useEffect(() => {
        const init = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/invoice/id/${invoiceId}`)
                if (response.status === 200) {
                    setInvoice(response.data)
                    console.log(response.data)
                }
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết hóa đơn:", error);
            }
        }
        init()
    }, [invoiceId])

    if (!invoice) {
        return <div>Loading...</div>;
    }
    const onSuccess = async (details, data) => {
        const response = await axios.patch(`http://localhost:3001/api/invoice/${invoiceId}/paid`)
        if (response.status !== 200) {
            throw new Error(response.status);
        }
        alert('Thanh toán thành công!')
        setInvoice(response.data)
    };
    const onCancel = (data) => {
        alert('đã hủy thanh toán')
        console.log("Payment cancelled.");
    };

    const onError = (err) => {
        console.error("Payment error:", err);
    };
    return (
        <div className='wrap-center'>
            <PayPalScriptProvider options={{ 'client-id': 'AVus87ciWdj7kbhRkNCfYGV6Xrdliz8j5G8KaG0f8041ITfSrZK0WuyxuVTDvE-YwAGaN-pOJEbNwNTI' }}>
                {(!invoice.paid && invoice.paymentMethod === 'Thanh toán trực tuyến bằng Paypal' && (user.isAdmin===false)) && (
                    <div className="checkout-group">
                        <h3>Đơn hàng chưa được thanh toán! thanh toán ngay với paypal</h3>
                        <PayPalButtons style={{ layout: 'horizontal' }} createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: "USD",
                                            value: invoice.totalAmount,
                                        },
                                    },
                                ],
                            });
                        }}

                            onApprove={(data, actions) => {
                                return actions.order.capture().then((details) => onSuccess(details, data));
                            }}
                            onCancel={onCancel}
                            onError={onError}
                        />
                    </div>
                )}
            </PayPalScriptProvider>
            <div className='heading_s1'>
                <h2>Chi tiết đơn đặt hàng</h2>
            </div>
            <form>
                <div className="container" style={{ display: 'flex' }}>
                    <div style={{ minWidth: 400 }}>
                        <h3>Ngày tạo</h3>
                        <p>{invoice?.creationDate}</p>

                        <h3>Họ tên khách hàng</h3>
                        <p>{invoice?.user?.name}</p>

                        <h3>Số điện thoại</h3>
                        <p>{invoice?.user?.phoneNumber}</p>

                        <h3>Tổng tiền</h3>
                        <p>{invoice.totalAmount}$</p>

                        <h3>Phương thức thanh toán</h3>
                        <p>{invoice.paymentMethod}</p>

                        <h3>Tình trạng thanh toán</h3>
                        <p>{invoice?.paid ? 'Đã thanh toán' : 'chưa thanh toán'}</p>
                    </div>
                    <div style={{ minWidth: 400 }}>

                        <h3>Tình trạng giao</h3>
                        <p>{invoice?.accomplish ? 'Đã giao' : 'Đang giao'}</p>

                        <h3>Địa chỉ</h3>
                        <p>{invoice?.user?.location}</p>

                        <h3>Phương thức giao</h3>
                        <p>{invoice?.shippingMethod}</p>

                        <h3>Số điện thoại</h3>
                        <p>{invoice?.user?.phoneNumber}</p>

                        <h3>Ghi chú</h3>
                        <p>{invoice?.note}</p>
                    </div>
                </div>
                <hr style={{ width: 800, marginBottom: 60 }} />
                <h2>Danh sách mặt hàng</h2>
                <table style={{ minWidth: 800, marginBottom: 100 }}>
                    <tbody>
                        <tr>
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Hình ảnh</th>
                            <th>Số lượng</th>
                        </tr>
                        {invoice.items.map(item => {
                            return (
                                <tr key={item.product.id}>
                                    <td>{item.product.id}</td>
                                    <td>{item.product.name}</td>
                                    <td><img style={{ width: 80 }} src={`http://localhost:3001/${item.product.image}`} alt="product" /></td>
                                    <td>{item.quantity}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default InVoiceDetail;
