import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='hero'>
        <div className='col-6'>
            <div className='title'>
                <h1>MUA SẮM TRỰC TUYẾN</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. </p>
                <Link to="/checkout">Mua ngay!</Link>
            </div>            
        </div>
        <div className='col-6'></div>
    </div>
  )
}

export default Hero