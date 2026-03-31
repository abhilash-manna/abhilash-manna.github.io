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