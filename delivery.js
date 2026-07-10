/* ========================================
   JD RESTAURANT - DELIVERY SYSTEM
   ======================================== */

// Rwanda Location Data
const rwandaLocations = {
    'Kigali': {
        'Gasabo': ['Bumbogo', 'Gatsata', 'Gitikiri', 'Jali', 'Kacyiru', 'Kimihura', 'Kimironko', 'Kinyinya', 'Ndera', 'Nduba', 'Remera', 'Rusororo', 'Rutunga'],
        'Nyarugenge': ['Gitega', 'Kanyinya', 'Kigali', 'Magere', 'Muhima', 'Nyakabanda', 'Nyamirambo', 'Nyarugenge', 'Rwezamenyo'],
        'Kicukiro': ['Gahanga', 'Gatenga', 'Gikondo', 'Kagarama', 'Kanombe', 'Kicukiro', 'Kigarama', 'Masaka', 'Niboye', 'Remera']
    },
    'Eastern': {
        'Bugesera': ['Gashora', 'Juru', 'Kamabuye', 'Ntarama', 'Nyamata', 'Rilima', 'Ruhuha', 'Shyara'],
        'Gatsibo': ['Gatsibo', 'Gitoki', 'Kabarore', 'Kageyo', 'Kirundo', 'Manyoni', 'Muhura', 'Ngarama', 'Nyagisharu', 'Remera', 'Rugarama', 'Rwimbogo'],
        'Kayonza': ['Gahini', 'Kabarondo', 'Mukarange', 'Murama', 'Murundi', 'Mwiri', 'Ndego', 'Nyamirama', 'Rukara', 'Ruramira', 'Rwinkwavu'],
        'Kirehe': ['Gahara', 'Gatore', 'Kigarama', 'Kigina', 'Kirehe', 'Mahama', 'Mpanga', 'Musaza', 'Mushikiri', 'Nasho', 'Nyakarambi', 'Remera']
    },
    'Western': {
        'Karongi': ['Bwishyura', 'Gishayi', 'Gitesi', 'Mubuga', 'Murundi', 'Mutuntu', 'Rubengera', 'Rugabano', 'Ruganda', 'Twumba'],
        'Ngororero': ['Bwira', 'Gatumba', 'Hindiro', 'Kabaya', 'Kageyo', 'Matyazo', 'Muhanda', 'Muhororo', 'Ndava', 'Nyange'],
        'Nyabihu': ['Bigogwe', 'Jenda', 'Jomba', 'Kabatwa', 'Kintobo', 'Mukamira', 'Muringa', 'Rambura', 'Rugera', 'Rurembo', 'Shyira'],
        'Nyamasheke': ['Bushenge', 'Cyato', 'Gihombo', 'Kagano', 'Kanjongo', 'Kibogora', 'Macuba', 'Mahembe', 'Nyabitekeri', 'Rangiro', 'Shangi'],
        'Rubavu': ['Bugeshi', 'Busasamana', 'Cyanzarwe', 'Gisenyi', 'Kanama', 'Kanzenze', 'Mudende', 'Nyakiliba', 'Nyamyumba', 'Nyundo', 'Rubavu', 'Rugerero'],
        'Rusizi': ['Bugarama', 'Butare', 'Bweyeye', 'Gashonga', 'Giheke', 'Gikundamvura', 'Kamembe', 'Muganza', 'Mururu', 'Nkanka', 'Nkomane', 'Rwimbogo'],
        'Rutsiro': ['Boneza', 'Gihango', 'Kigeyo', 'Manihira', 'Mukura', 'Murunda', 'Musasa', 'Mushonyi', 'Mushubati', 'Nyabirasi', 'Ruhango', 'Rusebeya']
    },
    'Northern': {
        'Burera': ['Cyanika', 'Cyeru', 'Gahunga', 'Gatebe', 'Gitovu', 'Kagogo', 'Kininzi', 'Kinyababa', 'Kivuye', 'Nemba', 'Rugengabari', 'Ruhengeri', 'Rusarabuye', 'Rwerere'],
        'Gakenke': ['Busengo', 'Coko', 'Cyumba', 'Gakenke', 'Gashenyi', 'Janja', 'Kamubuga', 'Karambi', 'Kivuruga', 'Mataba', 'Minazi', 'Mugunga', 'Muhondo', 'Muyongwe', 'Muzo', 'Nemba', 'Ruli', 'Rusasa', 'Rushashi', 'Rulindo', 'Shyizinge'],
        'Gicumbi': ['Byumba', 'Cyumba', 'Giti', 'Kageyo', 'Kaniga', 'Manyagiro', 'Miyove', 'Mukarange', 'Muko', 'Muvumba', 'Rubaya', 'Rukomo', 'Rushaki', 'Rutare', 'Ruvune', 'Shangasha', 'Tumba'],
        'Musanze': ['Cyuve', 'Gacaca', 'Gashaki', 'Gataraga', 'Kimonyi', 'KMuhoza', 'Musanze', 'Muhoza', 'Muko', 'Muvunge', 'Nyange', 'Remera', 'Rwaza', 'Shingiro'],
        'Rulindo': ['Base', 'Buremera', 'Bushoki', 'Buyoga', 'Cyungo', 'Kinihira', 'Kisaro', 'MASORO', 'Mbogo', 'Muko', 'Ngoma', 'Ntarabana', 'Rukozo', 'Rusiga', 'Shyorongi', 'Tumba']
    },
    'Southern': {
        'Gisagara': ['Gikonko', 'Gishubi', 'Kansi', 'Kibilizi', 'Kigembe', 'Mamba', 'Muganza', 'Mugombwa', 'Mukindo', 'Musha', 'Ndora', 'Nyanza', 'Remera', 'Save'],
        'Huye': ['Gishamvu', 'Huye', 'Karama', 'Kigoma', 'Kinazi', 'Maraba', 'Mbazi', 'Mukura', 'Ngoma', 'Ruhashya', 'Ruatamu', 'Ruguru', 'Simbi', 'Tumba'],
        'Kamonyi': ['Gacurabwenge', 'Karama', 'Kayenzi', 'Kayumbu', 'Mugina', 'Musambira', 'Ngamba', 'Nyamiyaga', 'Nyamirambo', 'Rugarika', 'Rukoma', 'Runda'],
        'Muhanga': ['Cyeza', 'Kabacuzi', 'Kibangu', 'Muhanga', 'Mushishiro', 'Nyabinoni', 'Nyamabuye', 'Nyarusange', 'Rongi', 'Shyogwe'],
        'Nyamagabe': ['Buruhukiro', 'Cyanika', 'Gasaka', 'Gitega', 'Kaduha', 'Kamegeri', 'Kibirizi', 'Kibungo', 'Kitabi', 'Mbazi', 'Mugano', 'Musange', 'Musebeya', 'Mushubi', 'Nkomane', 'Tare', 'Uwinkingi'],
        'Nyanza': ['Busasamana', 'Busoro', 'Byimana', 'Kibirizi', 'Kigoma', 'Mukindo', 'Muyira', 'Nyagisozi', 'Rwabicuma'],
        'Nyaruguru': ['Bugarama', 'Bukombe', 'Burambi', 'Cyahafi', 'Gahunga', 'Gashinge', 'Gatonde', 'Kibeho', 'Kivu', 'Mataba', 'Muganza', 'Ngoma', 'Nyabimata', 'Nyagasozi', 'Nyanza', 'Rusenge', 'Rwabujagi'],
        'Ruhango': ['Byimana', 'Kabagari', 'Kabagari', 'Kinazi', 'Mbuye', 'Mwendo', 'Ntongwe', 'Ruhango']
    }
};

// Delivery order state
let deliveryOrder = {
    items: [],
    location: {},
    method: 'motorcycle',
    payment: 'cash',
    total: 0
};

// ========================================
// OPEN DELIVERY MODAL
// ========================================
function openDeliveryModal() {
    const modal = document.getElementById('deliveryModal');
    
    // Get cart items
    if (typeof cart !== 'undefined' && cart.length > 0) {
        deliveryOrder.items = [...cart];
    } else {
        // Demo items if cart is empty
        deliveryOrder.items = [
            { id: 1, name: 'Classic Beef Burger', price: 14, quantity: 2, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80' },
            { id: 3, name: 'Margherita Pizza', price: 12, quantity: 1, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=200&q=80' },
            { id: 19, name: 'Cappuccino', price: 6, quantity: 2, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=200&q=80' }
        ];
    }
    
    renderDeliveryItems();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDeliveryModal() {
    document.getElementById('deliveryModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    resetDeliveryForm();
}

// ========================================
// RENDER DELIVERY ITEMS
// ========================================
function renderDeliveryItems() {
    const list = document.getElementById('deliveryItemsList');
    
    if (deliveryOrder.items.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.5); padding: 30px;">Your cart is empty. Add items first.</p>';
        return;
    }
    
    list.innerHTML = deliveryOrder.items.map((item, index) => `
        <div class="delivery-item">
            <div class="delivery-item-image" style="background-image: url('${item.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80'}');"></div>
            <div class="delivery-item-info">
                <h4>${item.name}</h4>
                <p>${item.price}k each</p>
            </div>
            <div class="delivery-item-controls">
                <div class="qty-control">
                    <button onclick="updateDeliveryQty(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateDeliveryQty(${index}, 1)">+</button>
                </div>
                <div class="delivery-item-price">${item.price * item.quantity}k</div>
                <button class="remove-item-btn" onclick="removeDeliveryItem(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    updateDeliverySubtotal();
}

function updateDeliveryQty(index, change) {
    deliveryOrder.items[index].quantity += change;
    if (deliveryOrder.items[index].quantity <= 0) {
        deliveryOrder.items.splice(index, 1);
    }
    renderDeliveryItems();
}

function removeDeliveryItem(index) {
    deliveryOrder.items.splice(index, 1);
    renderDeliveryItems();
}

function updateDeliverySubtotal() {
    const subtotal = deliveryOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('deliverySubtotal').textContent = `${subtotal}k`;
}

// ========================================
// STEP NAVIGATION
// ========================================
function goToStep(stepNumber) {
    // Validate current step before proceeding
    if (stepNumber > 1 && !validateStep(stepNumber - 1)) {
        return;
    }
    
    // Hide all steps
    document.querySelectorAll('.delivery-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show target step
    document.getElementById(`step${stepNumber}`).classList.add('active');
    
    // Update progress indicators
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < stepNumber) {
            step.classList.add('completed');
        } else if (index + 1 === stepNumber) {
            step.classList.add('active');
        }
    });
    
    // If going to confirmation step, populate it
    if (stepNumber === 4) {
        populateConfirmation();
    }
    
    // Scroll to top of modal
    document.querySelector('.delivery-modal-content').scrollTop = 0;
}

function validateStep(step) {
    switch(step) {
        case 1:
            if (deliveryOrder.items.length === 0) {
                showNotification('Please add items to your order first!');
                return false;
            }
            return true;
            
        case 2:
            const name = document.getElementById('deliveryName').value.trim();
            const phone = document.getElementById('deliveryPhone').value.trim();
            const province = document.getElementById('deliveryProvince').value;
            const district = document.getElementById('deliveryDistrict').value;
            const sector = document.getElementById('deliverySector').value;
            const street = document.getElementById('deliveryStreet').value.trim();
            
            if (!name || !phone || !province || !district || !sector || !street) {
                showNotification('Please fill in all required location fields!');
                return false;
            }
            
            if (phone.replace(/\D/g, '').length < 10) {
                showNotification('Please enter a valid phone number!');
                return false;
            }
            
            // Save location data
            deliveryOrder.location = {
                name,
                phone,
                province,
                district,
                sector,
                street,
                landmark: document.getElementById('deliveryLandmark').value,
                notes: document.getElementById('deliveryNotes').value
            };
            
            return true;
            
        case 3:
            const selectedMethod = document.querySelector('input[name="deliveryMethod"]:checked');
            if (!selectedMethod) {
                showNotification('Please select a delivery method!');
                return false;
            }
            deliveryOrder.method = selectedMethod.value;
            return true;
            
        default:
            return true;
    }
}

// ========================================
// LOCATION FUNCTIONS
// ========================================
function updateDistricts() {
    const province = document.getElementById('deliveryProvince').value;
    const districtSelect = document.getElementById('deliveryDistrict');
    const sectorSelect = document.getElementById('deliverySector');
    
    districtSelect.innerHTML = '<option value="">Select District</option>';
    sectorSelect.innerHTML = '<option value="">Select Sector</option>';
    
    if (province && rwandaLocations[province]) {
        Object.keys(rwandaLocations[province]).forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
}

function updateSectors() {
    const province = document.getElementById('deliveryProvince').value;
    const district = document.getElementById('deliveryDistrict').value;
    const sectorSelect = document.getElementById('deliverySector');
    
    sectorSelect.innerHTML = '<option value="">Select Sector</option>';
    
    if (province && district && rwandaLocations[province][district]) {
        rwandaLocations[province][district].forEach(sector => {
            const option = document.createElement('option');
            option.value = sector;
            option.textContent = sector;
            sectorSelect.appendChild(option);
        });
    }
}

function useCurrentLocation() {
    if (navigator.geolocation) {
        showNotification('Getting your location...');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // In a real app, you'd reverse geocode these coordinates
                showNotification('Location detected! Please fill in the address details.');
                document.getElementById('mapPreview').innerHTML = `
                    <iframe 
                        width="100%" 
                        height="100%" 
                        style="border:0; border-radius: 10px;" 
                        loading="lazy" 
                        src="https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}&z=15&output=embed">
                    </iframe>
                `;
            },
            (error) => {
                showNotification('Unable to get location. Please enter manually.');
            }
        );
    } else {
        showNotification('Geolocation is not supported by your browser.');
    }
}

// ========================================
// DELIVERY METHOD SELECTION
// ========================================
document.addEventListener('click', function(e) {
    const methodCard = e.target.closest('.method-card');
    if (methodCard) {
        // Remove selected class from all cards
        document.querySelectorAll('.method-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Add selected to clicked card
        methodCard.classList.add('selected');
        
        // Check the radio button
        const radio = methodCard.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
    }
});

// ========================================
// POPULATE CONFIRMATION
// ========================================
function populateConfirmation() {
    // Items
    const itemsHtml = deliveryOrder.items.map(item => `
        <div class="confirmation-item">
            <span>${item.name} × ${item.quantity}</span>
            <strong>${item.price * item.quantity}k</strong>
        </div>
    `).join('');
    document.getElementById('confirmationItems').innerHTML = itemsHtml;
    
    // Location
    const loc = deliveryOrder.location;
    document.getElementById('confirmName').textContent = loc.name;
    document.getElementById('confirmPhone').textContent = loc.phone;
    document.getElementById('confirmAddress').textContent = 
        `${loc.street}, ${loc.sector}, ${loc.district}, ${loc.province}`;
    document.getElementById('confirmNotes').textContent = loc.notes || 'None';
    
    // Method
    const methodCard = document.querySelector(`.method-card[data-method="${deliveryOrder.method}"]`);
    const methodName = methodCard.querySelector('h4').textContent;
    const methodIcon = methodCard.querySelector('.method-icon i').className;
    const methodFee = methodCard.dataset.fee;
    const methodTime = methodCard.dataset.time;
    
    document.getElementById('confirmMethod').innerHTML = `
        <i class="${methodIcon}"></i>
        <div class="confirmation-method-info">
            <h4>${methodName}</h4>
            <p>Estimated time: ${methodTime} minutes • Fee: ${methodFee}k</p>
        </div>
    `;
    
    // Totals
    const subtotal = deliveryOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const packaging = 1;
    const delivery = parseInt(methodFee);
    const total = subtotal + packaging + delivery;
    
    document.getElementById('totalSubtotal').textContent = `${subtotal}k`;
    document.getElementById('totalDelivery').textContent = `${delivery}k`;
    document.getElementById('grandTotal').textContent = `${total}k`;
    
    deliveryOrder.total = total;
}

// ========================================
// PLACE ORDER
// ========================================
function placeOrder() {
    // Get payment method
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    deliveryOrder.payment = paymentMethod;
    
    // Generate order ID
    const orderId = '#JD' + Math.floor(1000 + Math.random() * 9000);
    
    // Get delivery time
    const methodCard = document.querySelector(`.method-card[data-method="${deliveryOrder.method}"]`);
    const deliveryTime = methodCard.dataset.time + ' minutes';
    
    // Close delivery modal
    closeDeliveryModal();
    
    // Show success modal
    document.getElementById('successOrderId').textContent = orderId;
    document.getElementById('successTime').textContent = deliveryTime;
    document.getElementById('successTotal').textContent = `${deliveryOrder.total}k`;
    document.getElementById('orderSuccessModal').classList.add('active');
    
    // Clear cart
    if (typeof cart !== 'undefined') {
        cart = [];
        if (typeof updateCartUI === 'function') updateCartUI();
    }
    
    // Save order to localStorage (for demo)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push({
        id: orderId,
        items: deliveryOrder.items,
        location: deliveryOrder.location,
        method: deliveryOrder.method,
        payment: deliveryOrder.payment,
        total: deliveryOrder.total,
        date: new Date().toISOString(),
        status: 'preparing'
    });
    localStorage.setItem('orders', JSON.stringify(orders));
}

function closeSuccessModal() {
    document.getElementById('orderSuccessModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function resetDeliveryForm() {
    document.getElementById('locationForm').reset();
    deliveryOrder = {
        items: [],
        location: {},
        method: 'motorcycle',
        payment: 'cash',
        total: 0
    };
    goToStep(1);
}

// ========================================
// NOTIFICATION
// ========================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: linear-gradient(135deg, #d4af37, #b8941f);
        color: #000;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
        z-index: 99999;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
        max-width: 350px;
    `;
    notification.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Select motorcycle by default
    const motorcycleCard = document.querySelector('.method-card[data-method="motorcycle"]');
    if (motorcycleCard) {
        motorcycleCard.classList.add('selected');
    }
});