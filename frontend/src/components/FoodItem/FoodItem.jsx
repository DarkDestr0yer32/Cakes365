import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { Link } from 'react-router-dom';

const FoodItem = ({ id, name, description, price, image }) => {

    const truncateDescription = (desc, wordLimit) => {
        return desc.split(" ").slice(0, wordLimit).join(" ") + '...';
    };

    const [itemCount, setItemCount] = useState(0)
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)
    return (
        <div className='food-item'>
            <div className="food-item-image-container">
                <img className='food-item-image' src={url + "/images/" + image} alt="" />
                {!cartItems[id]
                    ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                    : <div className='food-item-counter'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                </div>
                <p className="food-item-desc">{truncateDescription(description, 20)}</p>
                <p className="food-item-price">Rs {price}</p>
                <Link to={`/product/${id}`}>Read More</Link>
            </div>
        </div>
    )
}

export default FoodItem
