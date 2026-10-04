// ================= PRODUCT CATALOG DATA =================
const products = [
    {
        id: "berry-velvet",
        name: "Berry Velvet Birthday Cake",
        category: "Cake",
        description: "Layer cake vanila lembut bertingkat dengan krim keju murni, dihiasi stroberi, blueberry, dan raspberry segar.",
        price: 185000,
        tag: "Favorit",
        badgeColor: "bg-bakery-900 text-white",
        image: "assets/hero-cake.jpg"
    },
    {
        id: "lemon-tart",
        name: "Lemon Cloud Meringue Tart",
        category: "Cake",
        description: "Tart renyah dengan isian lemon curd yang asam segar seimbang, ditutup meringue bakar lembut seperti awan.",
        price: 145000,
        tag: "Segar",
        badgeColor: "bg-bakery-500 text-white",
        image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: "almond-croissant",
        name: "Artisanal Almond Croissant",
        category: "Pastry",
        description: "Croissant berlapis renyah berbahan mentega murni Prancis, diisi krim almond lezat dan taburan almond panggang.",
        price: 28000,
        tag: "Dipanggang Pagi",
        badgeColor: "bg-bakery-800 text-white",
        image: "assets/about-baker.jpg"
    },
    {
        id: "choco-fudge",
        name: "Midnight Dark Choco Fudge",
        category: "Cake",
        description: "Kue cokelat pekat 70% dark chocolate Belgia, tekstur fudge moist yang lumer dengan rasa gurih manis elegan.",
        price: 175000,
        tag: "Rich Cokelat",
        badgeColor: "bg-bakery-900 text-white",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80&sat=-30"
    },
    {
        id: "cinnamon-roll",
        name: "Cinnamon Morning Roll",
        category: "Roti",
        description: "Gulungan roti lembut kayu manis otentik dengan racikan rempah pilihan dan glazed cream cheese manis lezat.",
        price: 22000,
        tag: "Menu Sarapan",
        badgeColor: "bg-bakery-500 text-white",
        image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: "milk-bread",
        name: "Japanese Soft Milk Bread",
        category: "Roti",
        description: "Roti bantal susu khas Jepang, super empuk tanpa bahan pengawet, cocok dipadukan dengan selai atau dimakan langsung.",
        price: 25000,
        tag: "Roti Empuk",
        badgeColor: "bg-bakery-800 text-white",
        image: "https://images.unsplash.com/photo-1608198093002-ad4e005484df?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: "strawberry-shortcake",
        name: "Fresh Strawberry Shortcake",
        category: "Cake",
        description: "Sponge cake Jepang ultra ringkas dan lembut, diapit whipped cream vanila murni dan stroberi lokal segar.",
        price: 155000,
        tag: "Ringan & Lembut",
        badgeColor: "bg-bakery-500 text-white",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: "butter-croissant",
        name: "Classic French Butter Croissant",
        category: "Pastry",
        description: "Croissant polos klasik beraroma butter gurih melimpah, lapisan luar super crisp dan bagian dalam berongga sempurna.",
        price: 24000,
        tag: "Klasik",
        badgeColor: "bg-bakery-800 text-white",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80"
    }
];

// WhatsApp Admin Number Configuration
const WA_PHONE_NUMBER = "6281234567890";

// Format currency IDR helper
const formatPrice = (amount) => new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
}).format(amount);

// State
const cart = new Map(); // id -> quantity
let activeCategory = "Semua";
let toastTimeout = null;

// DOM Elements
const productGrid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#product-search");
const noResults = document.querySelector("#no-results");
const categoryTabs = document.querySelector("#category-tabs");

// Mobile Menu Elements
const mobileMenuBtn = document.querySelector("#mobile-menu-btn");
const mobileMenu = document.querySelector("#mobile-menu");
const hamburgerIcon = document.querySelector("#hamburger-icon");
const closeIcon = document.querySelector("#close-icon");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

// Cart Elements
const openCartBtn = document.querySelector("#open-cart-btn");
const openCartBtnMobile = document.querySelector("#open-cart-btn-mobile");
const closeCartBtn = document.querySelector("#close-cart-btn");
const cartDrawer = document.querySelector("#cart-drawer");
const drawerBackdrop = document.querySelector("#drawer-backdrop");
const cartBadgeCount = document.querySelector("#cart-badge-count");
const cartBadgeCountMobile = document.querySelector("#cart-badge-count-mobile");
const cartItemsContainer = document.querySelector("#cart-items");
const cartEmptyState = document.querySelector("#cart-empty");
const cartFooterState = document.querySelector("#cart-footer");
const cartSubtotalEl = document.querySelector("#cart-subtotal");
const checkoutLinkBtn = document.querySelector("#checkout-link");

// Modal Elements
const productModal = document.querySelector("#product-modal");
const modalImg = document.querySelector("#modal-img");
const modalCategory = document.querySelector("#modal-category");
const modalPrice = document.querySelector("#modal-price");
const modalTitle = document.querySelector("#modal-title");
const modalDesc = document.querySelector("#modal-desc");
const modalAddCartBtn = document.querySelector("#modal-add-cart");
const modalWaDirectBtn = document.querySelector("#modal-wa-direct");
const closeModalBtn = document.querySelector("#close-modal-btn");
let activeModalProductId = null;

// Toast Element
const toast = document.querySelector("#toast");
const toastMessage = document.querySelector("#toast-message");

// Direct WA Form
const directWaForm = document.querySelector("#direct-wa-form");


// ================= RENDER PRODUCTS =================
function renderProducts() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

    const filtered = products.filter(product => {
        const matchesCat = (activeCategory === "Semua") || (product.category === activeCategory);
        const matchesSearch = `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query);
        return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
        productGrid.innerHTML = "";
        noResults.classList.remove("hidden");
        return;
    }

    noResults.classList.add("hidden");

    productGrid.innerHTML = filtered.map(product => `
        <article class="bg-white rounded-3xl overflow-hidden border border-bakery-200 shadow-sm flex flex-col group">
            
            <!-- Card Image Box -->
            <div class="relative overflow-hidden cursor-pointer aspect-[4/3]" onclick="openModal('${product.id}')">
                <img src="${product.image}" alt="${product.name}" loading="lazy" class="w-full h-full object-cover">
                <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-semibold ${product.badgeColor}">
                    ${product.tag}
                </span>
            </div>

            <!-- Card Content -->
            <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                    <span class="text-xs font-semibold text-bakery-500">${product.category}</span>
                    <h3 class="font-serif text-lg font-bold text-bakery-900 leading-snug cursor-pointer hover:text-bakery-500 transition-colors" onclick="openModal('${product.id}')">
                        ${product.name}
                    </h3>
                    <p class="text-xs text-bakery-800/70 line-clamp-2 mt-1 leading-relaxed">
                        ${product.description}
                    </p>
                </div>

                <div class="pt-3 border-t border-bakery-100 flex items-center justify-between">
                    <div>
                        <span class="text-[10px] text-gray-500 block">Harga</span>
                        <span class="font-serif text-base font-bold text-bakery-900">${formatPrice(product.price)}</span>
                    </div>

                    <div class="flex items-center gap-2">
                        <!-- Direct WA Order Button for Item -->
                        <a href="https://wa.me/${WA_PHONE_NUMBER}?text=${encodeURIComponent(`Halo Manis Bakery, saya ingin pesan langsung item:\n- ${product.name} (${formatPrice(product.price)})`)}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-xl border border-bakery-200 text-bakery-900 hover:bg-bakery-100 text-xs font-medium transition-colors">
                            Pesan WA
                        </a>

                        <!-- Add to Cart Button -->
                        <button onclick="addToCart('${product.id}')" class="px-3.5 py-1.5 rounded-xl bg-bakery-900 hover:bg-bakery-800 text-white text-xs font-medium transition-colors">
                            + Keranjang
                        </button>
                    </div>
                </div>

            </div>
        </article>
    `).join("");
}


// ================= CART MANAGEMENT =================
function addToCart(productId) {
    const currentQty = cart.get(productId) || 0;
    cart.set(productId, currentQty + 1);
    renderCart();

    const product = products.find(p => p.id === productId);
    showToast(`"${product ? product.name : 'Item'}" ditambahkan ke keranjang.`);
}

function updateCartQuantity(productId, delta) {
    const currentQty = cart.get(productId) || 0;
    const nextQty = currentQty + delta;
    if (nextQty <= 0) {
        cart.delete(productId);
    } else {
        cart.set(productId, nextQty);
    }
    renderCart();
}

function renderCart() {
    const entries = [...cart.entries()];
    const totalCount = entries.reduce((sum, [, qty]) => sum + qty, 0);

    // Update Badges
    if (cartBadgeCount) cartBadgeCount.textContent = totalCount;
    if (cartBadgeCountMobile) cartBadgeCountMobile.textContent = totalCount;

    if (totalCount === 0) {
        cartItemsContainer.innerHTML = "";
        cartEmptyState.classList.remove("hidden");
        cartFooterState.classList.add("hidden");
        return;
    }

    cartEmptyState.classList.add("hidden");
    cartFooterState.classList.remove("hidden");

    let subtotal = 0;

    cartItemsContainer.innerHTML = entries.map(([id, qty]) => {
        const product = products.find(p => p.id === id);
        if (!product) return "";

        const itemTotal = product.price * qty;
        subtotal += itemTotal;

        return `
            <div class="flex items-center gap-3 p-3 bg-white rounded-2xl border border-bakery-200">
                <img src="${product.image}" alt="${product.name}" class="w-16 h-16 rounded-xl object-cover shrink-0">
                
                <div class="flex-1 min-w-0">
                    <h4 class="font-serif text-sm font-bold text-bakery-900 truncate">${product.name}</h4>
                    <p class="text-xs text-bakery-800/70 font-medium">${formatPrice(product.price)}</p>
                    
                    <div class="flex items-center gap-2 mt-2">
                        <button onclick="updateCartQuantity('${id}', -1)" class="w-6 h-6 rounded-lg bg-bakery-100 text-bakery-900 hover:bg-bakery-200 text-xs font-bold flex items-center justify-center transition-colors">
                            -
                        </button>
                        <span class="text-xs font-bold text-bakery-900 w-4 text-center">${qty}</span>
                        <button onclick="updateCartQuantity('${id}', 1)" class="w-6 h-6 rounded-lg bg-bakery-100 text-bakery-900 hover:bg-bakery-200 text-xs font-bold flex items-center justify-center transition-colors">
                            +
                        </button>
                    </div>
                </div>

                <div class="text-right">
                    <span class="font-serif text-xs font-bold text-bakery-900 block">${formatPrice(itemTotal)}</span>
                    <button onclick="updateCartQuantity('${id}', -${qty})" class="text-[11px] text-red-500 hover:underline mt-2 block font-medium">Hapus</button>
                </div>
            </div>
        `;
    }).join("");

    if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(subtotal);

    // Build WA Message Format for Cart Checkout
    const orderLines = entries.map(([id, qty]) => {
        const product = products.find(p => p.id === id);
        return `• ${product.name} (x${qty}) = ${formatPrice(product.price * qty)}`;
    }).join("\n");

    const waText = `Halo Manis Bakery, saya ingin memesan produk berikut via website:\n\n${orderLines}\n\n*Total Subtotal: ${formatPrice(subtotal)}*\n\nMohon konfirmasi ketersediaan dan metode pengirimannya. Terima kasih.`;
    
    if (checkoutLinkBtn) {
        checkoutLinkBtn.href = `https://wa.me/${WA_PHONE_NUMBER}?text=${encodeURIComponent(waText)}`;
    }
}


// ================= CART DRAWER TOGGLE =================
function toggleCartDrawer(open) {
    if (open) {
        cartDrawer.classList.remove("translate-x-full");
        drawerBackdrop.classList.remove("hidden");
        document.body.classList.add("overflow-hidden");
    } else {
        cartDrawer.classList.add("translate-x-full");
        drawerBackdrop.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
    }
}

if (openCartBtn) openCartBtn.addEventListener("click", () => toggleCartDrawer(true));
if (openCartBtnMobile) openCartBtnMobile.addEventListener("click", () => toggleCartDrawer(true));
if (closeCartBtn) closeCartBtn.addEventListener("click", () => toggleCartDrawer(false));
if (drawerBackdrop) drawerBackdrop.addEventListener("click", () => toggleCartDrawer(false));


// ================= MOBILE NAVIGATION TOGGLE =================
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
        const isHidden = mobileMenu.classList.contains("hidden");
        if (isHidden) {
            mobileMenu.classList.remove("hidden");
            hamburgerIcon.classList.add("hidden");
            closeIcon.classList.remove("hidden");
        } else {
            mobileMenu.classList.add("hidden");
            hamburgerIcon.classList.remove("hidden");
            closeIcon.classList.add("hidden");
        }
    });
}

mobileNavLinks.forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        hamburgerIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
    });
});


// ================= CATEGORY FILTER TABS =================
if (categoryTabs) {
    categoryTabs.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-category]");
        if (!btn) return;

        activeCategory = btn.dataset.category;

        document.querySelectorAll(".category-btn").forEach(b => {
            if (b === btn) {
                b.className = "category-btn active px-4 py-2 rounded-full text-xs font-semibold bg-bakery-900 text-white whitespace-nowrap";
            } else {
                b.className = "category-btn px-4 py-2 rounded-full text-xs font-semibold bg-white text-bakery-800 hover:bg-bakery-100 border border-bakery-200 whitespace-nowrap";
            }
        });

        renderProducts();
    });
}

if (searchInput) {
    searchInput.addEventListener("input", renderProducts);
}


// ================= PRODUCT DETAIL MODAL =================
function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    activeModalProductId = productId;
    modalImg.src = product.image;
    modalImg.alt = product.name;
    modalCategory.textContent = product.category;
    modalPrice.textContent = formatPrice(product.price);
    modalTitle.textContent = product.name;
    modalDesc.textContent = product.description;

    modalWaDirectBtn.href = `https://wa.me/${WA_PHONE_NUMBER}?text=${encodeURIComponent(`Halo Manis Bakery, saya berminat memesan:\n- ${product.name} (${formatPrice(product.price)})\nMohon informasi selengkapnya.`)}`;

    productModal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
}

function closeModal() {
    productModal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
}

if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
if (productModal) {
    productModal.addEventListener("click", (e) => {
        if (e.target === productModal) closeModal();
    });
}
if (modalAddCartBtn) {
    modalAddCartBtn.addEventListener("click", () => {
        if (activeModalProductId) {
            addToCart(activeModalProductId);
            closeModal();
        }
    });
}


// ================= TOAST NOTIFICATION =================
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.remove("translate-y-[-20px]", "opacity-0", "pointer-events-none");
    toast.classList.add("translate-y-0", "opacity-100");

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.add("translate-y-[-20px]", "opacity-0", "pointer-events-none");
        toast.classList.remove("translate-y-0", "opacity-100");
    }, 2500);
}


// ================= DIRECT WHATSAPP FORM SUBMISSION =================
if (directWaForm) {
    directWaForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.querySelector("#form-name").value.trim();
        const productSelect = document.querySelector("#form-product").value;
        const message = document.querySelector("#form-message").value.trim();

        const waFormattedText = `Halo Manis Bakery, saya ${name}.\n\n*Pilihan/Kategori:* ${productSelect}\n*Catatan Pesanan:* ${message}\n\nMohon dibantu proses pesanan/pertanyaan saya. Terima kasih.`;

        const waUrl = `https://wa.me/${WA_PHONE_NUMBER}?text=${encodeURIComponent(waFormattedText)}`;

        window.open(waUrl, "_blank");
    });
}


// Initialize page
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    renderCart();
});