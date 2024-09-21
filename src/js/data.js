
export const fetchCategories = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error('Xatolik yuz berdi:', error);
    }
};
export const fetchProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Xatolik yuz berdi:', error);
        return [];  // Xato bo'lganda bo'sh array qaytaradi
    }
};


