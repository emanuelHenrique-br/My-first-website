const products = [
  { id: 1, name: "Camisa Slim Fit", price: 89.9, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", badge: "Novo" },
  { id: 2, name: "Calça Jeans Skinny", price: 149.9, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", badge: "Mais vendido" },
  { id: 3, name: "Tênis Esportivo", price: 299.9, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { id: 4, name: "Blazer Moderno", price: 349.9, image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", badge: "Premium" },
  { id: 5, name: "Vestido Elegante", price: 199.9, image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { id: 6, name: "Jaqueta de Couro", price: 499.9, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", badge: "Exclusivo" },
];

let cart = [];

const productsContainer = document.getElementById("products");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const showCartBtn = document.getElementById("show-cart");
const cartDetails = document.getElementById("cart-details");
const cartItemsList = document.getElementById("cart-items");
const closeCartBtn = document.getElementById("close-cart");
const notification = document.getElementById("notification");

function formatPrice(price) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });
}

function showNotification(message, type = "success") {
  notification.textContent = message;
  notification.className = `notification show ${type}`;
  
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

function renderProducts() {
  productsContainer.innerHTML = "";
  
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    
    card.innerHTML = `
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p class="price">${formatPrice(product.price)}</p>
      <button onclick="addToCart(${product.id})">
        <i class="fas fa-cart-plus"></i> Adicionar
      </button>
    `;
    
    productsContainer.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const itemInCart = cart.find((item) => item.id === id);
  
  if (itemInCart) {
    itemInCart.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  
  updateCartDisplay();
  showNotification(`${product.name} adicionado ao carrinho`);
}

function removeFromCart(id) {
  const product = cart.find((item) => item.id === id);
  cart = cart.filter((item) => item.id !== id);
  
  updateCartDisplay();
  showNotification(`${product.name} removido do carrinho`, "danger");
}

function updateCartDisplay() {
  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  cartCount.textContent = totalQty;
  cartTotal.textContent = formatPrice(totalPrice);

  cartItemsList.innerHTML = "";
  
  if (cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-bag"></i>
        <p>Seu carrinho está vazio</p>
      </div>
    `;
  } else {
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div>
            <span class="cart-item-price">${formatPrice(item.price)}</span>
            <span class="cart-item-qty">x${item.qty}</span>
          </div>
        </div>
        <button onclick="removeFromCart(${item.id})">
          <i class="fas fa-trash"></i>
        </button>
      `;
      cartItemsList.appendChild(li);
    });
  }
}

function showCartDetails() {
  cartDetails.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function hideCartDetails() {
  cartDetails.classList.add("hidden");
  document.body.style.overflow = "auto";
}

showCartBtn.addEventListener("click", (e) => {
  e.stopPropagation(); 
  showCartDetails();
});

closeCartBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  hideCartDetails();
});

document.addEventListener("click", (e) => {
  if (!cartDetails.classList.contains("hidden") && !cartDetails.contains(e.target)) {
    hideCartDetails();
  }
});

window.addEventListener("load", () => {
  renderProducts();
  updateCartDisplay();
  
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartDisplay();
  }
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("cart", JSON.stringify(cart));
});
