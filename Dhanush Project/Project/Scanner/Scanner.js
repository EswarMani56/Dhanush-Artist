const resultBox = document.getElementById('result');
const productBox = document.getElementById('product-details');
const overlay = document.getElementById('overlay');
const scannerContainer = document.getElementById('scanner-container');
const scanAgainBtn = document.getElementById('scan-again');
const proceedPayBtn = document.getElementById('proceed-pay');

const productDatabase = {
  "8906161680216": {
    name: "Schwarzkopf Colour Specialist",
    variant: "6.16 Cool Dark Blonde (165ml)",
    price: "₹540",
    brand: "Schwarzkopf",
    benefits: "Omegaplex + Hyaluronic Acid = Hydration & Strength"
  }
};

let cart = [];

function resizeOverlay() {
  const { width, height } = scannerContainer.getBoundingClientRect();
  overlay.width = width;
  overlay.height = height;
}

// ✳️ Draw green box on top of barcode
Quagga.onProcessed(result => {
  resizeOverlay();
  const ctx = overlay.getContext("2d");
  ctx.clearRect(0, 0, overlay.width, overlay.height);

  if (result && result.box) {
    ctx.strokeStyle = "#00FF00";
    ctx.lineWidth = 2;
    ctx.beginPath();
    result.box.forEach((pt, i) => {
      const [x, y] = pt;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.stroke();
  }
});

Quagga.init({
  inputStream: {
    type: "LiveStream",
    target: scannerContainer,
    constraints: {
      facingMode: "environment"
    }
  },
  decoder: {
    readers: [
      "code_128_reader",
      "ean_reader",
      "ean_8_reader",
      "upc_reader"
    ]
  }
}, err => {
  if (err) {
    resultBox.textContent = "❌ Camera error: " + err.message;
    return;
  }
  Quagga.start();
});

Quagga.onDetected(data => {
  const code = data.codeResult.code;

  if (code) {
    Quagga.stop();
    resultBox.textContent = `✅ Barcode: ${code}`;

    const product = productDatabase[code];
    if (product) {
      productBox.innerHTML = `
        <strong>${product.name}</strong><br>
        Variant: ${product.variant}<br>
        Price: ${product.price}<br>
        Brand: ${product.brand}<br>
        Benefits: ${product.benefits}
      `;
      cart.push(product);
    } else {
      productBox.textContent = "❌ Unknown product code.";
    }

    scanAgainBtn.style.display = 'inline-block';
    proceedPayBtn.style.display = 'inline-block';
  }
});

function restartScanner() {
  resultBox.textContent = "📡 Scanning...";
  productBox.textContent = "";
  scanAgainBtn.style.display = 'none';
  proceedPayBtn.style.display = 'none';
  Quagga.start();
}

function proceedToPayment() {
  // ...calculate total...

  const transaction = {
    timestamp: Date.now(),
    items: [...cart],
    total
  };

  // Save to payment history
  const history = JSON.parse(localStorage.getItem('paymentHistory')) || [];
  history.push(transaction);
  localStorage.setItem('paymentHistory', JSON.stringify(history));

  // Clear cart + redirect
  localStorage.removeItem('cart');
  alert("✅ Payment successful!");
  window.location.href = "../Homepage/Homepage.html";
}
