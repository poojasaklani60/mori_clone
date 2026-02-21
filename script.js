const products = [
    {
        id: 1,
        title: "Char Dham Digital Scroll",
        price: 599.00,
        originalPrice: 799.00,
        category: "Art & Decor",
        image: "char_dham_scroll.png",
        badge: "Sale"
    },
    {
        id: 2,
        title: "Colours of Pahad Puzzle",
        price: 999.00,
        originalPrice: null,
        category: "Games & Entertainment",
        image: "pahad_puzzle.png"
    },
    {
        id: 3,
        title: "Postcards (Set of 5)",
        price: 119.00,
        originalPrice: null,
        category: "Art & Decor",
        image: "postcards.png"
    },
    {
        id: 4,
        title: "SWAYAMBHU (Lord Brahma)",
        price: 349.00,
        originalPrice: null,
        category: "Art & Decor",
        image: "swayambhu_art.png"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');

    if (productGrid) {
        products.forEach(product => {

            const priceHtml = product.originalPrice
                ? `<span class="product-price">₹${product.price.toFixed(2)}</span><span class="original-price">₹${product.originalPrice.toFixed(2)}</span>`
                : `<span class="product-price">₹${product.price.toFixed(2)}</span>`;

            const badgeHtml = product.badge
                ? `<div class="product-badge">${product.badge}</div>`
                : '';

            const card = document.createElement('article');
            card.className = 'product-card';

            card.innerHTML = `
        <div class="product-image">
          ${badgeHtml}
          <img src="${product.image}" alt="${product.title}" loading="lazy">
        </div>
        <div class="product-info">
          <div class="product-category">${product.category}</div>
          <h3 class="product-title">${product.title}</h3>
          <div class="product-pricing">
            ${priceHtml}
          </div>
          <button class="btn btn-primary" style="margin-top: 15px; width: 100%;" onclick="addToCart('${product.title}')">Add to Cart</button>
        </div>
      `;
            productGrid.appendChild(card);
        });
    }
});

let cartCount = 0;
function addToCart(title) {
    cartCount++;
    const countEl = document.querySelector('.cart-count');
    if (countEl) {
        countEl.textContent = cartCount;
        // Simple animation
        countEl.style.transform = 'scale(1.5)';
        setTimeout(() => {
            countEl.style.transform = 'scale(1)';
        }, 200);
    }
}
