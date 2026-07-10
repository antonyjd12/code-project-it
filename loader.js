/* ========================================
   JD RESTAURANT - LOADING SCREEN LOGIC
   ======================================== */

// Hide loader when page is fully loaded
window.addEventListener('load', function() {
    // Add a small delay for smooth effect
    setTimeout(function() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.classList.add('hidden');
            
            // Remove loader from DOM after animation completes
            setTimeout(function() {
                loader.style.display = 'none';
            }, 800);
        }
    }, 500);
});

// Fallback: Hide loader after maximum 5 seconds (in case load event doesn't fire)
setTimeout(function() {
    const loader = document.querySelector('.page-loader');
    if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        setTimeout(function() {
            loader.style.display = 'none';
        }, 800);
    }
}, 5000);

// Generate floating particles dynamically
document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.querySelector('.loader-particles');
    
    if (particlesContainer) {
        // Create additional random particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }
});