if (!(sessionStorage.getItem('currentUser'))) {
    location.href = "/login.html"
}

const manager = sessionStorage.getItem('manager') === 'false' ? false : true;

if (!manager) {
    document.getElementById('addProduct').style.display = 'none';
    document.getElementById('managerSearch').style.display = 'none';
}

document.getElementById('editProduct').style.display = 'none';

document.getElementById("hiUser").innerHTML = sessionStorage.getItem('currentUser');

const store = new Store();

let searchSettings = {
    allProduct: [],
    searchOutOfStock: false,
    searchCloseOutOfStock: false,
}

const saveToStorage = () => {
    localStorage.setItem('products', JSON.stringify(store.products));
    displayProduct(store.products);
}

const addProduct = () => {
    const name = document.getElementById('add_name').value.trim();
    const category = document.getElementById('category').value.trim();
    const price = document.getElementById('add_price').value.trim() - 0;
    const quantity = document.getElementById('add_quantity').value.trim() - 0;
    store.addProduct(name, 0, category, price, quantity);
    saveToStorage();
    displayProduct(store.products);
    document.getElementById('add_name').value = '';
    document.getElementById('add_price').value = 0;
    document.getElementById('add_quantity').value = 0;
}

const displayDeleteForm = (id) => {
    store.deleteProduct(id);
    saveToStorage();
}

const displayEditForm = (id) => {
    const product = store.findProduct(id);
    document.getElementById('edit_id').value = product.productId;
    document.getElementById('edit_name').value = product.productName;
    document.getElementById('edit_category').value = product.category;
    document.getElementById('edit_price').value = product.price;
    document.getElementById('edit_quantity').value = product.quantity;
    document.getElementById('editProduct').style.display = 'block';
}

const editProduct = () => {
    document.getElementById('editProduct').style.display = 'none';
    const id = document.getElementById('edit_id').value.trim() - 0;
    const name = document.getElementById('edit_name').value.trim();
    const category = document.getElementById('edit_category').value.trim();
    const price = document.getElementById('edit_price').value.trim() - 0;
    const quantity = document.getElementById('edit_quantity').value.trim() - 0;
    const product = store.findProduct(id);
    product.setProduct(name, category, price, quantity);
    saveToStorage();
}

function closeInput() {
    document.getElementById('editProduct').style.display = 'none';
}

const displayProduct = (products) => {
    const button = document.createElement('button');
    const content = document.getElementById('allProduct');
    content.innerHTML = '';
    products.forEach((product) => {
        const { productId, productName, category, price } = product;
        const div = document.createElement('div');
        div.classList.add('div');
        div.innerHTML = `<a href="/dynamicProduct.html?code=${productId}">
            <span class="category"> ${category} </span> \t
            <span class="productName"> ${productName} </span> \t
            <span class="price"> ${price}</span>
        </a>`;
        content.append(div);
        if (manager) {
            let editButton = button.cloneNode(false);
            editButton.innerText = 'Edit';
            editButton.setAttribute('onclick', `displayEditForm(${productId})`);
            let deleteProduct = button.cloneNode(false);
            deleteProduct.innerText = 'Delete';
            deleteProduct.setAttribute('onclick', `displayDeleteForm(${productId})`);
            content.append(editButton);
            content.append(deleteProduct);
        }
    })
}

const search = () => {
    const search_text = document.getElementById('search_text').value.trim();
    const search_category = document.getElementById('search_category').value.trim();
    const min_price = document.getElementById('min_price').value.trim() - 0;
    const max_price = document.getElementById('max_price').value.trim() - 0;
    const filterProducts = store.filters(search_text, min_price, max_price, search_category, searchSettings.searchOutOfStock, searchSettings.searchCloseOutOfStock);
    displayProduct(filterProducts);
}

const searchOutOfStock = () => {
    searchSettings.searchOutOfStock = true;
    searchSettings.searchCloseOutOfStock = false;
    search();
}

const searchCloseOutOfStock = () => {
    searchSettings.searchCloseOutOfStock = true;
    searchSettings.searchOutOfStock = false;
    search();
}

const restartSettings = () => {
    document.getElementById('search_text').value = "";
    document.getElementById('search_category').value = "";
    document.getElementById('min_price').value = 0;
    document.getElementById('max_price').value = 1000000;
    searchSettings.searchOutOfStock = false;
    searchSettings.searchCloseOutOfStock = false;
    displayProduct(store.products);
}

const initiallyStore = () => {
    const productsFromLocal = JSON.parse(localStorage.getItem('products')) || [];
    let id = 1;
    productsFromLocal.forEach(p => {
        store.addProduct(p.productName, id++, p.category, p.price, p.quantity)
    });
    saveToStorage();
}

initiallyStore();


