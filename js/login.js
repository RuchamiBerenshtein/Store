const manager = {
    name: "Ruchami",
    password: "r1234"
}

// localStorage.setItem('products', null);

const isManager = (() => {
    if (document.getElementById('userName').value === manager.name
        && document.getElementById('userPassword').value === manager.password) {
        sessionStorage.setItem('manager', true);
        sessionStorage.setItem('currentUser', "Ruchami");
    }
    else{    
        sessionStorage.setItem('manager', false);
        sessionStorage.setItem('currentUser', document.getElementById('userName').value);
    }

    location.href="/main.html"
})