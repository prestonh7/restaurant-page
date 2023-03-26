import "./style.css";
import chocoCroissant from "./chocolate-croissant.jpg"
import chocoCookie from "./cookie.jpg"

const heightAdjust = (() => { 
    const header = document.querySelector('header');
    const headerHeight = getComputedStyle(header).getPropertyValue('height');
    document.documentElement.style.setProperty('--header-height', headerHeight);
})();

const homeScreen = (() => {
    const content = document.querySelector('.content');

    function drawContent() {
        const para = document.createElement('p');
        para.textContent = "Welcome to Whisk Me Away Bakery, where every bite is a sweet escape! \
        Our expert bakers use only the finest ingredients to create delicious treats \
        that will transport you to a world of flavor and indulgence. \
        From our famous croissants to our decadent cakes, \
        everything we make is crafted with care and precision. \
        Browse our products to find your next sweet escape - \
        you can access them from the header or click here to see our full range of treats."
        content.appendChild(para);
    }

    return { drawContent }
});

class Product {
    constructor(name, price, img) {
        this.name = name;
        this.price = price;
        this.img = img;

        display.productList.push(this);
    }

    render() {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        const imageElement = document.createElement("img");
        imageElement.setAttribute("src", this.img);

        const nameElement = document.createElement("h2");
        nameElement.textContent = this.name;

        const priceElement = document.createElement("p");
        priceElement.textContent = `$${this.price.toFixed(2)}`;

        productElement.appendChild(imageElement);
        productElement.appendChild(nameElement);
        productElement.appendChild(priceElement);

        return productElement;
    }
}

const displayController = (() => {
    const content = document.querySelector('.content');
    const productList = [];
    
    function updateContent(page) {
        clearContent();
        if (page === 'home') {
            content.setAttribute('id', 'home');
            home.drawContent();
        } else if (page === 'products') {
            content.setAttribute('id', 'products');
            renderProducts();
        } else if (page === 'contactUs') {
            content.setAttribute('id', 'contactUs');
            contactUs.drawContent();
        }
    }

    function renderProducts() {
        productList.forEach(product => {
            const productElement = product.render();
            content.appendChild(productElement);
        })
    }

    function clearContent() {
        content.innerText = '';
    }

    return { updateContent , productList }
});

const display = displayController();
const home = homeScreen();
const croissant = new Product("Chocolate Croissant", 2.50, chocoCroissant);
const cookie = new Product("Chocolate Chip Cookie", 1.25, chocoCookie);

display.updateContent('home');

const homeBtn  = document.getElementById('homeBtn');
const productsBtn = document.getElementById('productsBtn');
const contactBtn = document.getElementById('contactBtn');

homeBtn.addEventListener('click', () => {
    display.updateContent('home');
});

productsBtn.addEventListener('click', () => {
    display.updateContent('products');
});
