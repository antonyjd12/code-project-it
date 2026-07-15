/* ========================================
   JD RESTAURANT - ADVANCED SEARCH SYSTEM
   FIXED VERSION
   ======================================== */

// Mock Food Database
const foodDatabase = [
    // Rwandan Dishes
    { id: 25, name: 'Isombe', category: 'Salads', price: 12, rating: 4.7, popularity: 82, prepTime: '25 min', image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=500&q=80', description: 'Traditional cassava leaves dish', ingredients: ['cassava', 'eggplant', 'spinach'], dietary: ['vegan', 'gluten-free'], available: true },
    { id: 26, name: 'Brochettes', category: 'Chicken', price: 14, rating: 4.9, popularity: 96, prepTime: '20 min', image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=500&q=80', description: 'Grilled meat skewers with Rwandan spices', ingredients: ['meat', 'spices', 'onion'], dietary: ['halal'], available: true },
    { id: 27, name: 'Ubugali with Beans', category: 'Salads', price: 10, rating: 4.6, popularity: 78, prepTime: '15 min', image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=500&q=80', description: 'Maize flour with slow-cooked beans', ingredients: ['maize', 'beans', 'tomato'], dietary: ['vegan', 'gluten-free'], available: true },
    { id: 28, name: 'Mizuzu', category: 'Salads', price: 8, rating: 4.5, popularity: 75, prepTime: '10 min', image: 'https://images.unsplash.com/photo-1528751014936-863e6e7a319c?auto=format&fit=crop&w=500&q=80', description: 'Sweet fried plantains', ingredients: ['plantains', 'oil'], dietary: ['vegan', 'gluten-free'], available: true },
    
    // Italian Dishes
    { id: 29, name: 'Truffle Margherita Pizza', category: 'Pizza', price: 12, rating: 4.8, popularity: 90, prepTime: '20 min', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80', description: 'Classic Italian pizza with truffle oil', ingredients: ['tomato', 'mozzarella', 'basil', 'truffle'], dietary: ['vegetarian'], available: true },
    { id: 30, name: 'Classic Carbonara', category: 'Pasta', price: 14, rating: 4.9, popularity: 94, prepTime: '15 min', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=500&q=80', description: 'Authentic Roman pasta with egg and bacon', ingredients: ['pasta', 'egg', 'bacon', 'parmesan'], dietary: [], available: true },
    
    // Burgers
    { id: 1, name: 'Classic Beef Burger', category: 'Burgers', price: 14, rating: 4.9, popularity: 95, prepTime: '15 min', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80', description: 'Juicy beef patty with special sauce', ingredients: ['beef', 'lettuce', 'tomato', 'cheese'], dietary: ['halal'], available: true },
    { id: 31, name: 'Chicken Burger', category: 'Burgers', price: 13, rating: 4.7, popularity: 85, prepTime: '12 min', image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=500&q=80', description: 'Crispy chicken patty with mayo', ingredients: ['chicken', 'lettuce', 'mayo'], dietary: ['halal'], available: true },
    
    // Pizza
    { id: 32, name: 'Pepperoni Pizza', category: 'Pizza', price: 13, rating: 4.7, popularity: 88, prepTime: '20 min', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80', description: 'Classic pizza with spicy pepperoni', ingredients: ['pepperoni', 'mozzarella', 'tomato'], dietary: [], available: true },
    { id: 2, name: 'BBQ Chicken Pizza', category: 'Pizza', price: 14, rating: 4.6, popularity: 82, prepTime: '22 min', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80', description: 'Grilled chicken with BBQ sauce', ingredients: ['chicken', 'bbq', 'onion'], dietary: ['halal'], available: true },
    
    // Chicken
    { id: 6, name: 'Grilled Chicken', category: 'Chicken', price: 15, rating: 4.8, popularity: 87, prepTime: '25 min', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=80', description: 'Herb-marinated grilled chicken breast', ingredients: ['chicken', 'herbs', 'garlic'], dietary: ['halal', 'gluten-free'], available: true },
    { id: 7, name: 'Fried Chicken', category: 'Chicken', price: 14, rating: 4.9, popularity: 93, prepTime: '18 min', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80', description: 'Crispy fried chicken with spices', ingredients: ['chicken', 'flour', 'spices'], dietary: ['halal'], available: true },
    
    // Steak
    { id: 8, name: 'Beef Steak', category: 'Steak', price: 25, rating: 4.9, popularity: 89, prepTime: '30 min', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=500&q=80', description: 'Premium beef steak cooked to perfection', ingredients: ['beef', 'butter', 'herbs'], dietary: ['halal', 'gluten-free'], available: true },
    
    // Pasta
    { id: 33, name: 'Spaghetti Bolognese', category: 'Pasta', price: 14, rating: 4.7, popularity: 86, prepTime: '20 min', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=500&q=80', description: 'Classic pasta with rich meat sauce', ingredients: ['pasta', 'beef', 'tomato'], dietary: [], available: true },
    { id: 4, name: 'Chicken Alfredo Pasta', category: 'Pasta', price: 15, rating: 4.8, popularity: 91, prepTime: '18 min', image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=500&q=80', description: 'Creamy parmesan sauce with chicken', ingredients: ['pasta', 'chicken', 'cream', 'parmesan'], dietary: [], available: true },
    
    // Seafood
    { id: 3, name: 'Grilled Salmon', category: 'Seafood', price: 20, rating: 4.8, popularity: 88, prepTime: '25 min', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80', description: 'Fresh salmon with lemon butter', ingredients: ['salmon', 'lemon', 'butter'], dietary: ['gluten-free'], available: true },
    { id: 34, name: 'Grilled Shrimp', category: 'Seafood', price: 20, rating: 4.7, popularity: 84, prepTime: '20 min', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=500&q=80', description: 'Jumbo shrimp with garlic butter', ingredients: ['shrimp', 'garlic', 'butter'], dietary: ['gluten-free'], available: true },
    
    // Salads
    { id: 14, name: 'Caesar Salad', category: 'Salads', price: 11, rating: 4.6, popularity: 80, prepTime: '10 min', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=500&q=80', description: 'Classic Caesar with parmesan', ingredients: ['lettuce', 'parmesan', 'croutons'], dietary: ['vegetarian'], available: true },
    { id: 15, name: 'Greek Salad', category: 'Salads', price: 10, rating: 4.5, popularity: 75, prepTime: '8 min', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80', description: 'Fresh vegetables with feta cheese', ingredients: ['tomato', 'cucumber', 'feta', 'olive'], dietary: ['vegetarian', 'gluten-free'], available: true },
    
    // Desserts
    { id: 35, name: 'Tiramisu', category: 'Desserts', price: 16, rating: 4.9, popularity: 92, prepTime: '5 min', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=80', description: 'Classic Italian coffee dessert', ingredients: ['mascarpone', 'coffee', 'cocoa'], dietary: ['vegetarian'], available: true },
    { id: 36, name: 'Chocolate Cake', category: 'Desserts', price: 10, rating: 4.8, popularity: 89, prepTime: '5 min', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80', description: 'Rich chocolate cake with ganache', ingredients: ['chocolate', 'flour', 'sugar'], dietary: ['vegetarian'], available: true },
    { id: 17, name: 'Cheesecake', category: 'Desserts', price: 12, rating: 4.7, popularity: 85, prepTime: '5 min', image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=500&q=80', description: 'Creamy New York-style cheesecake', ingredients: ['cream cheese', 'sugar', 'graham'], dietary: ['vegetarian'], available: true },
    
    // Coffee
    { id: 38, name: 'Cappuccino', category: 'Coffee', price: 6, rating: 4.8, popularity: 90, prepTime: '5 min', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=500&q=80', description: 'Espresso with steamed milk and foam', ingredients: ['espresso', 'milk'], dietary: ['vegetarian'], available: true },
    { id: 19, name: 'Latte', category: 'Coffee', price: 6, rating: 4.7, popularity: 88, prepTime: '5 min', image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=500&q=80', description: 'Smooth espresso with steamed milk', ingredients: ['espresso', 'milk'], dietary: ['vegetarian'], available: true },
    
    // Drinks
    { id: 37, name: 'Fresh Fruit Juices', category: 'Soft Drinks', price: 6, rating: 4.9, popularity: 91, prepTime: '3 min', image: 'https://images.unsplash.com/photo-1613478201744-71406663f507?auto=format&fit=crop&w=500&q=80', description: 'Freshly squeezed organic juices', ingredients: ['orange', 'mango', 'pineapple'], dietary: ['vegan', 'gluten-free'], available: true },
    { id: 21, name: 'Mango Smoothie', category: 'Smoothies', price: 8, rating: 4.8, popularity: 87, prepTime: '5 min', image: 'https://images.unsplash.com/photo-1623065422902-30e1d606a32e?auto=format&fit=crop&w=500&q=80', description: 'Tropical mango smoothie', ingredients: ['mango', 'yogurt', 'honey'], dietary: ['vegetarian', 'gluten-free'], available: true },
    
    // Cocktails
    { id: 40, name: 'Mojito', category: 'Cocktails', price: 12, rating: 4.8, popularity: 86, prepTime: '5 min', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=500&q=80', description: 'Classic Cuban rum cocktail', ingredients: ['rum', 'mint', 'lime'], dietary: ['vegan'], available: true },
    { id: 23, name: 'Margarita', category: 'Cocktails', price: 12, rating: 4.7, popularity: 84, prepTime: '5 min', image: 'https://images.unsplash.com/photo-1560512823-1e8176a2b50b?auto=format&fit=crop&w=500&q=80', description: 'Tangy tequila cocktail', ingredients: ['tequila', 'lime', 'triple sec'], dietary: ['vegan'], available: true },
    
    // Beer
    { id: 39, name: 'Local Beer', category: 'Soft Drinks', price: 5, rating: 4.6, popularity: 83, prepTime: '1 min', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=500&q=80', description: 'Rwandan craft beers', ingredients: ['beer'], dietary: ['vegan'], available: true }
];

// Categories list
const categories = ['Burgers', 'Pizza', 'Chicken', 'Steak', 'Pasta', 'Seafood', 'Salads', 'Desserts', 'Coffee', 'Soft Drinks', 'Cocktails', 'Smoothies'];

// ========================================
// SEARCH FUNCTIONALITY
// ========================================
let searchInput, searchDropdown, searchResults;

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    searchInput = document.getElementById('searchInputMain');
    searchDropdown = document.getElementById('searchDropdown');
    searchResults = document.getElementById('searchResults');
    
    if (searchInput) {
        // Add event listeners
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.length > 0) {
                searchDropdown.style.display = 'block';
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchDropdown.style.display = 'none';
            }
        });
        
        // Show all items initially
        displayResults(foodDatabase.slice(0, 12));
    }
});

function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length === 0) {
        searchDropdown.style.display = 'none';
        if (searchResults) displayResults(foodDatabase.slice(0, 12));
        return;
    }

    // Get suggestions
    const suggestions = getSuggestions(query);
    displaySuggestions(suggestions, query);
    
    // Display full results
    if (searchResults) {
        const results = filterResults(query);
        displayResults(results);
    }
}

function getSuggestions(query) {
    return foodDatabase.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.ingredients.some(ing => ing.toLowerCase().includes(query))
    ).slice(0, 5);
}

function displaySuggestions(suggestions, query) {
    if (!searchDropdown) return;
    
    if (suggestions.length === 0) {
        searchDropdown.innerHTML = `
            <div class="no-suggestions">
                <i class="fas fa-search"></i>
                <p>No matching food or drink found. Try another search.</p>
            </div>
        `;
    } else {
        searchDropdown.innerHTML = suggestions.map(item => `
            <div class="suggestion-item" onclick="selectSuggestion('${item.name}')">
                <img src="${item.image}" alt="${item.name}">
                <div class="suggestion-info">
                    <h4>${highlightMatch(item.name, query)}</h4>
                    <p>${item.category} • ${item.prepTime}</p>
                </div>
                <span class="suggestion-price">${item.price}k</span>
            </div>
        `).join('');
    }
    searchDropdown.style.display = 'block';
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

function selectSuggestion(name) {
    if (!searchInput) return;
    searchInput.value = name;
    searchDropdown.style.display = 'none';
    const results = filterResults(name.toLowerCase());
    displayResults(results);
}

function filterResults(query) {
    let results = foodDatabase.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.ingredients.some(ing => ing.toLowerCase().includes(query))
    );

    // Apply active filters
    const activeCategory = document.querySelector('.filter-btn.active');
    if (activeCategory && activeCategory.dataset.category !== 'all') {
        results = results.filter(item => item.category === activeCategory.dataset.category);
    }

    // Apply dietary filters
    const activeDietary = document.querySelectorAll('.dietary-checkbox:checked');
    if (activeDietary.length > 0) {
        const diets = Array.from(activeDietary).map(cb => cb.value.toLowerCase());
        results = results.filter(item => 
            diets.every(diet => item.dietary.includes(diet))
        );
    }

    // Apply price filter
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');
    if (priceMin && priceMin.value) {
        results = results.filter(item => item.price >= parseInt(priceMin.value));
    }
    if (priceMax && priceMax.value) {
        results = results.filter(item => item.price <= parseInt(priceMax.value));
    }

    // Apply sorting
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        const sortValue = sortSelect.value;
        switch (sortValue) {
            case 'price-low':
                results.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                results.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                results.sort((a, b) => b.rating - a.rating);
                break;
            case 'popular':
                results.sort((a, b) => b.popularity - a.popularity);
                break;
            case 'newest':
                results.sort((a, b) => b.id - a.id);
                break;
        }
    }

    return results;
}

function displayResults(results) {
    if (!searchResults) return;

    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-utensils"></i>
                <h3>No Results Found</h3>
                <p>No matching food or drink found. Try another search.</p>
            </div>
        `;
        return;
    }

    searchResults.innerHTML = `
        <div class="results-header">
            <p>Found ${results.length} item${results.length !== 1 ? 's' : ''}</p>
        </div>
        <div class="results-grid">
            ${results.map(item => `
                <div class="result-card">
                    <div class="result-image" style="background-image: url('${item.image}');">
                        ${!item.available ? '<span class="unavailable-badge">Unavailable</span>' : ''}
                        <button class="favorite-btn" onclick="toggleFavorite(${item.id}, this)">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                    <div class="result-info">
                        <div class="result-category">${item.category}</div>
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <div class="result-meta">
                            <div class="result-rating">
                                <i class="fas fa-star"></i>
                                <span>${item.rating}</span>
                            </div>
                            <div class="result-time">
                                <i class="far fa-clock"></i>
                                <span>${item.prepTime}</span>
                            </div>
                        </div>
                        <div class="result-footer">
                            <span class="result-price">${item.price}k</span>
                            <button class="add-to-cart-btn" onclick="addToCartSearch(${item.id}, '${item.name}', ${item.price})">
                                <i class="fas fa-cart-plus"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ========================================
// FILTERS
// ========================================
function filterByCategory(category, btn) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Re-run search
    if (searchInput && searchInput.value) {
        handleSearch({ target: searchInput });
    } else {
        displayResults(filterResults(''));
    }
}

function applyDietaryFilter() {
    if (searchInput && searchInput.value) {
        handleSearch({ target: searchInput });
    } else {
        displayResults(filterResults(''));
    }
}

function applySort() {
    if (searchInput && searchInput.value) {
        handleSearch({ target: searchInput });
    } else {
        displayResults(filterResults(''));
    }
}

function clearSearch() {
    if (searchInput) {
        searchInput.value = '';
        searchDropdown.style.display = 'none';
        displayResults(foodDatabase.slice(0, 12));
    }
}

// ========================================
// CART & FAVORITES
// ========================================
function addToCartSearch(id, name, price) {
    if (typeof addToCart === 'function') {
        addToCart(id, name, price);
        showSearchNotification(`${name} added to cart!`);
    } else {
        alert(`${name} added to cart!`);
    }
}

function toggleFavorite(id, btn) {
    const icon = btn.querySelector('i');
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#e74c3c';
        showSearchNotification('Added to wishlist!');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '';
        showSearchNotification('Removed from wishlist');
    }
}

function showSearchNotification(message) {
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