import { LoginLayout, AdminLayout } from "./components/layouts";
import { Footer, Header } from "./components";
import { useState, useEffect } from "react";
import loginService from './services/login';
import productsServices from './services/products'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Shops, Checkout, ProductDetail, UpdateUser, Favorite, CartSection, InvoiceDetail, Invoicelist } from "./page-sections"
import axios from "axios";


const baseUrl = 'http://localhost:3001/api/cart'

const App = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [userCart, setUserCart] = useState([]);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedColaAppAdmin');
    getProduct();
    getCategories();
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      getCart(user.username);
      getFavorite(user);
      getShippingMethod();
      getPaymentMethods()
    }
  }, []);

  const getFavorite = async (user) => {
    try {
      if (user) {
        const response = await axios.get(`http://localhost:3001/api/users/${user.id}/favorite`);
        if (response.status !== 200) {
          throw new Error(response.status);
        }
        setFavorites(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCategories = async () => {
    const response = await axios.get('http://localhost:3001/api/category')
    if (response.status !== 200) {
      throw new Error(response.data)
    }
    setCategories(response.data)
  }
  const getProduct = async () => {
    const response = await axios.get('http://localhost:3001/api/products')
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    setProducts(response.data)
    setSearchResults(response.data)
    console.log(searchResults)
    console.log(response.data)
  }

  const getShippingMethod = async () => {
    const response = await axios.get('http://localhost:3001/api/shipping')
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    setShippingMethods(response.data)
  }
  const getPaymentMethods = async () => {
    const response = await axios.get('http://localhost:3001/api/payment')
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    setPaymentMethods(response.data)
  }
  const handleLogin = async () => {
    try {
      const user = await loginService.login({
        username: username,
        password: password,
      });
      window.localStorage.setItem('loggedColaAppAdmin', JSON.stringify(user))
      productsServices.setToken(user.token)
      setUser(user);
      getCart(user.username)
      getFavorite(user)
      console.log('đăng nhập thành công')
      navigate('/admin/create');
    } catch (exception) {
      alert('Thông tin đăng nhập sai!');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedColaAppAdmin')
    setUserCart([])
    setUser(null)
    setFavorites([])
  }

  const getCart = async (username) => {
    try {
      const response = await axios.get(`${baseUrl}/${username}?`);
      const updatedUser = response.data;
      const cartItems = updatedUser.map(item => ({
        product: item.product,
        quantity: item.quantity,
      }))
      setUserCart(cartItems)
      console.log('Danh sách giỏ hàng:', cartItems);
    } catch (error) {
      console.error(error);
    }
  }
  const addToCart = async (productId) => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedColaAppAdmin')
      const user = JSON.parse(loggedUserJSON)
      if (!user.isAdmin) {
        const userId = user.id
        const response = await axios.post(baseUrl, { userId, productId })
        const cartItems = response.data;
        setUserCart(cartItems)
        alert('Sản phẩm đã được thêm vào giỏ hàng!')
      }
    } catch (error) {
      console.error(error);
    }

  }
  const removeInCart = async (productId) => {
    try {
      const userId = user.id
      const response = await axios.delete(`${baseUrl}/${userId}/${productId}`)
      console.log(response.status)
      if (response.status === 200) {
        const newCart = response.data
        setUserCart(newCart)
        console.log('Đã xóa sản phẩm');
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchText, category)
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (category === 'All' || category === '' || product.categoriesName === category)
    );
    console.log('Tìm kiếm sản phẩm', category)
    setCategory('')
    console.log(filteredProducts)
    setSearchResults(filteredProducts);
  };

  const getDetail = async ({ productId }) => {
    const response = await axios.get(`http://localhost:3001/api/products/${productId}`)
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    setProduct(response.data)
    navigate(`/products/${productId}`)
  }
  const addFavorite = async (productId) => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedColaAppAdmin')
      const user = JSON.parse(loggedUserJSON)
      if (!user.isAdmin) {
        const userId = user.id
        const response = await axios.post(`http://localhost:3001/api/users/${userId}/favorite`, { productId })
        if (response.status === 200) {
          alert("Đã thêm vào yêu thích.")
        }
        else {
          alert("Đã xóa khỏi yêu thích")
        }
        getFavorite(user)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getInvoiceDetail = (id) => {
    navigate(`/invoicelist/${id}`)
  }

  return (
    <>
      <Header user={user} handleLogout={handleLogout}
        userCart={userCart} removeInCart={removeInCart} setSearchText={setSearchText} setCategory={setCategory} handleSearch={handleSearch}
        searchText={searchText} category={category} categories={categories} favorites={favorites} getProduct={getProduct}/>
      <Routes>
        <Route path="/" element={<Shops addToCart={addToCart} products={searchResults} getDetail={getDetail} addFavorite={addFavorite} favorites={favorites} />} />
        <Route path="/home" element={<Shops addToCart={addToCart} products={searchResults} getDetail={getDetail} addFavorite={addFavorite} favorites={favorites} />} />
        <Route path="/products/*" element={<Shops addToCart={addToCart} products={searchResults} getDetail={getDetail} />} />
        <Route path="/products/:productId" element={(!product) ? <Navigate to='/home' />
          : <ProductDetail productId={product.id} name={product.name} price={product.price} category={product.categoriesName} total={product.total} describe={product.describe} image={product.image} addToCart={addToCart} />} />

        <Route path="/checkout" element={(user && !user.isAdmin) ? <Checkout name={user.name} location={user.location} phoneNumber={user.phoneNumber} userId={user.id} userCart={userCart} setUserCart={setUserCart} removeInCart={removeInCart} shippingMethods={shippingMethods} getInvoiceDetail={getInvoiceDetail} paymentMethods={paymentMethods} /> : <Navigate to='/login' />} />

        <Route path="/updateProfile" element={user ? <UpdateUser userId={user.id} setUser={setUser} name={user.name} email={user.email} password={user.password} location={user.location} phoneNumber={user.phoneNumber} /> : <Navigate to='/login' />} />
        <Route path="/signup" element={!user ? <LoginLayout pagename={'signup'} /> : <Navigate to='/home' replace />} />
        <Route path="/login" element={!user ? <LoginLayout handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword}
          username={username} password={password} pagename={'signin'} /> : <Navigate to='/home' replace />} />

        <Route path="/admin/*" element={
          (user && user.isAdmin)
            ? <AdminLayout userId={user.id} categories={categories} setCategories={setCategories} getInvoiceDetail={getInvoiceDetail} setShippingMethods={setShippingMethods} />
            : (user && !user.isAdmin) ? <Navigate to='/home' replace />
              : <Navigate to='/login' replace />
        }>
        </Route>
        <Route path="/favorite" element={(user && !user.isAdmin) ? <Favorite favorites={favorites} addToCart={addToCart} getDetail={getDetail} title={'Danh sách yêu thích'} addFavorite={addFavorite} /> : <Navigate to='/login' replace />} />
        <Route path="/cart" element={(user && !user.isAdmin) ? <CartSection userCart={userCart} removeInCart={removeInCart} /> : <Navigate to='/login' replace />} />
        <Route path="/invoicelist/:invoiceId" element={user ? <InvoiceDetail user={user} /> : <Navigate to='/login' replace />} />
        <Route path="/invoicelist" element={<Invoicelist getInvoiceDetail={getInvoiceDetail}/>}/>
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
