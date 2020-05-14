const { useEffect, useState } = React;

function Home() {
  const [view, setView] = useState("cryptos-list");
  const [cryptos, setCryptos] = useState(null);
  const [error, setError] = useState(null);
  const [intervalState, setIntervalState] = useState(null);


  const handleRetrieveCryptos = () => {
    retrieveCryptos((_error, _cryptos) => {
      if (_error) setError(_error.message);
      else setCryptos(_cryptos);
    });
  };

  const handleCheckHash = () => {
    let coinName = window.location.hash
    if (coinName) {
      setView('coin-page')
    } else setView('cryptos-list')
  }

  const updateList = () => {
    const interval = setInterval(handleRetrieveCryptos, 5000)
    setIntervalState(interval)
  }

  useEffect(() => {
    handleCheckHash()
    handleRetrieveCryptos()
    updateList()

    window.addEventListener('hashchange', handleCheckHash)
    return () => {
      window.removeEventListener('hashchange', handleCheckHash)
      clearInterval(intervalState)
    }
  }, [])

  const handleClickCoin = (coinName) => {
    if (!coinName) return
    window.location.hash = coinName
    setView('coin-page')
  }

  const handleSearchOnChange = (event) => {
    const {
      target: { value: query },
    } = event;
    if (!query) {
      return updateList()
    } else {
      clearInterval(intervalState)
    }
    searchCryptos(query, (_error, _cryptos) => {
      if (_error) setError(_error.message);
      else setCryptos(_cryptos);
    });
  };

  const handlePortfolioClick = (event) => {
    event.preventDefault()

    setView('portfolio-page')
  }
  const handleFavClick = (event) => {
    event.preventDefault()

    setView('favorites-page')
  }
  const handleHomeClick = (event) => {
    event.preventDefault()

    setView('cryptos-list')
  }

  const handlePortfolioSubmit = (id, quantity, callback) => {
    addPortfolioCrypto(sessionStorage.token, { id, quantity }, callback)

  }



  return (
    <>
      {view === "cryptos-list" && (
        <>
          <nav className="nav">
            <a href="" className="nav__item nav__item--contrast register-link"></a>
            <a href="" className="nav__item logout-link">
              Logout
          </a>
          </nav>

          <CryptosListPage
            handleSearchOnChange={handleSearchOnChange}
            cryptos={cryptos}
            handleClickCoin={handleClickCoin}
            handlePortfolioClick={handlePortfolioClick}
          />
        </>
      )}

      {view === 'coin-page' && <CoinPage addPortfolioSubmit={handlePortfolioSubmit} />}
      {view === 'favorites-page' && <FavoritesPage />}
      {view === 'portfolio-page' && <PortfolioPage />}

      <footer className="footer">
        <section>
          <p className="footer__copyright">
            © 2020 Team Jalapeño - Skylab Coders. All rights reserved.
          </p>
        </section>
      </footer>

      <NavBar homeClick={handleHomeClick} favClick={handleFavClick} porfolioClick={handlePortfolioClick} />
    </>


  );
}
