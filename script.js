// Wait for the HTML document to fully load
document.addEventListener('DOMContentLoaded', () => {
    
    // --- CART FUNCTIONALITY ---
    let cart = [];
    let wishlist = [];

    // Add to Cart
    window.addToCart = function(id, name, price) {
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        
        updateCartUI();
        showNotification(`${name} added to cart!`);
    };

    // Remove from Cart
    window.removeFromCart = function(id) {
        cart = cart.filter(item => item.id !== id);
        updateCartUI();
    };

    // Update Quantity
    window.updateQuantity = function(id, change) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(id);
            } else {
                updateCartUI();
            }
        }
    };

    // Update Cart UI
    function updateCartUI() {
        const cartItems = document.getElementById('cartItems');
        const cartCount = document.getElementById('cartCount');
        const cartTotal = document.getElementById('cartTotal');

        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotal.textContent = '0k';
            return;
        }

        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price}k each</p>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `${total}k`;
    }

    // Toggle Cart
    window.toggleCart = function() {
        document.getElementById('cartSidebar').classList.toggle('active');
    };

    // Checkout
    window.checkout = function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        alert(`Thank you for your order!\nTotal: ${total}k\n\nYour order will be delivered soon!`);
        cart = [];
        updateCartUI();
        toggleCart();
    };

    // --- WISHLIST FUNCTIONALITY ---
    window.addToWishlist = function(id) {
        const existingItem = wishlist.find(item => item.id === id);
        
        if (existingItem) {
            wishlist = wishlist.filter(item => item.id !== id);
            showNotification('Removed from wishlist');
        } else {
            wishlist.push({ id });
            showNotification('Added to wishlist!');
        }
        
        updateWishlistUI();
    };

    function updateWishlistUI() {
        const wishlistCount = document.getElementById('wishlistCount');
        const wishlistItems = document.getElementById('wishlistItems');

        wishlistCount.textContent = wishlist.length;

        if (wishlist.length === 0) {
            wishlistItems.innerHTML = '<p class="empty-cart">Your wishlist is empty</p>';
            return;
        }

        wishlistItems.innerHTML = wishlist.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>Item #${item.id}</h4>
                    <button class="remove-item" onclick="addToWishlist(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');
    }

    window.toggleWishlist = function() {
        document.getElementById('wishlistSidebar').classList.toggle('active');
    };

    // --- DARK MODE ---
    window.toggleDarkMode = function() {
        document.body.classList.toggle('dark-mode');
        const icon = document.getElementById('darkModeIcon');
        
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'disabled');
        }
    };

    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeIcon').classList.remove('fa-moon');
        document.getElementById('darkModeIcon').classList.add('fa-sun');
    }

    // --- LOGIN MODAL ---
    window.toggleLogin = function() {
        document.getElementById('loginModal').classList.toggle('active');
    };

    // --- MOBILE MENU ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when link clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- HERO SLIDER ---
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    window.currentSlide = function(index) {
        currentSlideIndex = index;
        showSlide(currentSlideIndex);
    };

    // Auto-slide every 5 seconds
    setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(currentSlideIndex);
    }, 5000);

    // --- SEARCH FUNCTIONALITY ---
    window.searchFood = function() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        
        if (searchTerm.trim() === '') {
            alert('Please enter a search term');
            return;
        }

        // Scroll to menu section
        document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
        
        // In a real app, you would filter menu items here
        showNotification(`Searching for: ${searchTerm}`);
    };

    // --- GALLERY LIGHTBOX ---
    const galleryImages = [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80'
    ];

    window.openLightbox = function(index) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        
        lightboxImg.src = galleryImages[index];
        lightbox.classList.add('active');
    };

    window.closeLightbox = function() {
        document.getElementById('lightbox').classList.remove('active');
    };

    // --- RESERVATION FORM ---
    window.handleReservation = function(event) {
        event.preventDefault();
        alert('Thank you for your reservation! We will confirm your booking shortly.');
        event.target.reset();
    };

    // --- NEWSLETTER ---
    window.handleNewsletter = function(event) {
        event.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        event.target.reset();
    };

    // --- SCROLL TO TOP ---
    const scrollTopBtn = document.querySelector('.scroll-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    window.scrollToTop = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- LIVE CHAT ---
    window.toggleChat = function() {
        alert('Live chat feature coming soon! For now, please call us at +250 788 123 456');
    };

    // --- CATEGORY FILTER ---
    window.filterByCategory = function(category) {
        showNotification(`Filtering by: ${category}`);
        document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    };

    // --- NOTIFICATION SYSTEM ---
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});