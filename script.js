/* =========================
   VELVET VOGUE - MAIN JS
   ========================= */

/* =========================
   1. ADD PRODUCT (ADMIN PAGE)
   ========================= */
function addNewProduct(event) {
    event.preventDefault();

    const name = document.getElementById('prodName').value;
    const price = parseFloat(document.getElementById('prodPrice').value).toFixed(2);
    const category = document.getElementById('prodCategory').value;
    const imgUrl = document.getElementById('prodImage').value;

    const tableBody = document.getElementById('productTableBody');

    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td><img src="${imgUrl}" width="50" height="50" style="object-fit:cover;border-radius:5px;"></td>
        <td>${name}</td>
        <td><span class="badge bg-success">${category}</span></td>
        <td>LKR ${parseFloat(price).toLocaleString()}</td>
    `;

    tableBody.prepend(newRow);

    alert("Product Added Successfully!");

    document.getElementById('addProductForm').reset();
}

/* =========================
   2. SHOP FILTER SYSTEM
   ========================= */
function filterProducts() {
    const maxPrice = document.getElementById("priceRange").value;
    const selectedCategory = document.querySelector('input[name="categoryRadio"]:checked').value;

    document.getElementById("priceLabel").innerText = "LKR " + maxPrice;

    let items = document.querySelectorAll(".product-item");
    let count = 0;

    items.forEach(item => {
        let price = item.getAttribute("data-price");
        let category = item.getAttribute("data-category");

        let show = (selectedCategory === "all" || category === selectedCategory)
                   && parseInt(price) <= parseInt(maxPrice);

        if (show) {
            item.classList.remove("d-none");
            count++;
        } else {
            item.classList.add("d-none");
        }
    });

    document.getElementById("itemCount").innerText = "Showing " + count + " items";

    document.getElementById("noProductsAlert").classList.toggle("d-none", count !== 0);
}

/* =========================
   3. RESET FILTERS
   ========================= */
function resetFilters() {
    document.getElementById("catAll").checked = true;
    document.getElementById("priceRange").value = 7000;
    filterProducts();
}

/* =========================
   4. PRODUCT DETAILS - CART
   ========================= */
function handleAddToCart() {
    let title = document.getElementById("productTitle").innerText;
    let price = document.getElementById("productPrice").innerText;
    let qty = document.getElementById("prodQty").value;
    let size = document.querySelector('input[name="sizeOption"]:checked').value;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        title: title,
        price: price,
        qty: qty,
        size: size
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`Added to Cart!\n${title} (Size: ${size}, Qty: ${qty})`);

    updateCartCount();
}

/* =========================
   5. CART COUNT BADGE
   ========================= */
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQty = cart.reduce((sum, item) => sum + parseInt(item.qty), 0);

    let badge = document.getElementById("cartBadge");
    if (badge) {
        badge.innerText = totalQty;
    }
}

/* =========================
   6. LOAD CART (OPTIONAL)
   ========================= */
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cart);
}

/* =========================
   INIT
   ========================= */
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
});