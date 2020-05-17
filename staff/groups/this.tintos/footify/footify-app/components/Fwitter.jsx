const { useState } = React

function Fwitter({ fwitter, token, onUpdateFwitter, onUserSessionExpired,searchPlayer}) {

    const [comentsInfo, setComentsInfo] = useState()
    const [error, setError] = useState()
    
    if (!fwitter) return <Spinner />


    const handletoogleComment = (idCommentUser,cardColor,message) => {
        try {
            toogleFollowComment(token, idCommentUser, fwitter,cardColor,message, (error, fwitter) => {
                if (error) {
                    if (error.message === 'invalid token')
                        onUserSessionExpired()
                    else throw setError(error.message);
                } else onUpdateFwitter();
            });
        } catch (error) {
            setError(error.message);
        }
    }

    const handleSearchPlayer = (name) =>{
        searchPlayer(name)
    }

    return <>
        <section >
            {
                fwitter.length ?
                    <div className='fwitter'>
                        {fwitter.map(({ idUser, nameUser, surnameUser, name, message, date, redCard, yellowCard, greenCard, _date,bckgRed, bckgYellow, bckgGreen}) =>
                            <div key={_date} className='fwitter__user'>
                                <div className='fwitter__user-item'>
                                    <img className='fwitter__point' src="img/boy.svg" alt="" />
                                    <div className='fwitter__user-name'>{`@${nameUser} ${surnameUser}`}</div>
                                </div>

                                <div className='fwitter__comment'>
                                    <div className='fwitter__player-name'><a href="" onClick={(event) =>{
                                        event.preventDefault()
                                        handleSearchPlayer(name)}}>{`@${name} `}</a><span className='fwitter__message'>{message}</span></div>
                                    <div className=''>
                                        <div className='fwitter__date'>{date}</div>
                                        <div className='fwitter__card-container'>
                                            <div className={`fwitter__card-and-count-${bckgRed} fwitter__card-and-count-red `}>
                                                <a href="" onClick={(event) => {
                                                    event.preventDefault()
                                                    handletoogleComment(idUser,'red',message)
                                                }}><img className="fwitter__card-img" src="img/card_red.svg" alt="" /></a>
                                                <p >{redCard}</p>
                                            </div>
                                            <div className={`fwitter__card-and-count-${bckgYellow} fwitter__card-and-count-yellow`}>
                                                <a href="" onClick={(event) => {
                                                    event.preventDefault()
                                                    handletoogleComment(idUser,'yellow',message)
                                                }}><img className="fwitter__card-img" src="img/card_yelow.svg" alt="" /></a>
                                                <p>{yellowCard}</p>
                                            </div>
                                            <div className={`fwitter__card-and-count-${bckgGreen} fwitter__card-and-count-green`}>
                                                <a href="" onClick={(event) => {
                                                    event.preventDefault()
                                                    handletoogleComment(idUser,'green',message)
                                                }}><img className="fwitter__card-img" src="img/card_gren.svg" alt="" /></a>
                                                <p>{greenCard}</p>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        )}<div >
                        </div>
                    </div>
                    : <Feedback message="sorry, no results :(" level="fwitter" />
            }
        </section>
        {error && <Feedback message={error} level="error" />}

    </>
}

