document.addEventListener('DOMContentLoaded', function() {
    // Dummy data
    const products = {
        1: { id: 1, name: 'Saint Laurent 110mm Opyum pumps', price: 186000, img: 'https://images.fashiola.in/product-list/300x450/farfetch/108455195/110mm-opyum-pumps.webp' },
        2: { id: 2, name: 'Calvin Klein Sheer Beauty', price: 4200, img: 'https://thebeauty24.com/wp-content/uploads/2022/03/71vM-YbiVL._SL1500_.jpg' },
        3: { id: 3, name: 'Rare Beauty Soft Pinch Dewy Liquid Blush', price: 2700, img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgyObKRVQaKtVEdaSNtRvE-BQomdLNJ55VofbW7D4ZGJ-Ibnh1G0R16E_dXh8AipiAEG5JPIQoY00GQ7iMk8bb1ZoKg5I2lS96NJ0Kn6-DmxoRuf9kiFJeZtuzWKmKPKIaXEF5mVKpH7Gjbb5Dqx5LM062QSdMezVDlXBqZhZRRo4iR_myFGOqsN7kmRg/s1650/rarebeautysoftpinchblushtrio1.jpg' },
        4: { id: 4, name: 'FoxTale Vitamin C & Niacinamide Glow Sunscreen', price: 244, img: 'https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/23116606/2024/4/19/395c640d-d549-4eb1-ba7c-4b703294da5d1713504134431-FoxTale-Essentials-Set-Of-2-Brightening-SPF-50-PASunscreens--1.jpg' },
    };

    // Handle product page logic
    if (window.location.pathname.includes('product.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (productId && products[productId]) {
            const product = products[productId];
            document.getElementById('product-name').innerText = product.name;
            document.getElementById('product-price').innerText = `$${product.price}`;
            document.getElementById('product-image').src = product.img;

            let quantity = parseInt(document.getElementById('product-quantity').value);

            document.getElementById('add-to-cart').addEventListener('click', function () {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];

                const existingProduct = cart.find(item => item.id === product.id);
                if (existingProduct) {
                    existingProduct.quantity += quantity;
                } else {
                    cart.push({ ...product, quantity: quantity });
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                window.location.href = 'cart.html';
            });

            document.getElementById('increase-qty').addEventListener('click', function () {
                quantity++;
                document.getElementById('product-quantity').value = quantity;
            });

            document.getElementById('decrease-qty').addEventListener('click', function () {
                if (quantity > 1) {
                    quantity--;
                    document.getElementById('product-quantity').value = quantity;
                }
            });
        } else {
            document.getElementById('product-details').innerHTML = '<p>Product not found.</p>';
        }
    }

// Cart page logic
if (window.location.pathname.includes('cart.html')) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartContainer.innerHTML = ''; // Clear existing content
        let totalAmount = 0;

        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <label for="quantity-${index}">Quantity:</label>
                <input type="number" id="quantity-${index}" value="${item.quantity}" min="1">
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
            totalAmount += item.price * item.quantity;
        });

        const totalDisplay = document.createElement('div');
        totalDisplay.className = 'total-amount';
        totalDisplay.innerHTML = `<h3>Total: $${totalAmount.toFixed(2)}</h3>`;
        cartContainer.appendChild(totalDisplay);

        // Update quantity automatically when changed
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('change', function () {
                const index = this.getAttribute('id').split('-')[1];
                const newQuantity = parseInt(this.value);
                
                if (newQuantity > 0) {
                    cartItems[index].quantity = newQuantity;
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    window.location.reload();  // Reload to reflect updated cart
                }
            });
        });

        // Remove item from cart
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                cartItems.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                window.location.reload();
            });
        });

        // Checkout and clear cart
        document.getElementById('checkout').addEventListener('click', function () {
            alert('Proceeding to checkout...');
            localStorage.removeItem('cart');  // Clear the cart
            window.location.reload();
        });
    }
}

    // Contact form logic
    document.getElementById('contact-form')?.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Thank you for your message!');
    });
});
