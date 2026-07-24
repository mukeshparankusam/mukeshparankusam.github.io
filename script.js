// ================================
// PRELOADER
// ================================

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});


// ================================
// MOBILE MENU
// ================================

const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");

if (menuButton) {

    menuButton.addEventListener("click", () => {

        mainNav.classList.toggle("mobile-open");
        menuButton.classList.toggle("active");

    });

}


// ================================
// CLOSE MOBILE MENU ON LINK CLICK
// ================================

const navLinks = document.querySelectorAll(".main-nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        mainNav.classList.remove("mobile-open");
        menuButton.classList.remove("active");

    });

});


// ================================
// HEADER SCROLL EFFECT
// ================================

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


// ================================
// REVEAL ANIMATION
// ================================

const revealElements = document.querySelectorAll(
    ".section-label, .intro-content, .role-card, .work-heading, .experience-item, .venture-card, .books-header, .book-card, .vision-section, .contact-content"
);

const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);

revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


// ================================
// MOUSE PARALLAX HERO IMAGE
// ================================

const heroVisual = document.querySelector(".hero-visual");

if (heroVisual && window.innerWidth > 768) {

    heroVisual.addEventListener("mousemove", (event) => {

        const rect = heroVisual.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        const portrait = document.querySelector(".portrait-frame");
        const outline = document.querySelector(".portrait-outline");

        portrait.style.transform = `
            translate(${x * 12}px, ${y * 12}px)
        `;

        outline.style.transform = `
            translate(${25 + x * 20}px, ${25 + y * 20}px)
        `;

    });

    heroVisual.addEventListener("mouseleave", () => {

        const portrait = document.querySelector(".portrait-frame");
        const outline = document.querySelector(".portrait-outline");

        portrait.style.transform = "translate(0, 0)";
        outline.style.transform = "translate(25px, 25px)";

    });

}


// ================================
// SMOOTH ANCHOR SCROLL
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// ================================
// CURRENT YEAR
// ================================

const currentYear = new Date().getFullYear();

const footerYear = document.querySelector(".footer-bottom span");

if (footerYear) {

    footerYear.textContent = `© ${currentYear} Mukesh Parankusam`;

}
