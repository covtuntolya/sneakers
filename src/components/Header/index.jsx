import React from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context";
import { useCart } from "../../hooks/useCart";

const Header = ({ onOpenCart }) => {
  const { totalPrice } = useCart();
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img
            className="mr-5"
            width={40}
            height={40}
            src="https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Sneakers-2-64.png"
          />
          <div className="headerInfo">
            <h3>REAKT SNEAKERS</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex cu-p">
        <li onClick={onOpenCart} className="mr-30 d-flex align-center">
          <img height={30} width={30} className="mr-5" src="img/cart.svg" />
          <span>{totalPrice} lei</span>
        </li>
        <li>
          <Link to="/orders">
            <img height={30} width={30} src="img/user.svg" />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
