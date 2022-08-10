import React from 'react';
import CardItem from '../components/Card';

export default function Home({
  items,
  searchValue,
  onSearchValue,
  addToCart,
  addToFavorite,
  cartItems,
  favorite,
}) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по: "${searchValue}"` : `Все кроссовки`}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          <input type="text" onChange={onSearchValue} placeholder="Поиск..." />
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {items
          .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
          .map((item, index) => (
            <CardItem
              title={item.title}
              img={item.img}
              price={item.price}
              id={item.id}
              key={index}
              favorited={favorite.some((obj) => obj.id === item.id)}
              added={cartItems.some((obj) => obj.id === item.id)}
              addToCart={(obj) => addToCart(obj)}
              addToFavorite={(obj) => addToFavorite(obj)}
            />
          ))}
      </div>
    </div>
  );
}
