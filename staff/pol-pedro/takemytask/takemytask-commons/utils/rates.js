
const Rate = {
    validate (rate) {
        if (rate < 0 || rate > 5) throw new Error(`${rate} is not a valid rate`)
    }
}

module.exports = Rate