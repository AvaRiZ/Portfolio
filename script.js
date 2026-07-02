const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const navLinks = document.querySelectorAll('.topbar nav a');
const sections = document.querySelectorAll('section');
const revealItems = document.querySelectorAll('.hero-card, .section h2, .about-content, .project-card, .contact-form');

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);

    if (themeIcon) {
        themeIcon.className = isDark ? 'bx bx-sun' : 'bx bx-moon';
    }

    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', String(isDark));
    }

    localStorage.setItem('theme', theme);
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);
}

function setActiveNavLink() {
    let currentId = 'home';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${currentId}`;
        link.classList.toggle('active', isActive);
    });
}

function revealOnScroll() {
    revealItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.9;

        if (itemTop < triggerPoint) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transitionDelay = `${index * 80}ms`;
        }
    });
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        applyTheme(isDark ? 'light' : 'dark');
    });
}

window.addEventListener('scroll', () => {
    setActiveNavLink();
    revealOnScroll();
});
window.addEventListener('load', () => {
    initTheme();
    setActiveNavLink();
    revealOnScroll();
});

initTheme();
setActiveNavLink();
revealOnScroll();

revealItems.forEach((item) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(24px)';
    item.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
});

// Project filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card[data-category]');

filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Filter project cards
        projectCards.forEach((card) => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === cardCategory) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});