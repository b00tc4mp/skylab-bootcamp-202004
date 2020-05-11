function Fwitter({fwitter}){
    const _fwitter = fwitter
    if(!_fwitter) return <Spinner />
console.log(_fwitter)
    return <>
        <section >
        {
            _fwitter.length ?
                <div>
                {_fwitter.map(({idUser, nameUser,surnameUser,fwitter}) =>
                    <div >
                        <div>{`******** ${nameUser} ${surnameUser}`}</div>
                            <div>
                            {fwitter.map(({id, name,fwitt})=>
                                <div >
                                    <div>{`      * Nombre del Jugador : ${name}`}</div>
                                    <div>
                                    {fwitt.map(({message,date})=>
                                    <div>
                                        <div>{date}</div>
                                        <div>{message}</div>
                                    </div>
                                    )}</div>
                                
                                </div>
                             )}</div>
                    </div>
                )}</div>
                : <Feedback message="sorry, no results :(" level="warning" />
        }
    </section>
    </>
}