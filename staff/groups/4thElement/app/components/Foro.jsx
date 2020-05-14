import { element } from "prop-types"

const { useState, useEffect} = React

function Foro ({forecastSelected, token, sportState}) {

    const [error, setError] = useState()
    const [reviews, setReviews] = useState()
    const [newReview, setNewReview] = useState()
    const [spiner, setSpiner] = useState()


    const handelPostReviews = (event) => {
        event.preventDefault()
        let {conditions, tips, warrnings, extraInfo} = event.target
        conditions = conditions.value
        tips = tips.value
        warrnings = warrnings.value
        extraInfo = extraInfo.value
        let value = {conditions, tips, warrnings, extraInfo, coordinates: forecastSelected.coordinates , date: new Date}
        try{
            addNewReview(token, value, (error) => { //hacer que una vez escribes una review  se recargue el foro
                if(error) setError(error)
                setNewReview(undefined)
            })
            }catch({message}){
                setError(message)
            }
    }

    useEffect(() => {
        setSpiner('on')
        try{
            setError(undefined)
            retriveAllUsers(token, (error, results) => {
                setSpiner(undefined)
                if(error){
                    setError(error)
                }else{
                    let vals=[]
                    for(var i in results){
                        if(results[i].spotReview){
                            for (var g in results[i].spotReview){
                                vals.push(results[i].spotReview[g])
                            }
                        }
                    }
                    vals.sort(function (a, b) {
                        if (a.date > b.date) {
                          return -1;
                        }
                        if (a.date < b.date) {
                          return 1;
                        }
                        return 0;
                      })
                    setReviews(vals) 
                }
            })
        }catch({message}){
            setSpiner(undefined)
            setError(message)
        }
    }, [newReview])

    return <section className="foro" >
        <ul className="foro__reviews" onClick={() => setNewReview('')}>
            {reviews && reviews.map((element) =>{
                if(element.coordinates === forecastSelected.coordinates) {
                    return <li className="foro__reviewList">
                        <div className="foro__userInfo">{element.name} {element.surname} <br/> {element.date}</div>
                        <div className="foro__element"><h2>Current conditions</h2> <br/> {element.conditions} </div>
                        <div className="foro__element"><h2>{element.name} tips</h2> <br/> {element.tips} </div>
                        <div className="foro__element"><h2>Warrnings for this spot</h2> <br/> {element.warrnings} </div>
                        <div className="foro__element"><h2>Extra info</h2> <br/> {element.extraInfo} </div>
                    </li>
            }})}
                {spiner && sportState === 'surf' && <img className="foro__spiner" src='./images/spinerSurf.gif'/>}
                {spiner && sportState !== 'surf' && <img className="foro__spiner" src='./images/spinerSnow.gif'/>}
                {error && <Feedback message={error} level={'error'}/>}
        </ul>
        
        <i class="fas fa-plus-circle fa-3x" onClick={()=>setNewReview('on')}></i>
        {newReview && !error &&<form className="foro__newReview" onSubmit={handelPostReviews}>
            <label for="conditions">Current conditions</label>
            <textarea name="conditions" maxlength="100 " minlength="5" placeholder="What are the current conditions.." required></textarea>
            <label for="tips">Tips about this spot</label>
            <textarea name="tips" maxlength="100 " minlength="5" placeholder="Rite tips to help other riders.." required></textarea>
            <label for="warrnings">Warrnings</label>
            <textarea name="warrnings" maxlength="100 " minlength="5" placeholder="Rite some warrnigs to help prevent accidents.." required></textarea>
            <label for="extraInfo">Extra information</label>
            <textarea name="extraInfo" maxlength="100 " minlength="5" placeholder="Rite something.."></textarea>
            <button className="submit">Publish</button>
        </form>}
    </section>
}