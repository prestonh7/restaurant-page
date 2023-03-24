import "./style.css";

const content = document.querySelector('.content');
const header = document.querySelector('header');
const headerHeight = getComputedStyle(header).getPropertyValue('height');
document.documentElement.style.setProperty('--header-height', headerHeight);