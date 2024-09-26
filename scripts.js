document.addEventListener('DOMContentLoaded', function () {
    const products = {
        1: { id: 1, name: 'Product 1', price: 49.99, img: 'https://via.placeholder.com/300x400' },
        2: { id: 2, name: 'Product 2', price: 59.99, img: 'https://via.placeholder.com/300x400' },
        3: { id: 3, name: 'Product 3', price: 39.99, img: 'https://via.placeholder.com/300x400' },
        4: { id: 4, name: 'Product 4', price: 29.99, img: 'https://via.placeholder.com/300x400' },
    };

    if (window.location.pathname.includes('product.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (productId && products[productId]) {
            const product = products[productId];
            document.getElementById('product-name').innerText = product.name;
            document.getElementById('product-price').innerText = `$${product.price}`;
            document.getElementById('product-image').src = product.img;

            // Handle Add to Cart with Quantity
            let quantity = parseInt(document.getElementById('product-quantity').value);

            document.getElementById('add-to-cart').addEventListener('click', function () {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];

                // Check if product is already in the cart
                const existingProduct = cart.find(item => item.id === product.id);
                if (existingProduct) {
                    // If it is, increment the quantity
                    existingProduct.quantity += quantity;
                } else {
                    // Otherwise, add new product to the cart
                    cart.push({ ...product, quantity: quantity });
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                window.location.href = 'cart.html';
            });

            // Increase or Decrease Quantity
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

    // Cart Page Logic
    if (window.location.pathname.includes('cart.html')) {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const cartContainer = document.getElementById('cart-items');

        if (cartItems.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cartContainer.innerHTML = ''; // Clear any existing content
            let totalAmount = 0;

            cartItems.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.img}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <button class="remove-from-cart" data-index="${index}">Remove</button>
                `;
                cartContainer.appendChild(cartItem);
                totalAmount += item.price * item.quantity;
            });

            const totalDisplay = document.createElement('div');
            totalDisplay.className = 'total-amount';
            totalDisplay.innerHTML = `<h3>Total: $${totalAmount.toFixed(2)}</h3>`;
            cartContainer.appendChild(totalDisplay);

            document.querySelectorAll('.remove-from-cart').forEach(button => {
                button.addEventListener('click', function () {
                    const index = this.getAttribute('data-index');
                    cartItems.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    window.location.reload();
                });
            });

            document.getElementById('checkout').addEventListener('click', function () {
                alert('Proceeding to checkout...');
                // Clear the cart after checkout
                localStorage.removeItem('cart');
                window.location.reload();
            });
        }
    }

    // Contact Form
    document.getElementById('contact-form')?.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Thank you for your message!');
    });
});
