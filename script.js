// Cart Array & Local Storage Initialization
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');

// Initialize UI on page load
updateCartUI();

// Open Cart Drawer
cartBtn.addEventListener('click', () => {
  cartDrawer.classList.add('active');
  cartOverlay.classList.add('active');
});

// Close Cart Drawer
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function closeCart() {
  cartDrawer.classList.remove('active');
  cartOverlay.classList.remove('active');
}

// Add Item to Cart Function (linked to HTML buttons)
function addToCart(id, name, price, img) {
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      img: img,
      quantity: 1
    });
  }

  saveAndSync();
  cartDrawer.classList.add('active');
  cartOverlay.classList.add('active');
}

// Change Quantity (+ / -)
function changeQuantity(id, delta) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(cartItem => cartItem.id !== id);
    }
  }
  saveAndSync();
}

// Remove Specific Item
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveAndSync();
}

// Save to LocalStorage and Refresh UI
function saveAndSync() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

// Update Cart Badge, Drawer Items list, and Total Price
function updateCartUI() {
  // Update Badge Count
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.innerText = totalCount;

  // Render Items inside Cart Drawer
  cartItemsContainer.innerHTML = '';
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p style="text-align:center; color:#888; margin-top:20px;">Your cart is empty.</p>';
    cartTotalPrice.innerText = '$0.00';
    return;
  }

  let totalPrice = 0;

  cart.forEach(item => {
    totalPrice += item.price * item.quantity;

    const cartItemEl = document.createElement('div');
    cartItemEl.classList.add('cart-item');
    cartItemEl.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)}</p>
        <div class="cart-item-actions">
          <button onclick="changeQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fa fa-trash"></i></button>
    `;
    cartItemsContainer.appendChild(cartItemEl);
  });

  cartTotalPrice.innerText = `$${totalPrice.toFixed(2)}`;
}

// Checkout Button Action
function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Thank you for your order! Checkout successful.');
  cart = [];
  saveAndSync();
  closeCart();
}

// Responsive Navbar Toggle (for Mobile)
function menutoggle() {
  const menuitems = document.getElementById('menuitems');
  if (menuitems.style.maxHeight === '0px' || menuitems.style.maxHeight === '') {
    menuitems.style.maxHeight = '200px';
  } else {
    menuitems.style.maxHeight = '0px';
  }
}