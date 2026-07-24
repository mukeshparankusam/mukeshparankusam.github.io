document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".site-header");
    const menuButton = document.querySelector(".menu-button");
    const nav = document.querySelector(".main-nav");
    const navLinks = document.querySelectorAll(".main-nav a");


    /* =========================
       HEADER SCROLL EFFECT
    ========================= */

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    /* =========================
       MOBILE MENU
    ========================= */

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            nav.classList.toggle("mobile-open");

            document.body.style.overflow =
                nav.classList.contains("mobile-open")
                    ? "hidden"
                    : "";

        });


        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("mobile-open");

                document.body.style.overflow = "";

            });

        });

    }


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements = document.querySelectorAll(
        ".role-card, .experience-item, .venture-card, .book-card"
    );


    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

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

        observer.observe(element);

    });


    /* =========================
       SMOOTH ANCHOR NAVIGATION
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

});
