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

// ========================================
// MENU FILTER FUNCTIONALITY
// ========================================
function filterMenu(category) {
    const menuCards = document.querySelectorAll('.menu-card');
    const buttons = document.querySelectorAll('.menu-cat-btn');
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter cards
    menuCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Menu card click to show details (reuse modal from earlier)
document.addEventListener('click', function(e) {
    const menuCard = e.target.closest('.menu-card');
    if (menuCard && !e.target.closest('.add-to-cart-btn')) {
        const name = menuCard.dataset.name;
        const description = menuCard.dataset.description;
        const ingredients = menuCard.dataset.ingredients;
        const price = menuCard.dataset.price;
        
        // Show in modal (reuse existing modal system)
        if (typeof showModal === 'function') {
            showModal(name, description, ingredients, price);
        }
    }
});

// ========================================
// MENU INTERACTION FUNCTIONS
// ========================================

// Quick Add to Cart (from menu card)
function quickAddToCart(id, name, price, image) {
    addToCart(id, name, price);
    
    // Show notification
    showNotification(`${name} added to cart!`);
    
    // Animate cart icon
    const cartIcon = document.querySelector('.cart-btn i');
    cartIcon.style.animation = 'bounce 0.5s';
    setTimeout(() => {
        cartIcon.style.animation = '';
    }, 500);
}

// Show Item Details Modal
function showItemDetails(card) {
    const name = card.dataset.name;
    const description = card.dataset.description;
    const ingredients = card.dataset.ingredients;
    const price = card.dataset.price;
    const image = card.dataset.image;
    const id = card.dataset.id;
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('itemDetailsModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'itemDetailsModal';
        modal.className = 'item-details-modal';
        document.body.appendChild(modal);
    }
    
    // Populate modal
    modal.innerHTML = `
        <div class="item-details-content">
            <button class="item-details-close" onclick="closeItemDetails()">
                <i class="fas fa-times"></i>
            </button>
            <div class="item-details-image" style="background-image: url('${image}');"></div>
            <div class="item-details-body">
                <h2>${name}</h2>
                <p class="description">${description}</p>
                <div class="ingredients">
                    <h4><i class="fas fa-list"></i> Ingredients</h4>
                    <p>${ingredients}</p>
                </div>
                <div class="item-details-footer">
                    <span class="price">${price}k</span>
                    <button class="order-btn-large" onclick="quickAddToCart(${id}, '${name}', ${price}, '${image}'); closeItemDetails();">
                        <i class="fas fa-shopping-bag"></i> Order Now
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Item Details Modal
function closeItemDetails() {
    const modal = document.getElementById('itemDetailsModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('item-details-modal')) {
        closeItemDetails();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeItemDetails();
    }
});

// Menu Filter Function
function filterMenu(category, btn) {
    const menuCards = document.querySelectorAll('.menu-card');
    const buttons = document.querySelectorAll('.menu-cat-btn');
    
    // Update active button
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Filter cards
    menuCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
            card.style.display = 'block';
        } else {
            card.classList.add('hidden');
            card.style.display = 'none';
        }
    });
}

// Notification function (if not already in your code)
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, #d35400, #a04000);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 9999;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;
    notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles if not already present
if (!document.getElementById('notification-animations')) {
    const style = document.createElement('style');
    style.id = 'notification-animations';
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
        @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
        }
    `;
    document.head.appendChild(style);
}

/* ========================================
   PAYMENT FUNCTIONALITY
   ======================================== */

// Switch payment form based on selection
function selectPayment(method) {
    // Hide all forms
    document.querySelectorAll('.payment-form-group').forEach(form => {
        form.classList.remove('active');
    });
    
    // Show selected form
    const selectedForm = document.getElementById(`${method}-form`);
    if (selectedForm) {
        selectedForm.classList.add('active');
    }
}

// Enhanced Place Order Function with Validation & Processing Simulation
function placeOrder() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    let isValid = true;
    let errorMessage = '';

    // 1. Validate Payment Details
    if (paymentMethod === 'momo') {
        const momoNum = document.getElementById('momoNumber').value.trim();
        if (!momoNum || momoNum.length < 10 || !momoNum.startsWith('078') && !momoNum.startsWith('079')) {
            isValid = false;
            errorMessage = 'Please enter a valid MTN number (e.g., 078XXXXXXX).';
        }
    } else if (paymentMethod === 'airtel') {
        const airtelNum = document.getElementById('airtelNumber').value.trim();
        if (!airtelNum || airtelNum.length < 10 || !airtelNum.startsWith('072') && !airtelNum.startsWith('073')) {
            isValid = false;
            errorMessage = 'Please enter a valid Airtel number (e.g., 072XXXXXXX).';
        }
    } else if (paymentMethod === 'bank') {
        const bankRef = document.getElementById('bankReference').value.trim();
        if (!bankRef || bankRef.length < 3) {
            isValid = false;
            errorMessage = 'Please enter your name or transaction reference.';
        }
    }

    if (!isValid) {
        showNotification(errorMessage);
        return; // Stop execution
    }

    // 2. Show Processing Overlay
    const step4 = document.getElementById('step4');
    const overlay = document.createElement('div');
    overlay.className = 'processing-overlay active';
    overlay.innerHTML = `
        <div class="spinner"></div>
        <p>Processing Payment...</p>
        <small style="color: rgba(255,255,255,0.6); margin-top: 10px;">Please do not close this window</small>
    `;
    step4.style.position = 'relative';
    step4.appendChild(overlay);

    // 3. Simulate API Call / Payment Processing (3 seconds)
    setTimeout(() => {
        // Remove overlay
        overlay.remove();
        step4.style.position = 'static';

        // Generate order details
        const orderId = '#JD' + Math.floor(1000 + Math.random() * 9000);
        const methodCard = document.querySelector(`.method-card[data-method="${deliveryOrder.method}"]`);
        const deliveryTime = methodCard ? methodCard.dataset.time + ' minutes' : '30-45 minutes';

        // Update success modal
        document.getElementById('successOrderId').textContent = orderId;
        document.getElementById('successTime').textContent = deliveryTime;
        document.getElementById('successTotal').textContent = `${deliveryOrder.total}k`;
        
        // Close delivery modal and show success
        closeDeliveryModal();
        document.getElementById('orderSuccessModal').classList.add('active');

        // Clear cart
        if (typeof cart !== 'undefined') {
            cart = [];
            if (typeof updateCartUI === 'function') updateCartUI();
        }

        // Save to localStorage
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push({
            id: orderId,
            items: deliveryOrder.items,
            location: deliveryOrder.location,
            method: deliveryOrder.method,
            payment: paymentMethod,
            total: deliveryOrder.total,
            date: new Date().toISOString(),
            status: 'paid'
        });
        localStorage.setItem('orders', JSON.stringify(orders));

    }, 3000); // 3 seconds processing time
}

/* ========================================
   CONTACT FORM & FAQ FUNCTIONALITY
   ======================================== */

// Character counter for message
const contactMessage = document.getElementById('contactMessage');
const charCount = document.getElementById('charCount');

if (contactMessage && charCount) {
    contactMessage.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = count;
        
        if (count > 500) {
            charCount.style.color = '#ff4757';
            this.value = this.value.substring(0, 500);
        } else if (count > 400) {
            charCount.style.color = '#ffa502';
        } else {
            charCount.style.color = 'rgba(255, 255, 255, 0.5)';
        }
    });
}

// Handle Contact Form Submission
function handleContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value.trim();
    const privacy = document.getElementById('contactPrivacy').checked;
    const submitBtn = document.getElementById('submitBtn');
    
    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    
    let isValid = true;
    
    // Validation
    if (!name || name.length < 2) {
        document.getElementById('nameError').textContent = 'Please enter your full name';
        isValid = false;
    }
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        isValid = false;
    }
    
    if (!phone || phone.replace(/\D/g, '').length < 10) {
        document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
        isValid = false;
    }
    
    if (!subject) {
        document.getElementById('subjectError').textContent = 'Please select a subject';
        isValid = false;
    }
    
    if (!message || message.length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
        isValid = false;
    }
    
    if (!privacy) {
        showContactNotification('Please accept the Privacy Policy to continue', 'error');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Build WhatsApp message
    const whatsappMessage = `*New Contact Message from JD Cucina Website*%0A%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Email:* ${encodeURIComponent(email)}%0A` +
        `*Phone:* ${encodeURIComponent(phone)}%0A` +
        `*Subject:* ${encodeURIComponent(subject)}%0A%0A` +
        `*Message:*%0A${encodeURIComponent(message)}`;
    
    // Simulate processing then open WhatsApp
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success notification
        showContactNotification('Message prepared! Opening WhatsApp...', 'success');
        
        // Open WhatsApp with pre-filled message
        setTimeout(() => {
            window.open(`https://wa.me/250792499258?text=${whatsappMessage}`, '_blank');
            
            // Reset form
            document.getElementById('contactForm').reset();
            if (charCount) charCount.textContent = '0';
        }, 1000);
        
    }, 1500);
}

// Contact notification
function showContactNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'error' ? 'linear-gradient(135deg, #ff4757, #c0392b)' : 'linear-gradient(135deg, #2ed573, #27ae60)';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 99999;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
        max-width: 350px;
    `;
    
    const icon = type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle';
    notification.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// FAQ Toggle
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked one if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Open/Closed Status Indicator
function updateOpenStatus() {
    const statusIndicator = document.getElementById('openStatus');
    if (!statusIndicator) return;
    
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hour + minutes / 60;
    
    let isOpen = false;
    let statusText = '';
    
    // Check if currently open based on business hours
    if (day >= 1 && day <= 5) {
        // Monday - Friday: 11:00 AM - 10:00 PM
        if (currentTime >= 11 && currentTime < 22) {
            isOpen = true;
            statusText = 'We are currently OPEN';
        } else {
            statusText = 'We are currently CLOSED';
        }
    } else {
        // Saturday - Sunday: 10:00 AM - 11:00 PM
        if (currentTime >= 10 && currentTime < 23) {
            isOpen = true;
            statusText = 'We are currently OPEN';
        } else {
            statusText = 'We are currently CLOSED';
        }
    }
    
    statusIndicator.classList.add(isOpen ? 'open' : 'closed');
    statusIndicator.querySelector('.status-text').textContent = statusText;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateOpenStatus();
    // Update status every minute
    setInterval(updateOpenStatus, 60000);
});