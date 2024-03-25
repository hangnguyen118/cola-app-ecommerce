const ProductDetail = ({ productId, name, price, category, total, describe, image, addToCart }) => {
    return (
        <div className='detail'>            
            <div style={{display: 'flex'}}>
                <div className="wrap-left">
                    <div className="product-img">
                    <img src={image} alt="productImage" width={400}/>
                    </div>
                </div>
                <div className="wrap-right">
                    <div className='checkout-group'>
                        <h2>{name}</h2>
                        <p>Giá: {price}</p>
                        <p>Loại: {category}</p>
                        <p>Số lượng tồn: {total}</p>
                        <p>Mô tả: {describe}</p>    
                        <button onClick={() => addToCart(productId)}>Thêm sản phẩm</button>                   
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default ProductDetail