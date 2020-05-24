const {useState, useEffect} = React
const pepito={
    value: 0
}
function App() {
    const [view, setView] = useState('landing') //play ranking

    const[score, setScore]= useState(0);

    const[highscore, setHighScore]=useState(0)//TODO Cambiar por array con puntuaciones
    useEffect(()=>{},[score])
    function changeView(view) {
        setView(view)
    }
    function toPlay(){
        changeView("play");
    }
    function toRanking(){
        //addHighScore()
        setHighScore(pepito.value);
        //setHighScore(score)
        changeView("ranking");
    }
    function toLandind(){
        changeView("landing")
    }
    function gainScore(){
        setScore(score+1);
        pepito.value=score+1;
        console.log(score)
    }
    function addHighScore(){
        if(score>highscore) 
            setHighScore(score);
        setScore(0);
        
    }
    function clearHighScore(){
        setHighScore(0);
        setScore(0);
    }

    return <>
        { view==='landing' && <Landing play={toPlay}/>}
        {view==="play" && <Play gain={gainScore} toRanking={toRanking} setHighScore={addHighScore} />}
        {view==="ranking" && <Ranking highScore={highscore}  changeView={toPlay} clearHighScore={clearHighScore} setHighScore={addHighScore}/>}
    </>
}

ReactDOM.render(<App />, document.getElementById('root'))