function Feedback ({message, level}) {
    return <p className={`feedback feedback--${level}`}>{message}</p>
}