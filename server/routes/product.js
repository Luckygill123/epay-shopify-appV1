const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/products", async (req, res) => {
  try {

    // THIRD PARTY API
    const apiResponse = await axios.get(
      "https://dummyjson.com/products"
    );

    const products = apiResponse.data.products;

    const html = `

<!DOCTYPE html>
<html>
<head>

<title>Epay Products</title>

<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<style>

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background: #f5f5f5;
}

.header {
  background: #111827;
  color: white;
  padding: 20px;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 30px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.card-content {
  padding: 15px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.price {
  font-size: 20px;
  color: #16a34a;
  margin-bottom: 15px;
}

.button {
  width: 100%;
  background: #111827;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}

.button:hover {
  background: #2563eb;
}

.loading {
  position: fixed;
  inset: 0;
  background: rgba(255,255,255,0.8);
  display: none;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

</style>

</head>

<body>

<div class="header">
  <h1>Epay Products</h1>
</div>

<div class="container">

  <div class="grid">

    ${products.map((product, index) => `

      <div class="card">

        <img src="${product.thumbnail}" />

        <div class="card-content">

          <div class="title">
            ${product.title}
          </div>

          <div class="price">
            ₹${product.price}
          </div>

          <button
            class="button"
            onclick="buyNow(${index})"
          >
            Buy Now
          </button>

        </div>

      </div>

    `).join("")}

  </div>

</div>

<div class="loading" id="loading">
  Redirecting To Checkout...
</div>

<script>

async function buyNow(index) {

  try {

    document.getElementById('loading').style.display = 'flex';

    // YOUR SHOPIFY VARIANT ID
    const variantId = 1234567890;

    await fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: variantId,
        quantity: 1
      })
    });

    window.location.href = '/checkout';

  } catch (err) {

    console.error(err);
    alert('Error adding to cart');

  }
}

</script>

</body>
</html>

`;

    res.send(html);

  } catch (err) {

    res.status(500).send(err.message);

  }
});

module.exports = router;
