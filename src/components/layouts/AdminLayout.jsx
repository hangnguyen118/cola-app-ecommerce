import { CreateProduct, DataGrid, Invoicelist, Userlist } from "../../page-sections"
import { Navigations } from "../../components"
import { useState, useEffect } from "react"
import axios from "axios"
import { Routes, Route } from 'react-router-dom'

const baseUrl = 'http://localhost:3001/api/products'

const AdminLayout = ({userId, categories, setCategories, getInvoiceDetail, SetShippingMethods}) => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    axios.get(baseUrl).then(response => {
        setProducts(response.data)
    })
  }, []) 

  return (
    <div className="admin-layout">
      <div className="row">
        <div className="col-3"><Navigations/></div>
        <div className="col-7">
          <Routes>
            <Route path="/create" element={<CreateProduct userId={userId} setProducts={setProducts} categories={categories} setCategories={setCategories} SetShippingMethods={SetShippingMethods}/>}/>
            <Route path="/edit" element={<DataGrid products={products} setProducts={setProducts}/>}/>
            <Route path="/invoicelist" element={<Invoicelist getInvoiceDetail={getInvoiceDetail}/>}/>
            <Route path="/users" element={<Userlist/>} />
          </Routes>            
        </div>   
      </div>      
    </div>
  )
}

export default AdminLayout;
