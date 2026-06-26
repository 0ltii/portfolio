// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Navbar border — sentinel IntersectionObserver, no scroll listener
const sentinel = document.createElement('div');
sentinel.style.cssText = 'position:absolute;top:120px;height:1px;width:1px;pointer-events:none;';
document.body.prepend(sentinel);

new IntersectionObserver(
    ([entry]) => navbar.classList.toggle('scrolled', !entry.isIntersecting),
    { threshold: 0 }
).observe(sentinel);

// Active nav link — IntersectionObserver on sections
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === `#${entry.target.id}`
                    );
                });
            }
        });
    },
    { threshold: 0.35, rootMargin: '-10% 0px -55% 0px' }
);

sections.forEach(section => sectionObserver.observe(section));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
            const top = target.getBoundingClientRect().top + window.scrollY - navH;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// Scroll reveal — IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
    const revealEls = document.querySelectorAll(
        '.skill-category, .project-card, .education-item, .contact-item, .career-objective'
    );

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    revealEls.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
});
