const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser('asdfqwer'));

app.get('/count', (req, res) => {
    if(req.signedCookies.count){
        var count = parseInt(req.signedCookies.count);
    } else {
        var count = 0;
    }
    
    count++;
    res.cookie('count', count, {signed: true});
    res.send('count : '+count);
});

var products = {
    1: {title: 'Web1'},
    2: {title: 'Next Web'}
}
app.get('/products', (req, res) => {
    var output = '';
    for(var name in products){
        output += `
        <li>
            <a href="/cart/${name}">${products[name].title}</a>
        </li>`;
    }
    res.send(`
    <h1>Products</h1>
    <ul>${output}</ul>
    <a href="/cart">Cart</a>`);
});
/*
cart = {
    id: num
}
*/
app.get('/cart/:id', (req, res) => {
    var id = req.params.id;
    if(req.signedCookies.cart){
        var cart = req.signedCookies.cart;
    } else {
        var cart = {};
    }
    if(!cart[id]){
        cart[id] = 0;
    }
    cart[id] = parseInt(cart[id]) + 1;
    res.cookie('cart', cart, {signed: true});
    res.redirect('/cart');
});

app.get('/cart', (req, res) => {
    var cart = req.signedCookies.cart;
    if(!cart) {
        res.send('Empty!');
    }else{
        var output = '';
        for(var id in cart){
            output+=`<li>${products[id].title} (${cart[id]})</li>`;
        }
    }
    res.send(`
    <h1>Cart</h1>
    <ul>${output}</ul>
    <a href="/products">Products</a>`);
});

app.listen(3000, () => {
    console.log('Connected 3000 port!');
});