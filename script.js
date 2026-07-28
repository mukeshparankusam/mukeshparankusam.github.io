/*=====================================================
            MUKESH PARANKUSAM PORTFOLIO
                    script.js
=====================================================*/

/*================ PRELOADER =================*/

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    setTimeout(() => {

        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";

    }, 1200);

});

/*================ CUSTOM CURSOR =================*/

const cursor = document.querySelector(".cursor");
const cursor2 = document.querySelector(".cursor2");

document.addEventListener("mousemove", (e) => {

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    cursor2.style.left = e.clientX + "px";
    cursor2.style.top = e.clientY + "px";

});

document.querySelectorAll("a, button, .btn, .project-card, .organization-card, .book-card").forEach(item => {

    item.addEventListener("mouseenter", () => {

        cursor2.style.transform = "scale(1.8)";
        cursor2.style.borderColor = "#d4af37";

    });

    item.addEventListener("mouseleave", () => {

        cursor2.style.transform = "scale(1)";
        cursor2.style.borderColor = "#d4af37";

    });

});

/*================ STICKY HEADER =================*/

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("active");

    } else {

        header.classList.remove("active");

    }

});

/*================ MOBILE MENU =================*/

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("show");

        menuBtn.classList.toggle("fa-xmark");

    });

}

/*================ SMOOTH SCROLL =================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

/*================ ACTIVE MENU =================*/

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 140;

        if (scrollY >= sectionTop) {

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

/*================ COUNTER =================*/

const counters = document.querySelectorAll(
".achievement-card h2,.impact-card h2,.stat-box h3"
);

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const text = counter.innerText;

        const target = parseInt(text.replace(/\D/g, ""));

        let count = 0;

        const speed = target / 80;

        const update = () => {

            count += speed;

            if (count < target) {

                counter.innerText =
                    Math.floor(count) +
                    text.replace(/[0-9]/g, "");

                requestAnimationFrame(update);

            } else {

                counter.innerText = text;

            }

        };

        update();

        counterObserver.unobserve(counter);

    });

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});

/*================ SCROLL REVEAL =================*/

const revealElements = document.querySelectorAll(

".section-heading,.about-content,.highlight,.timeline-item,.experience-card,.organization-card,.project-card,.book-card,.expert-card,.achievement-card,.impact-card,.mission-card,.vision-wrapper,.contact-box,.footer-top"

);

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

}, {

    threshold: .15

});

revealElements.forEach(el => {

    el.style.opacity = "0";

    el.style.transform = "translateY(60px)";

    el.style.transition = ".8s ease";

    revealObserver.observe(el);

});

/*================ HERO PARALLAX =================*/

const heroImage = document.querySelector(".profile-wrapper");

window.addEventListener("mousemove", e => {

    if (!heroImage) return;

    const x = (window.innerWidth / 2 - e.clientX) / 45;

    const y = (window.innerHeight / 2 - e.clientY) / 45;

    heroImage.style.transform =
        `rotateY(${x}deg) rotateX(${-y}deg)`;

});

/*================ FLOATING GOLD CIRCLES =================*/

const circles = document.querySelectorAll(".gold-circle");

window.addEventListener("scroll", () => {

    let value = window.scrollY;

    circles.forEach((circle, index) => {

        circle.style.transform =
            `translateY(${value * (0.05 + index * 0.02)}px)`;

    });

});

/*================ BACK TO TOP =================*/

const topButton = document.createElement("button");

topButton.innerHTML =
'<i class="fa-solid fa-arrow-up"></i>';

topButton.className = "back-top";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topButton.classList.add("show");

    } else {

        topButton.classList.remove("show");

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/*================ RIPPLE EFFECT =================*/

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        const rect = this.getBoundingClientRect();

        ripple.style.left = (e.clientX - rect.left) + "px";

        ripple.style.top = (e.clientY - rect.top) + "px";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

/*================ CURRENT YEAR =================*/

const year = document.querySelector(".year");

if (year) {

    year.textContent = new Date().getFullYear();

}

console.log("Mukesh Parankusam Portfolio Loaded Successfully");
