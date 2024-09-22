const slider = document.getElementById("slider");
let currentIndex = 0;
const totalSlides = slider.children.length;
let autoplayInterval;

// Slayderni yangilash funksiyasi
function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Keyingi slaydga o'tish
function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
}


function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, 3000);
}


startAutoplay();

import { fetchCategories, fetchProducts } from './data.js';

const categoryButtonsContainer = document.getElementById('category-buttons');
const productContainer = document.getElementById('product-container');
const cartIcon = document.getElementById('cart-page');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

async function loadCategories() {
    const categories = await fetchCategories();
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-button bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 mx-1';
        button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        button.setAttribute('data-category', category);

       
        button.addEventListener('click', async () => {
            const products = await fetchProducts();
            const selectedCategory = button.getAttribute('data-category');
            const filteredProducts = selectedCategory === 'all' 
                ? products 
                : products.filter(product => product.category === selectedCategory);
            displayProducts(filteredProducts);
        });

        categoryButtonsContainer.appendChild(button);
    });
}


function displayProducts(products) {
    productContainer.innerHTML = ''; 

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'p-4 border rounded-lg shadow-md hover:shadow-lg text-center relative transition-all duration-300 ease-in-out group';
        productCard.setAttribute('data-id', product.id);

        productCard.innerHTML = `
            <div class="relative overflow-hidden">
                <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-contain mb-4 group-hover:blur-sm transition duration-300 ease-in-out">
                <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                    <i class="bx bx-heart like-icon text-white text-3xl mx-4 cursor-pointer"></i>
                    <i class="bx bx-cart cart-icon text-white text-3xl mx-4 cursor-pointer add-to-cart"></i>
                </div>
            </div>
            <h2 class="text-xl font-semibold mb-2">${product.title}</h2>
            <div class="flex justify-center items-center mb-2">
                <span class="text-yellow-400 text-lg">★</span>
                <span class="text-yellow-400 text-lg">★</span>
                <span class="text-yellow-400 text-lg">★</span>
                <span class="text-yellow-400 text-lg">★</span>
                <span class="text-gray-400 text-lg">★</span>
            </div>
            <p class="text-blue-500 text-2xl font-semibold">$${product.price}</p>
            <button class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200 add-to-cart" data-id="${product.id}">
                Add to Cart
            </button>
        `;

        productContainer.appendChild(productCard);
    });
    
     productContainer.classList.add('grid', 'grid-cols-3', 'gap-4');



  
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.closest('[data-id]').getAttribute('data-id');
            const product = products.find(p => p.id == productId);
            if (product) {
                addToCart(product); 
            }
        });
    });
}


const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
       
        existingProduct.quantity += 1;
    } else {
        
        product.quantity = 1;
        cart.push(product);
    }

    // Yangilangan cartni localStorage'ga saqlash
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart:', cart); // Cartdagi mahsulotlarni ko'rsatish
};


document.addEventListener('DOMContentLoaded', async () => {
    await loadCategories(); 
    const products = await fetchProducts(); 
    displayProducts(products);
});


cartIcon.addEventListener('click', () => {
    window.location.href = 'product.html'; 
});
