module.exports = {
    _items: {},

    setItem(key, value) {
        this._items[key] = value
    },

    getItem(key) {
        return this._items[key]
    },

    removeItem(key) {
        delete this._items[key]
    }
}