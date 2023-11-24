import { ProductCard } from '../components'

const Favorite = ({favorites, addToCart, getDetail, title, addFavorite}) => {
    return (
        <div>
            <div className='product-container'>
                <div className='table-header'>
                    <h1>{title}</h1>
                </div>
                <div className='product-table'>
                    {favorites.map(product => <ProductCard key={product.id} name={product.name} categories={product.categoriesName}
                        price={product.price} image={product.image} addToCart={addToCart} productId={product.id} getDetail={getDetail} addFavorite={addFavorite} favorites={favorites}/>)}
                </div>
            </div>
        </div>
    )
}

export default Favorite