import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './PlaceOrder.css';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url, frontendurl } = useContext(StoreContext);
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        street: "",
        city: "Pune",
        state: "Maharashtra",
        zipcode: "",
        country: "India",
        phone: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();
        const orderItems = food_list.map(item => {
            if (cartItems[item._id] > 0) {
                return { ...item, quantity: cartItems[item._id] };
            }
            return null;
        }).filter(item => item !== null);

        const orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 79
        };

        try {
            const response = await axios.post(`${url}/api/order/place`, orderData, {
                headers: { token }
            });

            if (response.data.success) {
                const { orderId } = response.data;
                const options = {
                    key: import.meta.env.REACT_APP_RAZORPAY_KEY_ID,
                    amount: orderData.amount * 100,
                    currency: 'INR',
                    name: 'Cakes 365',
                    description: 'Order Payment',
                    order_id: orderId,
                    handler: async (response) => {
                        try {
                            await axios.post(`${url}/api/order/verify`, {
                                orderId,
                                paymentId: response.razorpay_payment_id,
                                signature: response.razorpay_signature
                            }, { headers: { token } });
                            window.location.replace(`${frontendurl}/myorders`);
                        } catch (error) {
                            console.error('Error verifying payment:', error);
                            alert('Payment verification failed');
                        }
                    },
                    prefill: {
                        name: `${data.firstname} ${data.lastname}`,
                        email: data.email,
                        contact: data.phone
                    },
                    theme: {
                        color: '#D2691E'
                    },
                    image: `${frontendurl}/src/assets/logo.png`
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                alert('Error placing order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Error placing order');
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/cart')
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-fields">
                    <input required name='firstname' onChange={onChangeHandler} value={data.firstname} type="text" placeholder='First Name' />
                    <input required name='lastname' onChange={onChangeHandler} value={data.lastname} type="text" placeholder='Last Name' />
                </div>
                <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Address' />
                <div className="multi-fields">
                    <input required name='city' onChange={onChangeHandler} type="text" placeholder='City' value="Pune" readOnly />
                    <input required name='state' onChange={onChangeHandler} type="text" placeholder='State' value="Maharashtra" readOnly />
                </div>
                <div className="multi-fields">
                    <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
                    <input required name='country' onChange={onChangeHandler} type="text" placeholder='Country' value="India" readOnly />
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>Rs. {getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>Rs. {getTotalCartAmount() === 0 ? 0 : 79}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>Rs. {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 79}</b>
                        </div>
                    </div>
                    <button type='submit'>Proceed To Payment</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
