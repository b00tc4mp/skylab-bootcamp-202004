const { useState, useEffect } = React;

function Cryptos({ cryptoResults, handleSearchOnChange,handleClickCoin }) {
  return (
    <section className="crypto-coins">
      <h3 className="crypto-coins__title">Crypto Coins</h3>
      <section className="crypto-coins__search">
        <input
          onChange={handleSearchOnChange}
          type="text"
          placeholder="Find your next crypto favorite"
        />
        <i className="fa fa-search " />
      </section>
      <section className="coins-container">
        {!cryptoResults && <p>Loading...</p>}
        
        {cryptoResults && !!cryptoResults.length &&
          cryptoResults.map(
            ({ id, name, symbol, rank, priceUsd, changePercent24Hr }) => {
              {
                priceUsd = Number(priceUsd);
                priceUsd = priceUsd.toFixed(2).toString();
                changePercent24Hr = Number(changePercent24Hr);
                changePercent24Hr = changePercent24Hr.toFixed(2).toString();
              }

              return (
                <CoinCard
                  key={rank}
                  id={id}
                  handleClickCoin={handleClickCoin}
                  rank={rank}
                  symbol={symbol}
                  name={name}
                  priceUsd={priceUsd}
                  changePercent24Hr={changePercent24Hr}
                />
              );
            }
          )}
          {cryptoResults && !cryptoResults.length && <Feedback message='No results found.' />}
      </section>
    </section>
  );
}
