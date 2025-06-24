// Navbar Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section: Particle Background
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

const particles = [];
const numParticles = Math.min(window.innerWidth / 20, 60);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 0.9;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.6 - 0.3;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.002;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = 'rgba(102, 204, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
        if (p.size <= 0.2) {
            particles.splice(particles.indexOf(p), 1);
            particles.push(new Particle());
        }
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize', resizeCanvas);

// Hero Animations
gsap.from('.animate-text', {
    opacity: 0,
    scale: 0.6,
    rotation: 20,
    duration: 2,
    stagger: 0.4,
    ease: 'elastic.out(1, 0.3)',
    scrollTrigger: {
        trigger: '#home',
        start: 'top 85%',
        toggleActions: 'play none none reset'
    }
});

gsap.from('.animate-btn', {
    opacity: 0,
    y: 50,
    duration: 1.5,
    stagger: 0.3,
    ease: 'power4.out',
    scrollTrigger: {
        trigger: '#home',
        start: 'top 85%',
        toggleActions: 'play none none reset'
    }
});

// Enhanced Typing Effect for Hero Subtitle
const typingText = document.querySelector('.typing-effect');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    let isDeleting = false;
    function type() {
        if (!isDeleting && i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(type, 70);
        } else if (isDeleting && i > 0) {
            typingText.textContent = text.substring(0, i - 1);
            i--;
            setTimeout(type, 50);
        } else if (i === text.length) {
            isDeleting = true;
            setTimeout(type, 2500);
        } else if (i === 0) {
            isDeleting = false;
            setTimeout(type, 600);
        }
    }
    setTimeout(type, 1000);
}

// About Section
gsap.from('.profile-img', {
    opacity: 0,
    x: -200,
    rotationY: 180,
    duration: 3.2,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
    }
});

gsap.from('.about-text p, .about-details p', {
    opacity: 0,
    x: 100,
    duration: 2,
    stagger: 0.3,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        toggleActions: 'play none none reset'
    }
});

// Skills Section
document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.progress');
    gsap.from(progressBars, {
        width: 0,
        duration: 2,
        ease: 'power4.out',
        stagger: 0.2,
        scrollTrigger: {
            trigger: '#skills',
            start: 'top 80%',
            toggleActions: 'play none none reset'
        }
    });
});

gsap.from('.skill-card', {
    opacity: 0,
    scale: 0.8,
    duration: 1.5,
    stagger: 0.2,
    ease: 'elastic.out(1, 0.5)',
    scrollTrigger: {
        trigger: '#skills',
        start: 'top 80%',
        toggleActions: 'play none none reset'
    }
});

// Projects Section
gsap.from('.project-card', {
    opacity: 0,
    y: 50,
    duration: 1.5,
    stagger: 0.3,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '#projects',
        start: 'top 80%',
        toggleActions: 'play none none reset'
    }
});

// Milestones Section
gsap.from('.milestone-card', {
    opacity: 0,
    y: 80,
    duration: 1.5,
    stagger: 0.3,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '#milestones',
        start: 'top 80%',
        toggleActions: 'play none none reset'
    }
});

// Contact Section
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const inputs = form.querySelectorAll('input, textarea');

    let isValid = true;
    inputs.forEach(input => {
        const group = input.parentElement;
        if (!input.checkValidity()) {
            group.classList.add('invalid');
            isValid = false;
        } else {
            group.classList.remove('invalid');
        }
    });

    if (isValid) {
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Thank you! Your message has been sent.');
                form.reset();
            } else {
                alert('Oops! Something went wrong. Please try again.');
            }
        })
        .catch(error => {
            alert('Oops! Something went wrong. Please try again.');
        });
    }
});

gsap.from('#contact-form .form-group', {
    opacity: 0,
    x: -50,
    duration: 3.5,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%',
        toggleActions: 'play none none reset'
    }
});

gsap.from('.social-links a', {
    opacity: 0,
    scale: 0.5,
    duration: 1.5,
    stagger: 0.2,
    ease: 'bounce.out',
    scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%',
        toggleActions: 'play none none reset'
    }
});

// Footer
gsap.from('footer', {
    opacity: 0,
    scale: 0.9,
    duration: 2.5,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: 'footer',
        start: 'top 90%',
        toggleActions: 'play none none reset'
    }
});