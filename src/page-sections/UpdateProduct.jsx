import { useState } from 'react'
import productsServices from '../services/products'
import axios from 'axios'

const UpdateProduct = ({ setProducts, id, name, price, categories, total, describe, image, isActive }) => {

    const [productName, setProductName] = useState(name)
    const [productPrice, setProductPrice] = useState(price)
    const [categoriesName, setCategoriesName] = useState(categories)
    const [productDescribe, setProductDescribe] = useState(describe)
    const [productImage, setProductImage] = useState(`http://localhost:3001/${image}`)
    const [selectedImage, setSelectedImage] = useState(null)
    const [productActive, setProductActive] = useState(isActive)

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            if (
                productName === '' || productPrice === '' || categoriesName === '' 
                || productDescribe === '' || productImage === '' 
            ) {
                document.getElementById("update-status").innerHTML = "Nhập thiếu thông tin!"
                document.getElementById("update-status").style.color = "#ff3838"
            }
            else {
                const newProduct = {
                    name: productName,
                    price: productPrice,
                    categoriesName: categoriesName,
                    describe: productDescribe,
                    isActive: productActive,
                }
                const response = await productsServices.update(newProduct, selectedImage, id)
                console.log(response.status)
                if (response.status !== 201) {
                    document.getElementById("update-status").style.color = 'red'
                    document.getElementById("update-status").innerHTML = "Cập nhật không thành công!"
                }
                alert("Cập nhật sản phẩm thành công!")
                axios.get('http://localhost:3001/api/products').then(response => {
                    setProducts(response.data)
                })
                document.getElementById('update-form').style = "display:none"
            }
        } catch (err) {
            console.error(err)
        }
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const imageURL = URL.createObjectURL(file);
        setProductImage(imageURL);
        setSelectedImage(file);
    };
    return (
        <div className='edit-form' id='update-form'>
            <h2>Cập nhật thông tin sản phẩm</h2>
            <form onSubmit={handleSubmit}>                
                <div className='form-group'>
                <label style={{fontWeight:700}}>Tên sản phẩm</label>
                    <input type="text" value={productName} onChange={(event) => setProductName(event.target.value)} placeholder={productName} />
                </div>
                <div className='form-group'>
                <label style={{fontWeight:700}}>Trạng thái</label>
                    <select value={productActive} onChange={(event) => setProductActive(event.target.value)} style={{display:'block', marginTop:10, marginBottom:20}}>
                        <option value={true}>Đang bán</option>
                        <option value={false}>Ngừng bán</option>
                    </select>
                </div>
                <div className='form-group'>
                <label style={{fontWeight:700}}>Giá</label>
                    <input type="number" value={productPrice} onChange={(event) => setProductPrice(event.target.value)} placeholder={productPrice} />
                </div>
                <div className='form-group'>
                <label style={{fontWeight:700}}>Hình ảnh</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} placeholder='Hình ảnh' />
                    <img className='previewImage' src={productImage} alt="Preview" />
                </div>
                <div className='form-group'>
                <label style={{fontWeight:700}}>Loại</label>
                    <input type="text" value={categoriesName} onChange={(event) => setCategoriesName(event.target.value)} placeholder={categoriesName} />
                </div>
                <div className='form-group'>
                <label style={{fontWeight:700}}>Mô tả sản phẩm</label>
                    <input type="text" value={productDescribe} onChange={(event) => setProductDescribe(event.target.value)} placeholder={productDescribe} />
                </div>
                <div id='update-status'></div>
                <button type='submit'>Cập nhật</button>
            </form>
        </div>
    )
}

export default UpdateProduct