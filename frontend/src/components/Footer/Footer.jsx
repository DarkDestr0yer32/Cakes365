import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" id='logo-image' />
                    <p>At Cakes 365, we're passionate about crafting the most delightful and delicious cakes for every occasion. Based in Pune, our home bakery is dedicated to delivering freshly baked, high-quality cakes right to your doorstep, anywhere in the city.</p>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91-8412064045</li>
                        <li>preeti.lakhotiya@gmail.com</li>
                    </ul>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.instagram_icon} alt="" />
                    </div>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2024 © Cake's 365 - All Rights Reserved</p>
        </div>
    )
}

export default Footer
