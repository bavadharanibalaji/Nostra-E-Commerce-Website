
function closeBanner() {
    // Select the banner element by its ID
    const banner = document.getElementById('banner');
    
    // Hide the element from the page
    banner.style.display = 'none';
}

/*Slider*/
let index = 0;
let slides = document.querySelectorAll(".slide");

function showSlide() {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add("active");
        } else {
            slide.classList.remove("active");
        }
    });
}

function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide();
}

function preSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide();
}

setInterval(nextSlide, 2500);


const products = document.querySelectorAll(".product1");
const searchInput = document.getElementById("product-search");

const occChecks = document.querySelectorAll(".occ-check");
const priceChecks = document.querySelectorAll(".price-check");

const suggestionsBox = document.getElementById("suggestions");

// PRODUCT DATA
const productData = [
    {name:"Men Formal Shirt", occ:"Formal", price:999},
    {name:"Men Jean", occ:"Casual", price:799},
    {name:"Woman Short Kurti", occ:"Casual", price:499},
    {name:"Men Jacket", occ:"Sports", price:1999},
    {name:"Women Gown", occ:"Festive", price:1499},
    {name:"Stylish Shirt", occ:"Casual", price:1299},
    {name:"Party wear's", occ:"Party", price:1799},
    {name:"Men's Kurta", occ:"Festive", price:2499},
    {name:"Women Kadhi saree", occ:"Festive", price:1999}
];

// MAIN FILTER FUNCTION
function filterProducts() {

    const searchValue = searchInput.value.toLowerCase();

    const selectedOcc = [...occChecks]
        .filter(c => c.checked)
        .map(c => c.value);

    const selectedPrice = [...priceChecks]
        .filter(c => c.checked)
        .map(c => c.value);

    products.forEach((product, index) => {

        const data = productData[index];
        let show = true;

        // SEARCH
        if (!data.name.toLowerCase().includes(searchValue)) {
            show = false;
        }

        // OCCASION FILTER
        if (selectedOcc.length > 0 && !selectedOcc.includes(data.occ)) {
            show = false;
        }

        // PRICE FILTER
        if (selectedPrice.length > 0) {
            let priceMatch = false;

            selectedPrice.forEach(range => {
                let [min, max] = range.split("-").map(Number);
                if (data.price >= min && data.price <= max) {
                    priceMatch = true;
                }
            });

            if (!priceMatch) show = false;
        }

        product.style.display = show ? "block" : "none";
    });
}

// EVENTS
searchInput.addEventListener("keyup", filterProducts);

occChecks.forEach(c => c.addEventListener("change", filterProducts));
priceChecks.forEach(c => c.addEventListener("change", filterProducts));


// 🔽 SEARCH DROPDOWN
const options = ["Formal", "Casual", "Party", "Festive", "Sports"];

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();
    suggestionsBox.innerHTML = "";

    if (value === "") {
        suggestionsBox.style.display = "none";
        return;
    }

    const filtered = options.filter(opt =>
        opt.toLowerCase().includes(value)
    );

    filtered.forEach(opt => {
        const div = document.createElement("div");
        div.innerText = opt;

        div.onclick = () => {
            searchInput.value = opt;
            suggestionsBox.style.display = "none";
            filterProducts();
        };

        suggestionsBox.appendChild(div);
    });

    suggestionsBox.style.display = "block";
});


// Select the wishlist count span and all heart buttons
const wishlistCountSpan = document.getElementById('wishlist-count');
const wishlistButtons = document.querySelectorAll('.wishlist-btn');

let currentCount = 0;

wishlistButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Find the heart icon inside the clicked button container
        const heartIcon = this.querySelector('i');
        
        // Toggle 'added' state
        if (!this.classList.contains('active')) {
            // Add to wishlist
            this.classList.add('active');
            heartIcon.style.color = "red";
            // Change from regular (outline) to solid heart
            heartIcon.classList.replace('fa-regular', 'fa-solid');
            currentCount++;
        } else {
            // Remove from wishlist
            this.classList.remove('active');
            heartIcon.style.color = ""; // Resets to original color
            // Change from solid heart back to regular (outline)
            heartIcon.classList.replace('fa-solid', 'fa-regular');
            currentCount--;
        }

        // Update the navbar count
        wishlistCountSpan.textContent = currentCount;
    });
});


