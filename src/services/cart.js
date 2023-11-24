import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/cart'

const clearCart = async userId => {
  const response = await axios.post(`${baseUrl}/clearCart`, userId)
  return response
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, clearCart}

