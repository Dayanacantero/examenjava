
// const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
// const cartItemsContainer = document.querySelector('.cart-items');
// const cartTotalElement = document.getElementById('cart-total');


// let cart = JSON.parse(localStorage.getItem('cart')) || [];

// // Función para agregar productos al carrito
// function addToCart(product) {
//     const existingProduct = cart.find(item => item.id === product.id);
//     if (existingProduct) {
//         existingProduct.quantity += 1;
//     } else {
//         cart.push({ ...product, quantity: 1 });
//     }
//     updateCart();
// }

// // Función para actualizar el carrito y recalcular el total
// function updateCart() {
//     cartItemsContainer.innerHTML = ''; // Limpiar carrito visual
//     let total = 0;

//     cart.forEach(item => {
//         const itemTotal = item.price * item.quantity;
//         total += itemTotal;

//         const cartItem = document.createElement('div');
//         cartItem.classList.add('cart-item');
//         cartItem.innerHTML = `
//             <h4>${item.name} (x${item.quantity})</h4>
//             <p>$${itemTotal.toFixed(2)}</p>
//         `;

//         cartItemsContainer.appendChild(cartItem);
//     });

//     cartTotalElement.textContent = total.toFixed(2);
//     localStorage.setItem('cart', JSON.stringify(cart)); // Guardar carrito en localStorage
// }

// // Obtener datos del producto desde la interfaz
// addToCartButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const productItem = button.closest('.product-item');
//         const productId = parseInt(productItem.getAttribute('data-id'));
//         const productName = productItem.querySelector('h3').textContent;
//         const productPrice = parseFloat(productItem.querySelector('p').textContent.replace('Precio: $', ''));

//         const product = { id: productId, name: productName, price: productPrice };
//         addToCart(product);
//     });
// });

// // Actualizar carrito al cargar la página
// updateCart();



// SEGUNDA ACTUALIZACIONNNNNNN



const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartButton = document.getElementById('cart-button');
const closeCartButton = document.getElementById('close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.getElementById('cart-count');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para abrir el sidebar del carrito
function openCart() {
    cartSidebar.classList.add('open');
}

// Función para cerrar el sidebar del carrito
function closeCart() {
    cartSidebar.classList.remove('open');
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountElement.textContent = count;
}

// Función para agregar productos al carrito
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Función para actualizar el carrito y recalcular el total
function updateCart() {
    cartItemsContainer.innerHTML = ''; // Limpiar carrito visual
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
         <div style="display: flex; align-items: center;">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px; border-radius: 8px;">
            <div>
                <h4>${item.name} (x${item.quantity})</h4>
                <p>$${itemTotal.toFixed(2)}</p>
            </div>
            <button class="remove-item-btn" data-id="${item.id}">&times;</button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalElement.textContent = total.toFixed(2);
    updateCartCount();
    localStorage.setItem('cart', JSON.stringify(cart)); // Guardar carrito en localStorage
}

// Obtener datos del producto desde la interfaz
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productItem = button.closest('.product-item');
        const productId = parseInt(productItem.getAttribute('data-id'));
        const productName = productItem.querySelector('h3').textContent;
        const productPrice = parseFloat(productItem.querySelector('p').textContent.replace('Precio: $', ''));
        const productImage = productItem.querySelector('img').src; // Obtener la URL de la imagen

        const product = { id: productId, name: productName, price: productPrice, image: productImage };
        addToCart(product);
        openCart(); // Opcional: abrir el carrito al agregar un producto
    });
});

// Evento para abrir el carrito
cartButton.addEventListener('click', openCart);

// Evento para cerrar el carrito
closeCartButton.addEventListener('click', closeCart);

// Evento para eliminar productos del carrito
cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item-btn')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        removeFromCart(productId);
    }
});

// Actualizar carrito al cargar la página
updateCart();