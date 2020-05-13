function Feedback ({message, modifier = ''}){
    String.validate(modifier)
    String.validate(message)

    return <h3 className={`feedback ${modifier}`}>{message}</h3>


}