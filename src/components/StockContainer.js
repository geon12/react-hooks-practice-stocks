import React from "react";
import Stock from "./Stock";

function StockContainer({stocks, toggleStock}) {
  return (
    <div>
      <h2>Stocks</h2>
      {stocks.map((stock) => <Stock key={stock.name} stock={stock} toggleStock={toggleStock}/>)}
    </div>
  );
}

export default StockContainer;
