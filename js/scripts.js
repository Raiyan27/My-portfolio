document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const toggleCircle = darkModeToggle.querySelector('.toggle-circle');
    const body = document.body;

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });

    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submitted!');
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                navLinks.forEach(link => link.classList.remove('selected'));
                link.classList.add('selected');
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Highlight the active section link based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('selected');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('selected');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            const popup = this.querySelector('.skill-popup');
            const rect = this.getBoundingClientRect();

            // Determine whether to show the popup above or below
            if (rect.bottom + popup.offsetHeight > window.innerHeight) {
                popup.style.top = 'auto';
                popup.style.bottom = '100%';
            } else {
                popup.style.top = '100%';
                popup.style.bottom = 'auto';
            }

            popup.style.display = 'block';
        });

        item.addEventListener('mouseleave', function () {
            const popup = this.querySelector('.skill-popup');
            popup.style.display = 'none';
        });
    });
});


