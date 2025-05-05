document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Scroll-Triggered Animations ---
    // Select all elements you want to animate on scroll
    // Add the class 'reveal-on-scroll' to sections, package-boxes, trainer-cards etc. in your HTML
    const animatedElements = document.querySelectorAll('.reveal-on-scroll');

    if (animatedElements.length > 0) {
        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    // Optional: Stop observing after animation triggered once
                    // observer.unobserve(entry.target);
                } else {
                     // Optional: Remove class if you want animation to repeat on scroll up/down
                     // entry.target.classList.remove('in-view');
                }
            });
        };

        const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

        animatedElements.forEach(el => {
            scrollObserver.observe(el);
        });
    }

    // --- 2. Sticky Header Style Change ---
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Add class after scrolling 50px
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Optional: Hide header on scroll down, show on scroll up
            // if (window.scrollY > lastScrollY && window.scrollY > 100) {
            //     // Scrolling Down
            //     header.classList.add('header-hidden');
            // } else {
            //     // Scrolling Up
            //     header.classList.remove('header-hidden');
            // }
            // lastScrollY = window.scrollY <= 0 ? 0 : window.scrollY; // For Mobile or negative scrolling
        });

        // --- 3. Mobile Navigation Toggle ---
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const primaryNav = document.querySelector('.primary-navigation'); // Target the nav container

if (mobileNavToggle && primaryNav) {
    mobileNavToggle.addEventListener('click', () => {
        const isVisible = primaryNav.getAttribute('data-visible') === 'true';
        primaryNav.setAttribute('data-visible', !isVisible);
        mobileNavToggle.setAttribute('aria-expanded', !isVisible);

        // Toggle body scroll lock
        document.body.classList.toggle('no-scroll', !isVisible);
    });

    // Optional: Close menu when clicking a link
    primaryNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            primaryNav.setAttribute('data-visible', false);
            mobileNavToggle.setAttribute('aria-expanded', false);
            document.body.classList.remove('no-scroll');
        });
    });
     // Optional: Close menu when clicking outside
     document.addEventListener('click', (e) => {
        if (!primaryNav.contains(e.target) && !mobileNavToggle.contains(e.target) && primaryNav.getAttribute('data-visible') === 'true') {
            primaryNav.setAttribute('data-visible', false);
            mobileNavToggle.setAttribute('aria-expanded', false);
            document.body.classList.remove('no-scroll');
        }
    });
}
// --- 4. Interactive Card Tilt Effect ---
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    const maxTilt = 10; // Max tilt degrees

    card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate tilt based on mouse position relative to card center
        const tiltX = ((mouseY - cardCenterY) / (cardRect.height / 2)) * -maxTilt;
        const tiltY = ((mouseX - cardCenterX) / (cardRect.width / 2)) * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(<span class="math-inline">\{tiltX\}deg\) rotateY\(</span>{tiltY}deg) scale3d(1.03, 1.03, 1.03)`; // Apply 3D scale
        // Keep existing hover shadow if needed, or add here:
        // card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        // Reset shadow if needed
        // card.style.boxShadow = '0 5px 15px var(--shadow-color)';
    });
});

    }

    // --- Add more JS features as needed ---
    // E.g., Form validation, mobile menu toggle, sliders etc.

}); // End DOMContentLoaded