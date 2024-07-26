import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './FoodItemDetail.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';

const FoodItemDetail = () => {
    const { id } = useParams();
    const { food_list, cartItems, addToCart, removeFromCart, url, token, user } = useContext(StoreContext); // Assuming user info is in StoreContext
    const foodItem = food_list.find(item => item._id === id);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ body: '', rating: 0, userId: user ? user._id : '', reviewerName: user ? user.name : '' });

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${url}/reviews/allreviews/${id}`);
                if (response.data.success) {
                    setReviews(response.data.reviews);
                } else {
                    console.error('Failed to fetch reviews:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchReviews();
    }, [id, url]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting review...', newReview);
        try {
            const response = await axios.post(`${url}/reviews/add/${id}`, newReview, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Response from server:', response.data);
            if (response.data.success) {
                setReviews([...reviews, response.data.review]);
                setNewReview({ body: '', rating: 0, userId: user ? user._id : '', reviewerName: user ? user.name : '' });
            } else {
                console.error('Failed to add review:', response.data.message);
            }
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    const ratingChanged = (newRating) => {
        setNewReview({ ...newReview, rating: newRating });
    };

    if (!foodItem) {
        return <p>Food item not found</p>;
    }

    return (
        <div className="food-item-detail">
            <div className="food-item-detail-top">
                <div className="food-item-detail-image">
                    <img src={url + "/images/" + foodItem.image} alt={foodItem.name} />
                </div>
                <div className="food-item-detail-info">
                    <h1>{foodItem.name}</h1>
                    <p>{foodItem.description}</p>
                    <p className="food-item-detail-price">Rs {foodItem.price}</p>
                    <div className="food-item-detail-button">
                        {!cartItems[foodItem._id]
                            ? <button onClick={() => addToCart(foodItem._id)}>Add to Cart</button>
                            : <div className="food-item-detail-counter">
                                <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                                <span>{cartItems[foodItem._id]}</span>
                                <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="reviews-section">
                <h2>Reviews</h2>
                {reviews.map(review => (
                    <div key={review._id} className="review">
                        <p>{review.body}</p>
                        <p>Rating: <ReactStars
                            count={5}
                            value={review.rating}
                            edit={false}
                            size={24}
                            activeColor="#ffd700"
                        /></p>
                        <p>By: {review.userId.name}</p> {/* Display the reviewer's name */}
                    </div>
                ))}
                {token ? (
                    <form onSubmit={handleReviewSubmit} className="review-form">
                        <textarea
                            value={newReview.body}
                            onChange={(e) => setNewReview({ ...newReview, body: e.target.value })}
                            placeholder="Write a review"
                            required
                        />
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                        />
                        <button type="submit">Submit Review</button>
                    </form>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default FoodItemDetail;
