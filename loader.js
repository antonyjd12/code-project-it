/* ========================================
   JD RESTAURANT - LOADING SCREEN LOGIC
   FIXED FOR MOBILE DEVICES
   ======================================== */

// 1. FORCE HIDE after 2 seconds (Prevents mobile users from getting stuck)
setTimeout(function() {
    const loader = document.getElementById('pageLoader');
    if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        setTimeout(function() {
            loader.style.display = 'none';
        }, 800);
    }
}, 2000); // Changed from 5000 to 2000 milliseconds

// 2. Hide immediately if page loads fast
window.addEventListener('load', function() {
    const loader = document.getElementById('pageLoader');
    if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        setTimeout(function() {
            loader.style.display = 'none';
        }, 800);
    }
});

// 3. Generate floating particles
document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.querySelector('.loader-particles');
    if (particlesContainer) {
        for (let i = 0; i < 15; i++) { // Reduced particles for better mobile performance
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }
});