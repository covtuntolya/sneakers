import "./styles.scss";

import { Route, Routes } from "react-router-dom";
import React from "react";
import axios from "axios";

import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import AppContext from "./context";

export default function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  //
  // React.useEffect(() => {
  //   fetch("https://65607acf83aba11d99d0e701.mockapi.io/items")
  //     .then((res) => res.json())
  //     .then((data) => setItems(data));
  // }, []);

  React.useEffect(() => {
    async function fetchItems() {
      try {
        // const respCartItems = await axios.get(
        //   "https://65607acf83aba11d99d0e701.mockapi.io/cart"
        // );
        const respItems = await axios.get(
          "https://65607acf83aba11d99d0e701.mockapi.io/items"
        );
        // setCartItems(respCartItems.data);
        setItems(respItems.data);
        setLoading(true);
      } catch (error) {
        alert("ошибка получения данных :(");
        console.error(error);
      }
    }
    fetchItems();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((cartObj) => cartObj.id === obj.id)) {
        // axios.delete(
        //   `https://65607acf83aba11d99d0e701.mockapi.io/cart/${obj.id}`
        // );
        setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        // const resp = await axios.post(
        //   "https://65607acf83aba11d99d0e701.mockapi.io/cart",
        //   obj
        // );
        // setCartItems((prev) => [...prev, resp.data]);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину :(");
    }
  };

  const isItemAdded = (name) => {
    return cartItems.some((item) => item.name === name);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        isItemAdded,
        setCartOpened,
        cartOpened,
        setCartItems,
        onAddToCart,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          // items={cartItems}
          onRemove={(obj) => onAddToCart(obj)}
          onClose={() => setCartOpened(false)}
          // opened={cartOpened}
        />
        <Header onOpenCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                loading={loading}
                items={items}
                cartItems={cartItems}
                onAddToCart={onAddToCart}
              />
            }
          />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
