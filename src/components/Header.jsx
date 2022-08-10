import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context';

export default function Header(props) {
  const { cartItems } = useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  return (
    <div>
      <header className="d-flex justify-between align-center p-40">
        <Link to="/">
          <div className="d-flex align-center">
            <img width={40} height={40} src="/img/logo.png" alt="sds" />
            <div>
              <h3 className="text-uppercase">React Sneakers</h3>
              <p>Магазин лучших кросовок</p>
            </div>
          </div>
        </Link>
        <ul className="d-flex ">
          <li className="mr-30 cu-p" onClick={props.openCart}>
            <img width={18} height={18} src="/img/cart.svg" alt="cart" />
            <span>{totalPrice} руб.</span>
          </li>
          <li className="mr-20 cu-p">
            <Link to="/favorites">
              <img width={18} height={18} src="/img/heart.svg" alt="heart" />
            </Link>
          </li>
          <li>
            <img width={18} height={18} src="/img/user.svg" alt="user" />
          </li>
        </ul>
      </header>
    </div>
  );
}
