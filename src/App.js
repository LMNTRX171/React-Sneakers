import React, { useState, useEffect } from 'react';
import 'macro-css';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import { Route, Routes } from 'react-router-dom';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import AppContext from './context';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItem] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    async function fetchReq() {
      const itemsResponse = await axios.get('https://62dbec0457ac3c3f3c519fc9.mockapi.io/items');
      const cartResponse = await axios.get('https://62dbec0457ac3c3f3c519fc9.mockapi.io/cart');
      const favoriteResponse = await axios.get(
        'https://62dbec0457ac3c3f3c519fc9.mockapi.io/favorites',
      );

      setCartItem(cartResponse.data);
      setFavorite(favoriteResponse.data);
      setItems(itemsResponse.data);
    }

    fetchReq();
  }, []);

  const removeCartItem = (id) => {
    axios.delete(`https://62dbec0457ac3c3f3c519fc9.mockapi.io/cart/${id}`);
    setCartItem((prev) => prev.filter((item) => item.id !== id));
  };

  const addToCart = async (obj) => {
    try {
      if (cartItems.find((c) => c.id === obj.id)) {
        await axios.delete(`https://62dbec0457ac3c3f3c519fc9.mockapi.io/cart/${obj.id}`);
        setCartItem((prev) => prev.filter((p) => p.id !== obj.id));
      } else {
        const { data } = await axios.post('https://62dbec0457ac3c3f3c519fc9.mockapi.io/cart', obj);
        setCartItem((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить товар в корзину');
    }
  };

  const addToFavorite = async (obj) => {
    try {
      if (favorite.find((fav) => fav.id === obj.id)) {
        await axios.delete(`https://62dbec0457ac3c3f3c519fc9.mockapi.io/favorites/${obj.id}`);
        setFavorite((prev) => prev.filter((p) => p.id !== obj.id));
      } else {
        const { data } = await axios.post(
          'https://62dbec0457ac3c3f3c519fc9.mockapi.io/favorites',
          obj,
        );
        setFavorite((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить товар в избранное');
    }
  };

  const onSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <AppContext.Provider value={{ items, cartItems, favorite, addToCart, addToFavorite }}>
      <div className="wrapper clear">
        {cartOpen ? (
          <Drawer
            closeCart={() => setCartOpen(false)}
            items={cartItems}
            removeCartItem={removeCartItem}
          />
        ) : null}

        <Header openCart={() => setCartOpen(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                cartItems={cartItems}
                favorite={favorite}
                items={items}
                searchValue={searchValue}
                onSearchValue={onSearchValue}
                addToCart={addToCart}
                addToFavorite={addToFavorite}
              />
            }
          />

          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
