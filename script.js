// Janak Portfolio - Script

document.addEventListener("DOMContentLoaded", () => {
    // 1. Loading Screen
    setTimeout(() => {
        const loader = document.getElementById('loader');
        gsap.to(loader, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                loader.style.display = 'none';
                document.body.classList.remove('loading');
                initHeroAnimations();
            }
        });
    }, 2000);

    // 2. Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        gsap.to(follower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
    });

    // Add hover effect to links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .glass-card, .service-card, .project-info');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });

    // 3. Navbar Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 4. GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    function initHeroAnimations() {
        gsap.from(".fade-up", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    }

    // Scroll Reveal for sections
    const sections = document.querySelectorAll('.section-header');
    sections.forEach(sec => {
        gsap.from(sec, {
            scrollTrigger: {
                trigger: sec,
                start: "top 80%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8
        });
    });

    // Services Stagger
    gsap.from(".service-card", {
        scrollTrigger: {
            trigger: "#services",
            start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15
    });

    // Projects Parallax
    const projects = document.querySelectorAll('.project-showcase');
    projects.forEach(proj => {
        gsap.from(proj.querySelector('.project-info'), {
            scrollTrigger: {
                trigger: proj,
                start: "top 75%",
            },
            x: -50,
            opacity: 0,
            duration: 1
        });

        gsap.from(proj.querySelector('.project-image-wrap'), {
            scrollTrigger: {
                trigger: proj,
                start: "top 75%",
            },
            x: 50,
            opacity: 0,
            duration: 1
        });
    });

    // 5. Chatbot Toggle
    const chatBtn = document.getElementById('ai-chat-btn');
    const chatModal = document.getElementById('chat-modal');
    const closeChat = document.getElementById('close-chat');

    chatBtn.addEventListener('click', () => {
        chatModal.classList.remove('hidden');
    });

    closeChat.addEventListener('click', () => {
        chatModal.classList.add('hidden');
    });

    // 6. Three.js Subtle Background
    initThreeJS();
});

function initThreeJS() {
    const canvas = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Custom particle material (subtle blue/purple glow)
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse interation
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        particlesMesh.rotation.y = elapsedTime * 0.05;

        // Mouse parallax effect
        particlesMesh.rotation.x += (mouseY * 0.5 - particlesMesh.rotation.x) * 0.05;
        particlesMesh.rotation.y += (mouseX * 0.5 - particlesMesh.rotation.y) * 0.05;

        renderer.render(scene, camera);
    }

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
