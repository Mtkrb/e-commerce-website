"use strict"

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
    console.log(productName)
    console.log(productImage)
    console.log(productPrice)
    console.log(productQuantity)
    fetch("http://localhost:3000/requests", {
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
  })
}

// document.querySelector(".main").addEventListener("click", (e) => {
//   console.log("haa")
//   if (e.target.classList.contains("product__add-to-cart-button")) {
//     // myFunc(title, price, image)
//     console.log("ha")
//   }
// })
