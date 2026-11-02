const products = [
  {
    id: "powerbank-u-p12",
    name: "پاوربانک اولتراسور مدل U-P12+ ظرفیت ۳۰۰۰۰ میلی‌آمپر",
    brand: "ULTRASUR",
    category: "پاوربانک",
    image: "assets/images/powerbank.webp",
    badge: "شارژ سریع ۲۲.۵ وات",
    groups: ["best", "new"],
    description: "یک همراه پرظرفیت برای سفر و روزهای شلوغ، با نمایشگر دیجیتال و پشتیبانی از شارژ سریع دوطرفه."
  },
  {
    id: "ldnio-h01",
    name: "هدفون بلوتوث الدینیو LDNIO مدل H01",
    brand: "LDNIO",
    category: "صدا",
    image: "assets/images/headphones.webp",
    badge: "بی‌سیم",
    groups: ["best", "new"],
    description: "هدفون روی‌گوشی بلوتوث برای موسیقی و مکالمه روزمره؛ با طراحی سبک و اتصال بی‌سیم."
  },
  {
    id: "ultrasur-w1",
    name: "ساعت هوشمند ULTRA SUR مدل W1",
    brand: "ULTRA SUR",
    category: "گجت هوشمند",
    image: "assets/images/watch.webp",
    badge: "نمایشگر لمسی",
    groups: ["best"],
    description: "ساعت هوشمند با نمایشگر لمسی و قابلیت‌های کاربردی روزمره در یک طراحی اسپرت و جذاب."
  },
  {
    id: "mcdodo-ca5640",
    name: "کابل کنفی USB-C به USB-C مکدودو مدل CA5640",
    brand: "MCDODO",
    category: "کابل",
    image: "assets/images/cable.webp",
    badge: "روکش کنفی",
    groups: ["best"],
    description: "کابل شارژ دو سر تایپ‌سی با روکش کنفی بادوام برای استفاده روزمره و اتصال مطمئن."
  },
  {
    id: "gan-wall-charger",
    name: "شارژر دیواری سه‌خروجی ۶۷ وات GaN",
    brand: "DAILY OBJECTS",
    category: "شارژر",
    image: "assets/images/wall-charger.png",
    badge: "فناوری GaN",
    groups: ["new"],
    description: "شارژر دیواری جمع‌وجور با سه خروجی و توان ۶۷ وات برای شارژ هم‌زمان چند دستگاه."
  },
  {
    id: "jbl-partybox-110",
    name: "اسپیکر بلوتوث جی‌بی‌ال JBL مدل PartyBox 110",
    brand: "JBL",
    category: "صدا",
    image: "assets/images/speaker.webp",
    badge: "صدای پرقدرت",
    groups: ["new", "recommended"],
    description: "اسپیکر قابل حمل با نورپردازی و صدای پرقدرت برای مهمانی و تجربه شنیداری متفاوت."
  },
  {
    id: "tws-earbuds",
    name: "ایرپاد بلوتوث TWS با کیس شارژ",
    brand: "TWS",
    category: "صدا",
    image: "assets/images/earbuds.png",
    badge: "سبک و بی‌سیم",
    groups: ["recommended"],
    description: "ایرپاد بی‌سیم با کیس شارژ جمع‌وجور برای گوش دادن به موسیقی و پاسخ به تماس در هر جا."
  },
  {
    id: "earldom-ot93",
    name: "مبدل OTG فلزی سه‌کاره Earldom مدل OT93",
    brand: "EARLDOM",
    category: "کابل",
    image: "assets/images/adapter.webp",
    badge: "سه‌کاره",
    groups: ["recommended"],
    description: "مبدل فلزی جمع‌وجور برای اتصال دستگاه‌های مختلف و انتقال آسان داده."
  },
  {
    id: "mobile-holder",
    name: "هولدر و پایه نگهدارنده موبایل",
    brand: "UNIVERSAL",
    category: "هولدر",
    image: "assets/images/holder.png",
    badge: "پایه مطمئن",
    groups: ["recommended"],
    description: "پایه نگهدارنده موبایل برای دسترسی راحت‌تر به دستگاه در خودرو، میز کار یا خانه."
  }
];

const filterNames = {
  best: "پرفروش‌ترین",
  new: "جدیدترین",
  recommended: "پیشنهاد ما"
};

const cart = new Map();
const productGrid = document.querySelector("#product-grid");
const searchDialog = document.querySelector("#search-dialog");
const productDialog = document.querySelector("#product-dialog");
const cartDialog = document.querySelector("#cart-dialog");
const mobileMenu = document.querySelector("#mobile-menu");
const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector("#search-results");
const toast = document.querySelector("#toast");
const toastMessage = document.querySelector("#toast-message");
let toastTimer;
let activeFilter = "best";

const toPersianNumber = value => new Intl.NumberFormat("fa-IR", { useGrouping: false }).format(value);
const normalize = value => value.toLowerCase().trim().replaceAll("ي", "ی").replaceAll("ك", "ک").replace(/\s+/g, " ");
const productById = id => products.find(product => product.id === id);

function productCard(product, index) {
  return `
    <article class="product-card" style="animation-delay:${index * 45}ms">
      <button class="product-media product-detail-trigger" type="button" data-product-id="${product.id}" aria-label="مشاهده جزئیات ${product.name}">
        <img src="${product.image}" width="500" height="500" alt="${product.name}" loading="lazy">
        <span class="product-badge">${product.badge}</span>
      </button>
      <div class="product-body">
        <span class="product-brand">${product.brand}</span>
        <button class="product-title product-detail-trigger" type="button" data-product-id="${product.id}">${product.name}</button>
        <div class="product-meta">
          <span class="product-price">قیمت و موجودی<strong>استعلام آنلاین</strong></span>
          <button class="add-to-cart" type="button" data-add-id="${product.id}" aria-label="افزودن ${product.name} به سبد استعلام"><svg class="icon"><use href="#i-plus"/></svg></button>
        </div>
      </div>
    </article>`;
}

function renderProducts(filter = activeFilter) {
  activeFilter = filter;
  const filtered = products.filter(product => product.groups.includes(filter));
  productGrid.innerHTML = filtered.map(productCard).join("");
  productGrid.setAttribute("aria-label", filterNames[filter]);
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toastMessage.textContent = message;
  toast.classList.add("visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 3000);
}

function openDialog(dialog) {
  document.querySelectorAll("dialog[open]").forEach(open => open.close());
  dialog.showModal();
}

function openSearch(query = "") {
  openDialog(searchDialog);
  searchInput.value = query;
  renderSearchResults(query);
  window.setTimeout(() => searchInput.focus(), 50);
}

function renderSearchResults(query = "") {
  const normalizedQuery = normalize(query);
  const matches = products.filter(product => normalize(`${product.name} ${product.brand} ${product.category} ${product.badge}`).includes(normalizedQuery));

  if (!matches.length) {
    searchResults.innerHTML = `<div class="empty-results"><svg class="icon"><use href="#i-search"/></svg><strong>محصولی پیدا نشد</strong><p>عبارت کوتاه‌تری بنویس یا نام دسته‌بندی را امتحان کن.</p></div>`;
    return;
  }

  searchResults.innerHTML = matches.map(product => `
    <button class="search-result product-detail-trigger" type="button" data-product-id="${product.id}">
      <img src="${product.image}" width="124" height="124" alt="">
      <span class="search-result-copy"><strong>${product.name}</strong><small>${product.category} · ${product.brand}</small></span>
      <svg class="icon"><use href="#i-chevron-left"/></svg>
    </button>`).join("");
}

function openProduct(id) {
  const product = productById(id);
  if (!product) return;

  const inquiryText = encodeURIComponent(`سلام، قیمت و موجودی «${product.name}» را می‌خواستم.`);
  document.querySelector("#product-dialog-content").innerHTML = `
    <div class="product-detail">
      <div class="product-detail-media"><img src="${product.image}" width="500" height="500" alt="${product.name}"></div>
      <div class="product-detail-copy">
        <span class="product-brand">${product.brand}</span>
        <h2 id="product-dialog-title">${product.name}</h2>
        <span class="product-detail-category">${product.category} / ${product.badge}</span>
        <p>${product.description}</p>
        <span class="product-detail-note"><svg class="icon"><use href="#i-shield"/></svg>ضمانت اصالت و سلامت کالا</span>
        <div class="product-detail-actions">
          <button class="button button-primary" type="button" data-add-id="${product.id}">افزودن به سبد استعلام<svg class="icon"><use href="#i-plus"/></svg></button>
          <a class="button button-outline" href="https://wa.me/989194562630?text=${inquiryText}" target="_blank" rel="noopener">استعلام در واتساپ<svg class="icon"><use href="#i-arrow-up-left"/></svg></a>
        </div>
      </div>
    </div>`;
  openDialog(productDialog);
}

function addToCart(id) {
  const product = productById(id);
  if (!product) return;
  const wasAdded = cart.has(id);
  cart.set(id, 1);
  updateCartCount();
  showToast(wasAdded ? "این محصول از قبل در سبد استعلام است." : `«${product.name}» به سبد استعلام اضافه شد.`);
}

function updateCartCount() {
  document.querySelectorAll(".cart-count").forEach(count => { count.textContent = toPersianNumber(cart.size); });
  document.querySelectorAll(".cart-trigger").forEach(button => button.setAttribute("aria-label", `سبد استعلام، ${toPersianNumber(cart.size)} کالا`));
}

function renderCart() {
  const cartContent = document.querySelector("#cart-content");
  if (!cart.size) {
    cartContent.innerHTML = `<div class="cart-empty"><span><svg class="icon"><use href="#i-bag"/></svg></span><h3>سبد استعلام خالی است</h3><p>محصولات موردنظرت را اضافه کن تا قیمت و موجودی را یک‌جا بپرسی.</p><button class="button button-primary close-cart-to-products" type="button">دیدن محصولات</button></div>`;
    return;
  }

  const items = [...cart.keys()].map(productById).filter(Boolean);
  const inquiry = encodeURIComponent(`سلام، برای محصولات زیر قیمت و موجودی می‌خواستم:\n${items.map((product, index) => `${index + 1}. ${product.name}`).join("\n")}`);
  cartContent.innerHTML = `
    <div class="cart-items">${items.map(product => `
      <div class="cart-item">
        <img src="${product.image}" width="132" height="132" alt="">
        <div class="cart-item-copy"><strong>${product.name}</strong><small>${product.brand}</small></div>
        <button class="cart-remove" type="button" data-remove-id="${product.id}" aria-label="حذف ${product.name}"><svg class="icon"><use href="#i-trash"/></svg></button>
      </div>`).join("")}</div>
    <div class="cart-inquiry"><p>${toPersianNumber(items.length)} محصول در فهرست شماست. فهرست را در واتساپ بفرست تا قیمت و موجودی اعلام شود.</p><a class="button button-primary" href="https://wa.me/989194562630?text=${inquiry}" target="_blank" rel="noopener">ارسال فهرست در واتساپ<svg class="icon"><use href="#i-arrow-up-left"/></svg></a></div>`;
}

function openCart() {
  renderCart();
  openDialog(cartDialog);
}

document.addEventListener("click", event => {
  const detailTrigger = event.target.closest(".product-detail-trigger");
  const addTrigger = event.target.closest("[data-add-id]");
  const removeTrigger = event.target.closest("[data-remove-id]");
  const categoryLink = event.target.closest("[data-category-link]");

  if (detailTrigger) openProduct(detailTrigger.dataset.productId);
  if (addTrigger) addToCart(addTrigger.dataset.addId);
  if (removeTrigger) {
    cart.delete(removeTrigger.dataset.removeId);
    updateCartCount();
    renderCart();
  }
  if (categoryLink) {
    event.preventDefault();
    openSearch(categoryLink.dataset.categoryLink);
  }
  if (event.target.closest(".search-trigger")) openSearch();
  if (event.target.closest(".cart-trigger")) openCart();
  if (event.target.closest(".menu-trigger")) openDialog(mobileMenu);
  if (event.target.closest(".dialog-close")) event.target.closest("dialog")?.close();
  if (event.target.closest(".close-cart-to-products")) {
    cartDialog.close();
    document.querySelector("#products").scrollIntoView({ behavior: "smooth" });
  }
});

document.querySelectorAll(".product-tabs button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".product-tabs button").forEach(tab => tab.setAttribute("aria-selected", String(tab === button)));
    renderProducts(button.dataset.filter);
  });
});

document.querySelectorAll(".mobile-menu nav a").forEach(link => link.addEventListener("click", () => mobileMenu.close()));
searchInput.addEventListener("input", event => renderSearchResults(event.target.value));

document.querySelectorAll("dialog").forEach(dialog => {
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inside) dialog.close();
  });
});

const header = document.querySelector("#site-header");
const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
  backToTop.classList.toggle("visible", window.scrollY > 650);
}, { passive: true });
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

renderProducts();
updateCartCount();
