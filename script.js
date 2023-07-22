"use strict"

//prod page product quantity picker
$(document).ready(function () {
  $(".product__quantity-input-minus").on("click", function (e) {
    let input = $(e.target).closest(".product__quantity-input").find("input")
    input[0]["stepDown"]()
  })
  $(".product__quantity-input-plus").on("click", function (e) {
    let input = $(e.target).closest(".product__quantity-input").find("input")
    input[0]["stepUp"]()
  })
})

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
