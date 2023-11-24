import { useState, useEffect } from 'react'
import axios from 'axios'
const baseUrl = `http://localhost:3001/api/invoice`

const Invoicelist = ({ getInvoiceDetail }) => {
    const [invoices, setInvoices] = useState([])
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [findText, setFindText] = useState('All')
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedColaAppAdmin')
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        const init = async () => {
            let response;
            if (user.isAdmin) {
                response = await axios.get(baseUrl);
            }
            else {
                response = await axios.get(`http://localhost:3001/api/invoice/${user.id}`);
            }
            if (response.status !== 200) {
                throw new Error(response.status);
            }
            setInvoices(response.data)
            setFilteredInvoices(response.data);
        }
        init()
    }, [])
    const setAccomplish = async (id) => {
        const response = await axios.put(`http://localhost:3001/api/invoice/${id}/complete`)
        if (response.status !== 200) {
            throw new Error(response.status);
        }
        setInvoices(response.data)
        setFilteredInvoices(response.data)
    }
    const handleFilter = (event) => {
        event.preventDefault();
        console.log(findText);
        const filteredInvoice = invoices.filter(
            (invoice) =>
                findText === 'All' || invoice.accomplish === (findText === 'true')
        );
        console.log(filteredInvoice);
        setFilteredInvoices(filteredInvoice);
    };
    return (
        <div style={{ width: 1000, marginLeft: 50, height:500 }}>
            <h2>Danh sách đơn đặt hàng</h2>
            <div>
                <select value={findText} onChange={(event) => setFindText(event.target.value)}>
                    <option value="All">Toàn bộ</option>
                    <option value={true}>Đã hoàn thành</option>
                    <option value={false}>Chưa hoàn thành</option>
                </select>
                <button onClick={handleFilter}>Lọc</button>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>Ngày tạo</th>
                        <th>Khách hàng</th>
                        <th>Tình trạng thanh toán</th>
                        <th>Trạng thái đơn hàng</th>
                        <th>Số điện thoại</th>
                        {
                            (user && user.isAdmin) && <th>Đổi trạng thái</th>
                        }
                        <th></th>
                    </tr>
                    {filteredInvoices.map(invoice => {
                        return (
                            <tr key={invoice.id}>
                                <td>{invoice.creationDate}</td>
                                <td>{invoice.user.name}</td>
                                <td>{invoice.paid ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
                                <td>{invoice.accomplish ? 'Đã giao' : 'Chưa hoàn thành'}</td>
                                <td>{invoice.user.phoneNumber}</td>
                                {
                                    (user && user.isAdmin) && <td>
                                        <button onClick={() => setAccomplish(invoice.id)}>Đã hoàn thành</button>
                                    </td>
                                }
                                <td>
                                    <button onClick={() => getInvoiceDetail(invoice.id)}>Chi tiết</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Invoicelist