const slider = document.getElementById('slider');
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

// Autoplay funksiyasini ishga tushirish
function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 3000); // 3 soniyada o'zgaradi
}

// Slayder yuklanganda autoplayni ishga tushirish
startAutoplay();
import { fetchProducts } from './data.js'; // Ma'lumotlarni olish uchun import

document.addEventListener('DOMContentLoaded', async () => {
    const productContainer = document.getElementById('product-container');
    
    // Ma'lumotlarni API'dan olamiz
    const products = await fetchProducts();
   
    // Agar mahsulotlar mavjud bo'lsa
    if (products && products.length > 0) {
        products.forEach(product => {
            // Har bir mahsulot uchun karta yaratiladi
            const productCard = document.createElement('div');
            productCard.className = 'p-4 border rounded-lg shadow-md hover:shadow-lg text-center w-[350px] h-[500px] gap-4 relative transition-all duration-300 ease-in-out group';
            productCard.setAttribute('data-id', product.id); // Mahsulotni aniqlash uchun ID o'rnatamiz

            // Karta ichidagi HTML kodini dinamik tarzda qo'shamiz
            productCard.innerHTML = `
                <!-- Mahsulot rasmi -->
                <div class="relative overflow-hidden">
                    <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-contain mb-4 group-hover:blur-sm transition duration-300 ease-in-out">
                    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <i class="bx bx-heart like-icon text-white text-3xl mx-4 cursor-pointer"></i>
                        <i class="bx bx-cart cart-icon text-white text-3xl mx-4 cursor-pointer"></i>
                    </div>
                </div>

                <!-- Mahsulot nomi -->
                <h2 class="text-xl font-semibold mb-2">${product.title}</h2>

                <!-- Reyting yulduzlari -->
                <div class="flex justify-center items-center mb-2">
                    <span class="text-yellow-400 text-lg">★</span>
                    <span class="text-yellow-400 text-lg">★</span>
                    <span class="text-yellow-400 text-lg">★</span>
                    <span class="text-yellow-400 text-lg">★</span>
                    <span class="text-gray-400 text-lg">★</span>
                </div>

                <!-- Narx qismi -->
                <div class="flex justify-center items-center gap-2 mb-4">
                    <p class="text-blue-500 text-2xl font-semibold">$${product.price}</p>
                    <p class="text-gray-400 line-through">$534.33</p> <!-- Dinamik narx qo'shishingiz mumkin -->
                    <p class="text-red-500 text-lg font-semibold">24% Off</p> <!-- Dinamik chegirma -->
                </div>

                <!-- "Add to Cart" tugmasi -->
                <button class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200 add-to-cart">
                    Add to Cart
                </button>
                  <button  id="show_btn" class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-200 add-to-cart">
                   show more
                </button>
            `;

            // Karta sahifaga qo'shiladi
            productContainer.appendChild(productCard);

            // Like icon va Cart icon'larni aniqlaymiz
            const likeIcon = productCard.querySelector('.like-icon');
            const cartIcon = productCard.querySelector('.cart-icon');
            const addToCartButton = productCard.querySelector('.add-to-cart');

            // Like icon bosilganda localStorage'ga saqlash
            likeIcon.addEventListener('click', () => {
                const productId = productCard.getAttribute('data-id');
                let likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
                
                if (!likedProducts.includes(productId)) {
                    likedProducts.push(productId);
                    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
                }
            });

            // Cart icon bosilganda localStorage'ga saqlash
            cartIcon.addEventListener('click', () => {
                const productId = productCard.getAttribute('data-id');
                let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                
                if (!cartItems.includes(productId)) {
                    cartItems.push(productId);
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                }
            });

            // "Add to Cart" tugmasi bosilganda localStorage'ga saqlash
            addToCartButton.addEventListener('click', () => {
                const productId = productCard.getAttribute('data-id');
                let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                
                if (!cartItems.includes(productId)) {
                    cartItems.push(productId);
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                }
            });
        });
    } else {
        console.error('Ma\'lumotlar topilmadi yoki bo\'sh keldi.');
    }
});

setTimeout(() => {
    const showBtn = document.querySelector("#show_btn"); // showBtn ni aniqlash
    if (showBtn) {
      console.log('Element topildi va tanlandi:', showBtn);
      
      // showBtn ustida click hodisasini tinglash
      showBtn.addEventListener('click', () => {
        console.log('ShowBtn ustida klik qilindi:', showBtn);
      });
      
    } else {
      console.log('Element hali topilmadi.');
    }
}, 1000); // 1 soniyadan keyin tekshirish

  showBtn.addEventListener(('clic'),()=>{
    console.log(showBtn);
  }

);
 
