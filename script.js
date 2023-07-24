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
})

let priceSumValue = document.querySelectorAll(".product__price-sum")[0]
  .innerHTML
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
    console.log(priceSum[i])
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
  addToCartBtn[i].addEventListener("click", function () {
    alert("Продукт добавлен в корзину")
  })
}
