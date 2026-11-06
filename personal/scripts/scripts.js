const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#primary-nav');

menuButton.addEventListener('click', function () {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';

  // Toggle the CSS class that shows the mobile menu.
  navigation.classList.toggle('open');

  // Keep the button's accessible state in sync with the menu.
  menuButton.setAttribute('aria-expanded', String(!isOpen));
});
