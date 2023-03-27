import "./style.css";
import chocoCroissant from "./images/chocolate-croissant.jpg"
import chocoCookie from "./images/cookie.jpg"
import berlinerDonut from "./images/berliner.jpg"
import bread from "./images/bread.jpg"
import cakeTart from "./images/caketart.jpg"
import chocoCake from "./images/chococake.jpg"

const homeBtn  = document.getElementById('homeBtn');
const productsBtn = document.getElementById('productsBtn');
const contactBtn = document.getElementById('contactBtn');

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
        you can access them from the header or "

        const link = document.createElement("a");
        link.textContent = "click here to see our full range of treats.";
        link.href = "#";
        link.addEventListener("click", function () {
            updateContent("products");
        });

        para.appendChild(link);
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
        resetBtn();
        if (page === 'home') {
            homeBtn.style.backgroundColor = 'var(--blue-green)'
            content.setAttribute('id', 'home');
            home.drawContent();
        } else if (page === 'products') {
            productsBtn.style.backgroundColor = 'var(--blue-green)'
            content.setAttribute('id', 'products');
            renderProducts();
        } else if (page === 'contactUs') {
            contactBtn.style.backgroundColor = 'var(--blue-green)'
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

    function resetBtn() {
        homeBtn.style.backgroundColor = 'var(--bright-blue)'
        productsBtn.style.backgroundColor = 'var(--bright-blue)'
        contactBtn.style.backgroundColor = 'var(--bright-blue)'
    }

    return { updateContent , productList }
});

const display = displayController();
const home = homeScreen();
const croissant = new Product("Chocolate Croissant", 2.50, chocoCroissant);
const cookie = new Product("Chocolate Chip Cookie", 1.25, chocoCookie);
const berliner = new Product('Berliner Donut', 1.50, berlinerDonut);
const breadLoaf = new Product('Bread', 4.00, bread);
const tart = new Product('Cake Tart', 5.00, cakeTart);
const chocolateCake = new Product('Chocolate Cake', 10.00, chocoCake);

display.updateContent('home');

homeBtn.addEventListener('click', () => {
    display.updateContent('home');
});

productsBtn.addEventListener('click', () => {
    display.updateContent('products');
});
