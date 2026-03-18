/* 
    ========================================
    Janak Bhandari - GSAP & Interactivity
    ========================================
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loading Animation
    const loader = document.getElementById('loader');
    const progressBar = document.querySelector('.progress-inner');
    
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            gsap.to(loader, {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    loader.style.display = 'none';
                    initAnimations();
                }
            });
        } else {
            width += Math.random() * 20;
            if (width > 100) width = 100;
            progressBar.style.width = width + '%';
        }
    }, 200);

    // 2. Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // 3. Typing Effect
    const typingText = document.querySelector('.type-text');
    const words = ["Full Stack Developer", "AI Enthusiast", "CEO at Janak Tech", "UI/UX Specialist"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        const speed = isDeleting ? 100 : 200;
        setTimeout(type, speed);
    }
    type();

    // 4. GSAP Scroll Animations
    function initAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Content Parallax
        gsap.to(".hero-content", {
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            y: 200,
            opacity: 0
        });

        // Section Reveal
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            gsap.from(section.querySelectorAll('.section-header'), {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1
            });
        });

        // Skill Bars
        gsap.utils.toArray(".skill-fill").forEach(bar => {
            gsap.to(bar, {
                scrollTrigger: {
                    trigger: bar,
                    start: "top 90%",
                },
                width: bar.getAttribute('data-width'),
                duration: 1.5,
                ease: "power2.out"
            });
        });

        // About Counters
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            gsap.to(counter, {
                scrollTrigger: {
                    trigger: counter,
                    start: "top 90%",
                },
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: "power1.out"
            });
        });

        // Project Cards 3D Effect (Tilt.js is handles most, but GSAP for entry)
        gsap.from(".project-card", {
            scrollTrigger: {
                trigger: ".projects-grid",
                start: "top 80%",
            },
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2
        });
    }

    // 5. Particles.js Config
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#00d2ff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#00d2ff", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 1, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
    });

    // 6. Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const icon = themeBtn.querySelector('i');
        if (body.classList.contains('light-theme')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // 7. Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 8. Vanilla Tilt Initialization
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
});
