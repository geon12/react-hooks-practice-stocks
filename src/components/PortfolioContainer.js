import React from "react";
import Stock from "./Stock";

function PortfolioContainer({stocks , toggleStock}) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {stocks.map((stock) => <Stock key={stock.name} stock={stock} toggleStock={toggleStock}/>)}
    </div>
  );
}

export default PortfolioContainer;
