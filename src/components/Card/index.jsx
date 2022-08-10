import React, { useState } from 'react';
import styles from './Card.module.scss';

export default function CardItem({
  title,
  img,
  price,
  id,
  addToCart,
  addToFavorite,
  favorited = false,
  added = false,
}) {
  const [isAdded, setIsAdded] = useState(added);
  const [isFavorite, setIsFavorite] = useState(favorited);
  let obj = { title, price, img, id };

  const changeIsAdded = () => {
    addToCart(obj);
    setIsAdded(!isAdded);
  };

  const changeIsFavorite = () => {
    addToFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <div className={styles.card}>
        <img width="100%" height={135} src={img} />

        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price} руб.</b>
          </div>
          <img
            className={styles.plus}
            src={isFavorite === true ? '/img/liked.svg' : '/img/unliked.svg'}
            onClick={changeIsFavorite}
          />
          <img
            className={styles.plus}
            src={isAdded === true ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
            onClick={changeIsAdded}
          />
        </div>
      </div>
    </div>
  );
}
