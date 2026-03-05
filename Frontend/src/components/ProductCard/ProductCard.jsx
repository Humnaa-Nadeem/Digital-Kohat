
import React from 'react';
import './ProductCard.css';
import { FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
    const handleOrder = () => {
        console.log(`Order placed for: ${product.title}`);
        alert(`Order placed for: ${product.title} (Placeholder action)`);
    };

    return (
        <div className="product-card">
            <div className="product-image">
                <img src={product.image} alt={product.title} />
                <div className="product-overlay">
                    <button className="order-btn" onClick={handleOrder}>
                        <FaShoppingCart /> Order Now
                    </button>
                </div>
            </div>
            <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-desc">{product.description}</p>
                <div className="product-footer">
                    <span className="product-price">Rs. {product.price}</span>
                    <button className="order-btn-mobile" onClick={handleOrder}>Order</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
