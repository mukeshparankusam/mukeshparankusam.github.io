// ================================
// Smooth Scrolling
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});

// ================================
// Reveal Animation
// ================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll("section").forEach(section => {

    section.classList.add("hidden");
    observer.observe(section);

});

// ================================
// Navbar Active Link
// ================================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

// ================================
// Header Background on Scroll
// ================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.style.background = "rgba(11,11,13,.90)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

    } else {

        header.style.background = "rgba(11,11,13,.65)";
        header.style.boxShadow = "none";

    }

});

// ================================
// Card Hover Animation
// ================================

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

// ================================
// Image Tilt Effect
// ================================

const image = document.querySelector(".image-frame");

if (image) {

    image.addEventListener("mousemove", (e) => {

        const rect = image.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 16;
        const rotateX = ((y / rect.height) - 0.5) * -16;

        image.style.transform =
            `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });

    image.addEventListener("mouseleave", () => {

        image.style.transform = "";

    });

}

// ================================
// Fade Hero on Scroll
// ================================

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    const value = window.scrollY;

    hero.style.opacity = 1 - value / 700;

});

// ================================
// Console Signature
// ================================

console.log("Mukesh Parankusam | Official Portfolio");
