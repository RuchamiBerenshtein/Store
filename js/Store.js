class Store {

    constructor() {
        this.products = [];
    }

    addProduct(productName, id, category, price, quantity) {
        this.products.push(new Product(productName, id, category, price, quantity));
    }

    deleteProduct(productId) {
        const index = this.products.indexOf(p => p.productId === productId);
        this.products.splice(index, 1);
    }

    findProduct(productId) {
        return this.products.find(p => p.productId === productId);
    }

    filters(productName, min, max, category, filterOutOfStock, filterCloseOutOfStock) {
        let toFilter = this.filterByName(productName, this.products);
        
        toFilter = this.filterbyPrice(min, max, toFilter);
        
        toFilter = this.filterByCategory(category, toFilter);
        
        if (filterOutOfStock) {
            toFilter = this.filterOutOfStock(toFilter);
        }
        
        if (filterCloseOutOfStock) {
            toFilter = this.filterCloseOutOfStock(toFilter);
        }
        
        return toFilter;
    }

    filterByName(productName, toFilter) {
        if (productName === "") {
            return toFilter;
        }
        
        return toFilter.filter(p => p.productName.includes(productName));
    }

    filterbyPrice(min, max, toFilter) {
        if (min > max) {
            const swap = min;
            min = max;
            max = swap;
        }
        
        return toFilter.filter(p => p.price >= min && p.price <= max);
    }

    filterByCategory(category, toFilter) {
        if (category === "") {
            return toFilter;
        }
        return toFilter.filter(p => p.category === category);
    }

    filterOutOfStock(toFilter) {
        return toFilter.filter(p => p.quantity === 0);
    }

    filterCloseOutOfStock(toFilter) {
        return toFilter.filter(p => p.quantity < 10 && p.quantity > 0);
    }
}