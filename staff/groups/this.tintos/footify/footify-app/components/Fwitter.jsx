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
                                        <div className='fwitter__point'></div>
                                        <div className='fwitter__user-name'>{`${nameUser} ${surnameUser}`}</div>
                                    </div>
                                    <div className='fwitter__comment'>
                                    <div className='fwitter__player-name'>{`${name}`}</div>
                                    <div className=''>
                                        <div className='fwitter__message'>{message}</div>
                                        <div className='fwitter__date'>{date}</div>
                                            <div className='fwitter__card-container'>
                                                <div className='fwitter__card'></div>
                                                <div className='fwitter__card'></div>
                                                <div className='fwitter__card'></div>
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

