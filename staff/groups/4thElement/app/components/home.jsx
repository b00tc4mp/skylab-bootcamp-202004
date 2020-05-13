
const { useState } = React


function Home({sportState, ReturnsportState, pointerMapSelected}) {
    // || hooks states declarations ||

    const [dinamicClass, setdinamicClass] = useState(ReturnsportState)
    const [WorldImage, setworldImage] = useState(ReturnsportState)
    const [firstEnter, setFirstEnter] = useState(true)
    const [timer, setTimer] = useState(false)
    const [mouseOver, setMouseOver] = useState(undefined)

    // || use Effect || 

    useEffect(() => {
        var backImage = document.getElementById('Home')
        backImage.style.backgroundImage="url('./images/fondo.jpg')"
        dinamicClass==='surf' ? backImage.style.backgroundImage="url('./images/fondo.jpg')" : backImage.style.backgroundImage="url('./images/fondo.jpg')" 
    }, [dinamicClass])  //por hacer y areglar el problema de los punteros que no salen al principio por culpa de le nombre de los states (poner otro state para contarolar ese problema )

    // || functions ||

    const handelFadeImage = () => { //to change the background globe image wen fade out
        if(WorldImage === 'snow'){
            setworldImage('')
            setTimer(false)
        } 
        
    }

    //arglar los punteros de surf que no vuleven a aparacer

    const handelClickSurf = () => {
        if(dinamicClass != 'surf'){
            setFirstEnter(false)
            setdinamicClass('surf')
            setworldImage('surf')
            setTimer(true)
            sportState()
            setTimeout(()=> handelFadeImage(), 1200) //use it to stop from clicking til the animation has finished
            
        }  
    }

    const handelMouseOver = (name) => { //on click not mouse over for movile first hover has no sense
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
        sportState()
    }

    const handleSpotSelected=(coordinates)=>{
        pointerMapSelected(coordinates);
    }

    //poner el home surf, snow en un div por separado abajo del todo

    return <section id="Home" className="Home">
            {<div className={"Home--"+(dinamicClass==='surf' ? "Surf" : "Snow")}>
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
                        <i onClick={()=> handleSpotSelected({name: 'Les 2 Alpes', coordinates: "Les 2 Alpes"})} class="fas fa-map-marker-alt fa-2x" onMouseOver={ () => handelMouseOver('snow1')} onMouseOut={handelMouseOut}></i>
                        <i onClick={()=> handleSpotSelected({name: 'Hakuba, Japan', coordinates: "Hakuba, Japan"})} class="fas fa-map-marker-alt fa-2x" onMouseOver={ () => handelMouseOver('snow2')} onMouseOut={handelMouseOut}></i>
                        <i onClick={()=> handleSpotSelected({name: 'Ski Portillo, Chile', coordinates: "Ski Portillo, Chile"})} class="fas fa-map-marker-alt fa-2x" onMouseOver={ () => handelMouseOver('snow3')} onMouseOut={handelMouseOut}></i>
                        <i onClick={()=> handleSpotSelected({name: 'Aspen, Colorado', coordinates: "Aspen, Colorado"})} class="fas fa-map-marker-alt fa-2x" onMouseOver={ () => handelMouseOver('snow4')} onMouseOut={handelMouseOut}></i>
                    </div>}
                    {ReturnsportState==='surf' && <div className="Home__map--surf">
                        <i onClick={()=> handleSpotSelected({name: 'Mundaka, Spain', coordinates: "43.669945, -1.440790"})} class="fas fa-map-marker-alt fa-2x" onMouseOver={ () => handelMouseOver('surf1')} onMouseOut={handelMouseOut}></i>
                        <i onClick={()=> handleSpotSelected({name: 'SkeletonBay, Africa',coordinates: "-34.033355, 24.932330"})} class="fas fa-map-marker-alt fa-2x" onMouseOver={ () => handelMouseOver('surf2')} onMouseOut={handelMouseOut}></i>
                        <i onClick={()=> handleSpotSelected({name: 'Puerto Escondido, Mexico',coordinates: "15.859872, -97.084793"})} class="fas fa-map-marker-alt fa-2x" onMouseOver={ () => handelMouseOver('surf3')} onMouseOut={handelMouseOut}></i>
                        <i onClick={()=> handleSpotSelected({name: 'Mavericks, CA',coordinates: "37.495501, -122.497037"})} class="fas fa-map-marker-alt fa-2x" onMouseOver={ () => handelMouseOver('surf4')} onMouseOut={handelMouseOut}></i>
                    </div>}
                </div>
            </div>}
        </section>
}

