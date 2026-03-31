// Typing Effect Configuration
var typed = new Typed('#typed-text', {
    strings: ['Engineer II @ Qualcomm', 'Linux Security Specialist', 'GenAI Enthusiast', 'AI-Driven Problem Solver', 'Exploring ML in Security'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    backDelay: 1500
});

// Scroll Reveal Animation Logic
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Add scroll event listener
window.addEventListener("scroll", reveal);

// Trigger reveal animation once on page load
reveal();










// ==========================================
// CONSTELLATION BACKGROUND EFFECT
// ==========================================
const canvas = document.getElementById('constellation');
const ctx = canvas.getContext('2d');

// Set canvas to full window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
// const numberOfParticles = 120;
const numberOfParticles = 300; // Increase or decrease for more/fewer stars

// Track mouse position
const mouse = { x: null, y: null };
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});
window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

// Particle (Star) Class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1; // Size of the star
        this.speedX = (Math.random() * 1) - 0.5; // Horizontal movement speed
        this.speedY = (Math.random() * 1) - 0.5; // Vertical movement speed
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off the edges of the screen
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = 'rgba(14, 165, 233, 0.8)'; // Tailwind sky-500 color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize the stars
function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Connect stars to each other
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // If stars are close enough, draw a line
            if (distance < 120) {
                // Opacity fades as they get further apart
                const opacity = 1 - (distance / 120);
                ctx.beginPath();
                ctx.strokeStyle = `rgba(14, 165, 233, ${opacity * 0.5})`; // sky-500
                ctx.lineWidth = 1;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
        
        // Connect stars to the mouse
        if (mouse.x != null && mouse.y != null) {
            const dxMouse = particlesArray[i].x - mouse.x;
            const dyMouse = particlesArray[i].y - mouse.y;
            const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
            
            if (distanceMouse < 150) {
                const opacity = 1 - (distanceMouse / 150);
                ctx.beginPath();
                ctx.strokeStyle = `rgba(14, 165, 233, ${opacity})`; // sky-500
                ctx.lineWidth = 1.2;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}

// Handle browser resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(); // Re-initialize to fill the new screen size
});

// Start the animation
init();
animate();