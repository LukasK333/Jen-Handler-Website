// Make sure the function is globally accessible
window.onRecaptchaSuccess = onRecaptchaSuccess;

document.addEventListener('DOMContentLoaded', function () { 
    const menuContainer = document.querySelector('.menu-container');
    const homeContainer = document.querySelector('.home-container');
    const hamburgerMenu = document.querySelector('.hamburger-menu');

    if (menuContainer) {
        menuContainer.addEventListener('click', () => {
            homeContainer.classList.remove('hidden');
            hamburgerMenu.classList.remove('hidden');
            menuContainer.classList.add('hidden');
        })
    }

    if (homeContainer) {
        homeContainer.addEventListener('click', () => {
            menuContainer.classList.remove('hidden');
            homeContainer.classList.add('hidden');
            hamburgerMenu.classList.add('hidden');
        })
    }

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
        
        hamburgerMenu.style.height = newMenuHeight + 'px';
    } else {
        hamburgerMenu.style.height = '';
        contactLink.style.marginTop = '';
    }
}

// Add this function to handle reCAPTCHA success
function onRecaptchaSuccess() {
    console.log('reCAPTCHA completed');
    
    // Remove error styling from iframe
    const recaptchaIframe = document.querySelector('.g-recaptcha iframe');
    if (recaptchaIframe) {
        recaptchaIframe.style.border = 'none';
    }
    
    // Hide error message
    const errorMessage = document.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
}

const form = document.querySelector('form');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const captchaResponse = grecaptcha.getResponse();
        const recaptcha = document.querySelector('.g-recaptcha');
        const iframe = recaptcha.querySelector('iframe');
        const errorMessage = form.querySelector('.error-message');
    
        if (!captchaResponse.length > 0) {
            console.log("Captcha not completed");
            if (recaptcha) {
                if (iframe) {
                    iframe.style.border = '1px solid rgba(255, 0, 0, 0.857)';
                    errorMessage.style.display = 'block';
                }
            }
            return;
        }

    // Submit to Google Form
    const fd = new FormData(e.target);
    const params = new URLSearchParams(fd);

    fetch('https://docs.google.com/forms/d/e/1FAIpQLSfVlTPvY-DUpcFcyEicAPTPXidQ6v4yBjZK8MUY5FOFmaH7zw/formResponse', {
        method: "POST",
        body: params,
        mode: 'no-cors' // Required for Google Forms
    })
        .then(() => {
            console.log('Form submitted successfully');
            window.location.href = 'formconfirmation.html';
        })
        .catch(err => console.error('Form submission error:', err));
    });
}

