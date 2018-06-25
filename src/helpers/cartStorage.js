export function saveCart(cart){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function removeCart(){
    localStorage.removeItem('cart');
}

export function getCart(){
    return JSON.parse(localStorage.getItem('cart'));
}