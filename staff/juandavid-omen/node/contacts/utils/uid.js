const { random } = Math
const { now } = Date

module.exports = () => `${now()}-${random()}`