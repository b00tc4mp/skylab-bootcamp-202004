
const { useState } = React

// import mySvg from './images/navigation.svg'

function Home({onGoToLogin}) {

    // || hooks states declarations ||

    const [dinamicClass, setdinamicClass] = useState('surf')
    const [WorldImage, setworldImage] = useState('')
    const [firstEnter, setFirstEnter] = useState(true)
    const [timer, setTimer] = useState(false)
    const [mouseOver, setMouseOver] = useState(undefined)

    // || functions ||

    const handelFadeImage = () => { //to change the background globe image wen fade out
        if(WorldImage === 'snow'){
            setworldImage('')
            setTimer(false)
        } 
        
    }

    const handelClickSurf = () => {
        if(dinamicClass != 'surf'){
            setFirstEnter(false)
            setdinamicClass('surf')
            setworldImage('surf')
            setTimer(true)
            setTimeout(()=> handelFadeImage(), 1200) //use it to stop from clicking til the animation has finished
        }  
    }

    const handelMouseOver = (name) => {
        console.log('in')
        setMouseOver(name)
    }

    const handelMouseOut = () => {
        console.log('out')
        setMouseOver(undefined)
    }

    const handelClickSnow = () => {
        setdinamicClass('snow')
        setworldImage('snow')
    }

    return <section className="Home">
            {<div className={"Home--"+(dinamicClass==='surf' ? "Surf" : "Snow")}>

                <img className="Home__imagen" src="" alt="" />
                <div className="Home__Selection">
                    <div className={"Home__Selection--surf"+(dinamicClass==='surf' ? "clikedSurf" : "")} onClick = { () => {handelClickSurf()}}> SURF</div>
                    <div className={"Home__Selection--snow"+(dinamicClass==='snow' ? "clikedsnow" : "")} onClick = { () => {if(timer===false)handelClickSnow()}}>SNOW</div>
                </div>
                <div Home__pointerResult>
                    {mouseOver === 'snow1' && <div className="Home__pointerResult--element Home__pointerResult--element--snow1"> <p>Les 2 Alpes </p></div>}
                    {mouseOver === 'snow2' && <div className="Home__pointerResult--element Home__pointerResult--element--snow2"> <p>Hakuba </p></div>}
                    {mouseOver === 'snow3' && <div className="Home__pointerResult--element Home__pointerResult--element--snow3"> <p>Ski Portillo </p></div>}
                    {mouseOver === 'snow4' && <div className="Home__pointerResult--element Home__pointerResult--element--snow4"> <p>Aspen </p></div>}
                    {mouseOver === 'surf1' && <div className="Home__pointerResult--element Home__pointerResult--element--surf1"> <p>Mundaka </p></div>}
                    {mouseOver === 'surf2' && <div className="Home__pointerResult--element Home__pointerResult--element--surf2"> <p>Sketleton Bay </p></div>}
                    {mouseOver === 'surf3' && <div className="Home__pointerResult--element Home__pointerResult--element--surf3"> <p>Puerto escondido</p></div>}
                    {mouseOver === 'surf4' && <div className="Home__pointerResult--element Home__pointerResult--element--surf4"> <p>Mavericks</p></div>}
                </div>
                <div className="Home__map">
                    {WorldImage==='surf' && firstEnter === false && <div className="Home__map--snow--out">
                    </div>}
                    {WorldImage==='snow' && <div className="Home__map--snow">
                        <i class="fas fa-map-marker-alt fa-2x" onMouseOver={ () => handelMouseOver('snow1')} onMouseOut={handelMouseOut}></i>
                        <i class="fas fa-map-marker-alt fa-2x" onMouseOver={ () => handelMouseOver('snow2')} onMouseOut={handelMouseOut}></i>
                        <i class="fas fa-map-marker-alt fa-2x" onMouseOver={ () => handelMouseOver('snow3')} onMouseOut={handelMouseOut}></i>
                        <i class="fas fa-map-marker-alt fa-2x" onMouseOver={ () => handelMouseOver('snow4')} onMouseOut={handelMouseOut}></i>
                    </div>}
                    {WorldImage==='' && <div className="Home__map--surf">
                        <i class="fas fa-map-marker-alt fa-2x" onMouseOver={ () => handelMouseOver('surf1')} onMouseOut={handelMouseOut}></i>
                        <i class="fas fa-map-marker-alt fa-2x" onMouseOver={ () => handelMouseOver('surf2')} onMouseOut={handelMouseOut}></i>
                        <i class="fas fa-map-marker-alt fa-2x" onMouseOver={ () => handelMouseOver('surf3')} onMouseOut={handelMouseOut}></i>
                        <i class="fas fa-map-marker-alt fa-2x" onMouseOver={ () => handelMouseOver('surf4')} onMouseOut={handelMouseOut}></i>
                    </div>}
                </div>
            </div>}
        </section>
}