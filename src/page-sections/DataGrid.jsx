import UpdateProduct from './UpdateProduct';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';

function DataGrid({ products, setProducts }) {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [findText, setFindText] = useState(0)
    const uploadClick = (event, product) => {
        event.preventDefault()
        const upload = ReactDOM.createRoot(document.getElementById('upload'))
        upload.render(<UpdateProduct setProducts={setProducts} id={product.id} name={product.name} price={product.price} categories={product.categoriesName}
            total={product.total} describe={product.describe} image={product.image} isActive={product.isActive} />)
    }
    const handleFilter = (event) => {
        event.preventDefault();
        let filteredProducts = [...products]; // Tạo một bản sao của mảng sản phẩm để không thay đổi mảng gốc
    
        if(findText==="0"){
            filteredProducts.sort((a, b) => {
                return b.price - a.price;
              });
        }
        if(findText==="1"){
            filteredProducts.sort((a, b) => {
                return a.price - b.price;
              });
        }
        if (findText === "2") {
          filteredProducts.sort((a, b) => {
            return b.total - a.total;
          });
        }
        if (findText === "3") {
          filteredProducts.sort((a, b) => {
            return a.total - b.total;
          });
        }
        if(findText === "4"){
            filteredProducts = filteredProducts.filter(
                (product) =>
                  product.isActive === true
              );
        }
        if(findText === "5"){
            filteredProducts = filteredProducts.filter(
                (product) =>
                  product.isActive === false
              );
        }
        setFilteredProducts(filteredProducts);
      };
    return (
        <div className='grid-container'>
            <div id="upload"></div>
            <h2 className='title'>Danh sách sản phẩm</h2>
            <div style={{marginBottom:20}}>
                <select value={findText} onChange={(event) => setFindText(event.target.value)}>
                    <option value={0}>Giá cao nhất</option>
                    <option value={1}>Giá thấp nhất</option>
                    <option value={2}>Bán nhiều nhất</option>
                    <option value={3}>Bán ít nhất</option>
                    <option value={4}>Đang bán</option>
                    <option value={5}>Đã ngừng bán</option>                    
                </select>                
                <button onClick={handleFilter}>Lọc</button>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>                        
                        <th>Giá</th>
                        <th>Đã bán</th>
                        <th>Tình trạng</th>
                        <th></th>
                    </tr>
                    {filteredProducts.map(product => {
                        return (
                            <tr key={product.id}>
                                <td><img width={60} src={`http://localhost:3001/${product.image}`} alt="image_product" /></td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.total}</td>
                                <td>{product.isActive ? 'Đang bán' : 'Đã ngừng bán'}</td>
                                <td className="col-edit">
                                    <button onClick={(event) => uploadClick(event, product)} className="edit-icon">
                                        <i className="fa-solid fa-pen" />
                                    </button>                                    
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default DataGrid