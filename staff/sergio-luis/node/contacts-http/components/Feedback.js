module.exports = (message, level = 'success')=>{
    return `<section class = 'feedback--${level}'>
    ${message}
</section>`
}