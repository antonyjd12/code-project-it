/* ========================================
   JD RESTAURANT - AUTHENTICATION LOGIC
   Handles Login, Register, Validation
   Uses LocalStorage for demo purposes
   ======================================== */

// Mock User Database (in real app, this would be a server)
let usersDatabase = JSON.parse(localStorage.getItem('usersDatabase')) || [];

// Initialize with a demo user
if (usersDatabase.length === 0) {
    usersDatabase = [
        {
            id: 1,
            fullName: 'Demo User',
            username: 'demo',
            email: 'demo@jdrestaurant.com',
            phone: '+250 788 123 456',
            password: 'Demo1234!',
            createdAt: new Date().toISOString()
        }
    ];
    localStorage.setItem('usersDatabase', JSON.stringify(usersDatabase));
}

// ========================================
// TAB SWITCHING
// ========================================
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        switchTab(tab);
    });
});

function switchTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        if (b.getAttribute('data-tab') === tab) {
            b.classList.add('active');
        }
    });

    // Update form containers
    document.querySelectorAll('.form-container').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById(`${tab}-form`).classList.add('active');
}

// ========================================
// PASSWORD TOGGLE
// ========================================
function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// ========================================
// PASSWORD STRENGTH CHECKER
// ========================================
const registerPassword = document.getElementById('registerPassword');
if (registerPassword) {
    registerPassword.addEventListener('input', checkPasswordStrength);
}

function checkPasswordStrength() {
    const password = registerPassword.value;
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    
    let strength = 0;
    let text = '';
    let color = '';

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;

    switch (strength) {
        case 0:
        case 1:
            text = 'Weak';
            color = '#ff4757';
            strengthBar.style.width = '25%';
            break;
        case 2:
            text = 'Fair';
            color = '#ffa502';
            strengthBar.style.width = '50%';
            break;
        case 3:
            text = 'Good';
            color = '#7bed9f';
            strengthBar.style.width = '75%';
            break;
        case 4:
            text = 'Strong';
            color = '#2ed573';
            strengthBar.style.width = '100%';
            break;
    }

    strengthBar.style.background = color;
    strengthText.textContent = password.length > 0 ? text : '';
    strengthText.style.color = color;
}

// ========================================
// LOGIN HANDLER
// ========================================
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    const loginBtn = document.getElementById('loginBtn');

    // Clear previous errors
    clearErrors();

    // Validation
    let isValid = true;

    if (!email) {
        showError('loginEmailError', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('loginEmailError', 'Please enter a valid email');
        isValid = false;
    }

    if (!password) {
        showError('loginPasswordError', 'Password is required');
        isValid = false;
    }

    if (!isValid) return;

    // Show loading
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        const user = usersDatabase.find(u => u.email === email && u.password === password);

        if (user) {
            // Successful login
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            }
            localStorage.setItem('currentUser', JSON.stringify(user));

            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;

            showSuccessModal('Welcome Back!', `Hello ${user.fullName}, redirecting to your dashboard...`);
            
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 2000);
        } else {
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
            showErrorModal('Login Failed', 'Invalid email or password. Please try again.');
        }
    }, 1500);
}

// ========================================
// REGISTER HANDLER
// ========================================
function handleRegister(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    const registerBtn = document.getElementById('registerBtn');

    // Clear previous errors
    clearErrors();

    // Validation
    let isValid = true;

    if (!fullName || fullName.length < 3) {
        showError('fullNameError', 'Full name must be at least 3 characters');
        isValid = false;
    }

    if (!username || username.length < 3) {
        showError('usernameError', 'Username must be at least 3 characters');
        isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        showError('usernameError', 'Username can only contain letters, numbers, and underscores');
        isValid = false;
    } else if (usersDatabase.some(u => u.username === username)) {
        showError('usernameError', 'Username already taken');
        isValid = false;
    }

    if (!email) {
        showError('registerEmailError', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('registerEmailError', 'Please enter a valid email');
        isValid = false;
    } else if (usersDatabase.some(u => u.email === email)) {
        showError('registerEmailError', 'Email already registered');
        isValid = false;
    }

    if (!phone || phone.length < 10) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    }

    if (!password || password.length < 8) {
        showError('registerPasswordError', 'Password must be at least 8 characters');
        isValid = false;
    }

    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match');
        isValid = false;
    }

    if (!terms) {
        showError('termsError', 'You must accept the terms and conditions');
        isValid = false;
    }

    if (!isValid) return;

    // Show loading
    registerBtn.classList.add('loading');
    registerBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Create new user
        const newUser = {
            id: usersDatabase.length + 1,
            fullName,
            username,
            email,
            phone,
            password,
            createdAt: new Date().toISOString()
        };

        // Save to database
        usersDatabase.push(newUser);
        localStorage.setItem('usersDatabase', JSON.stringify(usersDatabase));

        // Save current user
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        registerBtn.classList.remove('loading');
        registerBtn.disabled = false;

        showSuccessModal('Account Created!', `Welcome to JD Restaurant, ${fullName}! Your account has been created successfully.`);
        
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 2000);
    }, 1500);
}

// ========================================
// SOCIAL LOGIN (Demo)
// ========================================
function socialLogin(provider) {
    showSuccessModal(`${provider} Login`, `${provider} authentication would be integrated here. For demo, please use email/password.`);
}

// ========================================
// FORGOT PASSWORD
// ========================================
function handleForgotPassword(event) {
    event.preventDefault();
    const email = prompt('Enter your email address to reset your password:');
    
    if (email && isValidEmail(email)) {
        const user = usersDatabase.find(u => u.email === email);
        if (user) {
            showSuccessModal('Reset Link Sent', `Password reset instructions have been sent to ${email}`);
        } else {
            showErrorModal('Email Not Found', 'No account found with that email address.');
        }
    }
}

// ========================================
// TERMS & PRIVACY
// ========================================
function showTerms(event) {
    event.preventDefault();
    showSuccessModal('Terms & Conditions', 'These would be the full terms and conditions of JD Restaurant...');
}

function showPrivacy(event) {
    event.preventDefault();
    showSuccessModal('Privacy Policy', 'This would be the full privacy policy of JD Restaurant...');
}

// ========================================
// HELPER FUNCTIONS
// ========================================
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
    }
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
}

function showSuccessModal(title, message) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    document.getElementById('successModal').classList.add('active');
}

function closeModal() {
    document.getElementById('successModal').classList.remove('active');
}

function showErrorModal(title, message) {
    document.querySelector('#errorModal h2').textContent = title;
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('errorModal').classList.add('active');
}

function closeErrorModal() {
    document.getElementById('errorModal').classList.remove('active');
}

// ========================================
// AUTO-LOGIN ON PAGE LOAD
// ========================================
window.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    const rememberMe = localStorage.getItem('rememberMe');

    if (currentUser && rememberMe === 'true') {
        // Redirect to profile
        window.location.href = 'profile.html';
    }
});