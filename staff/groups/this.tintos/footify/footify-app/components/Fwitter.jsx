const {useState} = React

function Fwitter({fwitter}){
console.log(fwitter)
    if(!fwitter) return <Spinner />

    const arrfwitter = creatFwitterArray(fwitter)

    return <>
    <section >
        {
            arrfwitter.length ?
                <div className='fwitter'>
                { arrfwitter.map(({idUser,nameUser,surnameUser,name,message,date})=>
                                <div className='fwitter__user'>
                                    <div className='fwitter__user-item'>
                                        <img className='fwitter__point' src="img/boy.svg" alt=""/>
                                        <div className='fwitter__user-name'>{`@${nameUser} ${surnameUser}`}</div>
                                    </div>

                                    <div className='fwitter__comment'>

                                    <div className='fwitter__player-name'>{`@${name} `}<span className='fwitter__message'>{message}</span></div>
                                        <div className=''>
                                            <div className='fwitter__date'>{date}</div>
                                                <div className='fwitter__card-container'>
                                                    <a href=""><img className="fwitter__card-img" src="img/card_red.svg" alt=""/></a>
                                                    <a href=""><img className="fwitter__card-img" src="img/card_yelow.svg" alt=""/></a>
                                                    <a href=""><img className="fwitter__card-img" src="img/card_gren.svg" alt=""/></a>
                                                   
                                                </div>
                                 
                                        </div>

                                    </div>

                                </div>
                            )}<div >
                    </div>
                </div>
                : <Feedback message="sorry, no results :(" level="warning" />
        }
    </section>

    </>
}

