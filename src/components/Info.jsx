import React from "react";

import AppContext from "../context";

const Info = ({ imageUrl, title, description }) => {
  const { setcartOpened } = React.useContext(AppContext);
  return (
    <div className="emptyCart d-flex align-center justify-center flex-column ">
      <img src={imageUrl} alt="cart item" />
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={() => setcartOpened(false)} className="greenButton">
        <img src="../img/arrow.svg" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
