// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const cursorHoverElements = document.querySelectorAll('.cursor-hover, a, button, input, textarea');

document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    
    // Dot follows cursor exactly
    gsap.to(cursorDot, {
        x: clientX,
        y: clientY,
        duration: 0.1
    });
    
    // Outline follows with lag for smooth feel
    gsap.to(cursorOutline, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: 'power2.out'
    });
});

// Hover effects for cursor
cursorHoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        gsap.to(cursorDot, { scale: 3, opacity: 0.5 });
        gsap.to(cursorOutline, { scale: 1.5, opacity: 0 });
    });
    
    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
        gsap.to(cursorDot, { scale: 1, opacity: 1 });
        gsap.to(cursorOutline, { scale: 1, opacity: 1 });
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('py-2', 'shadow-lg');
        navbar.classList.remove('py-4');
    } else {
        navbar.classList.add('py-4');
        navbar.classList.remove('py-2', 'shadow-lg');
    }
});

// Typewriter Effect
const textElements = ["BCA Student", "Aspiring Software Developer", "Tech Enthusiast", "UI/UX Lover"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentText = textElements[textIndex];
    const typewriter = document.getElementById('typewriter');
    
    if (isDeleting) {
        typewriter.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriter.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typeSpeed = 1000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textElements.length;
        typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', type);

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Initialize theme from localStorage
if (localStorage.theme === 'light') {
    html.classList.remove('dark');
} else {
    html.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    if (html.classList.contains('dark')) {
        localStorage.theme = 'dark';
    } else {
        localStorage.theme = 'light';
    }
    
    // Add animation to the toggle icon
    gsap.fromTo(themeToggle.querySelector('i'), 
        { rotate: -30, scale: 0.5, opacity: 0 },
        { rotate: 0, scale: 1, opacity: 1, duration: 0.4, ease: 'back.out' }
    );
});

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
// Since I haven't implemented a full mobile menu component, I'll just alert or could add one quickly.
// For now, let's just make it a smooth scroll helper.

// GSAP Animations on Entrance
gsap.from(".hero-content > *", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});

// Scroll Trigger Animations for sections
gsap.utils.toArray('.section-heading').forEach(heading => {
    gsap.from(heading, {
        scrollTrigger: {
            trigger: heading,
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });
});

gsap.from(".about-img-container", {
    scrollTrigger: {
        trigger: ".about-img-container",
        start: "top 70%",
    },
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out"
});

gsap.from(".about-text", {
    scrollTrigger: {
        trigger: ".about-text",
        start: "top 70%",
    },
    x: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out"
});

// Skill Bars Animation
gsap.utils.toArray('.skill-item .h-full').forEach(bar => {
    gsap.to(bar, {
        scrollTrigger: {
            trigger: ".skill-bars",
            start: "top 75%",
        },
        width: bar.getAttribute('data-width'),
        duration: 1.5,
        ease: "expo.out"
    });
});

// Circular Skills Animation
gsap.utils.toArray('.circular-progress').forEach(circle => {
    const percent = circle.getAttribute('data-percent');
    const offset = 283 - (283 * percent) / 100;
    
    gsap.to(circle, {
        scrollTrigger: {
            trigger: ".circular-skill",
            start: "top 75%",
        },
        strokeDashoffset: offset,
        duration: 2,
        ease: "expo.out"
    });
});

// Project Cards Stagger
gsap.from(".project-card", {
    scrollTrigger: {
        trigger: "#projects",
        start: "top 60%",
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
});

// Resume Timeline Animation
gsap.from(".timeline-item", {
    scrollTrigger: {
        trigger: "#resume",
        start: "top 60%",
    },
    x: -50,
    opacity: 0,
    duration: 1,
    stagger: 0.4,
    ease: "power2.out"
});

// Handle Contact Form Submission via WhatsApp
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get Form Values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Janak's WhatsApp number (918050660746)
        const phoneNumber = "918050660746"; 
        
        // Construct WhatsApp Message
        const whatsappMsg = `*New Portfolio Message*%0A%0A` +
                          `*Name:* ${encodeURIComponent(name)}%0A` +
                          `*Email:* ${encodeURIComponent(email)}%0A` +
                          `*Subject:* ${encodeURIComponent(subject)}%0A` +
                          `*Message:* ${encodeURIComponent(message)}`;
        
        // Open WhatsApp in new tab
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMsg}`;
        window.open(whatsappUrl, '_blank');
        
        // Optional: Success visual cue
        this.reset();
        alert("Redirecting to WhatsApp...");
    });
}

// Update Year in Footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
