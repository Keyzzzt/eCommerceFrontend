

export const addProductToCart = (product, next) => {
    let cart = []
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...product,
            count: 1
        })
        cart = Array.from(new Set(cart.map((product) => (product._id)))).map(id => {
            return cart.find(product => product._id === id)
        })
        localStorage.setItem('cart', JSON.stringify(cart))
        next()
    }
}

export const totalProductsInCart = () => {
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length
        }
    }
    return 0
}

export const getProductsThatAreInCart = () => {
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
    return []
}

export const updateItem = (productId, count) => {
    let cart = []
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product, i) => {
            if(product._id === productId) {
                cart[i].count = count
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    return cart
}

export const removeItem = (productId) => {
    let cart = []
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product, i) => {
            if(product._id === productId) {
                cart.splice(i, 1)
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    return cart
}

export const emptyCartAfterPurchase = (next) => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('cart')
        next()
    }
}