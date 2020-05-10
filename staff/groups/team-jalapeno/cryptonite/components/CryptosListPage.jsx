function CryptosListPage({handleSearchOnChange, cryptos, handleClickCoin}) {
  return (
    <>
      <section className="portfolio">
        <h3 className="portfolio__title">Wallet</h3>
        <h1 className="portfolio__money">1.752,21$</h1>
        <h4 className="portfolio__stats">
          <span className="portfolio__stats--contrast">+121,40$ (8.3%)</span>{" "}
          Last 24h
        </h4>
        <button className="portfolio__button">Go to Portfolio </button>
      </section>

      {cryptos && (
        <Cryptos
          handleSearchOnChange={handleSearchOnChange}
          cryptoResults={cryptos}
          handleClickCoin={handleClickCoin}
        />
      )}
    </>
  );
}
