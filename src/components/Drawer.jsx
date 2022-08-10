import React, { useState, useContext } from 'react';
import AppContext from '../context';

export default function Drawer({ closeCart, items = [], removeCartItem }) {
  const { cartItems } = useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
  return (
    <div>
      <div className="overlay">
        <div className="drawer">
          <h2 className="d-flex align-center justify-between">
            Корзина{' '}
            <img
              width={30}
              height={30}
              className="cu-p mt-20"
              src="/img/btn-remove.svg"
              alt="close"
              onClick={closeCart}
            />
          </h2>
          {items.length > 0 ? (
            <div className="items">
              {items.map((i, index) => (
                <div key={index} className="cartItem d-flex align-center mb-20">
                  <img width={70} height={70} className="mr-20" src={i.img} />
                  <div className="mr-20">
                    <p className="mb-5">{i.title}</p>
                    <b>{i.price}</b>
                  </div>
                  <img
                    src="/img/btn-remove.svg"
                    alt="Remove"
                    onClick={() => removeCartItem(i.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
              <img className="mb-20" width={120} height={120} src="/img/empty-cart.jpg" />
              <h2>Корзина пустая</h2>
              <p className="opacity-6">
                Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
              </p>
              <button className="greenButton" onClick={closeCart}>
                <img src="/img/arrow.svg" alt="Arrow" />
                Вернуться назад
              </button>
            </div>
          )}

          <div className="cartTotalBlock">
            <ul>
              <li>
                <span>Итого:</span>
                <div></div>
                <b>{totalPrice} руб.</b>
              </li>
              <li>
                <span>Налог 5%:</span>
                <div></div>
                <b>{Math.round(totalPrice * 0.05)} руб.</b>
              </li>
            </ul>
            <button>Оформить заказ</button>
          </div>
        </div>
      </div>
    </div>
  );
}
