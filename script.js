// ===============================
// Smooth Scroll
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


// ===============================
// Header Background on Scroll
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        header.style.background = "rgba(10,10,10,.95)";
        header.style.boxShadow = "0 10px 40px rgba(0,0,0,.4)";

    }

    else {

        header.style.background = "rgba(8,8,8,.82)";
        header.style.boxShadow = "none";

    }

});


// ===============================
// Fade Animation
// ===============================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.15

});

document.querySelectorAll("section,.card,.venture,.book-card").forEach(el => {

    el.classList.add("hidden");

    observer.observe(el);

});


// ===============================
// Active Navigation
// ===============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;

        if (pageYOffset >= top) {

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


// ===============================
// Image Hover Animation
// ===============================

document.querySelectorAll(".venture img,.book-card img").forEach(img => {

    img.addEventListener("mouseenter", () => {

        img.style.transform = "scale(1.04)";

    });

    img.addEventListener("mouseleave", () => {

        img.style.transform = "scale(1)";

    });

});


// ===============================
// Typing Effect
// ===============================

const text = "Educator • Builder • Author";

const title = document.querySelector(".small-title");

if (title) {

    let i = 0;

    title.textContent = "";

    function type() {

        if (i < text.length) {

            title.textContent += text.charAt(i);

            i++;

            setTimeout(type, 70);

        }

    }

    type();

}


// ===============================
// Scroll Reveal CSS Classes
// ===============================

const style = document.createElement("style");

style.innerHTML = `

.hidden{

opacity:0;

transform:translateY(60px);

transition:all .8s ease;

}

.show{

opacity:1;

transform:translateY(0);

}

nav a.active{

color:#d4a373;

}

`;

document.head.appendChild(style);


// ===============================
// Console Signature
// ===============================

console.log("%cMukesh Parankusam Portfolio",
"color:#d4a373;font-size:18px;font-weight:bold;");
