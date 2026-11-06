// 1. Hamburger Menu Toggle
const hambutton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hambutton.textContent = '☰';

hambutton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    
    // Toggle icon between 'X' and '☰'
    if (navigation.classList.contains('open')) {
        hambutton.textContent = 'X';
    } else {
        hambutton.textContent = '☰';
    }
});

// 2. Dynamic Footer Copyright Year
const currentYearSpan = document.querySelector('#currentyear');
const today = new Date();
currentYearSpan.textContent = today.getFullYear();

// 3. Dynamic Footer Last Modified Date
const lastModifiedParagraph = document.querySelector('#lastModified');
lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;