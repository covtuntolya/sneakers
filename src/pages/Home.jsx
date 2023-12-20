import Card from "../components/Card";

import React from "react";

function Home({ items, onAddToCart, loading }) {
  const [searchValue, setSearchValue] = React.useState("");
  const handleChangeSearch = (e) => {
    const val = e.target.value;
    setSearchValue(val);
  };
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="">
          {!searchValue ? "Все кроссовки" : `поиск по "${searchValue}"`}
        </h1>
        <div className="search-bloc d-flex align-center">
          <img width={20} height={20} src="/img/search.svg" alt="search" />
          <input
            value={searchValue}
            onChange={handleChangeSearch}
            placeholder="Поиск..."
          />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear"
              src="img/btn-remove.svg"
            />
          )}
        </div>
      </div>
      <div className="sneakers d-flex justify-between flex-wrap">
        {(!loading
          ? [...Array(12)]
          : items.filter((item) =>
              item.name.toUpperCase().includes(searchValue.toUpperCase())
            )
        ).map((obj, index) => (
          <Card
            key={index}
            item={obj}
            // added={isItemAdded(obj && obj.name)}
            loaded={loading}
            onPlus={() => onAddToCart(obj)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
