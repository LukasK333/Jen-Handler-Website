document.addEventListener('DOMContentLoaded', function () { 
    const menuContainer = document.querySelector('.menu-container');
    const hamburgerButton = menuContainer.firstElementChild;
    const homeContainer = document.querySelector('.home-container');
    const closeButton = homeContainer.firstElementChild;
    const hamburgerMenu = document.querySelector('.hamburger-menu');

    menuContainer.addEventListener('click', () => {
        hamburgerButton.setAttribute('aria-expanded', 'true');
        closeButton.setAttribute('aria-expanded', 'true');
        menuContainer.classList.add('hidden');
        homeContainer.classList.remove('hidden');
        hamburgerMenu.classList.remove('hidden');
        hamburgerMenu.setAttribute('aria-hidden', 'false');
    })

    homeContainer.addEventListener('click', () => {
        hamburgerButton.setAttribute('aria-expanded', 'false');
        closeButton.setAttribute('aria-expanded', 'false');
        menuContainer.classList.remove('hidden');
        homeContainer.classList.add('hidden');
        hamburgerMenu.classList.add('hidden');
        hamburgerMenu.setAttribute('aria-hidden', 'true');
    })

    // Get all navigation links on navBar
    const navLinks = document.querySelectorAll('.navbar .hamburger-menu ul li a');
    const clinicalServicesLink = document.getElementById('clinical-services');

    // Get the current page URL
    const currentURL = window.location.href;

    // Loop through all navigation links
    navLinks.forEach(link => {

        // Check if the link's href is the current page we are on
        if (link.href == currentURL) {
            // Add the 'active' class to that link
            link.classList.add('active');

            // If the active link is a submenu item, also add 'active' class to "Clinical Services"
            if (link.closest('.submenu')) {
                clinicalServicesLink.classList.add('active');
            }
        }
    })

});

function toggleDropdown() {
    const submenu = document.getElementById('submenu');
    const arrow = document.querySelector('.arrow');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const contactLink = document.getElementById('contact');
    const clinicalServicesLink = document.getElementById('clinical-services');

    submenu.classList.toggle('active');
    arrow.classList.toggle('open');
    clinicalServicesLink.classList.toggle('active'); 

    if (submenu.classList.contains('active')) {
        const submenuHeight = submenu.offsetHeight;
        const currentMenuHeight = hamburgerMenu.offsetHeight;
        const newMenuHeight = currentMenuHeight + submenuHeight;
        clinicalServicesLink.setAttribute('aria-expanded', 'true');
        
        hamburgerMenu.style.height = newMenuHeight + 'px';
    } else {
        clinicalServicesLink.setAttribute('aria-expanded', 'false');
        hamburgerMenu.style.height = '';
        contactLink.style.marginTop = '';
    }
}

function showText() { //!change this to just run off of adjustAboutTextHeight function
    const text = document.querySelector('.text');
    const textButton = document.querySelector('.text-button');
    if (textButton.innerHTML == "Read More") {
        text.style.overflow = 'visible'; 
        const scrollHeight = text.scrollHeight;
        text.style.maxHeight = `${scrollHeight}px`; // set the max-height to the full height of the content
        textButton.innerHTML = "Show Less";
    }
    else {
        text.style.overflow = 'hidden'; // Hide the overflow

        textButton.innerHTML = "Read More";
        adjustTextHeight(); // Reset the max-height 
    }
}

function adjustTextHeight() {
    const text = document.querySelector('.text');
    const textTopParagraph = text.firstElementChild;
    const footer = document.querySelector('footer');
    // const readMoreButton = document.querySelector('.text-button');
    const readMoreButton = document.querySelector('.button-div');

    const windowHeight = window.innerHeight;

    // offset from top paragraph to top border of body element (closest positioned parent of aboutText)
    const offsetTop = textTopParagraph.offsetTop + text.offsetTop;
    const readMoreButtonHeight = readMoreButton.offsetHeight;
    const footerHeight = footer.offsetHeight;
    const minTextHeight = parseFloat(getComputedStyle(text).minHeight);

    var maxHeight;

    if (window.innerWidth > 760) {
        maxHeight = windowHeight - (offsetTop + footerHeight + readMoreButtonHeight); // Add some extra padding
    }
    else {
        maxHeight = windowHeight - (offsetTop + footerHeight + readMoreButtonHeight + minTextHeight); // Add some extra padding
    }

    text.style.maxHeight = `${maxHeight}px`;
}

// Call the function when the page loads
window.addEventListener('load', adjustTextHeight);

// Call the function when the window is resized
window.addEventListener('resize', adjustTextHeight);

