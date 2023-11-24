import { useState } from 'react'
import productsServices from '../services/products'
import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/products'

const CreateProduct = ({ userId, setProducts, categories, setCategories, SetShippingMethods }) => {

    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [categoriesName, setCategoriesName] = useState('')
    const [productDescribe, setProductDescribe] = useState('')
    const [productImage, setProductImage] = useState('')
    const [selectedImage, setSelectedImage] = useState(null)
    const [name, setName] = useState('')
    const [shippingName, setShippingName] = useState('')
    const [shippingPrice, setShippingPrice] = useState(0)

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            if (
                productName === '' || productPrice === '' || categoriesName === ''
                || productDescribe === '' || productImage === ''
            ) {
                document.getElementById("save-status").innerHTML = "Nhập thiếu thông tin!"
                document.getElementById("save-status").style.color = "#ff3838"
            }
            else {
                const newProduct = {
                    name: productName,
                    price: productPrice,
                    categoriesName: categoriesName,
                    describe: productDescribe,
                    userId: userId,
                }
                const response = await productsServices.create(newProduct, selectedImage)
                if (response.status === 201) {
                    document.getElementById("save-status").innerHTML = "Thêm một sản phẩm thành công!"
                    document.getElementById("save-status").style.color = "#00bf2e"
                    axios.get(baseUrl).then(response => {
                        setProducts(response.data)
                    })
                    setProductName('')
                    setProductPrice('')
                    setCategoriesName('')
                    setProductDescribe('')
                }
            }
        } catch (err) {
            console.error(err)
        }
    }
    const handleImageChange = (event) => {
        try {
            const file = event.target.files[0];
            const imageURL = URL.createObjectURL(file);
            setProductImage(imageURL);
            setSelectedImage(file);
        } catch (err) {
            console.error(err);
        }
    };
    const handleAddCategory = async (event) => {
        event.preventDefault()
        if (name !== '') {
            const response = await axios.post('http://localhost:3001/api/category', { name })
            if (response.status !== 200) {
                throw new Error(response.status);
            }
            setCategories(response.data)
            alert("Thêm loại mới thành công!")
        }
        alert("Kiểm tra lại thông tin!")
    }
    const handleAddShipping = async (event) => {
        event.preventDefault()
        if (shippingName !== '' || shippingPrice >= 0) {
            const response = await axios.post('http://localhost:3001/api/shipping', { shippingName, shippingPrice })
            if (response.status !== 200) {
                throw new Error(response.status);
            }
            SetShippingMethods(response.data)
            alert("Thêm thành công!")
        }
        alert("Kiểm tra lại thông tin!")
    }
    return (
        <div className='edit-form create-product'>
            <h2>Tạo sản phẩm mới</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <input type="text" value={productName} onChange={(event) => setProductName(event.target.value)} placeholder='Tên sản phẩm' />
                </div>
                <div className='form-group'>
                    <input type="number" value={productPrice} onChange={(event) => setProductPrice(event.target.value)} placeholder='Giá sản phẩm' />
                </div>

                <div className='form-group'>
                    <h5>Loại sản phẩm:</h5>
                    <select value={categoriesName} onChange={(event) => setCategoriesName(event.target.value)}>
                        {categories.length > 0 && categories.map(item => (
                            <option key={item.id} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className='form-group'>
                    <h5>Hình ảnh:</h5>
                    <input type="file" accept="image/*" onChange={handleImageChange} placeholder='Hình ảnh' />
                    {productImage && <img className='previewImage' src={productImage} alt="Preview" />}
                </div>
                <div className='form-group'>
                    <input type="text" value={productDescribe} onChange={(event) => setProductDescribe(event.target.value)} placeholder='Mô tả' />
                </div>
                <div id='save-status'></div>
                <button type='submit' style={{ marginTop: 20 }}>Lưu</button>
            </form>

            <h2>Thêm loại mới</h2>
            <form onSubmit={handleAddCategory}>
                <div className='form-group'>
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder='Tên loại mới' />
                </div>
                <button type='submit' style={{ marginTop: 20 }}>Thêm</button>
            </form>

            <h2>Thêm phương thức vận chuyển</h2>
            <form onSubmit={handleAddShipping}>
                <div className='form-group'>
                    <input type="text" value={shippingName} onChange={(event) => setShippingName(event.target.value)} placeholder='Tên loại vận chuyển' />
                </div>
                <div className='form-group'>
                    <input type="text" value={shippingPrice} onChange={(event) => setShippingPrice(event.target.value)} placeholder='Giá vận chuyển' />
                </div>
                <button type='submit' style={{ marginTop: 20 }}>Thêm</button>
            </form>
        </div>
    )
}

export default CreateProduct