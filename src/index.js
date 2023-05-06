import "./style.css";
import chocoCroissant from "./images/chocolate-croissant.jpg"
import chocoCookie from "./images/cookie.jpg"
import berlinerDonut from "./images/berliner.jpg"
import bread from "./images/bread.jpg"
import cakeTart from "./images/caketart.jpg"
import chocoCake from "./images/chococake.jpg"
import homeBread from"./images/home-bread.jpg"
import homeCroissant from "./images/home-croissant.jpg"
import homeBakery from './images/home-bakery.jpg'

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

const formScreen = (() => {
    const content = document.querySelector('.content');

    function drawContent() {
        const para = document.createElement('p');
        const paraDiv = document.createElement('div');
        para.textContent = `Thank you for visiting Whisk Me Away Bakery's Contact Us page! \
            We're thrilled to offer custom orders that cater to your unique tastes and preferences. \
            Whether you need assistance with an order, have feedback to share, \
            or want to inquire about a custom creation, we're always here to help in any way we can. \
            Simply fill out the form on this page and we'll get back to you as soon as possible. \
            We value our customers and appreciate your support, \
            and we can't wait to help you satisfy your sweet tooth with our delicious treats!`;
        paraDiv.appendChild(para);

        // Create the form element
        const form = document.createElement('form');
        form.id = 'contactForm';

        // Create the name field
        const nameInput = document.createElement('input');
        nameInput.placeholder = 'Name: '
        nameInput.type = 'text';
        nameInput.id = 'name';
        nameInput.name = 'name';
        nameInput.required = true;
        form.appendChild(nameInput);

        // Create the email field
        const emailInput = document.createElement('input');
        emailInput.placeholder = 'Email: '
        emailInput.type = 'email';
        emailInput.id = 'email';
        emailInput.name = 'email';
        emailInput.required = true;
        form.appendChild(emailInput);

        // Create the message field
        const messageInput = document.createElement('textarea');
        messageInput.placeholder = 'Type your message here...'
        messageInput.id = 'message';
        messageInput.name = 'message';
        messageInput.required = true;
        messageInput.rows = '20';
        messageInput.cols = '60';
        form.appendChild(messageInput);

        // Create the submit button
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Send Message';
        form.appendChild(submitButton);

        // Add the form to the content div
        content.appendChild(paraDiv);
        content.appendChild(form);
    }
    
    return { drawContent }
});

const displayController = (() => {
    const content = document.querySelector('.content');
    const container = document.querySelector('.container');
    const productList = [];
    const images = [homeBread , homeCroissant , homeBakery];
    let currentImageIndex = 0;

    const homeBtn  = document.getElementById('homeBtn');
    const productsBtn = document.getElementById('productsBtn');
    const contactBtn = document.getElementById('contactBtn');
    
    homeBtn.addEventListener('click', () => {
        display.updateContent('home');
    });

    productsBtn.addEventListener('click', () => {
        display.updateContent('products');
    });

    contactBtn.addEventListener('click', () => {
        display.updateContent('contactUs');
    });
    
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

    function fadeBackground() {
        setTimeout(changeImage, 1000);
    }

    function changeImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        container.style.backgroundImage = `url(${images[currentImageIndex]})`;
    }

    return { updateContent , fadeBackground , productList }
});

const display = displayController();
const home = homeScreen();
const contactUs = formScreen();

const croissant = new Product("Chocolate Croissant", 2.50, chocoCroissant);
const cookie = new Product("Chocolate Chip Cookie", 1.25, chocoCookie);
const berliner = new Product('Berliner Donut', 1.50, berlinerDonut);
const breadLoaf = new Product('Bread', 4.00, bread);
const tart = new Product('Cake Tart', 5.00, cakeTart);
const chocolateCake = new Product('Chocolate Cake', 10.00, chocoCake);

display.updateContent('home');

setInterval(display.fadeBackground, 5000);
