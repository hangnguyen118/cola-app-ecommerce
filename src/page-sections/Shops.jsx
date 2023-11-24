import { ProductCard, Hero } from '../components'
import { useState } from 'react';

const Shops = ({ addToCart, products, getDetail, addFavorite, favorites}) => {
    const [filteredProducts, setFilteredProducts] = useState(null);
    const [findText, setFindText] = useState('0')
    const handleFilter = (event) => {
        event.preventDefault();
        let filteredProducts = [...products]; 

        if (findText === "0") {
            filteredProducts.sort((a, b) => {
                return b.price - a.price;
            });
        }
        if (findText === "1") {
            filteredProducts.sort((a, b) => {
                return a.price - b.price;
            });
        }
        if (findText === "2") {
            filteredProducts.sort((a, b) => {
                return b.total - a.total;
            });
        }
        setFilteredProducts(filteredProducts);
    };
    return (
        <div className='shop-main'>
            <Hero />
            <div className='product-container'>                
                <div className='table-header'>
                    <h1>Sản phẩm phổ biến</h1>   
                    <div style={{ margin:10 }}>
                        <select value={findText} onChange={(event) => setFindText(event.target.value)}>
                            <option value="0">Giá cao nhất</option>
                            <option value="1">Giá thấp nhất</option>
                            <option value="2">Bán chạy nhất</option>                            
                        </select>
                        <button onClick={handleFilter}>Lọc</button>
                    </div>                 
                </div>
                <div className='product-table'>
                    {(filteredProducts === null ? products : filteredProducts).map(product => product.isActive && <ProductCard key={product.id} name={product.name} categories={product.categoriesName}
                        price={product.price} image={product.image} addToCart={addToCart} productId={product.id} getDetail={getDetail} addFavorite={addFavorite} favorites={favorites} />)}
                </div>
            </div>

        </div>

    )
}

export default Shops