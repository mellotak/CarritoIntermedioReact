import React from 'react';
import { Link } from 'react-router-dom';

const CartPage = ({ cartItems, onAddToCart, onRemoveFromCart, onReduceQuantity }) => {
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-page">
      <h2>Tu Carrito</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.product.id}>
              {item.product.name} x {item.quantity}
              <div className="quantity-controls">
                <button onClick={() => onReduceQuantity(item.product.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onAddToCart(item.product, 1)}>+</button>
                <button onClick={() => onRemoveFromCart(item.product.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">
        <strong>Total: ${total}</strong>
      </div>
      <div className="cart-menu-actions">
        <Link to="/checkout">Pagar</Link>
      </div>
    </div>
  );
};

export default CartPage;
