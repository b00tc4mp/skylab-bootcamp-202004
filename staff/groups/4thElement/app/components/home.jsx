

const { useState } = React

function Home({onGoToLogin}) {

    // || hooks states declarations ||

    const [dinamicClass, setdinamicClass] = useState('surf')
    const [WorldImage, setworldImage] = useState('')

    // || functions ||

    const handelFadeImage = () => { //to change the background globe image wen fade out
        if(WorldImage === 'snow'){
            setworldImage('')
        } 
        
    }

    const handelClickSurf = () => {
        if(dinamicClass != 'surf'){
            setdinamicClass('surf')
            setworldImage('surf')
            setTimeout(()=> handelFadeImage(), 1300)
        }  
    }

    const handelClickSnow = () => {
        setdinamicClass('snow')
        setworldImage('snow')
    }

    return <section className="Home">
            <img className="Home__imagen" src="" alt="" />
            <div className="Home__Selection">
                <div className={"Home__Selection--surf"+(dinamicClass==='surf' ? "clikedSurf" : "")} onClick = {handelClickSurf}> DIV-SURF</div>
                <div className={"Home__Selection--snow"+(dinamicClass==='snow' ? "clikedsnow" : "")} onClick = {handelClickSnow}>DIV-SNOW</div>
            </div>
            <div className="Home__map">
               
                {WorldImage==='surf' && <div className="Home__map--snow--out">
                </div>}
                {WorldImage==='snow' && <div className="Home__map--snow">
                </div>}
            </div>
        </section>
}