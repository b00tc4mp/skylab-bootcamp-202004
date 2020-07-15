const {useEffect} = React
function Home ({token,handleMusicTool}) {
    const handleRandomMusic = () => {
        try {
            capsule(token, (error, randomSongs) => { debugger
                if(error) throw new Error(error)                
                handleMusicTool(randomSongs)

            })
        } catch (error) {
            if(error) throw new Error(error)
        }
        
    }

    return <>
         
    <section className="home">
      
        <section className="home-header">
         
            <p className="home-header__text">El lugar donde nace la música</p>
        </section>
       
        <section className="home-groupies">
            
            <p className="home-groupies__text" /* onClick={handleGroupies} */>My groupies</p>
        </section>
        <section className="home-music" onClick={handleRandomMusic}>
            <p className="home-music__text">Cápsula de 20 minutos de música</p>
        </section>
    </section> 
    </>
} 