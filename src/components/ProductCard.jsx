import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

function ProductCard({ productId, name, categories, price, image, addToCart, getDetail, addFavorite, favorites }) {
    const favoriteProduct = favorites.find((product) => product.id === productId);
    return (
        <Card className='product-item' sx={{ minWidth: 250 }}>
            <CardContent onClick={() => getDetail({ productId })}>
                <div className='product-img'><img src={`http://localhost:3001/${image}`} alt="" /></div>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {categories}
                </Typography>
                <Typography variant="h5" component="div" className="product-title">
                    {name}
                </Typography>
                <Stack spacing={1}>
                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                </Stack>
            </CardContent>
            <CardActions>
                <p style={{ marginRight: 10 }}>Giá: {price}$</p>
                {
                    (favoriteProduct) ? <i onClick={() => addFavorite(productId)} className="fa-solid fa-heart favorite"></i>
                        : <i onClick={() => addFavorite(productId)} className="fa-regular fa-heart favorite"></i>
                }

                <Button size="small" onClick={() => addToCart(productId)}>Thêm</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard