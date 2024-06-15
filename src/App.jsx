import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartMenu from './components/CartMenu';
import CartPage from './components/CartPage';
import LoginPage from './components/LoginPage';

const initialProducts = [
  { id: 1, name: 'Producto 1', price: 29.99, image: '/images/image1.jpg' },
  { id: 2, name: 'Producto 2', price: 19.99, image: '/images/image2.jpg' },
  { id: 3, name: 'Producto 3', price: 39.99, image: '/images/image3.jpg' },
];

const App = () => {
  const [products] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);
  const [showCartMenu, setShowCartMenu] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (product, quantity) => {
    const existingItem = cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, { product, quantity }]);
    }
    setShowCartMenu(true);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.product.id !== productId));
  };

  const handleReduceQuantity = (productId) => {
    const existingItem = cartItems.find(item => item.product.id === productId);
    if (existingItem.quantity > 1) {
      setCartItems(cartItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
    } else {
      handleRemoveFromCart(productId);
    }
  };

  const handleCloseCartMenu = () => {
    setShowCartMenu(false);
  };

  return (
    <div className="app">
      <Header cartCount={cartItems.length} />
      <Routes>
        <Route
          path="/"
          element={<ProductList products={products} onAddToCart={handleAddToCart} />}
        />
        <Route
          path="/cart"
          element={<CartPage
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onReduceQuantity={handleReduceQuantity}
          />}
        />
        <Route path="/checkout" element={<LoginPage onLogin={() => navigate('/')} />} />
      </Routes>
      {showCartMenu && (
        <CartMenu
          cartItems={cartItems}
          onClose={handleCloseCartMenu}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onReduceQuantity={handleReduceQuantity}
        />
      )}
    </div>
  );
};

export default App;
