import React from "react";
import axios from "axios";

import Info from "../Info.jsx";
import AppContext from "../../context.js";

import styles from "./Drawer.module.scss";
// задержка ms милисекунд
// const delay=(ms)=>new Promise((resolve)=>setTimeout(resolve, ms));

const Drawer = ({ onClose, onRemove }) => {
  const {
    cartItems: items,
    setCartItems,
    cartOpened,
    setCartOpened,
  } = React.useContext(AppContext);
  const [isOrderCompletede, setIsOrderCompleted] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const totalPrice = items.reduce((sum, obj) => sum + obj.price, 0);
  const sortRef = React.useRef();

  // React.useEffect(() => {
  //   document.body.addEventListener("click", handleClick);
  // }, []);
  // const handleClick = (e) => {
  //   console.log(e.composedPath());

  //   if (!e.composedPath().includes(sortRef.current)) {
  //     console.log("click");
  //     onClose();
  //   }
  // };

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://65607acf83aba11d99d0e701.mockapi.io/orders",
        { items: items }
      );
      setOrderId(data.id);
      setIsOrderCompleted(true);
      setCartItems([]);
    } catch (error) {
      alert("Не удалось оформить заказ :(");
    }
    setIsLoading(false);
  };

  return (
    <div
      className={`${styles.overlay} ${cartOpened ? styles.overlayVisible : ""}`}
    >
      <div ref={sortRef} className={`${styles.drawer}`}>
        <h2 className="mb-20 d-flex justify-between">
          Корзина
          <img
            onClick={onClose}
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="remove"
          />
        </h2>

        {items.length > 0 ? (
          <>
            <div className="cartItems flex">
              {items.map((obj) => (
                <div
                  key={obj.name}
                  className="cartItem d-flex align-center mb-20"
                >
                  <img
                    className="mr-20"
                    width={70}
                    height={37}
                    object-fit={"cover"}
                    src={obj.url}
                    alt="photo sneakers"
                  />
                  <div className="mr-20">
                    <p className="mb-5">{obj.name}</p>
                    <b>{obj.price}</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} лей</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%</span>
                  <div></div>
                  <b>{totalPrice * 0.05} лей</b>
                </li>
              </ul>

              <button
                disabled={isLoading}
                className="greenButton"
                onClick={onClickOrder}
              >
                Оформить заказ
                <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            onClose={onClose}
            title={isOrderCompletede ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderCompletede
                ? `Ваш заказ № ${orderId} успешно оформлен. Мы свяжемся с вами в ближайшее время.`
                : "Добавьте хоть одну пару кроссовок чтобы сделать заказ"
            }
            imageUrl={
              isOrderCompletede
                ? "https://www.tdpra.ru/media/cache/88/f5/88f5755a51076a4f328462246792572b.jpg"
                : "https://github.com/Archakov06/react-sneakers/blob/master/public/img/empty-cart.jpg?raw=true"
            }
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
