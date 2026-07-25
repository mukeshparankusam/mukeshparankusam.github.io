/*=====================================================
  MUKESH PARANKUSAM
  Premium Portfolio
  script.js
=====================================================*/

/* ===========================
SMOOTH SCROLL
=========================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/* ===========================
REVEAL ANIMATION
=========================== */

const reveals=document.querySelectorAll(

".hero,.about,.journey,.expertise,.ventures,.books,.quote,.contact"

);

const observer=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("active");

        }

    });

},{

    threshold:0.15

});

reveals.forEach(section=>{

    section.classList.add("reveal");

    observer.observe(section);

});


/* ===========================
NAVBAR SCROLL EFFECT
=========================== */

const header=document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>80){

        header.style.background="rgba(7,7,7,.92)";
        header.style.boxShadow="0 15px 40px rgba(0,0,0,.35)";

    }else{

        header.style.background="rgba(7,7,7,.72)";
        header.style.boxShadow="none";

    }

});


/* ===========================
ACTIVE NAVIGATION
=========================== */

const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-180;

        if(pageYOffset>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});


/* ===========================
IMAGE PARALLAX
=========================== */

const heroImage=document.querySelector(".hero-image img");

window.addEventListener("scroll",()=>{

    if(heroImage){

        heroImage.style.transform=

        `translateY(${window.scrollY*0.08}px)`;

    }

});


/* ===========================
SCROLL PROGRESS BAR
=========================== */

const progress=document.createElement("div");

progress.style.position="fixed";
progress.style.top="0";
progress.style.left="0";
progress.style.height="3px";
progress.style.width="0%";
progress.style.zIndex="99999";
progress.style.background="#D4AF37";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

    const total=

    document.documentElement.scrollHeight-

    window.innerHeight;

    const current=

    (window.scrollY/total)*100;

    progress.style.width=current+"%";

});


/* ===========================
BUTTON RIPPLE
=========================== */

document.querySelectorAll(".btn").forEach(button=>{

button.addEventListener("mouseenter",()=>{

button.style.transform="translateY(-4px)";

});

button.addEventListener("mouseleave",()=>{

button.style.transform="translateY(0px)";

});

});


/* ===========================
BOOK HOVER EFFECT
=========================== */

document.querySelectorAll(".book-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;
const y=e.clientY-rect.top;

card.style.background=

`radial-gradient(circle at ${x}px ${y}px,
rgba(212,175,55,.10),
#171717)`;

});

card.addEventListener("mouseleave",()=>{

card.style.background="linear-gradient(180deg,#101010,#171717)";

});

});


/* ===========================
VENTURE IMAGE ZOOM
=========================== */

document.querySelectorAll(".venture-image img").forEach(img=>{

img.addEventListener("mouseenter",()=>{

img.style.transform="scale(1.05)";

});

img.addEventListener("mouseleave",()=>{

img.style.transform="scale(1)";

});

});


/* ===========================
FADE TITLE ON LOAD
=========================== */

window.addEventListener("load",()=>{

document.body.style.opacity="1";

});


document.body.style.opacity="0";

document.body.style.transition=".7s";


/* ===========================
END
=========================== */
