module.exports = term=>{
    term.id = term._id

    delete term._id
    delete term.alt_id
    delete term.xref
    delete term.__v
    return term
}