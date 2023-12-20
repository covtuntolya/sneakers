import React from "react";
import axios from "axios";

import Card from "../components/Card";
import AppContext from "../context";

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { onAddToCart } = React.useContext(AppContext);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(false);
        const { data } = await axios.get(
          "https://65607acf83aba11d99d0e701.mockapi.io/orders"
        );
        //console.log(data.map((obj) => obj.items).flat()); // обьеденили массивы
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], [])); // обьеденили массивы другой способ
        setLoading(true);
      } catch (error) {
        alert("Ошибка запроса заказов.");
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap justify-between">
        {(!loading ? [...Array(8)] : orders).map((obj, index) => (
          <Card key={index} item={obj} loaded={loading} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
