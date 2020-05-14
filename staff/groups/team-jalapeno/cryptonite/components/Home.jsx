const { useEffect, useState, } = React;

function Home({ onLogout }) {
  const [view, setView] = useState("cryptos-list");
  const [cryptos, setCryptos] = useState(null);
  const [error, setError] = useState(null);

  const handleRetrieveCryptos = () => {
    retrieveCryptos((_error, _cryptos) => {
      if (_error) setError(_error.message);
      else setCryptos(_cryptos);
    });
  };

  const handleCheckHash = () => {
    let view = window.location.hash
    if (view) {
      if (view.includes('coin-page')) {
        setView('coin-page')
      } else setView(view.substring(1))
    }
  }

  const updateList = () => {
    const interval = setInterval(handleRetrieveCryptos, 5000)
    setIntervalState(interval)

  }

  useEffect(() => {
    handleCheckHash()
    handleRetrieveCryptos()
    const interval = setInterval(handleRetrieveCryptos, 5000)

    window.addEventListener('hashchange', handleCheckHash)
    return () => {
      window.removeEventListener('hashchange', handleCheckHash)
      clearInterval(interval)
    }
  }, [])


  const handleSearchOnChange = (event) => {
    const {
      target: { value: query },
    } = event;
    if (!query) return handleRetrieveCryptos();
    searchCryptos(query, (_error, _cryptos) => {
      if (_error) setError(_error.message);
      else setCryptos(_cryptos);
    });
  };

  const handleClickCoin = (coinName) => {
    if (!coinName) return
    window.location.hash = `coin-page/${coinName}`

  }
  const handlePortfolioClick = (event) => {
    event.preventDefault()
    window.location.hash = 'portfolio-page'

  }
  const handleFavClick = (event) => {
    event.preventDefault()
    window.location.hash = 'favorites-page'

  }
  const handleHomeClick = (event) => {
    event.preventDefault()
    window.location.hash = 'cryptos-list'
  }

  const handleLogoutClick = (event) => {
    event.preventDefault()
    onLogout()
    window.location.hash = ''
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
            <a href="" className="nav__item logout-link" onClick={handleLogoutClick}>
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

      {view === 'coin-page' && <CoinPage addPortfolioSubmit={handlePortfolioSubmit} onLogout={handleLogoutClick} />}
      {view === 'favorites-page' && <FavoritesPage handleClickCoin={handleClickCoin} onLogout={handleLogoutClick} />}
      {view === 'portfolio-page' && <PortfolioPage onLogout={handleLogoutClick} />}

      <div className="separator"></div>
      <NavBar portfolioClick={handlePortfolioClick} homeClick={handleHomeClick} favClick={handleFavClick} />


    </>


  );
}
