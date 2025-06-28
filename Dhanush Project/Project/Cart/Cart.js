const cartItemsBox = document.getElementById('cart-items');
const totalBox = document.getElementById('total');

// Simulate cart data — replace with localStorage.getItem in production
const cart = JSON.parse(localStorage.getItem('cart')) || [];

let total = 0;

if (cart.length === 0) {
  cartItemsBox.innerHTML = "<p>Your cart is empty. Start scanning products!</p>";
  totalBox.style.display = "none";
} else {
  cart.forEach((item, index) => {
    const price = parseInt(item.price.replace("₹", ""));
    total += price;

    const div = document.createElement('div');
    div.className = "cart-item";
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>Variant: ${item.variant}</p>
      <p>Price: ${item.price}</p>
      <p>Brand: ${item.brand}</p>
    `;
    cartItemsBox.appendChild(div);
  });

  totalBox.textContent = `Total: ₹${total}`;
}

function checkout() {
  alert(`✅ Order placed!\nYou will be charged ₹${total}.`);
  localStorage.removeItem('cart');
  window.location.href = "../Homepage/Homepage.html";
}
