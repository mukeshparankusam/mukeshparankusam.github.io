document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const header = document.getElementById('header');
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');
  const backTop = document.querySelector('.back-top');

  window.addEventListener('load', () => {
    setTimeout(() => preloader && preloader.classList.add('preloader-hide'), 450);
  });

  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
    if (backTop) backTop.classList.toggle('show', window.scrollY > 500);
  }, {passive:true});

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('show');
      document.body.style.overflow = nav.classList.contains('show') ? 'hidden' : '';
    });
  }

  navLinks.forEach(link => link.addEventListener('click', () => {
    nav && nav.classList.remove('show');
    document.body.style.overflow = '';
  }));

  if (backTop) backTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({top:0, behavior:'smooth'});
  });
});
