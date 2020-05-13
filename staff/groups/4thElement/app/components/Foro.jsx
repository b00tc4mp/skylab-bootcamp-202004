const { useState, useEffect } = React

function Foro () {

    const [error, setError] = useState()
    const [reviews, setReviews] = useState()
    const [newReview, setNewReview] = useState()

    const handelReviews = (results) => {

    }

    const handelPostReviews = (event) => {

    }

    useEffect(() => {
        try{
            retriveAllUsers((error, results) => {
                if(error){
                    setError(error)
                }else{

                   setReviews(results) 
                }
            })
        }catch({message}){
            setError(message)
        }
    },[])

    return <section className="foro">
        <div className="foro__reviews">

        </div>
        <i class="fas fa-plus-circle fa-3x" onClick={()=>setNewReview('on')}></i>
        {newReview && <form className="foro__newReview" onSubmit={handelPostReviews}>
            <label for="conditions">Current conditions</label>
            <textarea name="conditions" maxlength="50 " minlength="10" placeholder="What are the current conditions.."></textarea>
            <label for="Tips">Tips about this spot</label>
            <textarea name="Tips" maxlength="50 " minlength="10" placeholder="Rite tips to help other riders.."></textarea>
            <label for="Warrnings">Warrnings</label>
            <textarea name="Warrnings" maxlength="50 " minlength="10" placeholder="Rite some warrnigs to help prevent accidents.."></textarea>
            <label for="Extra info">Extra information</label>
            <textarea name="Extra info" maxlength="50 " placeholder="Rite something.."></textarea>
            <button className="submit">Tweet</button>
        </form>}
    </section>
}