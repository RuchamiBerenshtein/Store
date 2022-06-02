let id = 1;
if (JSON.parse(localStorage.getItem('products'))) {
    id = JSON.parse(localStorage.getItem('products')).length + 1;
}
class Product {

    constructor(productName, productId, category, price, quantity) {
        this.productName = productName;
        if (productId > 0) {
            this.productId = productId;
        }
        else {
            this.productId = id++;
        }
        this.category = category;
        this.price = price;
        this.quantity = quantity;
    }

    add(quantity) {
        this.quantity += quantity;
    }

    divide(quantity) {
        if (this.quantity - quantity >= 0) {
            this.quantity -= quantity;
            return true;
        }
        return false;
    }

    setPrice(price) {
        this.price = price;
    }

    setProduct(name, category, price, quantity) {
        this.productName = name;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
    }
}