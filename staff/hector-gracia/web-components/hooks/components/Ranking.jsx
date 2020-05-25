function Ranking( {highScore , changeView, clearHighScore, setHighScore}) {
    //setHighScore()

    return <> 
    <h1>The highest score is {highScore}</h1>
    <button onClick={changeView}>Retry</button>
    <button onClick={clearHighScore}>Clear HighScore</button>
    </>
}