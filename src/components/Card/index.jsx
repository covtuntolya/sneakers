import React from "react";

import MyLoader from "./MyLoader";
import AppContext from "../../context.js";

import styles from "./Card.module.scss";

const Card = ({ item, onPlus, loaded }) => {
  // const [isAdded, setIsAdded] = React.useState(added);
  const [favorite, setFavorite] = React.useState(false);

  const { isItemAdded } = React.useContext(AppContext);

  function onClickAdd() {
    // setIsAdded(!isAdded);
    onPlus({ item });
  }

  function onClickFavorite() {
    setFavorite(!favorite);
  }

  return (
    <div className={styles.card}>
      {loaded ? (
        <>
          <div className={styles.favorite}>
            <img
              onClick={onClickFavorite}
              src={favorite ? "/img/liked.svg" : "/img/heart.svg"}
              alt="image"
            />
          </div>
          <img src={item.url} alt="photo sneakers" />
          <h5>{item.name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column ">
              <span>Цена</span>
              <b>{item.price} лей</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                src={
                  !isItemAdded(item.name)
                    ? "/img/btn-plus.svg"
                    : "/img/btn-checked.svg"
                }
                alt="Plus"
                onClick={onClickAdd}
              />
            )}
          </div>
        </>
      ) : (
        <MyLoader />
      )}
    </div>
  );
};

export default Card;
