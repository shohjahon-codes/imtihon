let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

const displayCartItems = () => {
    const cartContainer = document.getElementById('cart-container');
    const totalPriceElement = document.getElementById('total-price');
    cartContainer.innerHTML = '';
    let totalPrice = 0;

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item bg-white p-4 border rounded-lg shadow-lg flex flex-col justify-between';

        cartItem.innerHTML = `
            <div class="flex items-center">
                <img src="${item.image}" alt="${item.title}" class="w-16 h-16 mr-4" />
                <div>
                    <h2 class="text-xl font-semibold">${item.title}</h2>
                    <p class="text-gray-500">$${item.price}</p>
                </div>
            </div>
            <div class="flex justify-between items-center mt-4">
                <div class="flex items-center">
                    <button class="decrease bg-red-500 text-white px-3 py-1 rounded-lg">-</button>
                    <span class="mx-4">${item.quantity}</span>
                    <button class="increase bg-green-500 text-white px-3 py-1 rounded-lg">+</button>
                </div>
                <p class="text-lg font-semibold">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;

        cartContainer.appendChild(cartItem);

     
        const increaseButton = cartItem.querySelector('.increase');
        const decreaseButton = cartItem.querySelector('.decrease');

        increaseButton.addEventListener('click', () => {
            updateCartQuantity(item.id, 'increase');
        });

        decreaseButton.addEventListener('click', () => {
            updateCartQuantity(item.id, 'decrease');
        });

        
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
};


const updateCartQuantity = (productId, action) => {
    const product = cartItems.find(item => item.id === productId);

    if (product) {
        if (action === 'increase') {
            product.quantity += 1;
        } else if (action === 'decrease' && product.quantity > 1) {
            product.quantity -= 1;
        } else if (action === 'decrease' && product.quantity === 1) {
      
            cartItems = cartItems.filter(item => item.id !== productId);
        }

       
        localStorage.setItem('cart', JSON.stringify(cartItems));
        displayCartItems(); 
    }
};


document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});


document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Buyurtma qabul qilindi');
      h
        cartItems = [];
        localStorage.setItem('cart', JSON.stringify(cartItems));
        displayCartItems();
    }
});


