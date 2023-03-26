import "./style.css";

const heightAdjust = (() => { 
    const header = document.querySelector('header');
    const headerHeight = getComputedStyle(header).getPropertyValue('height');
    document.documentElement.style.setProperty('--header-height', headerHeight);
})();

const homeScreen = (() => {
    const content = document.querySelector('.content');

    function drawContent() {
        content.setAttribute('id', 'home');
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
    static productList = [];

    constructor(name, price, img) {
        this.name = name;
        this.price = price;
        this.img = img;

        Product.productList.push(this);
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

    static renderProducts() {
        const productList = document.querySelector("#product");
        Product.productList.forEach(product => {
            const productElement = product.render();
            productList.appendChild(productElement);
    });
  }
}

const displayController = (() => {
    const content = document.querySelector('.content');
    
    function updateContent(page) {
        clearContent();
        if (page === home) {
            home.drawContent();
        } else if (page === products) {
            products.drawContent();
        } else if (page === contactUs) {
            contactUs.drawContent();
        }
    }

    function clearContent() {
        content.innerText = '';
    }

    return { updateContent }
});

const display = displayController();
const home = homeScreen();

home.drawContent();

const homeBtn  = document.getElementById('homeBtn');
const productsBtn = document.getElementById('productsBtn');
const contactBtn = document.getElementById('contactBtn');

homeBtn.addEventListener('click', () => {
    display.updateContent(home);
});
