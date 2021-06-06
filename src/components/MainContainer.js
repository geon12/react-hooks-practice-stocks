import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  const [stocks, setStocks] = useState([])
  const [sortStocks,setSortStocks] = useState("")
  const [filterCategory, setFilterCategory] = useState("")

  const BASE_URL = 'http://localhost:3001/stocks'

  useEffect(() => {
    fetch(BASE_URL)
      .then(resp => resp.json())
      .then(resp => {
          const allStocks = resp.map(stock => { 
            return {...stock,inPortfolio: false}
          })
          setStocks(allStocks)
      })
  },[])

  function availableStocks(portfolio) {
    return stocks.filter(stock => portfolio ? stock.inPortfolio : !stock.inPortfolio )
  }

  function toggleStock(id) {
    const updatedStocks = stocks.map((stock) => stock.id === id ? {...stock,inPortfolio: !stock.inPortfolio} : stock)
    setStocks(updatedStocks)
  }

  const stocksToBuy = availableStocks(false)
  const portfolioStocks = availableStocks(true)

  function clickToSortStocks(stocksToSort) {
    
    if (sortStocks === "") return stocksToSort
    return stocksToSort.sort( (stock1,stock2) => {
      if (sortStocks === "Alphabetically") {
        if(stock1.name < stock2.name) { return -1; }
        if(stock1.name > stock2.name) { return 1; }
        return 0;
      }
      else {
        if(stock1.price < stock2.price) { return -1; }
        if(stock1.price > stock2.price) { return 1; }
        return 0;
      }
    })
  }

  function filterStocks(newStocks) {
    return  clickToSortStocks(newStocks).filter((stock) => stock.type === filterCategory || filterCategory === "")
  }

  return (
    <div>
      <SearchBar setFilterCategory={setFilterCategory} setSortStocks={setSortStocks}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filterStocks(stocksToBuy)} toggleStock={toggleStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolioStocks} toggleStock={toggleStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
