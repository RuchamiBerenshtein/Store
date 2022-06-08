const searchParams = new URLSearchParams(location.search);
const code = parseInt(searchParams.get('code'));
if (!code) {
    location.href = '/main.html';
}

const products = JSON.parse(localStorage.getItem('products'));
const product = products.find(p => p.productId === code);
p = new Product(product.productName, product.productId, product.category, product.price, product.quantity);

const visibleProduct = () => {
    document.getElementById('name').innerHTML = product.productName;
    document.getElementById('category').innerHTML = product.category;
    document.getElementById('price').innerHTML = product.price;
}

const orderProduct = () => {
    if (p.divide(document.getElementById('orderQuantity').value.trim())) {
        alert(`you ordered ${document.getElementById('orderQuantity').value.trim()} parts of ${product.productName}`)
        products.find(p => p.productId === code).quantity = p.quantity;
        saveToStorage();
    }
    else {
        alert(`we are sori!
        but we haven't enough ${product.productName} for you`)
    }
    location.href = "main.html";
}

const saveToStorage = () => {
    localStorage.setItem('products', JSON.stringify(products));
}

visibleProduct();