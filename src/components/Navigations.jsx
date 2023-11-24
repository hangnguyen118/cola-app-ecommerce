import { Link } from 'react-router-dom'
const Navigations = (props) => {
  return (
    <div className="navigations">
        <ul>          
          <li><i className="fa-solid fa-gear"></i><Link to="/admin/create">Thêm sản phẩm mới</Link></li>
          <li><i className="fa-solid fa-gear"></i><Link to="/admin/edit">Danh sách sản phẩm</Link></li>
          <li><i className="fa-solid fa-gear"></i><Link to="/admin/invoicelist">Danh sách đơn đặt hàng</Link></li>
          <li><i className="fa-solid fa-gear"></i><Link to="/admin/users">Cài đặt user</Link></li>
        </ul>
    </div>
  )
}

export default Navigations