require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('misc-data')

const product = [
    {
        name: "Phone Case - 3 Card",
        description: "iPhone 11 / 11 Pro / 11 Pro Max, 3 cards",
        price: 75,
        url: "https://bellroy.imgix.net/cms_images/3113/ptab-product-explode.jpg?auto=format&fit=max"
    },

    {
        name: "The Notetaker",
        description: "To take notes",
        price: 29,
        url: "https://bellroy.imgix.net/dynamic-assets/W1siZnUiLCJodHRwczovL3MzLmFtYXpvbmF3cy5jb20vcHJvZHVjdC5pbWFnZXMuYmVsbHJveS5jb20vcHJvZHVjdF9pbWFnZXMvaW1hZ2VzLzAwMC8wMTYvNDYyL29yaWdpbmFsL2U4OTAzNmYzYjE1MTc0ODI2YzNjNWU2NjVmZTIxNDgwOTk3ZThjZDI3MWFjMTMxMWJlOTA2YWJiNzgwZGZhZGQuanBlZyJdXQ/b9344423e61bb558/e89036f3b15174826c3c5e665fe21480997e8cd271ac1311be906abb780dfadd.jpeg?auto=format&fit=max&w=300&h=250"
    },

    {
        name: "Tokyo Tote",
        description: "15 liters, laptop or tablet of 13'', an ingenious piece to carry everything ",
        price: 99,
        url: "https://bellroy.imgix.net/cms_images/3798/btta-feature-4-charcoal.jpg?auto=format&fit=max&w=640"
    },

    {
        name: "Studio Set",
        description: "For those who see the opportunity in every meeting",
        price: 109,
        url: "https://bellroy.imgix.net/dynamic-assets/W1siZnUiLCJodHRwczovL3MzLmFtYXpvbmF3cy5jb20vcHJvZHVjdC5pbWFnZXMuYmVsbHJveS5jb20vcHJvZHVjdF9pbWFnZXMvaW1hZ2VzLzAwMC8wMTkvNzE4L29yaWdpbmFsLzJhYzlkYmM0NWNiOTQ1M2Q3ZTU3NWM2ZDdlYWMyZTRlNmJkZTQzZjJkNzQzMTY2OGJmYzM4MDk2ZTBkMTc4ZWYuanBnIl1d/be8f07d3dd94f4dc/2ac9dbc45cb9453d7e575c6d7eac2e4e6bde43f2d7431668bfc38096e0d178ef.jpg?auto=format&fit=max&w=300&h=250"
    },

    {
        name: "Tech Kit",
        description: "Charger, adapter, cables, headphones. Order your accessories",
        price: 59,
        url: "https://bellroy.imgix.net/dynamic-assets/W1siZnUiLCJodHRwczovL3MzLmFtYXpvbmF3cy5jb20vcHJvZHVjdC5pbWFnZXMuYmVsbHJveS5jb20vcHJvZHVjdF9pbWFnZXMvaW1hZ2VzLzAwMC8wMTgvODc3L29yaWdpbmFsL2ZjNmNjMGM1MWI1Y2IzMmMzY2QyNjU2ZmM3MmFmODhlNzA1M2QwOTU1YzhhOGViMGY3NGNiM2M4NDQwNzI2ZTQuanBlZyJdXQ/6f3a8d5644f925ca/fc6cc0c51b5cb32c3cd2656fc72af88e7053d0955c8a8eb0f74cb3c8440726e4.jpeg?auto=format&fit=max&w=300&h=250"
    },

    {
        name: "Pensil Case",
        description: "Pens, pencils, calbles, small personal items",
        price: 39,
        url: "https://bellroy.imgix.net/dynamic-assets/W1siZnUiLCJodHRwczovL3MzLmFtYXpvbmF3cy5jb20vcHJvZHVjdC5pbWFnZXMuYmVsbHJveS5jb20vcHJvZHVjdF9pbWFnZXMvaW1hZ2VzLzAwMC8wMTkvNDA3L29yaWdpbmFsLzkyMmFmZGZiZTE4YWRkODFiZjI0YTRhODAzZGMwYTNhZjk1ODBhNDU0OWI3YmRlYjNkM2FjNDNiMGY0ZDY3YzUuanBnIl1d/fe1a9193cb61c356/922afdfbe18add81bf24a4a803dc0a3af9580a4549b7bdeb3d3ac43b0f4d67c5.jpg?auto=format&fit=max&w=300&h=250"
    },

    {
        name: "Notebook Cover & Pen - with refills",
        description: "Samll notebook, 4-6 cards, pen Notetaker",
        price: 109,
        url: "https://bellroy.imgix.net/dynamic-assets/W1siZnUiLCJodHRwczovL3MzLmFtYXpvbmF3cy5jb20vcHJvZHVjdC5pbWFnZXMuYmVsbHJveS5jb20vcHJvZHVjdF9pbWFnZXMvaW1hZ2VzLzAwMC8wMjAvNDU4L29yaWdpbmFsLzg3YWY3NDNlMzgyMDY0Mzg5ZTEyMTYxN2MyNTkxMjZhOWQ0NjNhNWQwMjQ2YTVmMWUyNWE3MmZiNDJiYjExYWYuanBnIl1d/98ce187e1a03ddce/87af743e382064389e121617c259126a9d463a5d0246a5f1e25a72fb42bb11af.jpg?auto=format&fit=max&w=300&h=250"
    },

    {
        name: "Classic Backpack Plus",
        description: "22 liters, laptop 15''",
        price: 179,
        url: "https://bellroy.imgix.net/dynamic-assets/W1siZnUiLCJodHRwczovL3MzLmFtYXpvbmF3cy5jb20vcHJvZHVjdC5pbWFnZXMuYmVsbHJveS5jb20vcHJvZHVjdF9pbWFnZXMvaW1hZ2VzLzAwMC8wMjAvMzMwL29yaWdpbmFsL2JhOTRjZjUyNTcyZTY5MDMxODYxYTRjYjk5ODU2NTMwYTM1N2UzMzE5OTgwN2VjN2EyODY4OGZhYmUzNzc3M2YuanBnIl1d/731e58b1b368a929/ba94cf52572e69031861a4cb99856530a357e33199807ec7a28688fabe37773f.jpg?auto=format&fit=max&w=300&h=250"
    },

    {
        name: "Classic Pouch",
        description: "Cables, cosmetics, toiletries, personal items and more",
        price: 49,
        url: "https://bellroy.imgix.net/dynamic-assets/W1siZnUiLCJodHRwczovL3MzLmFtYXpvbmF3cy5jb20vcHJvZHVjdC5pbWFnZXMuYmVsbHJveS5jb20vcHJvZHVjdF9pbWFnZXMvaW1hZ2VzLzAwMC8wMjEvMzI0L29yaWdpbmFsL2Q1MjhlNzY1ZjI2ZWIzZmUzZDBlMDhhOTQ1OTg1NGZmNDBhZmQ5ZGMzMWUzMjg1YWE3MGE1OGI2NDc4NDE1MDQuanBnIl1d/53d86ad78a59b759/d528e765f26eb3fe3d0e08a9459854ff40afd9dc31e3285aa70a58b647841504.jpg?auto=format&fit=max&w=300&h=250"
    },

    {
        name: "Phone Case",
        description: "iPhone SE / 8",
        price: 39,
        url: "https://bellroy.imgix.net/dynamic-assets/W1siZnUiLCJodHRwczovL3MzLmFtYXpvbmF3cy5jb20vcHJvZHVjdC5pbWFnZXMuYmVsbHJveS5jb20vcHJvZHVjdF9pbWFnZXMvaW1hZ2VzLzAwMC8wMjIvMjM2L29yaWdpbmFsLzNhOTliOTJmNjM4Y2ZmZTllOGNmMzFhNmNjMzA0YjY0YTUyNzE4YWFmNzhiZGYyNWI3MWUyZTkyNDEzNDQ2MjMuanBnIl1d/f23d559402833b85/3a99b92f638cffe9e8cf31a6cc304b64a52718aaf78bdf25b71e2e9241344623.jpg?auto=format&fit=max&w=300&h=250"
    }
]



mongo.connect(MONGODB_URL)
    .then(connection => {
        const products = connection.db().collection('products')

        return products.insertMany(product)
    })
