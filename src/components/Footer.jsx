import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer'>      
      <ul>
        <li>
          <Link to="/admin/create"><i className="fa-brands fa-facebook-f"></i></Link>
          <Link to="/admin/create"><i className="fa-brands fa-twitter"></i></Link>
          <Link to="/admin/create"><i className="fa-brands fa-youtube"></i></Link>
          <Link to="/admin/create"><i className="fa-brands fa-github"></i></Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/admin/create"><span>HOME</span></Link>
          <Link to="/admin/create"><span>ABOUT US</span></Link>
          <Link to="/admin/create"><span>CONTACT</span></Link>
          <Link to="/admin/create"><span>404</span></Link>
        </li>
      </ul>
    </div>
  )
}

export default Footer