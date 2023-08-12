"use strict"

let requestsUrl = `http://localhost:3000/requests/`

// get products
const getProduct = async function (url) {
  const result = await fetch(url)
  if (!result.ok) {
    throw new Error(`Ошибка фетч ${url} статус: ${result.status}`)
  }
  return await result.json()
}

getProduct(`http://localhost:3000/requests`).then((data) => {
  console.log(data)
})

//prod page product quantity picker
$(document).ready(function () {
  $(".product__quantity-input-minus").on("click", function (e) {
    let input = $(e.target).closest(".product__quantity-input").find("input")
    input[0]["stepDown"]()
    totalPrice()
  })
  $(".product__quantity-input-plus").on("click", function (e) {
    let input = $(e.target).closest(".product__quantity-input").find("input")
    input[0]["stepUp"]()
    totalPrice()
  })
  // smooth transition
  var speed = "slow"

  $("html, body").fadeIn(speed, function () {
    $("a[href], button[href]").click(function (event) {
      var url = $(this).attr("href")
      if (url.indexOf("#") == 0 || url.indexOf("javascript:") == 0) return
      event.preventDefault()
      $("html, body").fadeOut(speed, function () {
        window.location = url
      })
    })
  })
})

if (window.location.href.indexOf("product") != -1) {
  var priceSumValue = document.querySelectorAll(".product__price-sum")[0]
    .innerHTML
}

// total price
function totalPrice() {
  let productQuantity = document.querySelectorAll(
    ".product__quantity-input-picker"
  )[0].value
  let priceSum = document.querySelectorAll(".product__price-sum")
  // console.log(productQuantity)
  // console.log(priceSumValue)
  let totalPrice = 0
  for (let i = 0; i < priceSum.length; i++) {
    totalPrice = +priceSumValue * +productQuantity
    // console.log(priceSum[i])
  }
  // console.log(priceSum[0].innerText)
  // console.log(initialPrice, "ini price")
  priceSum[0].innerText = totalPrice
}

/// mobile-nav-toggle
let burgerMenu = document.querySelectorAll(".header__burger-menu")
let mobileNav = document.querySelectorAll(".mobile-nav")
let mobileNavCloseIcon = document.querySelectorAll(".mobile-nav .close-icon")
for (let i = 0; i < burgerMenu.length; i++) {
  burgerMenu[i].addEventListener("click", function () {
    mobileNav[0].classList.toggle("d-none")
    mobileNav[0].classList.toggle("active")
  })
}
for (let i = 0; i < mobileNavCloseIcon.length; i++) {
  mobileNavCloseIcon[i].addEventListener("click", function () {
    mobileNav[0].classList.toggle("d-none")
    mobileNav[0].classList.toggle("active")
  })
}

// add to cart
let addToCartBtn = document.querySelectorAll(".product__add-to-cart-button")
for (let i = 0; i < addToCartBtn.length; i++) {
  addToCartBtn[i].addEventListener("click", function (e) {
    e.preventDefault()
    if (e.target.closest("div").querySelector(".product-image")) {
      var productName = e.target
        .closest("div")
        .querySelector(".product-name").innerHTML
      var productImage = e.target
        .closest("div")
        .querySelector(".product-image").src
      var productPrice = e.target
        .closest("div")
        .querySelector(".product-price").innerHTML
      var productQuantity = "1"
    } else {
      var productImage = e.target
        .closest("#product")
        .querySelector(".product-image").src
      var productName = e.target
        .closest("#product")
        .querySelector(".product__product-name").innerHTML
      var productPrice = e.target
        .closest("#product")
        .querySelector(".product__price-sum").innerHTML
      var productQuantity = e.target
        .closest("#product")
        .querySelector(".product__quantity-input-picker").value
    }
    fetch(requestsUrl)
      .then((response) => response.json())
      .then((data) => {
        const existingProductIndex = data.findIndex(
          (request) => request.prodName.trim() === productName.trim()
        )

        if (existingProductIndex !== -1) {
          // Продукт уже существует, складываем значения
          const existingProduct = data[existingProductIndex]
          existingProduct.prodPrice = (
            parseFloat(existingProduct.prodPrice) + parseFloat(productPrice)
          ).toString()
          existingProduct.prodQuantity = (
            parseInt(existingProduct.prodQuantity) + parseInt(productQuantity)
          ).toString()

          // Отправляем PUT запрос для обновления данных продукта
          fetch(`${requestsUrl}/${existingProduct.id}`, {
            method: "PUT",
            headers: {
              "Content-type": "Application/json",
            },
            body: JSON.stringify(existingProduct),
          })
            .then((response) => response.json())
            .then((updatedProduct) => {
              console.log("Обновленные данные продукта:", updatedProduct)
            })
            .catch((error) => {
              console.error("Произошла ошибка:", error)
            })
        } else {
          // Продукта нет, добавляем его в requests
          fetch(requestsUrl, {
            method: "POST",
            headers: {
              "Content-type": "Application/json",
            },
            body: JSON.stringify({
              prodName: productName,
              prodImage: productImage,
              prodPrice: productPrice,
              prodQuantity: productQuantity,
            }),
          })
            .then((response) => response.json())
            .then((newProduct) => {
              console.log("Добавленный продукт:", newProduct)
            })
            .catch((error) => {
              console.error("Произошла ошибка:", error)
            })
        }
      })
      .catch((error) => {
        console.error("Произошла ошибка:", error)
      })
  })
}
// product render payment page
class cartProducts {
  constructor(img, name, price, quantity, insertTo) {
    this.img = img
    this.quantity = quantity
    this.name = name
    this.price = price
    this.insertTo = document.querySelector(
      ".payment-and-shipment-aside .cart-items-wrapper"
    )
  }

  renderPaymentPage() {
    const cartProducts = document.createElement("div")
    cartProducts.classList.add("col-12", "cart-items", "row")
    cartProducts.innerHTML = `
      <div class="cart-image-wrapper col-4">
        <img
          src="${this.img}"
          alt="product image"
          class="product-image"
        />
        <span class="cart-product-quantity"> ${this.quantity} </span>
      </div>

      <p class="product-name col-6">${this.name}</p>
      <div class="price col-2">
        <span class="product-price">${this.price}</span>
        <span>p</span>
      </div>
    `

    this.insertTo.append(cartProducts)
  }
}

getProduct(requestsUrl).then((data) => {
  // console.log(data)
  data.forEach((element) => {
    new cartProducts(
      element.prodImage,
      element.prodName,
      element.prodPrice,
      element.prodQuantity
    ).renderPaymentPage()
  })
  totalPrice()
  totalProducts()
})

function totalPrice() {
  /// Summary price
  let priceCount = document.querySelectorAll(".cart .product-price")
  let priceCountPlacement = document.querySelectorAll(".cart .price-sum")[0]
  let totalPrice = 0
  for (let i = 0; i < priceCount.length; i++) {
    totalPrice = totalPrice + +priceCount[i].innerHTML
    // console.log(priceCount[i].innerHTML)
    // console.log(totalPrice)
  }
  priceCountPlacement.innerHTML = totalPrice + " p"
  // console.log(priceCount[0].innerHTML)
  // console.log(priceCount)
}
function totalProducts() {
  /// Summary price
  let quantityCount = document.querySelectorAll(".cart .cart-product-quantity")
  let quantityCountPlacement = document.querySelectorAll(
    ".cart .products-sum"
  )[0]
  let totalPrice = 0
  for (let i = 0; i < quantityCount.length; i++) {
    totalPrice = totalPrice + +quantityCount[i].innerHTML
    // console.log(priceCount[i].innerHTML)
    // console.log(totalPrice)
  }
  quantityCountPlacement.innerHTML = totalPrice
  if (totalPrice !== 0) {
    document.querySelector(".payment-and-shipment-aside-empty").remove()
  }
  // console.log(priceCount[0].innerHTML)
  // console.log(priceCount)
}

// fetch(requestsUrl + "5", {
//   method: "DELETE",
// })
