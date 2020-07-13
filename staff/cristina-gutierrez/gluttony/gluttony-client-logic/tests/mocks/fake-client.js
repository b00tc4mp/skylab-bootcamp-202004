module.exports = {
    succeed(data, status = 200) {
        this._status = status
        this._data = data
    },

    fail(error, status = 500) {
        this._status = status
        this._data = { error }
    },

    async post() {
        return { 
            status: this._status || 201, 
            data: this._data 
        }
    },

    async get() {
        return { 
            status: this._status || 200, 
            data: this._data 
        }
    },

    async delete() {
        return { 
            status: this._status || 204, 
            data: this._data 
        }
    }
}