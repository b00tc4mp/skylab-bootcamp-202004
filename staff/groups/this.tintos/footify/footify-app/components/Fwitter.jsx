function Fwitter({fwitter}){
    const _fwitter = fwitter
    if(!_fwitter) return <Spinner />
console.log(_fwitter)
    return <>
    <section >
        {
            _fwitter.length ?
                <div className='fwitter'>
                {_fwitter.map(({idUser, nameUser,surnameUser,fwitter}) =>
                        fwitter.map(({id, name,fwitt})=>
                                fwitt.map(({message,date})=>
                                <div className='fwitter__user'>
                                    <div className='fwitter__user-item'>
                                        <div className='fwitter__point'></div>
                                        <div className='fwitter__user-name'>{`${nameUser} ${surnameUser}`}</div>
                                    </div>
                                    <div className='fwitter__comment'>
                                    <div className='fwitter__player-name'>{`${name}`}</div>
                                    <div className=''>
                                        <div className='fwitter__message'>{message}</div>
                                        <div className='fwitter__date'>{date}</div>
                                            <div class='fwitter__card-container'>
                                                <div class='fwitter__card'></div>
                                                <div class='fwitter__card'></div>
                                                <div class='fwitter__card'></div>
                                            </div>
                                 
                                    </div>
                                    </div>
                                </div>
                            )))}<div >
                    </div>
                </div>
                : <Feedback message="sorry, no results :(" level="warning" />
        }
    </section>
    </>
}