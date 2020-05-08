const { useState , useEffect} = React

function Cryptos(){
    const [error, setError] = useState(null)
    const [cryptos, setCryptos] = useState(undefined)

    useEffect(()=>{
        retrieveCryptos((_error, _cryptos)=> {
            if (_error)  setError(_error.messsage)  
            else setCryptos(_cryptos)
            
        
    })
}, [])

return(
    <section className="crypto-coins">
        <h3 className="crypto-coins__title">Crypto Coins</h3>
            <section className="crypto-coins__search">
            <input type="text" placeholder="Find your next crypto favorite" />
            <i className="fa fa-search " />
    <section className='crypto-container'>

        {!cryptos && <p>Loading...</p>}
        {cryptos && cryptos.map(({name, symbol, rank, priceUsd, changePercent24Hr}) => {
            {console.log(name, symbol, rank, priceUsd, changePercent24Hr)}
        }) }
    </section>
        </section>
      </section>
    )
}

// // <!-- COMPO 3 -->
//     <section class="crypto-coins">
//         <h3 class="crypto-coins__title">Crypto Coins</h3>
//         <section class="crypto-coins__search">
//             <input type="text" placeholder="Find your next crypto favorite">
//             <i class="fa fa-search search-bar__icon"></i>
//         </section>

//     //     <section class="coins-container">
//     //         <div class="coin">
//     //             <img class="coin__img" src="./img/71t1Q2ARnTL._SX466_.jpg"> //SYMBOL
//     //             <span class="coin__name">Bitcoin</span> // NAME
//     //             <span class="coin__price">4.00751 BTC</span> // PRICE
//     //             <span class="coin__percentage">+120$ (14%)</span> //PERCENT
//     //         </div>



// //         </section>

// //     </section>
