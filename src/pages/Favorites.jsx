import React, { useContext } from 'react';
import CardItem from '../components/Card';
import AppContext from '../context';

export default function Favorites() {
  const { favorite, addToCart, addToFavorite } = useContext(AppContext);

  console.log(favorite);
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
        <div className="search-block d-flex"></div>
      </div>
      <div className="d-flex flex-wrap">
        {favorite.map((item, index) => (
          <CardItem
            id={item.id}
            title={item.title}
            img={item.img}
            price={item.price}
            key={index}
            favorited={true}
            addToCart={(obj) => addToCart(obj)}
            addToFavorite={(obj) => addToFavorite(obj)}
          />
        ))}
      </div>
    </div>
  );
}
