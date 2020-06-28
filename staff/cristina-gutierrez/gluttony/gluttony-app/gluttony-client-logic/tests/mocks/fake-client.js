module.exports = {
    post: async () => ({ status: 201, data }),
    get: async () => ({ status, data }),
    delete: async () => ({ status: 204, data })
}