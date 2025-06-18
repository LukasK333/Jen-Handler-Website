// Make sure the function is globally accessible
window.onRecaptchaSuccess = onRecaptchaSuccess;

// If WebP detected, replace png with webp
function loadWebP() {
  const img = new Image();
  img.onload = function() {
    if (img.width > 0 && img.height > 0) {
      // WebP is supported
      const couchImg = document.querySelector('.transparent-couch');
      if (couchImg && couchImg.dataset.webp) {
        couchImg.src = couchImg.dataset.webp;
      }
    }
  };
  img.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

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

    // Add WebP detection
    loadWebP();

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

// Add this function to check if there's overflow for about/approach pages
function checkForAboutOverflow() {
    const text = document.querySelector('.text');
    const readMoreButton = document.querySelector('.button-div');
    
    if (!text || !readMoreButton) return;
    
    // Temporarily remove max-height to get the full content height
    const originalMaxHeight = text.style.maxHeight;
    text.style.maxHeight = 'none';
    const fullHeight = text.scrollHeight;
    
    // Restore the max-height
    text.style.maxHeight = originalMaxHeight;
    
    // Get the current max-height value
    const currentMaxHeight = parseInt(text.style.maxHeight) || text.offsetHeight;
    
    // Show/hide button based on whether content overflows
    if (fullHeight > currentMaxHeight) {
        readMoreButton.style.display = 'block';
    } else {
        readMoreButton.style.display = 'none';
    }
}

// Add this function to check if there's overflow for relationship therapy page
function checkForOverflow() {
    const text = document.querySelector('.paragraph-container');
    const readMoreButton = document.querySelector('.button-div');
    
    if (!text || !readMoreButton) return;
    
    // Temporarily remove max-height to get the full content height
    const originalMaxHeight = text.style.maxHeight;
    text.style.maxHeight = 'none';
    const fullHeight = text.scrollHeight;
    
    // Restore the max-height
    text.style.maxHeight = originalMaxHeight;
    
    // Get the current max-height value
    const currentMaxHeight = parseInt(text.style.maxHeight) || text.offsetHeight;
    
    // Show/hide button based on whether content overflows
    if (fullHeight > currentMaxHeight) {
        readMoreButton.style.display = 'block';
    } else {
        readMoreButton.style.display = 'none';
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
    const textTopParagraph = text.querySelector('p:first-child');
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
    
    // Check for overflow after setting max-height
    setTimeout(() => checkForAboutOverflow(), 10);
}

function showRelationshipText() {
    const text = document.querySelector('.paragraph-container');
    const textButton = document.querySelector('.text-button');

    if (textButton.innerHTML === "Read More") {
        text.dataset.originalMaxHeight = text.style.maxHeight;
        
        text.style.overflow = 'visible';
        const scrollHeight = text.scrollHeight;
        text.style.maxHeight = `${scrollHeight}px`;
        textButton.innerHTML = "Show Less";
    } else {
        text.style.overflow = 'hidden';
        textButton.innerHTML = "Read More";
        
        // Force a reflow by temporarily changing display
        text.style.display = 'none';
        text.offsetHeight; // Trigger reflow
        text.style.display = '';
        
        if (text.dataset.originalMaxHeight) {
            text.style.maxHeight = text.dataset.originalMaxHeight;
        } else {
            adjustRelationshipTextHeight();
        }
    }
}

function adjustRelationshipTextHeight() {
    const text = document.querySelector('.paragraph-container');
    const textTopParagraph = text.querySelector('p');
    const footer = document.querySelector('footer');
    const readMoreButton = document.querySelector('.button-div');

    const windowHeight = window.innerHeight;
    const readMoreButtonHeight = readMoreButton.offsetHeight;
    const footerHeight = footer.offsetHeight;
    const minTextHeight = parseFloat(getComputedStyle(text).minHeight) || 200;

    let maxHeight;

    if (window.innerWidth > 860) {
        // For wider screens where image is floated left
        const offsetTop = textTopParagraph.offsetTop + text.offsetTop;
        maxHeight = windowHeight - (offsetTop + footerHeight + readMoreButtonHeight + 50);

        // Ensure we have at least some minimum visible text
        maxHeight = Math.max(maxHeight, 150);

    } else {
        // For narrower screens where image is above text
        // Calculate height based on remaining viewport space
        const textTop = text.getBoundingClientRect().top;
        const availableHeight = windowHeight - textTop - footerHeight - readMoreButtonHeight - 40;

        // Ensure we show at least 2-3 lines of text (approximately 100px)
        maxHeight = Math.max(availableHeight, 120);
    }

    text.style.maxHeight = `${maxHeight}px`;
    
    // Check for overflow after setting max-height
    setTimeout(() => checkForOverflow(), 10);
}

// Call the function when the page loads
window.addEventListener('load', function() {
    // Check if we're on the about me page
    if (document.querySelector('.about-me') || document.querySelector('.approach')) {
        adjustTextHeight();
    }
    // Check if we're on the relationship therapy page
    if (document.querySelector('.paragraph-container')) {
        adjustRelationshipTextHeight();
    }
});

function initializePageLayout() {
    // Check if we're on the about me page
    if (document.querySelector('.about-me') || document.querySelector('.approach')) {
        adjustTextHeight();

        // Follow-up adjustments to catch any missed calculations
        setTimeout(() => adjustTextHeight(), 50);
        setTimeout(() => adjustTextHeight(), 200);
    }

    if (document.querySelector('.paragraph-container')) {
        // Initial adjustment
        adjustRelationshipTextHeight();
        
        // Follow-up adjustments to catch any missed calculations
        setTimeout(() => adjustRelationshipTextHeight(), 50);
        setTimeout(() => adjustRelationshipTextHeight(), 200);
    }
}

window.addEventListener('load', initializePageLayout);

// Call the function when the window is resized
window.addEventListener('resize', function() {
    // Check if we're on the about me page
    if (document.querySelector('.about-me') || document.querySelector('.approach')) {
        adjustTextHeight();
    }
    // Check if we're on the relationship therapy page
    if (document.querySelector('.paragraph-container')) {
        adjustRelationshipTextHeight();
    }
});

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

