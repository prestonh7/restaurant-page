import "./style.css";

const heightAdjust = (() => { 
    const header = document.querySelector('header');
    const headerHeight = getComputedStyle(header).getPropertyValue('height');
    document.documentElement.style.setProperty('--header-height', headerHeight);
})();

const homeScreen = (() => {
    const content = document.querySelector('.content');
    function drawContent() {
        
    }
    return { drawContent }
});

const displayController = (() => {
    const content = document.querySelector('.content');
    function updateContent(page) {
        clearContent();
        if (page === 'home') {
            homeScreen.drawContent();
        } else if (page === 'products') {

        } else if (page === 'contactUs') {

        }
    }
    function clearContent() {
        content.innerText = '';
    }
    return { updateContent }
});
